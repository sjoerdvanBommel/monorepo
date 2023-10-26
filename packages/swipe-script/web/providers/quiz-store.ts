import { getQuestions } from '@/backend/actions/get-questions'
import { ValidAnswer } from '@/lib/types'
import { getAnswer } from '@/lib/utils'
import { Question, TRUTHY_OR_FALSY_QT_ID } from '@mr-ss/database'
import { makeAutoObservable } from 'mobx'

export class QuizStore {
  currentQuestionIndex!: number
  score!: number
  correctAnswers!: number
  questions!: Question[]

  constructor(initialQuestions?: Question[]) {
    this.startQuiz({ initialQuestions })

    makeAutoObservable(this)
  }

  // TODO use nQuestions
  async startQuiz({
    nQuestions,
    startScore = 5,
    initialQuestions,
  }: {
    nQuestions?: number
    startScore?: number
    initialQuestions?: Question[]
  } = {}) {
    this.currentQuestionIndex = 0
    this.score = startScore
    this.correctAnswers = 0

    this.questions =
      initialQuestions ??
      (await getQuestions({
        questionTypeId: TRUTHY_OR_FALSY_QT_ID,
        strategyData: { strategy: 'start' },
      }))
  }

  answerQuestion(validAnswer: ValidAnswer) {
    let answer = getAnswer(this.currentQuestion, validAnswer)

    if (!answer)
      throw new Error(
        'Given answer is not found as a possible answer for the current question.',
      )

    this.currentQuestionIndex++

    if (answer.is_correct) {
      this.correctAnswers++
    }
  }

  get wrongAnswers() {
    return this.currentQuestionIndex - this.correctAnswers
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex]
  }
}
