# Streamlit Copy-to-Clipboard Button Component

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_red.svg)](https://st-copy.streamlit.app/) [![PyPI](https://img.shields.io/pypi/v/st-copy.svg)](https://pypi.org/project/st-copy/) [![Python Version](https://img.shields.io/python/required-version-toml?tomlFilePath=https%3A%2F%2Fraw.githubusercontent.com%2Falex-feel%2Fst-copy%2Frefs%2Fheads%2Fmain%2Fpyproject.toml)](https://github.com/alex-feel/st-copy/blob/main/pyproject.toml) [![GitHub License](https://img.shields.io/github/license/alex-feel/st-copy)](https://github.com/alex-feel/st-copy/blob/main/LICENSE) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/alex-feel/st-copy)

A **tiny, theme‑aware Streamlit component** that adds a one‑click "copy-to-clipboard" button to your app — perfect for the chat UI, URLs or any other text the user might need to copy.

## ✨ Features
- **Streamlit theme aware**: Adapts icon color & tooltip style automatically; works in both light _and_ dark themes.
- **Inline layout**: Built on Streamlit Custom Components v2 (frameless, no iframe), so the button aligns beside other elements inside `st.container(horizontal=True)`.
- **Two icon styles**: Google *Material Symbols* (default) or the native Streamlit code‑block icon.
- **Custom tooltip & "Copied!" label**: Localized UI in one line.
- **Keyboard‑friendly**: Fully focusable, press **Enter/Space** to copy.

## 🔧 Installation

```bash
pip install st-copy
````

## ⚡ Quick start

```python
import streamlit as st
from st_copy import copy_button

st.title('Minimal demo')

copy_button('Hello, Streamlit!')  # one line – that's it 🎉
```

Run your script:

```
streamlit run app.py
```

## 🛠 API

```python
def copy_button(
    text: str,
    *,
    icon: Literal['material_symbols', 'st'] = 'material_symbols',
    tooltip: str = 'Copy',
    copied_label: str = 'Copied!',
    key: Optional[str] = None,
) -> Optional[bool]:
```

| Parameter      | Type / Default                                                      | Description                                                                                                      |
| -------------- | ------------------------------------------------------------------- |------------------------------------------------------------------------------------------------------------------|
| `text`         | **str**                                                             | Text placed on the user’s clipboard.                                                                             |
| `icon`         | `Literal['material_symbols', 'st']`<br>default `'material_symbols'` | Icon style: Google Material **content\_copy** (`material_symbols`) or Streamlit’s native code‑block icon (`st`). |
| `tooltip`      | **str**, default `'Copy'`                                           | Tooltip shown on hover/focus.                                                                                    |
| `copied_label` | **str**, default `'Copied!'`                                        | Small label displayed for ~1 s after a successful copy.                                                          |
| `key`          | **str \| None**, default `None`                                     | Unique component key; if omitted a random UUIDv4 is generated.                                                   |
| **Returns**    | **bool \| None**                                                    | `True` – copy succeeded; `False` – Clipboard API failed; `None` – button not clicked yet.                        |

## Requirements

- Python **3.10** or newer.
- Streamlit **1.56** or newer (the component uses the Custom Components v2 API).
- Clipboard API requires a secure (HTTPS) context when deployed.


## 🎨 Examples

See [examples/app.py](./examples/app.py) for a chat‑style demo that showcases every argument and the deployed version at https://st-copy.streamlit.app/.
