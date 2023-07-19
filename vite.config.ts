import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {

  return {
    server: {
      host: true
    },
    css:{
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/core/index.ts'),
        name: 'canvas-editor',
      },
      target: ['ES2015'],
      outDir: 'dist'
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.ts', 'jsx','.tsx','.json', 'mjs']
    }
  }
})
