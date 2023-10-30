import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type PropsWithChildren } from 'react'

interface Props {
  href: string
  onClick: () => void
  durationMs?: number
  className?: string
}

export const AnimatedLink = ({
  href,
  onClick,
  durationMs = 500,
  className,
  children,
}: PropsWithChildren<Props>) => {
  const router = useRouter()

  return (
    <Link
      className={className}
      href={href}
      onClick={(e) => {
        e.preventDefault()

        onClick()

        setTimeout(() => {
          router.push(href)
        }, durationMs)
      }}
    >
      {children}
    </Link>
  )
}
