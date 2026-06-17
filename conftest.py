"""Shared pytest fixtures for st-copy.

``copy_button`` creates its Streamlit Components v2 mounting command lazily and
caches it in ``st_copy._component`` so a real, long-lived Streamlit app
registers the component only once. The test suite, however, runs many
independent ``AppTest`` sessions in a single process, and each session gets its
own component registry. Without resetting the cache between tests, a component
registered in an earlier session's registry would be reused, and the next
session would report it as "not registered". Resetting here also prevents the
fake mounting command installed by ``tests/test_api.py`` from leaking into other
tests.

This conftest lives at the repository root so it also applies to the smoke test
that ``streamlit/streamlit-app-action`` copies next to it before running pytest.
"""

import pytest


@pytest.fixture(autouse=True)
def _reset_st_copy_component():
    import st_copy

    st_copy._component = None
    yield
    st_copy._component = None
