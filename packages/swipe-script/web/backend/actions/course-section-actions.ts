'use server'

import {
  prisma,
  type Course,
  type CourseSection,
  type CourseSectionWithRelations,
} from '@mr-ss/database'

export type CourseSectionWithRelationsAndMetadata =
  CourseSectionWithRelations & {
    previousSection?: Pick<CourseSection, 'title' | 'slug'>
    nextSection?: Pick<CourseSection, 'title' | 'slug'>
  }

export const getCourseSection = async ({
  courseSectionSlug,
  courseSlug,
}: {
  courseSectionSlug: CourseSection['slug']
  courseSlug: Course['slug']
}): Promise<CourseSectionWithRelationsAndMetadata | undefined> => {
  const courseSection = await prisma.courseSection.findFirst({
    where: { slug: courseSectionSlug, course: { slug: courseSlug } },
    include: { quizzes: true },
  })

  if (!courseSection) return undefined

  const prevSectionPromise = prisma.courseSection.findFirst({
    where: { order: courseSection.order - 1 },
    select: { title: true, slug: true },
    orderBy: { order: 'asc' },
  })

  const nextSectionPromise = prisma.courseSection.findFirst({
    where: { order: courseSection.order + 1 },
    select: { title: true, slug: true },
    orderBy: { order: 'asc' },
  })

  const [previousSection, nextSection] = await Promise.all([
    prevSectionPromise,
    nextSectionPromise,
  ])

  const courseSectionWithMetadata: CourseSectionWithRelationsAndMetadata = {
    ...courseSection,
    previousSection: previousSection ?? undefined,
    nextSection: nextSection ?? undefined,
  }

  return courseSectionWithMetadata
}
