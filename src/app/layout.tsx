import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { TimesProvider } from './components/contexts/TimesContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Times Analyzer',
  description: 'Times Analyzer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${inter.className} bg-slate-300`}>
        <Header />
        <TimesProvider> 
          {children}
        </TimesProvider>
      </body>
    </html>
  )
}
