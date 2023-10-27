'use server'

import type { Question, QuestionType } from '@mr-ss/database'
import { adaptiveStrategy } from '../question-selection/strategies/adaptive-strategy'
import { startStrategy } from '../question-selection/strategies/start-strategy'
import type { StrategyData } from '../types'

interface Props {
  questionTypeId: QuestionType['id']
  strategyData: StrategyData
}

export const getQuestions = async ({
  questionTypeId,
  strategyData,
}: Props): Promise<Question[]> => {
  switch (strategyData.strategy) {
    case 'start':
      return startStrategy(questionTypeId)
    case 'adaptive':
      return adaptiveStrategy(questionTypeId, strategyData)
    default:
      return startStrategy(questionTypeId)
  }
}
