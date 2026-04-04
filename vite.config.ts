import { defineConfig } from 'vite'
import favicons from '@peterek/vite-plugin-favicons'

export default defineConfig({
  plugins: [favicons('src/favicon.png', { background: '#367632' })],
})
