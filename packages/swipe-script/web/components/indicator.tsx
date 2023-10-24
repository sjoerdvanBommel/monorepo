import { MotionValue, motion } from 'framer'
import { twMerge } from 'tailwind-merge'
import { CheckIcon } from './icons/check-icon'
import { XIcon } from './icons/x-icon'

interface Props {
  type: 'success' | 'error'
  progress: MotionValue<number>
  className?: string
}

export const Indicator = ({ progress, type, className }: Props) => {
  return (
    <motion.circle
      cx="100"
      cy="100"
      r="80"
      stroke="#ff0055"
      //   variants={draw}
      pathLength={progress}
      className={twMerge(
        className,
        'rounded-full w-12 h-12 bg-gradient-to-br flex items-center justify-center',
        type === 'success' &&
          'from-success-900 to-success-700 border-success-700',
        type === 'error' && 'from-error-900 to-error-700 border-error-700',
      )}
    >
      {type === 'error' && <XIcon className="w-5 text-error-200" />}
      {type === 'success' && <CheckIcon className="w-5 text-success-200" />}
    </motion.circle>
  )
}
