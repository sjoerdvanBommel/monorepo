import { getQuiz } from '@/backend/actions/quiz-actions'
import { Quiz } from '@/components/quiz/quiz'
import { QuizProvider } from '@/providers/quiz-provider'
import { notFound } from 'next/navigation'

export default async function QuizPage({
  params: { courseSlug, sectionSlug: courseSectionSlug, quizSlug },
}: {
  params: { courseSlug: string; sectionSlug: string; quizSlug: string }
}) {
  const quiz = await getQuiz({
    courseSlug: decodeURIComponent(courseSlug),
    courseSectionSlug: decodeURIComponent(courseSectionSlug),
    quizSlug: decodeURIComponent(quizSlug),
  })

  if (!quiz) return notFound()

  return (
    <QuizProvider quiz={quiz}>
      <Quiz />
    </QuizProvider>
  )
}
