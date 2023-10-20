import Image from 'next/image'

interface Props {
  onStart: () => void
}

export const Landing = ({ onStart }: Props) => {
  return (
    <div className="w-full min-h-full overflow-hidden relative">
      <div className="absolute w-full animate-appear-float flex justify-center mt-28 md:mt-36 lg:mt-48 xl:mt-80 blur-3xl">
        <div className="scale-150 md:scale-[2] lg:scale-[2.5] xl:scale-[3]">
          <div className="relative aspect-square bg-gradient-conic from-primary from-20% to-secondary animate-background transition-all opacity-20 bg-blend-darken w-96 h-96" />
        </div>
      </div>

      <span className="block font-heading text-6xl text-center mt-20 animate-appear">
        Swipe
      </span>
      <span className="block font-heading text-5xl text-center animate-appear">
        Script
      </span>

      <span className="block text-2xl mt-20 text-center animate-appear opacity-0 animation-delay-500 animation-duration-[1.5s]">
        Learn JavaScript
      </span>
      <strong className="block text-center text-4xl opacity-0 animate-appear bg-gradient-to-br from-primary from-20% to-secondary bg-clip-text text-transparent animation-delay-1000 animation-duration-[1.5s]">
        the fun way
      </strong>

      <div className="absolute left-4 right-0 bottom-60 opacity-0 animate-appear-float-random animation-delay-1000">
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

      <div className="absolute bottom-0 w-full p-4 animate-appear opacity-0 animation-delay-1000 animation-duration-[1.5s] overflow-hidden">
        <button
          className="bg-gradient-to-br from-primary to-secondary rounded-xl w-full p-0.5"
          onClick={onStart}
        >
          <strong className="block tracking-wide bg-black-accent rounded-[inherit] px-4 py-3 text-xl">
            Let's give it a try!
          </strong>
        </button>
      </div>
    </div>
  )
}
