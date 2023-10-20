import fs from 'fs'
import { Answer, Question, TRUTHY_OR_FALSY_QT_ID } from '../client'

interface Situation {
  value: any
  label: string
}

const situations: Situation[] = [
  { label: 'true', value: true },
  { label: 'false', value: false },
  { label: '0', value: 0 },
  { label: "''", value: '' },
  { label: 'null', value: null },
  { label: 'undefined', value: undefined },
  { label: 'NaN', value: NaN },
  { label: 'Infinity', value: Infinity },
  { label: '[]', value: [] },
  { label: '{}', value: {} },
]

const answersJsonFileUrl = './answers.json'
const questionsJsonFileUrl = './questions.json'

const generateSeedData = async () => {
  const questions: Question[] = []
  const answers: Answer[] = []

  let questionId = 1
  let answerId = 1

  situations.forEach((situation1) => {
    situations.forEach((situation2) => {
      const question1Text = `${situation1.label} == ${situation2.label}`

      answers.push(
        {
          id: answerId++,
          is_correct: !!eval(question1Text),
          answer_text: 'Truthy',
          question_id: questionId,
        },
        {
          id: answerId++,
          is_correct: !eval(question1Text),
          answer_text: 'Falsy',
          question_id: questionId,
        },
      )

      questions.push({
        id: questionId++,
        question_text: question1Text,
        difficulty_level: 4,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })

      const question2Text = `${situation1.label} == ${situation2.label}`

      answers.push(
        {
          id: answerId++,
          is_correct: !!eval(question2Text),
          answer_text: 'Truthy',
          question_id: questionId,
        },
        {
          id: answerId++,
          is_correct: !eval(question2Text),
          answer_text: 'Falsy',
          question_id: questionId,
        },
      )

      questions.push({
        id: questionId++,
        question_text: question2Text,
        difficulty_level: 4,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })
    })
  })

  fs.rmSync(answersJsonFileUrl, { force: true })
  fs.rmSync(questionsJsonFileUrl, { force: true })

  fs.writeFileSync(answersJsonFileUrl, JSON.stringify(answers))
  fs.writeFileSync(questionsJsonFileUrl, JSON.stringify(questions))
}

generateSeedData()
