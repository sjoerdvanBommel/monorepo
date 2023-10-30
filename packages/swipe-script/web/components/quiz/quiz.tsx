'use client'

import { TruthyOrFalsy } from '@/components/question-headers/truthy-or-falsy'
import { SwipeCard } from '@/components/swipe-card'
import { Button, buttonVariants } from '@/components/ui/button'
import { QuizProgress } from '@/components/ui/quiz-progress'
import { type ValidAnswer } from '@/lib/types'
import { useQuizStore } from '@/providers/quiz-provider'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useWindowSize } from 'usehooks-ts'

export const Quiz = observer(() => {
  const x = useMotionValue(0)
  const guaranteedSwipeDist = useWindowSize().width / 2
  const swipeProgress = useTransform(
    x,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    [-1, 0, 1],
  )
  const controls = useAnimation()
  const quizStore = useQuizStore()
  const questions = quizStore.quiz.questions

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

  return (
    <div className="flex flex-col w-full h-full">
      <TruthyOrFalsy />
      <div className="px-4">
        <QuizProgress />
      </div>
      {quizStore.correctAnswers < 10 ? (
        <>
          <div className="flex-grow flex flex-col relative gap-4 mx-4 mt-6">
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
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
          <motion.span
            className="block text-center text-3xl font-bold bg-gradient-to-tr text-transparent from-primary to-secondary bg-clip-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Congratulations!
          </motion.span>
          <span className="px-12 text-center">
            You answered {quizStore.correctAnswers} out of{' '}
            {quizStore.currentQuestionNumber} questions correct. Great work!
          </span>
          <Link
            href="/quizzes"
            className={buttonVariants({ variant: 'outline' })}
          >
            Go back
          </Link>
        </div>
      )}
    </div>
  )
})
