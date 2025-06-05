# Rules

## Contributions

1. Use Conventional Commits as described in `CONTRIBUTING.md`.
2. Never update package versions in `src/st_copy/frontend/package.json`, `.release-please-manifest.json`, `pyproject.toml`, or any other file — this is handled **by** the GitHub CI/CD pipeline.

## Checks and Tests

Here are the exact commands to lint, test, and build **st-copy**. All commands assume the working directory is the root of the repository.

### Frontend (React + TypeScript) and Backend

```bash
# Run all pre-commit hooks (Ruff, ESLint, etc.)
uv run pre-commit run --all-files --show-diff-on-failure

# Run the full test suite with coverage and JUnit XML
uv run pytest -vv --junitxml=report.xml --cov=src --cov-report=xml --cov-report=term
```

### Full Build and Package Verification

```bash
# 1. Ensure the front-end bundle is up to date (idempotent)
npm ci --prefix src/st_copy/frontend --no-audit --no-fund
npm run --prefix src/st_copy/frontend build

# 2. Build source distribution and wheel in ./dist
uv build

# 3. Verify that the front-end bundle is included in the wheel
unzip -l dist/*.whl | grep frontend/dist/index.html
```
