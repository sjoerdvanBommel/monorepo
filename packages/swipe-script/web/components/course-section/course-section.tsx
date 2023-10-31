import type { CourseSectionWithRelations } from '@mr-ss/database'
import Link from 'next/link'

interface Props {
  section: CourseSectionWithRelations
}

export default function CourseSection({ section }: Props) {
  return (
    <>
      <div>{section.title}</div>
      <div>{section.content}</div>
      <div>
        {section.quizzes.map((quiz) => (
          <div key={quiz.id}>
            {quiz.title}
            <Link href={`./${section.slug}/${quiz.slug}`}>Start quiz</Link>
          </div>
        ))}
      </div>
    </>
  )
}
