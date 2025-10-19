import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Destina',
  description: 'Created by Salazar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
