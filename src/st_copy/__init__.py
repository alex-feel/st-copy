import os
import uuid
from typing import Literal
from typing import Optional

import streamlit.components.v1 as components

RAW = os.getenv('ST_COPY_DEV_SERVER')
DEV_URL = (RAW or '').strip()

if DEV_URL:
    if DEV_URL.lower() in {'auto', 'default'}:
        DEV_URL = 'http://localhost:3001'
    component = components.declare_component(
        'st_copy',
        url=DEV_URL
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(parent_dir, 'frontend', 'dist')
    component = components.declare_component(
        'st_copy',
        path=frontend_dir
    )


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

    return component(
        text=text,
        icon=icon,
        tooltip=tooltip,
        copied_label=copied_label,
        key=key,
    )
