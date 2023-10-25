'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Question } from '@mr-ss/database'
import { useAnimation, useMotionValue, useTransform } from 'framer'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { Landing } from './landing'
import { TruthyOrFalsy } from './question-headers/truthy-or-falsy'
import { SwipeCard } from './swipe-card'

interface Props {
  initialQuestions: Question[]
}

export const SwipeScript = ({ initialQuestions }: Props) => {
  const searchParams = useSearchParams()
  const started = searchParams.has('started')
  const [showQuestions, setShowQuestions] = useState(false)
  const [questions, setQuestions] = useState(initialQuestions)
  const [visibleCardIndex, setVisibleCardIndex] = useState(0)
  const x = useMotionValue(0)
  const guaranteedSwipeDist = useWindowSize().width / 2
  const swipeProgress = useTransform(
    x,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    [-1, 0, 1],
  )
  const controls = useAnimation()

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setShowQuestions(true)
      }, 500)
    } else {
      setShowQuestions(false)
    }
  }, [started])

  const onSwipe = async (direction: 'left' | 'right') => {
    await controls.start({
      x: `${direction === 'left' ? '-' : ''}100vw`,
      transition: { duration: 0.3 },
    })
    setVisibleCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1),
    )
  }

  async function onSwipeLeft() {
    onSwipe('left')
  }

  async function onSwipeRight() {
    onSwipe('right')
  }

  const currentQuestion = questions[visibleCardIndex]

  if (showQuestions) {
    return (
      <div className="flex flex-col w-full h-full">
        <TruthyOrFalsy />
        <div className="flex-grow justify-center items-center relative">
          {questions
            .slice(visibleCardIndex, visibleCardIndex + 1)
            .map((question) => (
              <SwipeCard
                key={question.id}
                question={currentQuestion}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
                progress={swipeProgress}
                controls={controls}
              />
            ))}
        </div>
        <div className="w-full p-4 flex justify-between gap-4">
          {currentQuestion.answers &&
            currentQuestion.answers
              .sort((a, b) => a.answer_text.localeCompare(b.answer_text))
              .map((answer) => (
                <Button
                  variant={'outline'}
                  key={answer.id}
                  size="square"
                  onClick={() => {
                    onSwipe(answer.answer_text === 'Truthy' ? 'right' : 'left')
                  }}
                  className={cn(
                    'w-full mb-2 from-black-accent to-black-accent text-xl hover:duration-200',
                    answer.answer_text === 'Truthy' &&
                      'hover:to-success-900 hover:border-success-700 bg-gradient-to-br',
                    answer.answer_text === 'Falsy' &&
                      'hover:to-error-900 hover:border-error-700 bg-gradient-to-bl',
                    // answer.answer_text === 'Truthy' &&
                    //   'to-success-900 border-success-900',
                    // answer.answer_text === 'Falsy' &&
                    //   'to-error-900 border-error-900',
                  )}
                >
                  <span
                    className={cn(
                      'bg-gradient-to-br bg-clip-text text-transparent',
                      answer.answer_text === 'Truthy' && 'text-success-50',
                      answer.answer_text === 'Falsy' && 'text-error-50',
                    )}
                  >
                    {answer.answer_text}
                  </span>
                </Button>
              ))}
        </div>
      </div>
    )
  }

  return <Landing />
}
