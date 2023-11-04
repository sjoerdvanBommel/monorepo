'use server'

import { prisma, type Course, type CourseWithRelations } from '@mr-ss/database'

export const getCourse = async (
  slug: Course['slug'],
): Promise<CourseWithRelations | undefined> => {
  const course = await prisma.course.findFirst({
    where: { slug },
    include: {
      sections: { include: { quizzes: true }, orderBy: { order: 'asc' } },
    },
  })

  if (!course) return undefined

  return course
}

export const getCourses = async () => {
  return prisma.course.findMany({ take: 20 })
}
