import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Banner: React.FC = () => {
  return (
    <section className="relative top-0 ">
      <div
        className="py-8 bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/images/banner/bannerBG.jpg')",
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
            {/* Banner Content */}
            <div className="w-full lg:w-[55%] space-y-6">
              {/* Welcome Badge */}
              <Button
                variant="secondary"
                className="font-Rubik font-bold text-{##749B3F} bg-{#749B3F1A} hover:bg-green-200 font-medium py-2 px-4 rounded-lg"
              >
                Welcome to Fresh Harvest
              </Button>

              {/* Main Heading */}
              <h1 className="font=Rubik font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-gray-800 font-90px ">
                Fresh Fruits and Vegetables
              </h1>

              {/* Description */}
              <p className="max-w-lg text-base md:text-lg text-gray-600 leading-relaxed">
                At Fresh Harvests, we are passionate about providing you with the freshest and most flavorful fruits and
                vegetables
              </p>

              {/* Shop Now Button */}
              <Link href="/shop">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors duration-300">
                  Shop Now
                </Button>
              </Link>

              {/* Special Offer Card */}
              <div className="bg-white/90 backdrop-blur-sm py-6 px-6 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-lg mt-8 lg:ml-16 lg:mr-8">
                <div className="space-y-3 flex-1">
                  <p className="text-green-600 font-medium">Special Offer</p>
                  <h4 className="text-xl font-bold text-gray-800">Fresh Salad</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">Up to</span>
                    <span className="border-2 border-red-400 text-red-500 font-bold px-3 py-1 rounded-full">70%</span>
                    <span className="font-semibold text-gray-700">off</span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold uppercase rounded-full py-2 px-6">
                    CODE: <span className="text-yellow-300">FRESH25</span>
                  </Button>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <Image
                    className="object-cover rounded-lg"
                    src="/images/banner/photo02.png"
                    alt="Fresh salad special offer"
                    width={120}
                    height={120}
                    priority
                  />
                </div>
              </div>

              {/* Download App Section */}
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">Download App:</p>
                <div className="flex gap-4">
                  <Link href="#" className="transition-transform hover:scale-105">
                    <Image
                      src="/images/banner/photo03.png"
                      alt="Download on App Store"
                      width={140}
                      height={42}
                      className="rounded-lg"
                    />
                  </Link>
                  <Link href="#" className="transition-transform hover:scale-105">
                    <Image
                      src="/images/banner/photo04.png"
                      alt="Get it on Google Play"
                      width={140}
                      height={42}
                      className="rounded-lg"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Banner Photo */}
            <div className="w-full lg:w-[45%] flex justify-center">
              <div className="relative">
                <Image
                  className="object-contain max-w-full h-auto"
                  src="/images/banner/photo01.png"
                  alt="Fresh fruits and vegetables display"
                  width={600}
                  height={600}
                  priority
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
