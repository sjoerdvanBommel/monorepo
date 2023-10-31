'use server'

import {
  prisma,
  type Course,
  type CourseSection,
  type Quiz,
  type QuizWithRelations,
} from '@mr-ss/database'

interface Props {
  courseSlug: Course['slug']
  courseSectionSlug: CourseSection['slug']
  quizSlug: Quiz['slug']
}

export const getQuiz = async ({
  courseSlug,
  courseSectionSlug,
  quizSlug,
}: Props): Promise<QuizWithRelations | undefined> => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      slug: quizSlug,
      AND: {
        sections: {
          slug: courseSectionSlug,
          AND: { course: { slug: courseSlug } },
        },
      },
    },
    include: { questions: { include: { answers: true } } },
  })

  return quiz ?? undefined
}

export const getQuizzes = async () => {
  return prisma.quiz.findMany({ take: 20 })
}
