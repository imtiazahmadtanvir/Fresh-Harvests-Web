"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Menu, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth/auth-modal"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [navbar, setNavbar] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register" | "change-password">("login")
  const router = useRouter()
  const pathname = usePathname()

  // Mock cart total - replace with actual cart context
  const totalItems = 3

  const handleNavigate = () => {
    router.push("/")
  }

  // Open auth modal with specified mode
  const openAuthModal = (mode: "login" | "register" | "change-password" = "login") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setIsOpen(true) // Close mobile menu when opening auth modal
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
        className={`fixed bg-transparent  left-0 right-0 z-[9999] shadow-md w-full py-6 transition-all duration-300 ${
          navbar ? "bg-transparent backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div onClick={handleNavigate} className="flex items-center cursor-pointer">
                <Image
                  src="/logo.png?height=50&width=150"
                  alt="Fresh Harvest Logo"
                  width={150}
                  height={50}
                  className="h-auto"
                  priority
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="rounded-lg px-3 py-2 ring-green-600 focus:ring-2"
                aria-label="Toggle menu"
              >
                {!isOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
              </button>
            </div>

            {/* Mobile menu */}
            <div
              className={`${
                isOpen ? "-right-full" : "right-0"
              } w-full md:w-2/3 h-screen p-6 fixed top-[90px] z-[10000] bg-white shadow-lg flex flex-col space-y-4 transition-all duration-300 ease-in-out`}
            >
              <div className="flex flex-col lg:hidden space-y-6">
                <div className="space-y-4">
                  <Link href="/" onClick={() => setIsOpen(true)}>
                    <Button
                      variant={isActiveLink("/") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      Home
                    </Button>
                  </Link>
                  <Link href="/shop" onClick={() => setIsOpen(true)}>
                    <Button
                      variant={isActiveLink("/shop") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      Shop
                    </Button>
                  </Link>
                  <Link href="/about-us" onClick={() => setIsOpen(true)}>
                    <Button
                      variant={isActiveLink("/about-us") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      About Us
                    </Button>
                  </Link>
                  <Link href="/blogs" onClick={() => setIsOpen(true)}>
                    <Button
                      variant={isActiveLink("/blogs") ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium text-base"
                    >
                      Blogs
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 mb-4 hover:text-green-600 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-base font-medium">My Favorites</span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 mb-6 hover:text-green-600 transition-colors"
                  >
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      {totalItems > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-500">
                          {totalItems}
                        </Badge>
                      )}
                    </div>
                    <span className="text-base font-medium">My Cart {totalItems > 0 && `(${totalItems})`}</span>
                  </Link>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setIsOpen(true) // Close mobile menu
                      openAuthModal("login") // Open auth modal
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="flex-1 lg:flex lg:justify-center lg:items-center items-center hidden">
              <div className="flex items-center space-x-8">
                <NavButton href="/">Home</NavButton>
                <NavButton href="/shop">Shop</NavButton>
                <NavButton href="/about-us">About Us</NavButton>
                <NavButton href="/blogs">Blogs</NavButton>
              </div>
            </div>

            {/* Desktop right section */}
            <div className="lg:flex lg:justify-end hidden">
              <div className="flex items-center gap-6">
                {/* Favorites */}
                <Link href="/" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-base font-semibold">Favorites</span>
                </Link>

                {/* Shopping Cart */}
                <Link href="/cart" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-500">
                        {totalItems}
                      </Badge>
                    )}
                  </div>
                  <span className="text-base font-semibold">Cart</span>
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <Button className="bg-green-600 hover:bg-green-700 px-6" onClick={() => openAuthModal("login")}>
                    Sign in
                  </Button>

                  {/* Dropdown menu for logged in users */}
                  {/* This would be conditionally rendered when user is logged in */}
                  {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible">
                    <button
                      onClick={() => openAuthModal("change-password")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {/* logout logic */
                  /*}}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[90px]"></div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}

export default Navbar
