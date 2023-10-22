import { SwipeScript } from '../components/swipe-script'

export default function IndexPage() {
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
