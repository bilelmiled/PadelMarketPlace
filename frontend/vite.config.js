import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Écoute sur tous les adresses, y compris Docker
    port: 5173,
    watch: {
       usePolling: true, // Nécessaire pour le hot-reload sous Docker Windows
    },
  },
})