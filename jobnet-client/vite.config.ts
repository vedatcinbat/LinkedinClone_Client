import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add an alias for @mui/icons-material/svg-icons to handle SVG imports
      '@mui/icons-material/svg-icons': '@mui/icons-material/esm/svg-icons',
    },
  },
})
