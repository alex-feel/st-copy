# st-copy frontend

The frontend half of [`st-copy`](https://github.com/alex-feel/st-copy): a tiny,
framework-free TypeScript bundle for a **Streamlit Custom Components v2**
(frameless) copy-to-clipboard button.

There is no React/Preact and no iframe. `src/index.ts` exports a
[`FrontendRenderer`](https://docs.streamlit.io/develop/api-reference/custom-components/st.components.v2.component)
from [`@streamlit/component-v2-lib`](https://www.npmjs.com/package/@streamlit/component-v2-lib)
that wires the button mounted by the Python side (`src/st_copy/__init__.py`),
copies text on click, and reports the result back via `setTriggerValue('copied', ...)`.

## Scripts

```bash
npm install           # install dependencies
npm run build         # type-check (tsc -b) and bundle into dist/ (vite lib mode)
npm run dev           # rebuild into dist/ on change (vite build --watch)
npm test              # vitest (jsdom)
npm run lint          # eslint
```

`npm run build` emits a single hashed ES module (`dist/index-*.js`) plus its CSS
(`dist/*.css`). Those files are shipped inside the Python wheel and located at
runtime through the `[[tool.streamlit.component.components]]` `asset_dir`
declared in `src/st_copy/pyproject.toml`.

## Local development

Streamlit Components v2 has no dev-server URL mode. To iterate live, install the
package in editable mode and run the watcher so Streamlit re-serves the rebuilt
bundle:

```bash
uv pip install -e .                              # from the repo root
npm --prefix src/st_copy/frontend run dev        # rebuild dist/ on change
streamlit run examples/app.py                    # in another terminal
```
