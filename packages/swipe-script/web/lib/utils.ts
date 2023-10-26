import { ValidAnswer } from '@/lib/types'
import { Question } from '@mr-ss/database'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAnswerId(question: Question, validAnswer: ValidAnswer) {
  if (typeof validAnswer === 'number') return validAnswer

  if (validAnswer === 'left') {
    return question.answers?.find((x) => x.answer_text === 'Falsy')?.id
  } else if (validAnswer === 'right') {
    return question.answers?.find((x) => x.answer_text === 'Truthy')?.id
  }
}

export function getAnswer(question: Question, validAnswer: ValidAnswer) {
  return question.answers?.find(
    (x) => x.id === getAnswerId(question, validAnswer),
  )
}
