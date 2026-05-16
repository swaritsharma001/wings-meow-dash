import { vercel } from '@tanstack/start-adapter-vercel'

export default defineConfig({
  plugins: [
    tanstackStartVite({ adapter: vercel() })
  ]
})
