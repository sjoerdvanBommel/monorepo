import { Question } from '@mr-ss/database'
import {
  DragHandlers,
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer'
import { useWindowSize } from 'usehooks-ts'
import { Terminal } from './terminal/terminal'

interface Props {
  question: Question
  onSwipeLeft?: (questionId: Question['id']) => void
  onSwipeRight?: (questionId: Question['id']) => void
}

const swipeAwayTimeMs = 750

export const SwipeCard = ({ question, onSwipeLeft, onSwipeRight }: Props) => {
  const guaranteedSwipeDist = useWindowSize().width / 2
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    [
      'linear-gradient(to top right, hsl(349 94% 5%) 0%, hsl(240, 10%, 4%) 100%)',
      'linear-gradient(to top right, hsl(240, 10%, 4%) 0%, hsl(240, 10%, 4%) 100%)',
      'linear-gradient(to top left, hsl(120 92% 4%) 0%, hsl(240, 10%, 4%) 100%)',
    ],
  )
  const borderColor = useTransform(
    x,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    ['hsl(349 94% 10%)', 'hsl(240 3.7% 15.9%)', 'hsl(120 92% 9%)'],
  )

  const controls = useAnimation()

  const onDragEnd: DragHandlers['onDragEnd'] = async (_, info) => {
    const transition = { duration: swipeAwayTimeMs / 1000 }

    if (isSwipingLeft(info, x.get(), guaranteedSwipeDist)) {
      await controls.start({ x: '-100vw', transition })
      onSwipeLeft?.(question.id)
    } else if (isSwipingRight(info, x.get(), guaranteedSwipeDist)) {
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
        >
          <motion.div
            className="w-auto h-full m-4 border rounded-md border-border p-4 text-lg"
            style={{ background, borderColor }}
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
      </motion.div>
    </>
  )
}

function isSwipingLeft(info: PanInfo, x: number, guaranteedSwipeDist: number) {
  const isFastSwipingLeft = info.velocity.x < -1000
  const isSlowSwipingLeft = info.velocity.x < -100
  const isSwipingRight = info.velocity.x < 0
  const cardOnLeftSide = x < 0
  const cardFarLeft = x < -guaranteedSwipeDist

  return (
    isFastSwipingLeft ||
    (cardOnLeftSide && isSlowSwipingLeft) ||
    (cardFarLeft && isSwipingRight)
  )
}

function isSwipingRight(info: PanInfo, x: number, guaranteedSwipeDist: number) {
  const isFastSwipingRight = info.velocity.x > 1000
  const isSlowSwipingRight = info.velocity.x > 100
  const isSwipingRight = info.velocity.x > 0
  const cardOnRightSide = x > 0
  const cardFarRight = x > guaranteedSwipeDist

  return (
    isFastSwipingRight ||
    (cardOnRightSide && isSlowSwipingRight) ||
    (cardFarRight && isSwipingRight)
  )
}
