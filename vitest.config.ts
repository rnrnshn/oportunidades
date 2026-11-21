import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

// Keep Nitro's production server plugin out of the unit-test process.
export default defineConfig({
  plugins: [viteTsConfigPaths({ projects: ['./tsconfig.json'] })],
  test: { environment: 'node' },
})
