import { Terminal } from '@/components/terminal/terminal'
import { framerColors } from '@/tailwind.config'
import { Question } from '@mr-ss/database'
import {
  AnimationControls,
  DragHandlers,
  MotionValue,
  PanInfo,
  motion,
  useTransform,
} from 'framer'
import { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'

interface Props {
  question: Question
  progress: MotionValue<number>
  controls: AnimationControls
  onSwipeLeft?: (questionId: Question['id']) => void
  onSwipeRight?: (questionId: Question['id']) => void
}

export const SwipeCard = ({
  question,
  onSwipeLeft,
  onSwipeRight,
  progress,
  controls,
}: Props) => {
  const guaranteedSwipeDist = useWindowSize().width / 2
  const background = useTransform(
    progress,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    [
      `linear-gradient(to right, ${framerColors['error-900']} 0%, ${framerColors['black-accent']} 100%)`,
      `linear-gradient(to right, ${framerColors['black-accent']} 0%, ${framerColors['black-accent']} 100%)`,
      `linear-gradient(to left, ${framerColors['success-900']} 0%, ${framerColors['black-accent']} 100%)`,
    ],
  )
  const borderColor = useTransform(
    progress,
    [-guaranteedSwipeDist, 0, guaranteedSwipeDist],
    [
      framerColors['error-900'],
      framerColors['border'],
      framerColors['success-900'],
    ],
  )

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 })
  }, [controls])

  const onDragEnd: DragHandlers['onDragEnd'] = async (_, info) => {
    if (isSwipingLeft(info, progress.get(), guaranteedSwipeDist)) {
      onSwipeLeft?.(question.id)
    } else if (isSwipingRight(info, progress.get(), guaranteedSwipeDist)) {
      onSwipeRight?.(question.id)
    }
  }

  return (
    <div className="flex flex-col w-auto h-full font-semibold font-code m-4 pt-6 pb-4">
      <span className="text-xl tracking-wide">
        Is the following JavaScript expression truthy or falsy?
      </span>
      <motion.div
        drag="x"
        onDragEnd={onDragEnd}
        dragSnapToOrigin
        style={{ x: progress, background, borderColor }}
        animate={controls}
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{
          duration: 0.15,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-auto h-full border rounded-md border-border p-4 mt-4 text-lg cursor-grab active:cursor-grabbing"
      >
        <Terminal
          lineData={[
            { type: 'input', prompt: '>', value: question.question_text },
          ]}
        />
        {/* {question.question_text} */}
      </motion.div>
    </div>
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
