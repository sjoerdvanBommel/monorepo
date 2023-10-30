// import type { Options } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export const options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: isProduction,
  sourcemap: true,
}
