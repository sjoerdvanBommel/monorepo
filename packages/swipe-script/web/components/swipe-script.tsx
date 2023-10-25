'use client'

import { Button } from '@/components/ui/button'
import type { Question } from '@mr-ss/database'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setShowQuestions(true)
      }, 500)
    } else {
      setShowQuestions(false)
    }
  }, [started])

  function onSwipeLeft() {
    setVisibleCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1),
    )
  }

  function onSwipeRight() {
    setVisibleCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1),
    )
  }

  const currentQuestion = questions[visibleCardIndex]

  if (showQuestions) {
    return (
      <div className="flex flex-col w-full h-full">
        <TruthyOrFalsy />
        <div className="flex-grow justify-center items-center relative">
          <SwipeCard
            question={currentQuestion}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />
        </div>
        <div className="w-full p-8 flex justify-between">
          {currentQuestion.answers &&
            currentQuestion.answers.map((answer) => (
              <Button variant={'outline'} key={answer.id}>
                {answer.answer_text}
              </Button>
            ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Landing />
    </>
  )
}
