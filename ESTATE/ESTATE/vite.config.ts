import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow external hosts
    port: 3000,
    open: true,
    allowedHosts: true  // Allow all hosts - this should resolve tunnel issues
  }
})
