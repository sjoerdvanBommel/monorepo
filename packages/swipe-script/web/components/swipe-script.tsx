'use client'

import type { Question } from '@mr-ss/database'
import { useState } from 'react'
import { Landing } from './landing'

interface Props {
  initialQuestions: Question[]
}

export const SwipeScript = ({ initialQuestions }: Props) => {
  const [isTransitioningPage, setIsTransitioningPage] = useState(false)
  const [started, setStarted] = useState(false)

  function onStart() {
    setIsTransitioningPage(true)

    setTimeout(() => {
      setStarted(true)
    }, 1000)

    setTimeout(() => {
      setIsTransitioningPage(false)
    }, 2000)
  }

  return (
    <>
      {!started ? (
        <Landing onStart={onStart} />
      ) : (
        <p>GAME with initial questions: {JSON.stringify(initialQuestions)}</p>
      )}
    </>
  )
}
