import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Reactless Streamlit Components v2 frontend: a single TypeScript bundle, no
// React/JSX and no HTML files, so only the base JS + typescript-eslint rules are
// needed (the former react-hooks / react-refresh / eslint-plugin-html blocks
// were removed along with the iframe entry point).
export default tseslint.config(
  { ignores: ['dist'] },

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
)
