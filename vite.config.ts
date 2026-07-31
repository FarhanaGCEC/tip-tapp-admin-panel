/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'masked-icon.png',
        'robots.txt',
      ],
      manifest: {
        name: 'TipApp Admin',
        short_name: 'TipApp',
        description: 'TipApp admin dashboard — the tipping app',
        theme_color: '#9E2A2B',
        background_color: '#ffffff',
        icons: [
          {
            src: 'tipapp-brand-logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'tipapp-brand-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
  ],
})
