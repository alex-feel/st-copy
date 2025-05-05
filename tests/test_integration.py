"""
Smoke-tests that boot a real Streamlit script with the component.
"""
import contextlib

import pytest
from streamlit.testing.v1 import AppTest


def _mini_app():
    """Single-line Streamlit script for the default theme."""
    import st_copy
    st_copy.copy_button('Hello')


def _mini_app_dark():
    """Same app but with the dark theme forced via Streamlit config."""
    import streamlit as st
    try:
        st._config.set_option('theme.base', 'dark')  # public helper
    except Exception:
        # If API changes in future releases, silently ignore.
        contextlib.suppress(Exception)
    import st_copy
    st_copy.copy_button('Hello')


@pytest.mark.skipif(
    not hasattr(AppTest, 'from_function'),
    reason='Streamlit is too old for AppTest',
)
def test_component_runs_without_exceptions():
    """App should render without runtime exceptions (default theme)."""
    at = AppTest.from_function(_mini_app).run()
    assert not at.exception


@pytest.mark.skipif(
    not hasattr(AppTest, 'from_function'),
    reason='Streamlit is too old for AppTest',
)
def test_component_dark_theme_runs_without_exceptions():
    """Component should also load fine with Streamlit's dark theme."""
    at = AppTest.from_function(_mini_app_dark).run()
    assert not at.exception
