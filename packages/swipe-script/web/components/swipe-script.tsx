'use client'

import type { Question } from '@mr-ss/database'
import { motion } from 'framer'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Landing } from './landing'
import { SwipeCard } from './swipe-card'

interface Props {
  initialQuestions: Question[]
}

export const SwipeScript = ({ initialQuestions }: Props) => {
  const searchParams = useSearchParams()
  const started = searchParams.has('started')
  const [showQuestions, setShowQuestions] = useState(false)

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setShowQuestions(true)
      }, 500)
    } else {
      setShowQuestions(false)
    }
  }, [started])

  if (showQuestions) {
    return (
      <motion.div className="w-full h-full flex justify-center items-center">
        {initialQuestions.map((question) => (
          <SwipeCard key={question.id} question={question} />
        ))}
      </motion.div>
    )
  }

  return <Landing />
}
