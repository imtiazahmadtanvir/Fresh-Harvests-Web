import type React from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SectionHeading from "@/components/shared/SectionHeading"

interface Blog {
  id: number
  image: string
  date: string
  description: string
  slug?: string
}

const BlogsSection: React.FC = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      image: "/images/blogs/blog01.png",
      date: "May 23, 2024",
      description: "Exploring Seasonal Delights: A Guide to What's Fresh Right Now",
      slug: "exploring-seasonal-delights",
    },
    {
      id: 2,
      image: "/images/blogs/blog02.png",
      date: "May 23, 2024",
      description: "Mastering Salad Creations: Tips and Tricks for Building Delicious and Nutritious Salads",
      slug: "mastering-salad-creations",
    },
    {
      id: 3,
      image: "/images/blogs/blog03.png",
      date: "May 23, 2024",
      description: "The Art of Meal Prepping: How to Save Time and Eat Healthy Throughout the Week",
      slug: "art-of-meal-prepping",
    },
  ]

  return (
    <section className="container mx-auto px-6 bg-white py-10">
      <div className="flex justify-center items-center mb-12">
        <div className="text-center">
          <button className="text-primary text-xl text-[#749B3F] bg-primary/10 font-bold py-1 px-2 rounded w-500 font-Rubik">Our Blog</button>

          <SectionHeading
            subheading=""
            heading="Fresh Harvest Blog"
            paragraph="Welcome to the Fresh Harvest Blog, your go-to resource for all things related to fresh produce, healthy eating, and culinary inspiration."
          />
        </div>
        <div className="hidden lg:block ml-8">
          <Image
            className="object-contain"
            src="/images/leaf/leafRight.png"
            alt="decorative leaf"
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <article key={blog.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="object-cover object-center w-full h-64 lg:h-80 transition-transform duration-300 group-hover:scale-105"
                src={blog.image || "/placeholder.svg?height=320&width=400"}
                alt={blog.description}
                width={400}
                height={320}
              />
            </div>
            <div className="mt-4">
              <time className="text-gray-500 font-medium text-sm">{blog.date}</time>
              <h3 className="mt-2 text-lg font-medium text-gray-800 leading-relaxed group-hover:text-green-600 transition-colors duration-200">
                {blog.description}
              </h3>
              <Link
                href={`/blogs/${blog.slug || blog.id}`}
                className="inline-flex items-center gap-2 text-orange-500 font-semibold mt-3 hover:text-orange-600 transition-colors duration-200"
              >
                Read More
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogsSection
