import { prisma } from '../client'
import { clean } from './clean'
import { generateFunSeedData } from './generate-seed-data'
;(async () => {
  try {
    // const isSeeded = (await prisma.quiz.count()) > 0

    // if (isSeeded) return

    const { questions, answers, questionTypes, quizzes, courses, sections } =
      generateFunSeedData()

    await clean()

    await Promise.all(
      courses.map((x) =>
        prisma.course.upsert({
          where: {
            id: x.id,
          },
          update: {
            ...x,
          },
          create: {
            ...x,
          },
        }),
      ),
    )

    await Promise.all(
      sections.map((x) =>
        prisma.courseSection.upsert({
          where: {
            id: x.id,
          },
          update: {
            ...x,
          },
          create: {
            ...x,
          },
        }),
      ),
    )

    await Promise.all(
      quizzes.map((quiz) =>
        prisma.quiz.upsert({
          where: {
            id: quiz.id,
          },
          update: {
            ...quiz,
          },
          create: {
            ...quiz,
          },
        }),
      ),
    )

    await Promise.all(
      questionTypes.map((questionType) =>
        prisma.questionType.upsert({
          where: {
            id: questionType.id,
          },
          update: {
            ...questionType,
          },
          create: {
            ...questionType,
          },
        }),
      ),
    )

    await Promise.all(
      questions.map((question) =>
        prisma.question.upsert({
          where: {
            id: question.id,
          },
          update: {
            ...question,
          },
          create: {
            ...question,
          },
        }),
      ),
    )

    await Promise.all(
      answers.map((answer) =>
        prisma.answer.upsert({
          where: {
            id: answer.id,
          },
          update: {
            ...answer,
          },
          create: {
            ...answer,
          },
        }),
      ),
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
