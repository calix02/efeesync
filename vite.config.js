import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
 
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
