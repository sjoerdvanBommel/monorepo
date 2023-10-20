import { Question } from '@mr-ss/database'
import {
  DragHandlers,
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer'
import { Terminal } from './terminal/terminal'

interface Props {
  question: Question
}

const swipeAwayTimeMs = 750

export const SwipeCard = ({ question }: Props) => {
  const x = useMotionValue(0)
  const successX = useTransform(x, [0, 100], [0, 1])
  const errorX = useTransform(x, [-100, 0], [1, 0])
  const options = {
    stiffness: 200,
    damping: 30,
    restDelta: 0.03,
  }

  const successScaleX = useSpring(successX, options)
  const errorScaleX = useSpring(errorX, options)
  const controls = useAnimation()

  const onDragEnd: DragHandlers['onDragEnd'] = (_, info) => {
    const transition = { duration: swipeAwayTimeMs / 1000 }

    if (isSwipingLeft(info, x.get())) {
      controls.start({ x: '-100vw', transition })
    } else if (isSwipingRight(info, x.get())) {
      controls.start({ x: '100vw', transition })
    }
  }

  return (
    <motion.div
      className="w-80 h-60 rounded-lg shadow-lg shadow-light-accent/[8%] bg-light-accent/5 overflow-hidden backdrop-blur-xl"
      drag="x"
      onDragEnd={onDragEnd}
      dragSnapToOrigin
      style={{ x }}
      animate={controls}
    >
      <Terminal
        lineData={[
          { type: 'input', prompt: '>', value: question.question_text },
        ]}
      />
      <motion.div
        style={{ scaleX: successScaleX }}
        className="h-2 absolute bottom-0 left-0 right-0 origin-left bg-success"
      ></motion.div>
      <motion.div
        style={{ scaleX: errorScaleX }}
        className="h-2 absolute bottom-0 left-0 right-0 origin-right bg-error"
      ></motion.div>
    </motion.div>
  )
}

function isSwipingLeft(info: PanInfo, x: number) {
  const isFastSwipingLeft = info.velocity.x < -50
  const isSlowSwipingLeft = info.velocity.x < -10
  const isNotSwipingRight = info.velocity.x <= 0
  const cardOnLeftSide = x < 0
  const cardFarLeft = x < -70

  return (
    isFastSwipingLeft ||
    (cardOnLeftSide && isSlowSwipingLeft) ||
    (cardFarLeft && isNotSwipingRight)
  )
}

function isSwipingRight(info: PanInfo, x: number) {
  const isFastSwipingRight = info.velocity.x > 50
  const isSlowSwipingRight = info.velocity.x > 10
  const isNotSwipingRight = info.velocity.x >= 0
  const cardOnRightSide = x > 0
  const cardFarRight = x > 70

  return (
    isFastSwipingRight ||
    (cardOnRightSide && isSlowSwipingRight) ||
    (cardFarRight && isNotSwipingRight)
  )
}
