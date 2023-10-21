export const Background = () => {
  return (
    <>
      <div className="absolute -z-50 w-full animate-appear-float flex justify-center mt-28 md:mt-36 lg:mt-48 xl:mt-80 blur-3xl">
        <div className="scale-150 md:scale-[2] lg:scale-[2.5] xl:scale-[3]">
          <div className="relative aspect-square bg-gradient-conic from-primary from-20% to-secondary animate-background transition-all opacity-30 bg-blend-darken w-96 h-96" />
        </div>
      </div>
      <div className="absolute w-full h-full backdrop-blur-xl" />
    </>
  )
}
