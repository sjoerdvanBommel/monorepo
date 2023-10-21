import { Metadata } from 'next'
import { Fredoka, Titan_One } from 'next/font/google'
import localFont from 'next/font/local'
import { Background } from '../components/background'
import './globals.css'

const titanOne = Titan_One({
  weight: '400',
  variable: '--font-heading',
  subsets: ['latin'],
})

const fredoka = Fredoka({ variable: '--font-paragraph', subsets: ['latin'] })

const consolas = localFont({ src: './consolas.ttf', variable: '--font-code' })

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
        className={`w-full h-full ${titanOne.variable} ${fredoka.variable} ${consolas.variable}`}
      >
        <div className="w-full h-full relative overflow-hidden">
          <Background />
          {children}
        </div>
      </body>
    </html>
  )
}
