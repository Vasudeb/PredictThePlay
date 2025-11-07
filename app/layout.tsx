import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PredictThePlay - AI Score Predictions",
  description: "AI-powered match score predictions with real-time analytics and community insights",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/cricket.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/cricket.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/cricket.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
