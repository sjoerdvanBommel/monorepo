import type { SVGProps } from 'react'

export const ArrowBackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <title>{'ionicons-v5-a'}</title>
    <polyline
      points="244 400 100 256 244 112"
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <line
      x1={120}
      y1={256}
      x2={412}
      y2={256}
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
  </svg>
)
