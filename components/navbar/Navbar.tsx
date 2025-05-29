

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Menu, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [navbar, setNavbar] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Mock user state - replace with real authentication later
  const [user, setUser] = useState<{
    displayName: string
    email: string
    photoURL: string
  } | null>(null)

 

  const handleNavigate = () => {
    router.push("/")
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

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    setUser(null)
    setMenuOpen(false)
  }

  const handleLogin = () => {
    // Mock login - replace with real authentication
    setUser({
      displayName: "Imtiaz Ahmad Tanvir",
      email: "imtiaztanvir@example.com",
      photoURL: "/images/about/imtiazprofile.png",
    })
  }

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
    <header
      className={`sticky top-0 left-0 z-[99999] shadow-md w-full py-5 transition-all duration-300 ${
        navbar ? "bg-trasnparent backdrop-blur-lg text-gray" : "bg-white text-gray-800"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center">
        <nav className="relative container flex justify-between items-center">
          {/* Logo */}
          <div className="w-[50%] lg:w-[20%]">
            <div onClick={handleNavigate} className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
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

              {/* Mobile auth section */}
              <div className="bg-gray-200 rounded-md py-3 px-4">
                <div className="flex flex-col gap-4">
                  <Link href="/favorites" className="text-xl font-semibold">
                    Favorites
                  </Link>
                  {user ? (
                    <div className="w-full">
                      <div
                        onClick={handleMenu}
                        className="w-full flex justify-center focus:outline-none cursor-pointer relative"
                      >
                        <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                          <Image
                            src={user.photoURL || "/placeholder.svg"}
                            className="object-cover w-full h-full"
                            alt={user.displayName}
                            width={40}
                            height={40}
                          />
                        </div>
                      </div>
                      {menuOpen && (
                        <div className="mt-4 flex flex-col justify-center bg-white rounded-md px-4 py-3 space-y-3 shadow-lg">
                          <p className="uppercase font-semibold">{user.displayName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <Button onClick={handleLogout} variant="outline" className="w-full">
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">

                      <Link href="/sign-in">
                        <Button className="w-full bg-green-600 hover:bg-green-700">Sign in</Button>
                      </Link>
                    </div>
                  )}
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
              {user && <NavButton href="/dashboard">Dashboard</NavButton>}
            </div>
          </div>

          {/* Desktop auth section */}
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

              {/* User Profile or Auth Buttons */}
              {user ? (
                <div className="relative group">
                  <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full cursor-pointer">
                    <Image
                      src={user.photoURL || "/placeholder.svg"}
                      className="object-cover w-full h-full"
                      alt={user.displayName}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-md px-4 py-3 right-0 top-12 z-50 space-y-2 shadow-lg border min-w-[200px]">
                    <p className="uppercase font-semibold text-gray-800">{user.displayName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button onClick={handleLogin} variant="outline">
                    Login
                  </Button>
                  <Link href="/register">
                    <Button className="bg-green-600 hover:bg-green-700">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar























// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { X, Menu, ShoppingCart, Heart } from "lucide-react"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(true)
//   const [navbar, setNavbar] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const router = useRouter()
//   const pathname = usePathname()

//   // Mock user state - replace with real authentication later
//   const [user, setUser] = useState<{
//     displayName: string
//     email: string
//     photoURL: string
//   } | null>(null)

 

//   const handleNavigate = () => {
//     router.push("/")
//   }

//   // Background color change on scroll
//   useEffect(() => {
//     const changeBackground = () => {
//       if (window.scrollY >= 32) {
//         setNavbar(true)
//       } else {
//         setNavbar(false)
//       }
//     }

//     window.addEventListener("scroll", changeBackground)
//     return () => window.removeEventListener("scroll", changeBackground)
//   }, [])

//   const handleMenu = () => {
//     setMenuOpen(!menuOpen)
//   }

//   const handleLogout = () => {
//     setUser(null)
//     setMenuOpen(false)
//   }

//   const handleLogin = () => {
//     // Mock login - replace with real authentication
//     setUser({
//       displayName: "Imtiaz Ahmad Tanvir",
//       email: "imtiaztanvir@example.com",
//       photoURL: "/images/about/imtiazprofile.png",
//     })
//   }

//   const isActiveLink = (href: string) => {
//     return pathname === href
//   }

//   const NavButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
//     <Link href={href}>
//       <Button
//         variant="ghost"
//         className={`text-base font-medium hover:text-green-600 transition-colors ${
//           isActiveLink(href) ? "text-green-600 bg-green-50" : "text-gray-700"
//         }`}
//       >
//         {children}
//       </Button>
//     </Link>
//   )

//   return (
//     <header
//       className={`sticky top-0 left-0 z-[99999] shadow-md w-full py-5 transition-all duration-300 ${
//         navbar ? "bg-trasnparent backdrop-blur-lg text-gray" : "bg-white text-gray-800"
//       }`}
//     >
//       <div className="container mx-auto px-6 flex items-center">
//         <nav className="relative container flex justify-between items-center">
//           {/* Logo */}
//           <div className="w-[50%] lg:w-[20%]">
//             <div onClick={handleNavigate} className="flex items-center cursor-pointer">
//               <Image
//                 src="/logo.png"
//                 alt="Fresh Harvest Logo"
//                 width={150}
//                 height={50}
//                 className="w-full h-auto"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               type="button"
//               className="absolute right-[2px] top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-green-600 focus:ring-2 lg:hidden"
//             >
//               {!isOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
//             </button>
//           </div>

//           {/* Mobile menu */}
//           <div
//             className={`${
//               isOpen ? "-right-full" : "right-0"
//             } w-2/3 h-screen p-4 fixed top-[70px] md:top-[100px] z-[999999] bg-gray-100 shadow-md flex flex-col space-y-4 transition-all duration-300 ease-in-out`}
//           >
//             <div className="flex flex-col lg:hidden space-y-4">
//               <Link href="/">
//                 <Button variant={isActiveLink("/") ? "default" : "ghost"} className="w-full justify-start text-left">
//                   Home
//                 </Button>
//               </Link>
//               <Link href="/shop">
//                 <Button
//                   variant={isActiveLink("/shop") ? "default" : "ghost"}
//                   className="w-full justify-start text-left"
//                 >
//                   Shop
//                 </Button>
//               </Link>
//               <Link href="/about-us">
//                 <Button
//                   variant={isActiveLink("/about-us") ? "default" : "ghost"}
//                   className="w-full justify-start text-left"
//                 >
//                   About Us
//                 </Button>
//               </Link>
//               <Link href="/blogs">
//                 <Button
//                   variant={isActiveLink("/blogs") ? "default" : "ghost"}
//                   className="w-full justify-start text-left"
//                 >
//                   Blogs
//                 </Button>
//               </Link>

//               {/* Mobile auth section */}
//               <div className="bg-gray-200 rounded-md py-3 px-4">
//                 <div className="flex flex-col gap-4">
//                   <Link href="/favorites" className="text-xl font-semibold">
//                     Favorites
//                   </Link>
//                   {user ? (
//                     <div className="w-full">
//                       <div
//                         onClick={handleMenu}
//                         className="w-full flex justify-center focus:outline-none cursor-pointer relative"
//                       >
//                         <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
//                           <Image
//                             src={user.photoURL || "/placeholder.svg"}
//                             className="object-cover w-full h-full"
//                             alt={user.displayName}
//                             width={40}
//                             height={40}
//                           />
//                         </div>
//                       </div>
//                       {menuOpen && (
//                         <div className="mt-4 flex flex-col justify-center bg-white rounded-md px-4 py-3 space-y-3 shadow-lg">
//                           <p className="uppercase font-semibold">{user.displayName}</p>
//                           <p className="text-sm text-gray-600">{user.email}</p>
//                           <Button onClick={handleLogout} variant="outline" className="w-full">
//                             Logout
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="space-y-2">

//                       <Link href="/sign-in">
//                         <Button className="w-full bg-green-600 hover:bg-green-700">Sign in</Button>
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Desktop menu */}
//           <div className="w-[50%] lg:flex lg:justify-center lg:items-center items-center hidden">
//             <div className="flex items-center space-x-2">
//               <NavButton href="/">Home</NavButton>
//               <NavButton href="/shop">Shop</NavButton>
//               <NavButton href="/about-us">About Us</NavButton>
//               <NavButton href="/blogs">Blogs</NavButton>
//               {user && <NavButton href="/dashboard">Dashboard</NavButton>}
//             </div>
//           </div>

//           {/* Desktop auth section */}
//           <div className="w-[30%] lg:flex lg:justify-end hidden">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-4">
//                 {/* Favorites */}
//                 <Link href="/favorites" className="flex items-center gap-2 hover:text-green-600 transition-colors">
//                   <Heart className="w-5 h-5" />
//                   <span className="text-base font-semibold">Favorites</span>
//                 </Link>

//                 {/* Shopping Cart */}
//                 <Link href="/cart" className="flex items-center gap-2 hover:text-green-600 transition-colors">
//                   <div className="relative">
//                     <ShoppingCart className="w-6 h-6" />
//                     <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex justify-center items-center">
//                       3
//                     </div>
//                   </div>
//                   <span className="text-base font-semibold">Cart</span>
//                 </Link>
//               </div>

//               {/* User Profile or Auth Buttons */}
//               {user ? (
//                 <div className="relative group">
//                   <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full cursor-pointer">
//                     <Image
//                       src={user.photoURL || "/placeholder.svg"}
//                       className="object-cover w-full h-full"
//                       alt={user.displayName}
//                       width={40}
//                       height={40}
//                     />
//                   </div>
//                   <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-md px-4 py-3 right-0 top-12 z-50 space-y-2 shadow-lg border min-w-[200px]">
//                     <p className="uppercase font-semibold text-gray-800">{user.displayName}</p>
//                     <p className="text-sm text-gray-600">{user.email}</p>
//                     <Button onClick={handleLogout} variant="outline" className="w-full">
//                       Logout
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Button onClick={handleLogin} variant="outline">
//                     Login
//                   </Button>
//                   <Link href="/register">
//                     <Button className="bg-green-600 hover:bg-green-700">Register</Button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Navbar






