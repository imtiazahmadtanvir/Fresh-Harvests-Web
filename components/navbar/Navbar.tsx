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

  const openAuthModal = (mode: "login" | "register" = "login") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
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
        className={`sticky top-0 left-0 z-[99999] shadow-md w-full py-5 transition-all duration-300 ${
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
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="absolute right-[2px] top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-green-600 focus:ring-2 lg:hidden"
              >
                {!isOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
              </button>
            </div>

            {/* Mobile menu */}
            <div
              className={`${
                isOpen ? "-right-full" : "right-0"
              } w-2/3 h-screen p-4 fixed top-[70px] md:top-[100px] z-[999999] bg-gray-100 shadow-md flex flex-col space-y-4 transition-all duration-300 ease-in-out`}
            >
              <div className="flex flex-col lg:hidden space-y-4">
                <Link href="/">
                  <Button variant={isActiveLink("/") ? "default" : "ghost"} className="w-full justify-start text-left">
                    Home
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant={isActiveLink("/shop") ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                  >
                    Shop
                  </Button>
                </Link>
                <Link href="/about-us">
                  <Button
                    variant={isActiveLink("/about-us") ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                  >
                    About Us
                  </Button>
                </Link>
                <Link href="/blogs">
                  <Button
                    variant={isActiveLink("/blogs") ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                  >
                    Blogs
                  </Button>
                </Link>

                {/* Mobile favorites and sign in */}
                <div className="bg-gray-200 rounded-md py-3 px-4">
                  <div className="flex flex-col gap-4">
                    <Link href="/favorites" className="text-xl font-semibold">
                      Favorites
                    </Link>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => openAuthModal("login")}>
                      Sign in
                    </Button>
                  </div>
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
                  <Link href="/favorites" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-base font-semibold">Favorites</span>
                  </Link>

                  {/* Shopping Cart */}
                  <Link href="/cart" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                    <div className="relative">
                      <ShoppingCart className="w-6 h-6" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex justify-center items-center">
                        3
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
