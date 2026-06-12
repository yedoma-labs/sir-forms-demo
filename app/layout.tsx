import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yedoma Labs Demo',
  description: 'Comprehensive demo of Yedoma Labs TypeScript ecosystem for Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
