# Contributing to **st‑copy**

Thanks for taking the time to contribute 🎉!  This project is a tiny, zero‑dependency Streamlit component that adds a copy‑to‑clipboard button.  We welcome bug fixes, new features, documentation improvements and helpful discussions.

> **TL;DR** – open a PR from a feature branch, follow the commit guidelines below, ensure the test suite passes (`pytest -q`), and keep the bundle size low.

## Ground rules

* **Be respectful** – assume good intent, give constructive feedback, and keep discussions friendly.
* **Keep it lightweight** – avoid adding large JS or Python dependencies.
* **Write tests** – every behaviour change must be covered by unit or integration tests.
* **Match the code style** – the repo uses **ruff** for linting (`uv run ruff check .`).  Run `pre‑commit install` once and forget.
* **Docs matter** – update `README.md` when you add or change public API.

## Commit message conventions

We follow **Conventional Commits 1.0** with a trimmed set of types relevant to this repo.

| Type      | When to use                                              | Example                                          |
| --------- | -------------------------------------------------------- | ------------------------------------------------ |
| **feat**  | New user‑visible functionality                           | `feat: add "st" icon option`                   |
| **fix**   | Bug fix, regression, build error                         | `fix: correct tooltip positioning in dark theme` |
| **docs**  | Any change to markdown or docstrings                     | `docs: clarify dev server env var in README`     |
| **test**  | New or updated tests                                     | `test: cover auto‑generated key UUID`            |
| **ci**    | GitHub Actions, version bumps in workflow                | `ci: switch Node setup to v4 action`             |
| **chore** | Dev‑only changes (lint config, refactor, dependency pin) | `chore: bump ruff to 0.4.3`                      |

### Scope

Scopes are omitted to keep messages concise for this small repo.

## Pull‑request checklist

* [ ] PR targets the **`main`** branch and has a descriptive title.
* [ ] Follows commit conventions above.
* [ ] `pre‑commit run --all-files` passes.
* [ ] `pytest -q` passes.
* [ ] `uv build` succeeds.
* [ ] Docstrings / `README.md` updated if public API changed.
