import type { Metadata } from 'next'
import { ThemeProvider } from '@/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yash Patidar | Full Stack Developer',
  description: 'Portfolio of Yash Patidar - Full Stack Developer with expertise in web development, AI/ML, and modern technologies',
  keywords: ['developer', 'portfolio', 'full-stack', 'typescript', 'next.js', 'react'],
  authors: [{ name: 'Yash Patidar' }],
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yash-portfolio.com',
    title: 'Yash Patidar | Full Stack Developer',
    description: 'Portfolio of Yash Patidar - Full Stack Developer',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
