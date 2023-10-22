'use client'

import type { Question } from '@mr-ss/database'
import { motion } from 'framer'
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
    fetch('/api')
      .then((x) => x.json())
      .then((result) => setQuestions(result))
  }, [])

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

  if (showQuestions) {
    return (
      <>
        <TruthyOrFalsy />
        <motion.div className="w-full h-full flex justify-center items-center relative">
          {questions
            .slice(visibleCardIndex, visibleCardIndex + 1)
            .map((question) => (
              <SwipeCard
                key={question.id}
                question={question}
                startTyping
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            ))}
        </motion.div>
      </>
    )
  }

  return <Landing />
}
