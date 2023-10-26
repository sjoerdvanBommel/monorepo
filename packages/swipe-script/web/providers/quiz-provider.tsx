import { Question } from '@mr-ss/database'
import React, { PropsWithChildren, createContext, useContext } from 'react'
import { QuizStore } from './quiz-store'

const QuizContext = createContext<QuizStore | null>(null)

export const QuizProvider: React.FC<
  PropsWithChildren<{ initialQuestions: Question[] }>
> = ({ children, initialQuestions }) => {
  const quizStore = new QuizStore(initialQuestions)

  return (
    <QuizContext.Provider value={quizStore}>{children}</QuizContext.Provider>
  )
}

export const useQuizStore = (): QuizStore => {
  const store = useContext(QuizContext)

  if (!store) {
    throw new Error('useQuizStore must be used within a QuizProvider')
  }

  return store
}
