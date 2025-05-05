import importlib.metadata as meta

import streamlit as st

from st_copy import copy_button

# Base settings
st.set_page_config(page_title='Copy Button Demo • Chat API')

# Sidebar
with st.sidebar:
    st.title('st‑copy • demo')

    st.markdown(
        '🔗 **Source code**: '
        '[alex‑feel/st‑copy](https://github.com/alex-feel/st-copy)'
    )

    version = meta.version('st-copy')
    st.markdown(
        '[![PyPI](https://img.shields.io/pypi/v/st-copy.svg)]'
        '(https://pypi.org/project/st-copy/)'
    )

    st.markdown(
        '[![Python Version](https://img.shields.io/python/required-version-toml?tomlFilePath=https%3A%2F%2Fraw.githubusercontent.com%2Falex-feel%2Fst-copy%2Frefs%2Fheads%2Fmain%2Fpyproject.toml)]'
        '(https://github.com/alex-feel/st-copy/blob/main/pyproject.toml)'
    )

    st.markdown(
        '[![GitHub License](https://img.shields.io/github/license/alex-feel/st-copy)]'
        '(https://github.com/alex-feel/st-copy/blob/main/LICENSE)'
    )

    install_cmd = f'pip install st-copy=={version}'
    st.code(install_cmd, language='bash')
    copy_button(install_cmd, key='sidebar‑install')

    st.markdown('---')
    st.markdown('Made with 💚 for Streamlit Community')

# Main app
st.title('Copy Button Demo • Chat API')

msg_1 = '''Use the following code to add a copy button:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(msg, key=msg)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_1}')
    copy_button(
        msg_1,
        key=msg_1,
    )

msg_2 = '''Use the following code to add a copy button with a custom tooltip and/or label:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(
    msg,
    tooltip='✨ Special tooltip!',
    copied_label='Check my tooltip!',
    key=msg,
)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_2}')
    copy_button(
        msg_2,
        tooltip='✨ Special tooltip!',
        copied_label='Check my tooltip!',
        key=msg_2,
    )

msg_3 = '''Use the following code to add the button style Streamlit uses in code blocks:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(
    msg,
    icon='st',
    key=msg,
)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_3}')
    copy_button(
        msg_3,
        icon='st',
        key=msg_3,
    )

msg_4 = '''Use all parameters together:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(
    msg,
    icon='material_symbols',  # default, use 'st' as alternative
    tooltip='Any tooltip text',  # defaults to 'Copy'
    copied_label='Custom "Copied!" text',  # defaults to 'Copied!'
    key='Any key',  # If omitted, a random key will be generated
)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_4}')
    copy_button(
        msg_4,
        icon='material_symbols',
        tooltip='Any tooltip text',
        copied_label='Custom "Copied!" text',
        key='Any key',
    )

# Chat
if 'demo_history' not in st.session_state:
    st.session_state.demo_history = []

for idx, (role, text) in enumerate(st.session_state.demo_history):
    container = st.chat_message(role)
    with container:
        st.write(text)
        if role == 'human':
            copy_button(
                text,
                tooltip='Copy your message',
                key=f'copy_human_{idx}',
            )
        if role == 'assistant':
            copy_button(
                text,
                tooltip='Copy assistant message',
                key=f'copy_assistant_{idx}',
            )

if user_text := st.chat_input('Type something to test copy_button...'):
    st.session_state.demo_history.append(('human', user_text))
    assistant_text = 'This is a standard assistant response!'
    st.session_state.demo_history.append(('assistant', assistant_text))
    st.rerun()
