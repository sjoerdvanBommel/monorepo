import { PrismaClient } from '@prisma/client'
import { questionTypes } from './seed/generate-seed-data'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// export * from '@prisma/client'

/** The ID of the `Truthy or Falsy?` question type based on the seed data */
export const TRUTHY_OR_FALSY_QT_ID = questionTypes.find(
  (x) => x.type_name === 'Truthy or Falsy?',
)!.id
