import { Simplify } from '@mr/utils'
import {
  Prisma,
  PrismaClient,
  Question as PrismaQuestion,
} from '@prisma/client'
import { questionTypes } from './seed/generate-seed-data'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Workaround from Prisma docs to prevent Next.js from creating too many PrismaClients:
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export * from '@prisma/client'

export type QuestionWithAnswers = Simplify<
  Prisma.QuestionGetPayload<{
    include: { answers: true }
  }>
>

export type Question = Simplify<PrismaQuestion & Partial<QuestionWithAnswers>>

/** The ID of the `Truthy or Falsy?` question type based on the seed data */
export const TRUTHY_OR_FALSY_QT_ID = questionTypes.find(
  (x) => x.type_name === 'Truthy or Falsy?',
)!.id
