import { prisma, type Question } from '@mr-ss/database'
import type { AdaptiveStrategyData } from '../../types'
import type { QuestionSelectionStrategy } from './types'

export const adaptiveStrategy: QuestionSelectionStrategy<
  AdaptiveStrategyData
> = async (questionTypeId, { userScore }) => {
  // const questions = await prisma.question.findMany({
  //   take: 10,
  //   where: {
  //     difficulty_level: { in: [] },
  //     question_type_id: questionTypeId,
  //   },
  //   include: { answers: true },
  // })

  // Raw query because selecting a random row is not supported by Prisma
  const questions = await prisma.$queryRaw<
    Question[]
  >`SELECT * FROM "public"."Question" WHERE difficulty_level IN (${
    userScore - 1
  }, ${userScore}, ${
    userScore + 1
  }) AND question_type_id = ${questionTypeId} ORDER BY random() LIMIT 10`

  const answers = await prisma.answer.findMany({
    where: { question_id: { in: questions.map((x) => x.id) } },
  })

  questions.forEach((question) => {
    question.answers = answers.filter(
      (answer) => answer.question_id === question.id,
    )
  })

  return questions
}
