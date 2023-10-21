import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export const Landing = () => {
  const searchParams = useSearchParams()
  const started = searchParams.has('started')

  return (
    <div className="w-full min-h-full overflow-hidden relative">
      <div
        className={twMerge(
          'flex flex-col justify-center text-center mt-12 sm:mt-16 lg:mt-20',
          started && 'animate-fade-up animation-duration-500',
        )}
      >
        <span className="text-6xl animate-appear font-heading drop-shadow-white">
          Swipe
        </span>
        <span className="text-5xl animate-appear font-heading drop-shadow-white">
          Script
        </span>
      </div>

      <span
        className={twMerge(
          'block text-2xl mt-12 sm:mt-16 lg:mt-20 text-center',
          !started &&
            'opacity-0 animate-appear animation-delay-500 animation-duration-[1.5s]',
          started &&
            'animate-fade-left animation-delay-0 animation-duration-500',
        )}
      >
        Learn JavaScript
      </span>
      <strong
        className={twMerge(
          'block text-center text-4xl bg-gradient-to-br from-primary from-20% to-secondary bg-clip-text text-transparent',
          !started &&
            'opacity-0 animate-appear animation-delay-1000 animation-duration-[1.5s]',
          started &&
            'animate-fade-right animation-delay-0 animation-duration-500',
        )}
      >
        the fun way
      </strong>

      <div
        className={twMerge(
          'absolute left-4 right-0 bottom-40 lg:bottom-60 transition-all duration-500',
          started && 'scale-0',
        )}
      >
        <div className="opacity-0 animate-appear-float-random animation-delay-1000">
          <Image
            src={'/fire.png'}
            alt={'Fire emoji'}
            width={160}
            height={160}
            className="mx-auto left-0 right-0 absolute scale-[0.85] blur-xl"
          />
          <Image
            src={'/fire.png'}
            alt={'Fire emoji'}
            width={160}
            height={160}
            className="mx-auto"
          />
        </div>
      </div>

      <div
        className={twMerge(
          'absolute bottom-0 w-full p-4 overflow-hidden',
          !started &&
            'animate-appear animation-delay-1000 animation-duration-[1.5s] opacity-0',
          started && 'animate-fade-down',
        )}
      >
        <Link
          className="block text-center bg-gradient-to-br from-primary to-secondary rounded-xl w-full p-0.5"
          href={'/?started'}
          shallow
        >
          <strong className="block tracking-wide bg-black-accent rounded-[inherit] px-4 py-3 text-xl">
            Let's give it a try!
          </strong>
        </Link>
      </div>
    </div>
  )
}
