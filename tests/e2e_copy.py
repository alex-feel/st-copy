import st_copy
from streamlit.testing.v1 import AppTest

def _app():
    st_copy.copy_button("42")


def test_copy_to_clipboard():
    at = AppTest.from_function(_app).run()
    assert not at.exception
    btn = at.page.get_by_role("button")
    btn.click()
    assert at.page.evaluate("navigator.clipboard.readText()") == "42"
