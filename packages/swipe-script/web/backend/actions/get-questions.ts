import { QuestionType } from '@mr-ss/database'
import { adaptiveStrategy } from '../question-selection/strategies/adaptive-strategy'
import { startStrategy } from '../question-selection/strategies/start-strategy'
import { StrategyData } from '../types'

interface Props {
  questionTypeId: QuestionType['id']
  strategyData: StrategyData
}

export const getQuestions = async ({ questionTypeId, strategyData }: Props) => {
  if (strategyData.strategy === 'start') {
    return startStrategy(questionTypeId)
  }

  return adaptiveStrategy(questionTypeId, strategyData)
}
