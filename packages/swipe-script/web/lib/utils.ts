import type { ValidAnswer } from '@/lib/types'
import type { Question } from '@mr-ss/database'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAnswerId(question: Question, validAnswer: ValidAnswer) {
  if (typeof validAnswer === 'number') return validAnswer

  if (validAnswer === 'left') {
    return question.answers?.find((x) => x.answerText === 'Falsy')?.id
  } else if (validAnswer === 'right') {
    return question.answers?.find((x) => x.answerText === 'Truthy')?.id
  }
}

export function getAnswer(question: Question, validAnswer: ValidAnswer) {
  return question.answers?.find(
    (x) => x.id === getAnswerId(question, validAnswer),
  )
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateCurvePath(
  nSections: number,
  options: {
    xMargin: number
    width: number
    startX: number
    startY: number
    yOffset: number
    yRandomOffset: number
  },
) {
  const { xMargin, width, startX, startY, yOffset, yRandomOffset } = options

  if (nSections === 2) {
    return `M ${startX} ${startY} ${getRandomInt(xMargin, width - xMargin)} ${
      yOffset + getRandomInt(-yRandomOffset, yRandomOffset)
    }`
  }

  let curvePath: string = `M ${startX} ${startY}`

  let previousEndPointX = startX
  let previousEndPointY = startY

  for (let i = 0; i < nSections - 1; i++) {
    const endPointX = getRandomInt(xMargin, width - xMargin)
    const endPointY =
      (i + 1) * yOffset + getRandomInt(-yRandomOffset, yRandomOffset)

    curvePath += ` C ${previousEndPointX} ${
      previousEndPointY + yOffset / 2
    } ${endPointX} ${endPointY - yOffset / 2} ${endPointX} ${endPointY}`

    previousEndPointX = endPointX
    previousEndPointY = endPointY
  }

  return curvePath
}
