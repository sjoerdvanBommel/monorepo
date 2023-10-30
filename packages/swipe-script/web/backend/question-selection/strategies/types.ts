import type { Quiz, QuizWithRelations } from '@mr-ss/database'
import type { ExactlyOne } from '@mr/utils'
import type { StrategyData } from '../../types'

export type QuestionSelectionStrategy<TStrategy extends StrategyData> =
  // ExactlyOne<TStrategy> means it does not contain any properties besides the `strategy` property
  TStrategy extends ExactlyOne<TStrategy>
    ? (quizSlug: Quiz['slug']) => Promise<QuizWithRelations | undefined>
    : (
        quizSlug: Quiz['slug'],
        props: Omit<TStrategy, 'strategy'>,
      ) => Promise<QuizWithRelations | undefined>
