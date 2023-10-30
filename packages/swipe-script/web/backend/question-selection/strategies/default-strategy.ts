import { prisma } from '@mr-ss/database'
import type { DefaultStrategyData } from '../../types'
import type { QuestionSelectionStrategy } from './types'

export const defaultStrategy: QuestionSelectionStrategy<
  DefaultStrategyData
> = async (quizSlug) => {
  return (
    (await prisma.quiz.findUnique({
      where: { slug: quizSlug },
      include: { questions: { include: { answers: true } } },
    })) ?? undefined
  )
}
