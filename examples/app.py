import streamlit as st

from st_copy import copy_button

st.title('Copy Button Demo • Chat API')

msg_1 = '''To install the library, run the following command:

```bash
pip install st-copy
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_1}')

msg_2 = '''Use the following code to add a copy button:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(msg)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_2}')
    copy_button(msg_2)

msg_3 = '''Use the following code to add a copy button with a custom tooltip and/or label:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(
    msg,
    tooltip='✨ Special tooltip!',
    copied_label='Check my tooltip!',
)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_3}')
    copy_button(
        msg_3,
        tooltip='✨ Special tooltip!',
        copied_label='Check my tooltip!',
    )

msg_4 = '''Use the following code to add the button style Streamlit uses in code blocks:

```python
from st_copy import copy_button

msg = 'some message'

copy_button(
    msg,
    icon='st',
)
```'''
with st.chat_message('assistant'):
    st.markdown(f'**Assistant:** {msg_4}')
    copy_button(
        msg_4,
        icon='st',
    )

msg_5 = '''Use all parameters together:

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
    st.markdown(f'**Assistant:** {msg_5}')
    copy_button(
        msg_5,
        icon='material_symbols',
        tooltip='Any tooltip text',
        copied_label='Custom "Copied!" text',
        key='Any key',
    )
