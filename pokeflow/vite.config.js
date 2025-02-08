import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    allowedHosts: ["f324-2a09-bac5-3afc-7eb-00-ca-15c.ngrok-free.app"] // Replace with your ngrok URL
  }
})
