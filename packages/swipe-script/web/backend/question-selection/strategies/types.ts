import { Question, QuestionType } from '@mr-ss/database'
import { ExactlyOne } from '@mr/utils'
import { StrategyData } from '../../types'

export type QuestionSelectionStrategy<TStrategy extends StrategyData> =
  // ExactlyOne<TStrategy> means it does not contain any properties besides the `strategy` property
  TStrategy extends ExactlyOne<TStrategy>
    ? (questionTypeId: QuestionType['id']) => Promise<Question[]>
    : (
        questionTypeId: QuestionType['id'],
        props: Omit<TStrategy, 'strategy'>,
      ) => Promise<Question[]>
