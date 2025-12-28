/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../node_modules/.vite/react-app',
  server: {
    port: 3000,
    host: 'localhost'
  },
  preview: {
    port: 3000,
    host: 'localhost'
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@apps-shared/lib/constants': path.resolve(__dirname, '../../apps-shared/src/lib/constants'),
      '@apps-shared': path.resolve(__dirname, '../../apps-shared/src')
    }
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
}));
