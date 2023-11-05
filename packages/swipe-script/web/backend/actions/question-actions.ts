'use server'

import {
  prisma,
  type Question,
  type QuestionWithRelations,
} from '@mr-ss/database'

export const getQuestion = async (
  id: Question['id'],
): Promise<QuestionWithRelations | undefined> => {
  const question = await prisma.question.findFirst({
    where: { id },
    include: { answers: true },
  })

  if (!question) return undefined

  return question
}
