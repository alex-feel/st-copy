import { defineConfig } from 'vite';

// Streamlit Custom Components v2 build: a single ES-module bundle (no iframe,
// no React/Preact) emitted into `dist/`, which `src/st_copy/__init__.py`
// references via the `js`/`css` globs declared against the component asset_dir.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: './src/index.ts',
      name: 'StCopy',
      formats: ['es'],
      fileName: 'index-[hash]',
    },
    rollupOptions: {
      output: {
        // Hash the extracted CSS file too (lib mode leaves a literal token
        // otherwise), so the Python `css='index-*.css'` glob stays clean.
        assetFileNames: 'index-[hash][extname]',
      },
    },
  },
});
