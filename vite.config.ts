import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Sur GitHub Pages, le site est servi sous /anabus/ (le nom du dépôt).
// npm run dev reste à la racine (/) ; npm run build et npm run preview utilisent /anabus/.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/anabus/' : '/',
  plugins: [
    react(),
    // L'appli installable (PWA) : manifeste, icônes, et un service worker qui garde
    // l'appli, les lignes et les arrêts en cache pour les connexions faibles.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icones/*.png'],
      manifest: {
        name: 'Ana Bus',
        short_name: 'Ana Bus',
        description: 'Où est votre bus à Dakar, et dans combien de minutes il arrive.',
        lang: 'fr',
        // Relatifs au manifeste : /anabus/app en ligne.
        start_url: './app',
        scope: './',
        display: 'standalone',
        // Le manifeste ne lit pas les variables CSS : valeurs de --fond et --nuit (tokens.css).
        background_color: '#ffffff',
        theme_color: '#0b1a3f',
        icons: [
          { src: 'icones/icone-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icones/icone-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icones/icone-masquable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2,png}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            // Le fond de carte : style, polices et tuiles d'OpenFreeMap.
            urlPattern: ({ url }) => url.hostname === 'tiles.openfreemap.org',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'fond-de-carte', expiration: { maxEntries: 600, maxAgeSeconds: 14 * 24 * 3600 } },
          },
        ],
      },
    }),
  ],
  // MapLibre pèse ~290 ko compressé : il n'est chargé qu'avec la carte (import à la demande).
  build: { chunkSizeWarningLimit: 1100 },
  test: { include: ['src/**/*.test.ts'] },
}));
