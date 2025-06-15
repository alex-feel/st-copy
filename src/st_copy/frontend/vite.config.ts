import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

// Use Preact to shrink bundle size
const alias = {
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'react-dom/client': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJs()],

  resolve: { alias },
  optimizeDeps: { include: ['streamlit-component-lib'] },

  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      external: [],
    },
  },

  base: './',
});
