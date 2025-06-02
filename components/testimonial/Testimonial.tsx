"use client"


import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import SectionHeading from "@/components/shared/SectionHeading"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

interface Review {
  name: string
  image: string
  reviewText: string
  designation: string
}

const Testimonial: React.FC = () => {
  const reviews: Review[] = [
   
  {
    name: "David Kim",
    image: "https://i.ibb.co/ZYW3VTp/fresh-produce-2.jpg",
    reviewText:
      "Top-tier customer service and high-quality fruits! Every item looked handpicked and packed with care. As a chef, I value freshness and taste, and this service delivers both. A reliable and consistent provider of premium produce.",
    designation: "Professional Chef",
  },
  {
    name: "Lina Chen",
    image: "https://i.ibb.co/ypkgK0X/fresh-produce-3.jpg",
    reviewText:
      "This service has completely changed the way I shop for fruits and veggies. Convenient, trustworthy, and always fresh — it fits perfectly into my busy lifestyle. I especially love their seasonal picks and surprise items. Highly recommended!",
    designation: "Fitness Trainer",
  },
{
  name: "Priya Nair",
  image: "https://i.ibb.co.com/TcdKqK4/Rectangle-3.png",
  reviewText:
    "As someone who values clean eating, I’m really impressed with the consistency and care in every delivery. The range of seasonal produce keeps things exciting, and the taste speaks for itself. Highly dependable and worth every penny.",
  designation: "Wellness Coach",
}

 
  ]

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="flex justify-center items-center">
        <div className="hidden md:block">
          <Image
            className="object-contain"
            src="/images/leaf/leafLeft.png"
            alt="decorative leaf"
            width={100}
            height={100}
          />
        </div>
         <div className="text-center">
        <button className="text-primary text-xl text-[#749B3F] bg-primary/10 font-bold py-1 px-2 rounded w-500 font-Rubik">Testimonial</button>

        <SectionHeading
          subheading=""
          heading="What Our Customers Say"
          paragraph="Don't just take our word for it—here's what some of our customers have to say about their experience with Fresh Harvest"
        />
         </div>
       
        <div className="hidden md:block">
          <Image
            className="object-contain mt-20"
            src="/images/leaf/leafLeft.png"
            alt="decorative leaf"
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <Swiper loop={true} pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="pb-24 flex flex-col justify-center sm:flex-row mx-auto items-center gap-14">
                {/* Image Section */}
                <div className="relative z-10 w-[287px] h-[396px] rounded-[200px] overflow-hidden">
                  <div className="w-full h-full relative">
                    <Image
                      src={review.image || "/placeholder.svg"}
                      alt={`${review.name} testimonial`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 287px"
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div className="bg-[#F4F6F6] max-w-[643px] p-6 rounded-lg text-center sm:text-left">
                  <p className="mb-4 text-[#4A4A52]">{review.reviewText}</p>
                  <div className="flex text-[18px] justify-center sm:justify-start items-center gap-2">
                    <p className="font-bold text-lg">{review.name}</p>
                    <span className="text-[#212337] text-sm">--{review.designation}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonial
