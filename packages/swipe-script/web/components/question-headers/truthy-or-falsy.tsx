import { motion } from 'framer'
import { ArrowLongIcon } from '../icons/arrow-long-icon'

export const TruthyOrFalsy = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex gap-4 items-end opacity-0 animate-appear animation-duration-1000">
        <span className="font-heading text-5xl leading-tight -mb-2 drop-shadow-white">
          Truthy
        </span>
        <motion.div
          className="relative -z-10"
          initial={{ left: -80, opacity: 0 }}
          animate={{ left: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
        >
          <ArrowLongIcon
            gradientId="success-arrow"
            className="rotate-180 text-white-accent w-12 from-success to-transparent scale-x-125"
          />
        </motion.div>
      </div>
      <span className="font-heading text-2xl opacity-0 animate-appear animation-delay-200 animation-duration-700 drop-shadow-white">
        or
      </span>
      <div className="flex gap-4 opacity-0 animation-delay-300 animate-appear animation-duration-1000">
        <motion.div
          className="relative -z-10"
          initial={{ right: -80, opacity: 0 }}
          animate={{ right: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
        >
          <ArrowLongIcon
            gradientId="error-arrow"
            className="text-white-accent w-12 mb-1 from-error to-transparent scale-x-125"
          />
        </motion.div>
        <span className="font-heading text-5xl leading-tight -mt-2 drop-shadow-white">
          Falsy?
        </span>
      </div>
    </div>
  )
}
