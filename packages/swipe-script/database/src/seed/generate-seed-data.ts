import {
  Answer,
  Question,
  QuestionType,
  TRUTHY_OR_FALSY_QT_ID,
} from '../client'

interface Situation {
  label: string
  difficulty_level: number
}

const situations: Situation[] = [
  { label: 'true', difficulty_level: 1 },
  { label: 'false', difficulty_level: 1 },
  { label: '0', difficulty_level: 2 },
  { label: "''", difficulty_level: 3 },
  { label: 'null', difficulty_level: 2 },
  { label: 'undefined', difficulty_level: 2 },
  { label: 'NaN', difficulty_level: 4 },
  { label: 'Infinity', difficulty_level: 4 },
  { label: '[]', difficulty_level: 3 },
  { label: '{}', difficulty_level: 3 },
  { label: 'Symbol()', difficulty_level: 4 },
  { label: "Symbol('foo')", difficulty_level: 4 },
]

export const questionTypes: readonly QuestionType[] = [
  {
    id: 1,
    type_name: 'Truthy or Falsy?',
  },
] as const

export const generateSeedData = async () => {
  const questions: Omit<Question, 'answers'>[] = []
  const answers: Answer[] = []

  let questionId = 1
  let answerId = 1

  situations.forEach((situation1) => {
    situations.forEach((situation2) => {
      const question1Text = `${situation1.label} == ${situation2.label}`

      let difficultyLevel = Math.round(
        (situation1.difficulty_level + situation2.difficulty_level) / 2,
      )

      if (situation1.label === situation2.label) difficultyLevel = 1

      answers.push(
        {
          id: answerId++,
          is_correct: !!(0, eval)(`(${question1Text})`),
          answer_text: 'Truthy',
          question_id: questionId,
        },
        {
          id: answerId++,
          is_correct: !(0, eval)(`(${question1Text})`),
          answer_text: 'Falsy',
          question_id: questionId,
        },
      )

      questions.push({
        id: questionId++,
        question_text: question1Text,
        difficulty_level: difficultyLevel,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })

      const question2Text = `${situation1.label} === ${situation2.label}`

      answers.push(
        {
          id: answerId++,
          is_correct: !!(0, eval)(`(${question2Text})`),
          answer_text: 'Truthy',
          question_id: questionId,
        },
        {
          id: answerId++,
          is_correct: !(0, eval)(`(${question2Text})`),
          answer_text: 'Falsy',
          question_id: questionId,
        },
      )

      questions.push({
        id: questionId++,
        question_text: question2Text,
        difficulty_level: difficultyLevel,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })
    })
  })

  return {
    answers,
    questions,
    questionTypes,
  }
}
