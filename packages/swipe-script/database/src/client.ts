import type { Simplify } from '@mr/utils'
import type {
  Prisma,
  Question as PrismaQuestion} from '@prisma/client';
import {
  PrismaClient
} from '@prisma/client'

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient()
  }

  const client = new PrismaClient({
    log: [{ emit: 'event', level: 'query' }],
  })
  client.$on('query', (e) => {
    console.log(`${e.query} ${e.params}`)
  })
  return client
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
