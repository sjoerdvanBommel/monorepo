import { prisma } from '@mr-ss/database'
import { AdaptiveStrategyData } from '../../types'
import { QuestionSelectionStrategy } from './types'

export const adaptiveStrategy: QuestionSelectionStrategy<
  AdaptiveStrategyData
> = async (questionTypeId, { userScore }) => {
  const questions = await prisma.question.findMany({
    take: 10,
    where: {
      difficulty_level: { in: [userScore - 1, userScore, userScore + 1] },
      question_type_id: questionTypeId,
    },
  })

  return questions
}
