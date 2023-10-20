import { prisma, type Answer, type Question } from '../client'
import answersJson from './answers.json'
import { questionTypes } from './question-types'
import questionsJson from './questions.json'

const questions: Question[] = questionsJson
const answers: Answer[] = answersJson

;(async () => {
  try {
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
