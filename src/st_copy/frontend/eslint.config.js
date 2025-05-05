import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintHtml from 'eslint-plugin-html'
import htmlPlugin from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'

export default tseslint.config(
  { ignores: ['dist'] },

  // TypeScript / React configuration
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // HTML files configuration
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      html: eslintHtml,
      '@html-eslint': htmlPlugin,
    },
    rules: {
      ...htmlPlugin.configs['flat/recommended'].rules,
    },
  },
)
