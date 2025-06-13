import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const alias = {
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'react-dom/client': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
}

export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})
