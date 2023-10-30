import type { ValidAnswer } from '@/lib/types'
import { getAnswer } from '@/lib/utils'
import type { QuizWithRelations } from '@mr-ss/database'
import { makeAutoObservable } from 'mobx'

export class QuizStore {
  currentQuestionNumber: number
  currentQuestionIndex: number
  correctAnswers: number
  quiz: QuizWithRelations

  constructor(quiz: QuizWithRelations) {
    this.currentQuestionNumber = 1
    this.currentQuestionIndex = 0
    this.correctAnswers = 0
    this.quiz = quiz

    makeAutoObservable(this)
  }

  answerQuestion(validAnswer: ValidAnswer) {
    let answer = getAnswer(this.currentQuestion, validAnswer)

    if (!answer)
      throw new Error(
        'Given answer is not found as a possible answer for the current question.',
      )

    this.currentQuestionIndex =
      (this.currentQuestionIndex + 1) % this.quiz.questions.length
    this.currentQuestionNumber++

    if (answer.isCorrect) {
      this.correctAnswers++
    }
  }

  get wrongAnswers() {
    return this.currentQuestionIndex - this.correctAnswers
  }

  get currentQuestion() {
    return this.quiz.questions[this.currentQuestionIndex]
  }
}
