import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  base: '/me/',
  plugins: [react()],
})
