import type { CourseSectionWithRelations } from '@mr-ss/database'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

interface Props {
  section: CourseSectionWithRelations
}

export default function CourseSection({
  section,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <div>
        {section.quizzes.map((quiz) => (
          <div key={quiz.id}>
            {quiz.title}
            <Link href={`./${section.slug}/${quiz.slug}`}>Start quiz</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
