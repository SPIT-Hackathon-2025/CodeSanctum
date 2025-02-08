import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["7982-103-124-122-210.ngrok-free.app"] // Replace with your ngrok URL
  }
})
