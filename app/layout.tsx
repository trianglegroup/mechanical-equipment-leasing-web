import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mechanical Equipment Leasing Service | 机械设备租赁服务',
  description: 'Providing rental services for various construction machinery and equipment, including excavators, trailers, RVs, and other professional equipment. 提供各类工程机械设备租赁服务，包括挖掘机、拖车、房车等专业设备',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
