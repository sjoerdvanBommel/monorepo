import type { CourseWithRelations } from '@mr-ss/database'
import Link from 'next/link'

interface Props {
  course: CourseWithRelations
}

export const Course = ({ course }: Props) => {
  return (
    <>
      <div>{course.title}</div>
      <div>
        {course.sections.map((section) => (
          <Link
            href={`/courses/${course.slug}/${section.slug}`}
            key={section.id}
          >
            {section.title}
          </Link>
        ))}
      </div>
    </>
  )
}
