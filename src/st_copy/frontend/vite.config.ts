import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use Preact to shrink bundle size
const alias = {
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'react-dom/client': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  base: './',
})
