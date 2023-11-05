import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import type { AnchorHTMLAttributes } from 'react'
import { forwardRef } from 'react'

const linkVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'outline-fancy':
          'text-center bg-gradient-to-br from-primary to-secondary w-full p-0.5',
      },
      size: {
        default: 'text-base',
        sm: 'h-9',
        lg: 'h-11',
        icon: 'h-10 w-10',
        square: 'aspect-square',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & { href: string }

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    return (
      <NextLink
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        href={href}
        {...props}
      >
        {variant === 'outline-fancy' ? (
          <span className="flex justify-center items-center tracking-wide bg-black-accent rounded-[inherit] px-2 w-full h-full py-1 gap-2 whitespace-pre-wrap">
            {children}
          </span>
        ) : (
          children
        )}
      </NextLink>
    )
  },
)
Link.displayName = 'Link'

export { Link, linkVariants }
