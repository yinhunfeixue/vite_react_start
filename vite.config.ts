import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  envDir: 'env',
  envPrefix: 'APP_',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
