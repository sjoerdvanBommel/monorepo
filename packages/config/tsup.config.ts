import { defineConfig } from 'tsup'
import { config } from './tsup/node'

export default defineConfig({ ...config, entry: ['index.ts'] })
