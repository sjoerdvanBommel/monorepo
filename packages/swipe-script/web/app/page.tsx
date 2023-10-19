import { prisma } from '@mr-ss/database'

export default async function IndexPage() {
  const questions = await prisma.question.findMany()
  const questionTypes = await prisma.questionType.findMany()
  const answers = await prisma.answer.findMany()

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
      <pre>{JSON.stringify(questionTypes, null, 2)}</pre>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  )
}
