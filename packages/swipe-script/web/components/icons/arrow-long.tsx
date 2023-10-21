import { SVGProps } from 'react'

export const ArrowLong = (props: SVGProps<SVGSVGElement>) => {
  // Random ID for linear gradient so this SVG can be used multiple times
  const id = (Math.random() + 1).toString(36).substring(7)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4.7 23.2 80 46.4"
      {...props}
    >
      <linearGradient id={id}>
        <stop
          style={{ stopColor: 'var(--tw-gradient-from, currentColor)' }}
          offset="25%"
        />
        <stop
          style={{ stopColor: 'var(--tw-gradient-to, currentColor)' }}
          offset="100%"
        />
      </linearGradient>
      <path
        fill={`url(#${id})`}
        d="M6.797 49.753c4.287 2.45 8.369 5.103 11.975 8.505 3.334 3.13 5.171 7.077 8.165 10.411 1.089 1.225 3.811.748 4.015-1.089.884-6.6-4.151-12.52-10.002-17.214 12.587.272 46.638 1.695 59.158 2.375 5.715.272 5.647-8.573 0-8.845-12.588-.681-46.707-1.968-59.294-1.627 4.49-4.763 8.028-10.819 9.593-16.398.749-2.518-2.517-3.47-3.946-1.633-2.654 3.47-5.171 7.144-8.165 10.274-3.402 3.606-7.348 6.124-11.499 8.777-1.497.953-1.973 2.314-1.769 3.538-.068 1.157.476 2.246 1.769 2.926Z"
      />
    </svg>
  )
}
