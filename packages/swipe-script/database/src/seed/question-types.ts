import type { QuestionType } from '../client'

export const TRUTHY_OR_FALSY_QT_ID = 1
export const MULTIPLE_CHOICE_QT_ID = 2

export const questionTypes: readonly QuestionType[] = [
  {
    id: TRUTHY_OR_FALSY_QT_ID,
    typeName: 'Truthy or Falsy?',
  },
  {
    id: MULTIPLE_CHOICE_QT_ID,
    typeName: 'Multiple Choice',
  },
] as const
