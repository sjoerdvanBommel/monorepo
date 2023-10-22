import { StartStrategyData } from '../../types'
import { QuestionSelectionStrategy } from './types'

export const startStrategy: QuestionSelectionStrategy<
  StartStrategyData
> = async (questionTypeId) => {
  // const questions = await prisma.question.findMany({
  //   take: 10,
  //   where: {
  //     difficulty_level: { in: [4, 5] },
  //     question_type_id: questionTypeId,
  //   },
  // })
  await new Promise((res) => setTimeout(res, 1000))

  return []
}
