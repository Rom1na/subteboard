import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // El "túnel" para esquivar el CORS
      '/api-subte': {
        target: 'https://apitransporte.buenosaires.gob.ar',
        changeOrigin: true,
        // Esto elimina '/api-subte' de la URL antes de mandarla a la API real
        rewrite: (path) => path.replace(/^\/api-subte/, ''),
      }
    }
  }
})