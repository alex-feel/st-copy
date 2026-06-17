"""st-copy: a copy-to-clipboard button component for Streamlit.

Built on Streamlit Custom Components v2 (frameless). Because a v2 component
renders inline in the app DOM instead of inside an iframe, the button is
mounted with ``width='content'`` and aligns beside sibling elements inside
``st.container(horizontal=True)`` (see GitHub issue #27).
"""

import glob
import os
import uuid
from typing import Any
from typing import Literal
from typing import Optional

import streamlit.components.v2 as components_v2

# Directory holding the built frontend bundle (shipped inside the wheel).
_FRONTEND_DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend', 'dist')

# HTML skeleton mounted by Streamlit into the component's host element (a shadow
# root, since isolate_styles defaults to True). The frontend
# (src/st_copy/frontend/src/index.ts) fills the icon, label, and tooltip and
# wires the click handler. These class names MUST stay in sync with the
# selectors in index.ts and CopyButton.css.
_COMPONENT_HTML = (
    '<button type="button" class="st-copy-btn" data-testid="st-copy-btn">'
    '<span class="st-copy-icon" aria-hidden="true"></span>'
    '<span class="st-copy-label" aria-live="polite"></span>'
    '</button>'
)

# The mounting command is created lazily and cached. The built JS/CSS are passed
# as *inline* content (read from the shipped bundle) rather than as asset-dir
# path globs, so the component needs no package manifest and resolves
# identically under a real ``streamlit run`` server, ``streamlit.testing`` /
# ``AppTest``, and bare mode (manifest discovery only runs in a full Runtime).
# A leading comment guarantees Streamlit treats the content as inline, not as a
# file path.
_component: Any = None


def _read_bundle(pattern: str) -> str:
    """Return the contents of the single built bundle file matching ``pattern``."""
    matches = sorted(glob.glob(os.path.join(_FRONTEND_DIST, pattern)))
    if not matches:
        raise FileNotFoundError(
            f'st-copy frontend bundle not found: no file matching {pattern!r} in '
            f'{_FRONTEND_DIST!r}. Build it with '
            '`npm --prefix src/st_copy/frontend run build`.'
        )
    with open(matches[0], encoding='utf-8') as bundle:
        return bundle.read()


def _get_component() -> Any:
    """Return the cached v2 mounting command, creating it on first use."""
    global _component
    if _component is None:
        _component = components_v2.component(
            'st_copy',
            html=_COMPONENT_HTML,
            css='/* st-copy */\n' + _read_bundle('index-*.css'),
            js='/* st-copy */\n' + _read_bundle('index-*.js'),
        )
    return _component


def _noop() -> None:
    """No-op callback so the result always exposes the ``copied`` trigger value."""


def copy_button(
    text: str,
    *,
    icon: Literal['material_symbols', 'st'] = 'material_symbols',
    tooltip: str = 'Copy',
    copied_label: str = 'Copied!',
    key: Optional[str] = None,
) -> Optional[bool]:
    """
    Creates a copy button that copies the specified text to the clipboard.

    Args:
        text (str): The text to be copied.
        icon (Literal['material_symbols', 'st'], optional): The icon to display on the button.
            Defaults to 'material_symbols'.
            'material_symbols' - uses material symbols icon.
            'st' - uses streamlit icon.
        tooltip (str, optional): The tooltip to display when hovering over the button.
            Defaults to 'Copy'.
        copied_label (str, optional): The label to display when the text has been copied.
            Defaults to 'Copied!'.
        key (Optional[str], optional): An optional key that uniquely identifies this component.
            If not provided, a random UUID will be generated. Defaults to None.

    Returns: Optional[bool]: True if the text was copied, False otherwise.
    """
    if key is None:
        key = str(uuid.uuid4())

    result = _get_component()(
        key=key,
        data={
            'text': text,
            'icon': icon,
            'tooltip': tooltip,
            'copied_label': copied_label,
        },
        width='content',
        on_copied_change=_noop,
    )

    try:
        return result['copied']
    except (KeyError, TypeError):
        return None
