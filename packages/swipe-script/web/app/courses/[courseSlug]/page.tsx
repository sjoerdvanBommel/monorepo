import { getCourse } from '@/backend/actions/course-actions'
import { Course } from '@/components/course/course'
import { notFound } from 'next/navigation'

export default async function CoursePage({
  params: { courseSlug },
}: {
  params: { courseSlug: string }
}) {
  const course = await getCourse(courseSlug)

  if (!course) return notFound()

  return <Course course={course} />
}
