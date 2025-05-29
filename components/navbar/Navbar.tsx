"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Menu, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AuthModal } from "../auth/auth-modal"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [navbar, setNavbar] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigate = () => {
    router.push("/")
  }

  // Update the openAuthModal function to close the mobile menu when opening the auth modal
  const openAuthModal = (mode: "login" | "register" = "login") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setIsOpen(true) // Close the mobile menu when opening auth modal
  }

  // Background color change on scroll
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 32) {
        setNavbar(true)
      } else {
        setNavbar(false)
      }
    }

    window.addEventListener("scroll", changeBackground)
    return () => window.removeEventListener("scroll", changeBackground)
  }, [])

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  const NavButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`text-base font-medium hover:text-green-600 transition-colors ${
          isActiveLink(href) ? "text-green-600 bg-green-50" : "text-gray-700"
        }`}
      >
        {children}
      </Button>
    </Link>
  )

  return (
    <>
      <header
        className={`sticky top-0 left-0 z-50 shadow-md w-full py-5 transition-all duration-300 ${
          navbar ? "bg-transparent backdrop-blur-lg text-gray" : "bg-transparent text-gray-800"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center">
          <nav className="relative container flex justify-between items-center">
            {/* Logo */}
            <div className="w-[50%] lg:w-[20%]">
              <div onClick={handleNavigate} className="flex items-center cursor-pointer">
                <Image
                  src="/logo.png?height=50&width=150"
                  alt="Fresh Harvest Logo"
                  width={150}
                  height={50}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              {/* Update the mobile menu button to properly handle the toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="absolute right-[2px] top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-green-600 focus:ring-2 lg:hidden"
                aria-label="Toggle menu"
              >
                {!isOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
              </button>
            </div>

            {/* Mobile menu */}
            {/* Update the mobile menu to have better structure and styling */}
            <div
              className={`${
                isOpen ? "-right-full" : "right-0"
              } w-full md:w-2/3 h-screen p-6 fixed top-[70px] md:top-[100px] z-[60] bg-white shadow-lg flex flex-col space-y-4 transition-all duration-300 ease-in-out`}
            >
              <div className="flex flex-col lg:hidden space-y-6">
                <div className="space-y-4">
                  <Link href="/">
                    <Button
                      variant={isActiveLink("/") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      Home
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button
                      variant={isActiveLink("/shop") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      Shop
                    </Button>
                  </Link>
                  <Link href="/about-us">
                    <Button
                      variant={isActiveLink("/about-us") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      About Us
                    </Button>
                  </Link>
                  <Link href="/blogs">
                    <Button
                      variant={isActiveLink("/blogs") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      Blogs
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Favorites</h3>
                  <Link
                    href="/"
                    className="flex items-center gap-2 mb-4 hover:text-green-600 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-base font-medium">My Favorites</span>
                  </Link>
                  <Link href="/" className="flex items-center gap-2 mb-6 hover:text-green-600 transition-colors">
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex justify-center items-center">
                        3
                      </div>
                    </div>
                    <span className="text-base font-medium">My Cart</span>
                  </Link>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => openAuthModal("login")}>
                    Sign in
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="w-[50%] lg:flex lg:justify-center lg:items-center items-center hidden">
              <div className="flex items-center space-x-2">
                <NavButton href="/">Home</NavButton>
                <NavButton href="/shop">Shop</NavButton>
                <NavButton href="/about-us">About Us</NavButton>
                <NavButton href="/blogs">Blogs</NavButton>
              </div>
            </div>

            {/* Desktop right section */}
            <div className="w-[30%] lg:flex lg:justify-end hidden">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Favorites */}
                  <Link href="/" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-base font-semibold">Favorites</span>
                  </Link>

                  {/* Shopping Cart */}
                  <Link href="/" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                    <div className="relative">
                      <ShoppingCart className="w-6 h-6" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex justify-center items-center">
                        0
                      </div>
                    </div>
                    <span className="text-base font-semibold">Cart</span>
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => openAuthModal("login")}>
                  Sign in
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}

export default Navbar
