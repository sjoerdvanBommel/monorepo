import type { Question} from '@mr-ss/database';
import { prisma } from '@mr-ss/database'
import type { StartStrategyData } from '../../types'
import type { QuestionSelectionStrategy } from './types'

export const startStrategy: QuestionSelectionStrategy<
  StartStrategyData
> = async (questionTypeId) => {
  // Raw query because selecting a random row is not supported by Prisma
  const questions = await prisma.$queryRaw<
    Question[]
  >`SELECT * FROM "public"."Question" WHERE difficulty_level IN (1, 2, 3) AND question_type_id = ${questionTypeId} ORDER BY random() LIMIT 10`

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
