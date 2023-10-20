import { TRUTHY_OR_FALSY_QT_ID } from '@mr-ss/database'
import { getQuestions } from '../backend/actions/get-questions'
import { SwipeScript } from '../components/swipe-script'

export default async function IndexPage() {
  const initialQuestions = await getQuestions({
    questionTypeId: TRUTHY_OR_FALSY_QT_ID,
    strategyData: { strategy: 'start' },
  })

  return (
    <>
      <SwipeScript initialQuestions={initialQuestions} />
    </>
  )
}
