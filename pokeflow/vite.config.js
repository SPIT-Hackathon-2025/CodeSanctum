import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
      },
      manifest: {
        name: 'Offline Workflow App',
        short_name: 'OfflineApp',
        description: 'A PWA that works offline',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),

    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173, // Ensure port is correct
    allowedHosts:['ca51-103-104-226-58.ngrok-free.app']
  }
})
