import type { Metadata } from 'next'
import { Nunito, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'चिया Please! | Time Pauses Here',
  description: 'A cozy place to enjoy authentic Nepali chiya, delicious snacks, and relaxing moments with friends.',
  keywords: ['Nepali tea', 'chiya', 'tea shop', 'cafe', 'snacks', 'momo', 'samosa'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
