import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {

  return {
    server: {
      host: true
    },
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'core/index.ts'),
        name: 'canvas-editor',
      },
      target: ['es2020'],
      outDir: 'dist'
    },
    plugins: [react()],
  }
})
