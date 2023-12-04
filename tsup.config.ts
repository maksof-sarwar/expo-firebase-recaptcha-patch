import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.tsx'],
  splitting: false,
  sourcemap: false,
  format: ['cjs', 'esm'],
  dts: true,
  outDir : 'dist',
  clean: true,
})