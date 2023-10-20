import { prisma } from '@mr-ss/database'
import { StartStrategyData } from '../../types'
import { QuestionSelectionStrategy } from './types'

export const startStrategy: QuestionSelectionStrategy<
  StartStrategyData
> = async (questionTypeId) => {
  const questions = await prisma.question.findMany({
    where: {
      difficulty_level: { in: [4, 5] },
      question_type_id: questionTypeId,
    },
  })

  return questions
}
