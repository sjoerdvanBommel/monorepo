'use server'

import { prisma, type Quiz, type QuizWithRelations } from '@mr-ss/database'
import { defaultStrategy } from '../question-selection/strategies/default-strategy'
import type { StrategyData } from '../types'

interface Props {
  slug: Quiz['slug']
  /** Can be used at some point to influence the question selection strategy */
  strategyData?: StrategyData
}

export const getQuiz = async ({
  slug,
  strategyData,
}: Props): Promise<QuizWithRelations | undefined> => {
  switch (strategyData?.strategy) {
    default:
      return defaultStrategy(slug)
  }
}

export const getQuizzes = async () => {
  return prisma.quiz.findMany({ take: 20 })
}
