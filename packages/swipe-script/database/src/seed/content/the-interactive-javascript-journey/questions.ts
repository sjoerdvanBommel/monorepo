import type { Answer, Question } from '../../../client'
import { MULTIPLE_CHOICE_QT_ID } from '../../question-types'

const INITIAL_QUESTION_ID = 10_000_001

export const questions: Question[] = [
  {
    id: INITIAL_QUESTION_ID,
    questionText: "What's the best way to learn JavaScript?",
    questionTypeId: MULTIPLE_CHOICE_QT_ID,
    quizId: null,
  },
]

export const answers: Answer[] = [
  {
    answerText: 'Follow this course!',
    isCorrect: true,
    questionId: INITIAL_QUESTION_ID,
  },
  {
    answerText: 'Read a book..',
    isCorrect: false,
    questionId: INITIAL_QUESTION_ID,
  },
].map((x, i) => ({ ...x, id: 10_000_001 + i }))
