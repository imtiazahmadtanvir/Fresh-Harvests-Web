"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Leaf } from "lucide-react"

interface ProductCard {
  name: string
  price: string
  originalPrice?: string
  image: string
  id: string
  rating?: number
  inStock?: boolean
}

interface AboutFeature {
  icon: React.ReactNode
  title: string
  description: string
}

const AboutSectionEnhanced: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  const featuredProduct: ProductCard = {
    name: "Mushroom",
    price: "$2.3/kg",
    originalPrice: "$3.0/kg",
    image: "/images/about/about02.png",
    id: "mushroom-001",
    rating: 4.8,
    inStock: true,
  }

  const features: AboutFeature[] = [
    {
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      title: "100% Organic",
      description: "Certified organic produce",
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "Premium Quality",
      description: "Hand-picked fresh items",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-blue-600" />,
      title: "Fast Delivery",
      description: "Same day delivery available",
    },
  ]

  return (
    <section className="container mx-auto px-6 mb-20">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-6">
        {/* Image Section with Enhanced Floating Product Card */}
        <div className="relative w-full lg:w-[50%] flex justify-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
                src="/images/about/about01.png"
                alt="Fresh Harvest team member with produce"
                width={600}
                height={600}
                priority
              />
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
            </div>

            {/* Enhanced Floating Product Card */}
            <Card
              className="absolute w-[40%] lg:w-[28%] bg-white shadow-xl top-[75%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CardContent className="p-3 space-y-2 text-center">
                {/* Stock Badge */}
                {featuredProduct.inStock && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                    In Stock
                  </Badge>
                )}

                <div className="bg-gray-100 rounded-lg p-2 relative overflow-hidden">
                  <Image
                    className={`w-full h-16 object-contain transition-transform duration-300 ${
                      isHovered ? "scale-110" : ""
                    }`}
                    src={featuredProduct.image || "/placeholder.svg?height=64&width=80"}
                    alt={featuredProduct.name}
                    width={80}
                    height={64}
                  />
                </div>

                <div>
                  <h4 className="font-medium text-sm lg:text-base">{featuredProduct.name}</h4>
                  {featuredProduct.rating && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{featuredProduct.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-600 font-bold text-sm">{featuredProduct.price}</span>
                  {featuredProduct.originalPrice && (
                    <span className="text-gray-400 line-through text-xs">{featuredProduct.originalPrice}</span>
                  )}
                </div>

                <Button
                  size="sm"
                  className="w-full text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 transform hover:scale-105"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="w-full lg:w-[50%] space-y-6 mt-20 md:mt-0">
          <Badge variant="secondary" className="text-green-600 bg-green-100 hover:bg-green-200 font-medium py-2 px-4">
            About Us
          </Badge>

          <h2 className="font-medium text-3xl md:text-4xl lg:text-5xl text-gray-800 leading-tight">
            About{" "}
            <span className="text-green-600 relative">
              Fresh Harvest
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-400 rounded-full transform scale-x-0 animate-scale-x"></div>
            </span>
          </h2>

          <p className="max-w-lg text-base text-gray-600 leading-relaxed">
            Welcome to Fresh Harvest, your premier destination for high-quality and fresh produce. We are passionate
            about providing you with the finest fruits, vegetables, and salad ingredients to nourish your body and
            delight your taste buds. With a commitment to excellence, sustainability, and customer satisfaction, Fresh
            Harvest is here to revolutionize your grocery shopping experience.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-gray-50">
                <div className="mb-2">{feature.icon}</div>
                <h4 className="font-semibold text-sm text-gray-800">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <Link href="/about-us">
            <Button
              variant="outline"
              className="text-orange-500 font-semibold border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-200 transform hover:scale-105"
            >
              Read More
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionEnhanced
