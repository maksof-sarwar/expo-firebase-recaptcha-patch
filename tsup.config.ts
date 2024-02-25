import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.tsx'],
  splitting: false,
  sourcemap: false,
  format: ['esm'],
  dts: true,
  outDir : 'dist',
  clean: true,
})