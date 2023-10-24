import { Question } from '@mr-ss/database'
import {
  DragHandlers,
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer'
import { Terminal } from './terminal/terminal'

interface Props {
  question: Question
  onSwipeLeft?: (questionId: Question['id']) => void
  onSwipeRight?: (questionId: Question['id']) => void
}

const swipeAwayTimeMs = 750
const guaranteedSwipeDist = 200

export const SwipeCard = ({ question, onSwipeLeft, onSwipeRight }: Props) => {
  const x = useMotionValue(0)
  const background = useTransform(x, [0, guaranteedSwipeDist], [0, 1])

  const fontSize = `${Math.min(2 / (question.question_text.length / 15), 2)}em`

  const controls = useAnimation()

  const onDragEnd: DragHandlers['onDragEnd'] = async (_, info) => {
    const transition = { duration: swipeAwayTimeMs / 1000 }

    if (isSwipingLeft(info, x.get())) {
      await controls.start({ x: '-100vw', transition })
      onSwipeLeft?.(question.id)
    } else if (isSwipingRight(info, x.get())) {
      await controls.start({ x: '100vw', transition })
      onSwipeRight?.(question.id)
    }
  }

  return (
    <>
      <motion.div
        className="absolute w-full h-full"
        drag="x"
        onDragEnd={onDragEnd}
        dragSnapToOrigin
        style={{ x }}
        animate={controls}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.25,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex flex-col w-full h-full font-semibold font-code pt-6"
          style={{ fontSize }}
        >
          <Terminal
            lineData={[
              {
                value:
                  'Is the following JavaScript expression truthy or falsy?',
              },
              { type: 'input', prompt: '>', value: question.question_text },
            ]}
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-full p-8 flex justify-between">
        <motion.svg className="w-40 h-40 -rotate-90" viewBox="0 0 600 600">
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="#ff0055"
            pathLength={background}
            className={'stroke-[20px] fill-transparent stroke-success-700'}
            style={{ strokeLinecap: 'round' }}
          >
            {/* {<XIcon className="w-5 text-error-200" />} */}
          </motion.circle>
        </motion.svg>
        {/* <Indicator progress={x} type="error" />
        <Indicator progress={x} type="success" /> */}
      </div>
    </>
  )
}

function isSwipingLeft(info: PanInfo, x: number) {
  const isFastSwipingLeft = info.velocity.x < -1000
  const isSlowSwipingLeft = info.velocity.x < -10
  const isNotSwipingRight = info.velocity.x <= 0
  const cardOnLeftSide = x < 0
  const cardFarLeft = x < -guaranteedSwipeDist

  return (
    isFastSwipingLeft ||
    (cardOnLeftSide && isSlowSwipingLeft) ||
    (cardFarLeft && isNotSwipingRight)
  )
}

function isSwipingRight(info: PanInfo, x: number) {
  const isFastSwipingRight = info.velocity.x > 1000
  const isSlowSwipingRight = info.velocity.x > 10
  const isNotSwipingRight = info.velocity.x >= 0
  const cardOnRightSide = x > 0
  const cardFarRight = x > guaranteedSwipeDist

  return (
    isFastSwipingRight ||
    (cardOnRightSide && isSlowSwipingRight) ||
    (cardFarRight && isNotSwipingRight)
  )
}
