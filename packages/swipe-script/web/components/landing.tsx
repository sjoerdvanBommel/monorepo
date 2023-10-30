'use client'

import { AnimatedLink } from '@/components/ui/animated-link'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Background } from './background'

export const Landing = () => {
  const [startingSoon, setStartingSoon] = useState(false)

  return (
    <div className="w-full min-h-full relative">
      <div
        className={twMerge(
          'transition-opacity duration-500',
          startingSoon && 'opacity-0',
        )}
      >
        <Background />
      </div>

      <div
        className={twMerge(
          'flex flex-col justify-center text-center pt-12 sm:pt-16 lg:pt-20',
          startingSoon && 'animate-fade-up animation-duration-500',
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
          !startingSoon &&
            'opacity-0 animate-appear animation-delay-500 animation-duration-[1.5s]',
          startingSoon &&
            'animate-fade-left animation-delay-0 animation-duration-500',
        )}
      >
        Learn JavaScript
      </span>
      <strong
        className={twMerge(
          'block text-center text-4xl bg-gradient-to-br from-primary from-20% to-secondary bg-clip-text text-transparent',
          !startingSoon &&
            'opacity-0 animate-appear animation-delay-1000 animation-duration-[1.5s]',
          startingSoon &&
            'animate-fade-right animation-delay-0 animation-duration-500',
        )}
      >
        the fun way
      </strong>

      <div
        className={twMerge(
          'absolute left-4 right-0 bottom-40 lg:bottom-60 transition-all duration-500',
          startingSoon && 'scale-0',
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
          !startingSoon &&
            'animate-appear animation-delay-1000 animation-duration-[1.5s] opacity-0',
          startingSoon && 'animate-fade-down',
        )}
      >
        <AnimatedLink
          className="block text-center bg-gradient-to-br from-primary to-secondary rounded-xl w-full p-0.5"
          href={'/quizzes'}
          onClick={() => {
            setStartingSoon(true)
          }}
        >
          <strong className="block tracking-wide bg-black-accent rounded-[inherit] px-4 py-3 text-xl">
            Let&apos;s give it a try!
          </strong>
        </AnimatedLink>
      </div>
    </div>
  )
}
