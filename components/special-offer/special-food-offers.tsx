"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const getInitialTimeLeft = (): TimeLeft => ({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getInitialTimeLeft)

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date()
      const target = new Date()
      target.setDate(now.getDate() + 2) // 48 hours from now
      target.setHours(0, 0, 0, 0)

      const difference = target.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return getInitialTimeLeft()
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="mt-10 lg:mt-24"
      style={{
        backgroundImage: "url('/images/specialOffer/specialfood01.jpg?height=600&width=1200')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 py-10 lg:py-[120px]">
        <button className="text-primary bg-primary/10 font-medium py-1 px-2 rounded">Special Offer</button>

        <h2 className="font-medium text-[#212337] text-[60px] lg:text-[80px] leading-none">Seasonal Fruit Bundle</h2>

        <h2 className="font-medium text-[30px] lg:text-[48px]">
          Discount up to <span className="text-[#FF6A1A]">80% OFF</span>
        </h2>

        <div className="flex gap-5 mt-5">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="w-[70px] lg:w-[98px] h-[100px] lg:h-[122px] bg-white text-center flex flex-col justify-center items-center rounded-lg shadow-md"
            >
              <span className="text-[25px] lg:text-[40px] font-bold">{(timeLeft as any)[unit]}</span>
              <span className="text-[14px] lg:text-[18px]">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#176D38] w-[301px] mt-10 rounded-[92px] text-center">
          <p className="text-[32px] py-3 text-white">
            CODE : <span className="text-[#FAC714]">FRUIT28</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer
