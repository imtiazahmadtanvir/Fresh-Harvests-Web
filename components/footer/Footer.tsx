import Link from "next/link"
import { Phone, Mail, MapPin, Apple, Smartphone } from "lucide-react"
import React from "react"
import Image from "next/image"

// Types for better type safety
interface FooterLink {
  label: string
  href: string
}

interface ContactInfo {
  phone: string
  email: string
  address: string
}

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

// Constants moved outside component for better performance
const QUICK_LINKS_1: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About us", href: "/about-us" },
  { label: "Blog", href: "/blogs" },
  { label: "Detail Blog", href: "/blogs" },
]

const QUICK_LINKS_2: FooterLink[] = [
  { label: "Favorites", href: "/" },
  { label: "Cart", href: "/cart" },
  { label: "Sign in", href: "/sign-in" },
  { label: "Register", href: "/register" },
]

const CONTACT_INFO: ContactInfo = {
  phone: "1234 5678 90",
  email: "Freshharvests@gmail.com",
  address: "Tanjung Sari Street, Pontianak, Indonesia",
}

// Memoized components for better performance
const Logo = React.memo(() => (
  <div className="flex items-center">
    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
      <div className="grid grid-cols-2 gap-0.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
        ))}
      </div>
    </div>
    <span className="text-xl font-bold text-gray-800">Fresh Harvests</span>
  </div>
))
Logo.displayName = "Logo"

const AppDownloadButton = React.memo(
  ({ icon, title, subtitle, href }: { icon: React.ReactNode; title: string; subtitle: string; href: string }) => (
    <Link
      href={href}
      className="inline-flex items-center bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
    >
      {icon}
      <div className="text-left ml-2">
        <div className="text-xs">{title}</div>
        <div className="text-sm font-semibold">{subtitle}</div>
      </div>
    </Link>
  ),
)
AppDownloadButton.displayName = "AppDownloadButton"

const SocialIcon = React.memo(({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link
    href={href}
    className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
    aria-label={label}
  >
    {icon}
  </Link>
))
SocialIcon.displayName = "SocialIcon"

const Footer: React.FC = () => {
  const socialIcons: SocialLink[] = [
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-gray-100 py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Logo */}
          <div className="mb-6">
                <Image
                  src="/logo.png?height=50&width=150"
                  alt="Fresh Harvest Logo"
                  width={180}
                  height={50}
                  className="h-auto"
                  priority
                />          
          </div>

          {/* Three Column Layout for Mobile */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Quick Links 1 */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Quick links 1</h3>
              <ul className="space-y-2">
                {QUICK_LINKS_1.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-gray-600 hover:text-green-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Quick links 2</h3>
              <ul className="space-y-2">
                {QUICK_LINKS_2.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-gray-600 hover:text-green-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Contact us</h3>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-600">
                  <Phone className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                  <span>{CONTACT_INFO.phone}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Mail className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                  <span className="break-all">{CONTACT_INFO.email}</span>
                </div>
                <div className="flex items-start text-xs text-gray-600">
                  <MapPin className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 mt-0.5" />
                  <span>{CONTACT_INFO.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Accepted Payment Methods:</h3>
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-2 rounded border shadow-sm">
                <span className="font-bold text-sm text-blue-600">VISA</span>
              </div>
              <div className="bg-white px-3 py-2 rounded border shadow-sm">
                <span className="font-bold text-sm text-blue-600">PayPal</span>
              </div>
              <div className="bg-white px-3 py-2 rounded border shadow-sm">
                <span className="font-bold text-sm text-gray-800">Apple Pay</span>
              </div>
            </div>
          </div>

          {/* Download App */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Download App:</h3>
            <div className="flex flex-col gap-2">
              <AppDownloadButton
                icon={<Apple className="w-5 h-5" />}
                title="Download on the"
                subtitle="App Store"
                href="#"
              />
              <AppDownloadButton
                icon={<Smartphone className="w-5 h-5" />}
                title="Get it on"
                subtitle="Google Play"
                href="#"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-6">
            {socialIcons.map((social) => (
              <SocialIcon key={social.name} href={social.href} icon={social.icon} label={social.name} />
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-gray-600">© Copyright 2024, All Rights Reserved by Banana Studio</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and App Download Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6 lg:mb-8">
                <Image
                  src="/logo.png?height=60&width=180"
                  alt="Fresh Harvest Logo"
                  width={180}
                  height={60}
                  className="h-auto"
                  priority
                />
              </div>

              {/* Download App Section - Desktop */}
              <div className="mt-auto">
                <p className="text-gray-700 font-medium mb-4">Download App:</p>
                <div className="flex flex-col gap-3">
                  <AppDownloadButton
                    icon={<Apple className="w-6 h-6" />}
                    title="Download on the"
                    subtitle="App Store"
                    href="#"
                  />
                  <AppDownloadButton
                    icon={<Smartphone className="w-6 h-6" />}
                    title="Get it on"
                    subtitle="Google Play"
                    href="#"
                  />
                </div>
              </div>
            </div>

            {/* Quick Links 1 */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links 1</h3>
              <ul className="space-y-3">
                {QUICK_LINKS_1.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links 2</h3>
              <ul className="space-y-3">
                {QUICK_LINKS_2.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Phone:</span> {CONTACT_INFO.phone}
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    <Link href={`mailto:${CONTACT_INFO.email}`} className="hover:text-green-600 transition-colors">
                      {CONTACT_INFO.email}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start text-gray-600">
                  <MapPin className="w-4 h-4 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Address:</span> {CONTACT_INFO.address}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-800 mb-3">Accepted Payment Methods:</p>
                <div className="flex items-center gap-3">
                  <div className="bg-white px-3 py-2 rounded border shadow-sm">
                    <span className="font-bold text-sm text-blue-600">VISA</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded border shadow-sm">
                    <span className="font-bold text-sm text-blue-600">PayPal</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded border shadow-sm">
                    <span className="font-bold text-sm text-gray-800">Apple Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-gray-300">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-gray-600 text-sm text-center lg:text-left">
                © Copyright 2024, All Rights Reserved by Banana Studio
              </div>

              <div className="flex items-center gap-4">
                {socialIcons.map((social) => (
                  <SocialIcon key={social.name} href={social.href} icon={social.icon} label={social.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
