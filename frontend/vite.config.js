
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // optional: configure dev server
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000", // your Django backend
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // optional: alias for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // optional: build optimization
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
})
