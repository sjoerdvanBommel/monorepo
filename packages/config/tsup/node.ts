import { type Options } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export const config: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: isProduction,
  sourcemap: true,
}
