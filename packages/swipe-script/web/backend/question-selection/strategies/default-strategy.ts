import { prisma } from '@mr-ss/database'
import { shuffle } from '@mr/utils'
import type { DefaultStrategyData } from '../../types'
import type { QuestionSelectionStrategy } from './types'

export const defaultStrategy: QuestionSelectionStrategy<
  DefaultStrategyData
> = async (quizSlug) => {
  const quiz = await prisma.quiz.findUnique({
    where: { slug: quizSlug },
    include: { questions: { include: { answers: true } } },
  })

  if (!quiz) return undefined

  shuffle(quiz.questions)

  return quiz
}
