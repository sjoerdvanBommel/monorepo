'use server'

import {
  prisma,
  type Course,
  type CourseSection,
  type CourseSectionWithRelations,
} from '@mr-ss/database'

export const getCourseSection = async ({
  courseSectionSlug,
  courseSlug,
}: {
  courseSectionSlug: CourseSection['slug']
  courseSlug: Course['slug']
}): Promise<CourseSectionWithRelations | undefined> => {
  const course = await prisma.courseSection.findFirst({
    where: { slug: courseSectionSlug, course: { slug: courseSlug } },
    include: { quizzes: true },
  })

  if (!course) return undefined

  return course
}
