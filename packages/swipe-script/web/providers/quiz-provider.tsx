'use client'

import type { QuizWithRelations } from '@mr-ss/database'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { QuizStore } from './quiz-store'

const QuizContext = createContext<QuizStore | null>(null)

export const QuizProvider: React.FC<
  PropsWithChildren<{ quiz: QuizWithRelations }>
> = ({ children, quiz }) => {
  const store = new QuizStore(quiz)

  return <QuizContext.Provider value={store}>{children}</QuizContext.Provider>
}

export const useQuizStore = (): QuizStore => {
  const store = useContext(QuizContext)

  if (!store) {
    throw new Error('useQuizStore must be used within a QuizProvider')
  }

  return store
}
