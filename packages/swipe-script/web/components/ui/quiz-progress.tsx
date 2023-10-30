'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'

import { useQuizStore } from '@/providers/quiz-provider'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'

const nQuestions = 10

const QuizProgress = observer(() => {
  const { correctAnswers, wrongAnswers } = useQuizStore()
  const progressContainerRef = useRef<HTMLDivElement>(null)
  const prevCorrectAnswers = useRef(correctAnswers)
  const prevWrongAnswers = useRef(wrongAnswers)

  useEffect(() => {
    const progressContainer = progressContainerRef.current

    if (progressContainer) {
      const progressElement = progressContainer

      const isCorrect = correctAnswers > prevCorrectAnswers.current
      const isIncorrect = wrongAnswers > prevWrongAnswers.current

      if (isCorrect || isIncorrect) {
        progressElement.animate(
          [
            { borderColor: 'var(--border)' },
            {
              borderColor: `var(--${isCorrect ? 'success' : 'error'}-700)`,
              boxShadow: `inset 0 0 10px var(--${
                isCorrect ? 'success' : 'error'
              }-700)`,
              offset: 0.2,
            },
            { borderColor: 'var(--border)' },
          ],
          {
            duration: 1500,
            easing: 'ease-out',
          },
        )
      }
    }

    // Update the previous correct answers count
    prevCorrectAnswers.current = correctAnswers
    prevWrongAnswers.current = wrongAnswers
  }, [correctAnswers, wrongAnswers])

  return (
    <ProgressPrimitive.Root
      ref={progressContainerRef}
      className="relative h-8 shrink-0 w-full border border-border rounded-md overflow-hidden"
    >
      <div className="absolute w-full h-full rounded-md blur-[1px]">
        <ProgressPrimitive.Indicator
          className="absolute h-full w-full flex-1 bg-gradient-to-r from-secondary to-primary transition-all origin-left"
          style={{
            left: `${
              (correctAnswers > 0 ? -100 : -110) +
              (correctAnswers / nQuestions) * 100
            }%`,
          }}
        />
      </div>
    </ProgressPrimitive.Root>
  )
})

export { QuizProgress }
