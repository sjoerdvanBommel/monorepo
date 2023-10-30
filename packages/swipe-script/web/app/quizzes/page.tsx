import { getQuizzes } from '@/backend/actions/quiz-actions'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const NEXT_PUBLIC_AWS_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET!
const NEXT_PUBLIC_AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION!

export default async function QuizzesPage() {
  const quizzes = await getQuizzes()

  return (
    <>
      <h1 className="text-center m-6 text-2xl">
        What do you want to learn today?
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {quizzes.map((quiz) => (
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-full text-lg whitespace-pre-wrap text-center aspect-square bg-cover',
            )}
            key={quiz.slug}
            style={{
              backgroundImage: quiz.imageKey
                ? `url(https://${NEXT_PUBLIC_AWS_BUCKET}.s3.${NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${quiz.imageKey})`
                : '',
            }}
            href={`/quizzes/${quiz.slug}`}
          >
            {quiz.imageKey ? '' : quiz.title}
          </Link>
        ))}
      </div>
    </>
  )
}
