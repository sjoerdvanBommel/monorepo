import { getCourseSection } from '@/backend/actions/course-section-actions'
import CourseSection from '@/components/course-section/course-section'
import { notFound } from 'next/navigation'

export default async function SectionPage({
  params: { sectionSlug, courseSlug },
}: {
  params: { sectionSlug: string; courseSlug: string }
}) {
  const section = await getCourseSection({
    courseSectionSlug: sectionSlug,
    courseSlug,
  })

  if (!section) return notFound()

  return <CourseSection section={section} />
}
