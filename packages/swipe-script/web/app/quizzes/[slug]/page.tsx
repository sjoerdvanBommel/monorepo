import { getQuiz } from '@/backend/actions/quiz-actions'
import { Quiz } from '@/components/quiz/quiz'
import { QuizProvider } from '@/providers/quiz-provider'
import { notFound } from 'next/navigation'

export default async function QuizPage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const quiz = await getQuiz({ slug })

  if (!quiz) return notFound()

  return (
    <QuizProvider quiz={quiz}>
      <Quiz />
    </QuizProvider>
  )
}
