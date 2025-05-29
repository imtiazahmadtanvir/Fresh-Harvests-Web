import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
  featured?: boolean
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`${featured ? "lg:flex" : ""}`}>
        <div className={`relative ${featured ? "lg:w-1/2" : ""}`}>
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={featured ? 600 : 400}
            height={featured ? 400 : 250}
            className={`w-full object-cover ${featured ? "h-64 lg:h-full" : "h-48"}`}
          />
          <Badge className="absolute top-4 left-4 bg-green-600 text-white">{post.category}</Badge>
        </div>

        <div className={`p-6 ${featured ? "lg:w-1/2 lg:flex lg:flex-col lg:justify-center" : ""}`}>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <span>{post.readTime} read</span>
          </div>

          <h2 className={`font-bold text-gray-900 mb-3 line-clamp-2 ${featured ? "text-2xl" : "text-xl"}`}>
            <Link href={`/blog/${post.id}`} className="hover:text-green-600 transition-colors">
              {post.title}
            </Link>
          </h2>

          <p className={`text-gray-600 mb-4 ${featured ? "text-lg" : ""}`}>{post.excerpt}</p>

          <Link href={`/blog/${post.id}`}>
            <Button variant="outline" className="group">
              Read More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
