import type { PrismaClient as ImportedPrismaClient } from '@prisma/client'
import { createRequire } from 'module'
import { questionTypes } from './seed/generate-seed-data'

const require = createRequire(import.meta.url ?? __filename)

const { PrismaClient: RequiredPrismaClient } = require('@prisma/client')

const _PrismaClient: typeof ImportedPrismaClient = RequiredPrismaClient

class PrismaClient extends _PrismaClient {}

export const prisma = new PrismaClient()

export type * from '@prisma/client'

export const a = '1'

/** The ID of the `Truthy or Falsy?` question type based on the seed data */
export const TRUTHY_OR_FALSY_QT_ID = questionTypes.find(
  (x) => x.type_name === 'Truthy or Falsy?',
)!.id
