import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Inkwell - Discover Amazing Writers',
  description: 'Join our community of writers and readers. Discover stories that matter.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  )
}
