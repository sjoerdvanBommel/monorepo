import { ArrowLong } from '../icons/arrow-long'

export const TruthyOrFalsy = () => {
  return (
    <div className="flex flex-col items-center mt-14">
      <div className="flex gap-4 items-end opacity-0 animate-appear animation-duration-1000">
        <span className="font-heading text-5xl leading-tight -mb-2 drop-shadow-white">
          Truthy
        </span>
        <ArrowLong className="rotate-180 text-white-accent w-12 from-primary to-transparent scale-x-125" />
      </div>
      <span className="font-heading text-2xl opacity-0 animate-appear animation-delay-200 animation-duration-700 drop-shadow-white">
        or
      </span>
      <div className="flex gap-4 opacity-0 animation-delay-300 animate-appear animation-duration-1000">
        <ArrowLong className="text-white-accent w-12 mb-1 from-error to-transparent scale-x-125" />
        <span className="font-heading text-5xl leading-tight -mt-2 drop-shadow-white">
          Falsy?
        </span>
      </div>
    </div>
  )
}
