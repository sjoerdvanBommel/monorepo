import { prisma } from '../client'

export const clean = async () => {
  await prisma.answer.deleteMany()
  await prisma.answer.deleteMany()
  await prisma.question.deleteMany()
  await prisma.questionType.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.courseSection.deleteMany()
  await prisma.course.deleteMany()
}

try {
  await clean()
} catch (error) {
  console.error(error)
  process.exit(1)
} finally {
  await prisma.$disconnect()
}
