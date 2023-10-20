import { Metadata } from 'next'
import { Fredoka, Titan_One } from 'next/font/google'
import './globals.css'

const titanOne = Titan_One({
  weight: '400',
  variable: '--font-heading',
  subsets: ['latin'],
})
const fredoka = Fredoka({ variable: '--font-paragraph', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Swipe Script',
  description: 'Learn JavaScript, the fun way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black-accent w-full h-full">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body
        className={`w-full h-full ${titanOne.variable} ${fredoka.variable}`}
      >
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute -z-50 w-full animate-appear-float flex justify-center mt-28 md:mt-36 lg:mt-48 xl:mt-80 blur-3xl">
            <div className="scale-150 md:scale-[2] lg:scale-[2.5] xl:scale-[3]">
              <div className="relative aspect-square bg-gradient-conic from-primary from-20% to-secondary animate-background transition-all opacity-20 bg-blend-darken w-96 h-96" />
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
