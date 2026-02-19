import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    port: 5176,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:5900",
        changeOrigin: true,
        secure: false
      },
      "/uploads": {
        target: "http://localhost:5900",
        changeOrigin: true,
      },
    }
  }
})
