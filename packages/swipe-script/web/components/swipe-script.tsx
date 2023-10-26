'use client'

import { Button } from '@/components/ui/button'
import { QuizProgress } from '@/components/ui/quiz-progress'
import { ValidAnswer } from '@/lib/types'
import { useQuizStore } from '@/providers/quiz-provider'
import { useAnimation, useMotionValue, useTransform } from 'framer'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { Landing } from './landing'
import { TruthyOrFalsy } from './question-headers/truthy-or-falsy'
import { SwipeCard } from './swipe-card'

export const SwipeScript = observer(() => {
  const searchParams = useSearchParams()
  const started = searchParams.has('started')
  const [showQuestions, setShowQuestions] = useState(false)
  const x = useMotionValue(0)
  const guaranteedSwipeDist = useWindowSize().width / 2
  const swipeProgress = useTransform(
    x,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    [-1, 0, 1],
  )
  const controls = useAnimation()
  const quizStore = useQuizStore()
  const questions = quizStore.questions

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setShowQuestions(true)
      }, 500)
    } else {
      setShowQuestions(false)
    }
  }, [started])

  const onAnswer = async (validAnswer: ValidAnswer) => {
    const isSwipe = typeof validAnswer !== 'number'

    if (isSwipe) {
      const swipeDirection = validAnswer

      await controls.start({
        x: `${swipeDirection === 'left' ? '-' : ''}100vw`,
        transition: { duration: 0.3 },
      })
    }

    quizStore.answerQuestion(validAnswer)
  }

  const currentQuestion = quizStore.currentQuestion

  if (showQuestions) {
    return (
      <div className="flex flex-col w-full h-full">
        <TruthyOrFalsy />
        <div className="flex-grow flex flex-col relative gap-4 mx-4 mt-8">
          <QuizProgress />
          <span className="text-xl tracking-wide">
            Is the following JavaScript expression truthy or falsy?
          </span>
          {questions
            .slice(
              quizStore.currentQuestionIndex,
              quizStore.currentQuestionIndex + 1,
            )
            .map((question) => (
              <SwipeCard
                key={question.id}
                question={currentQuestion}
                onAnswer={onAnswer}
                progress={swipeProgress}
                controls={controls}
              />
            ))}
        </div>
        <div className="w-full p-4 flex justify-between gap-4">
          <Button
            variant={'outline'}
            size="square"
            onClick={() => onAnswer('left')}
            className="max-h-40 w-full mb-2 p-2 from-black-accent to-[var(--error-hover)] text-xl hover-hover:hover:[--error-hover:var(--error-900)] hover-hover:hover:border-error-700 bg-gradient-to-bl duration-300 transition-[all,--error-hover]"
          >
            <span className="bg-gradient-to-br bg-clip-text text-error-50">
              Falsy
            </span>
          </Button>
          <Button
            variant={'outline'}
            size="square"
            onClick={() => onAnswer('right')}
            className="max-h-40 w-full mb-2 p-2 from-black-accent to-[var(--success-hover)] text-xl hover-hover:hover:[--success-hover:var(--success-900)] hover-hover:hover:border-success-700 bg-gradient-to-br duration-300 transition-[all,--success-hover]"
          >
            <span className="bg-gradient-to-br bg-clip-text text-success-50">
              Truthy
            </span>
          </Button>
        </div>
      </div>
    )
  }

  return <Landing />
})
