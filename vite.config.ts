import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sur GitHub Pages, le site est servi sous /anabus/ (le nom du dépôt).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/anabus/' : '/',
  plugins: [react()],
}));
