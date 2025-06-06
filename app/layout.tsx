import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { CartProvider } from "@/components/CartProvider/cart-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fresh Harvests - Premium Fresh Produce Delivery",
  description:
    "Get the freshest fruits and vegetables delivered right to your doorstep. Quality guaranteed, farm to table freshness.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <CartProvider>
          {children}
        </CartProvider>
          <Toaster />
      </body>
    </html>
  )
}
