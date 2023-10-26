'use client'

import { QuizProvider } from '@/providers/quiz-provider'
import { ComponentProps, PropsWithChildren } from 'react'

export function Providers({
  children,
  initialQuestions,
}: PropsWithChildren<ComponentProps<typeof QuizProvider>>) {
  return (
    <QuizProvider initialQuestions={initialQuestions}>{children}</QuizProvider>
  )
}