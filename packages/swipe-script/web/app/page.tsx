import { TRUTHY_OR_FALSY_QT_ID, prisma } from '@mr-ss/database'
import { SwipeScript } from '../components/swipe-script'

export default async function IndexPage() {
  try {
    const initialQuestions = await prisma.question.findMany({
      take: 10,
      where: {
        difficulty_level: { in: [4, 5] },
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      },
    })
  } catch (e) {
    console.log(e)
  }

  // const initialQuestions = await getQuestions({
  //   questionTypeId: TRUTHY_OR_FALSY_QT_ID,
  //   strategyData: { strategy: 'start' },
  // })

  return (
    <>
      <SwipeScript initialQuestions={[]} />
    </>
  )
}
