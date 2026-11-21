import { defineConfig } from 'nitro'

export default defineConfig({
  routeRules: {
    '/': {
      cache: {
        maxAge: 60,
        swr: true,
        staleMaxAge: 300,
        sendCacheControl: false,
      },
    },
  },
})
