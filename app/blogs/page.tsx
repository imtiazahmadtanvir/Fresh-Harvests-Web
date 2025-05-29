"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import { BlogCard } from "@/components/blog/blogcard"
import BlogsSection from "@/components/blog/BlogSection"


const blogPosts = [
  {
    id: "1",
    title: "10 Benefits of Eating Organic Vegetables Daily",
    excerpt:
      "Discover how incorporating organic vegetables into your daily diet can transform your health and well-being. From improved nutrition to better taste, learn why organic is worth the investment.",
    image: "/com.jpg?height=400&width=600",
    author: "Dr. Sarah Wilson",
    date: "March 15, 2024",
    category: "Health",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "2",
    title: "Seasonal Eating: Spring Produce Guide",
    excerpt:
      "Make the most of spring's bounty with our comprehensive guide to seasonal fruits and vegetables. Learn what's in season and how to prepare them.",
    image: "/s.avif?height=250&width=400",
    author: "Chef Maria Rodriguez",
    date: "March 12, 2024",
    category: "Seasonal",
    readTime: "7 min",
  },
  {
    id: "3",
    title: "How to Store Fresh Produce for Maximum Freshness",
    excerpt: "Expert tips and tricks to keep your fruits and vegetables fresh longer, reducing waste and saving money.",
    image: "/l.jpeg?height=250&width=400",
    author: "Mike Chen",
    date: "March 10, 2024",
    category: "Tips",
    readTime: "4 min",
  },
  {
    id: "4",
    title: "The Journey from Farm to Table",
    excerpt:
      "Follow the path of your favorite vegetables from our partner farms to your dinner table. Transparency in our supply chain.",
    image: "/c2.jpeg?height=250&width=400",
    author: "David Thompson",
    date: "March 8, 2024",
    category: "Sustainability",
    readTime: "6 min",
  },
  {
    id: "5",
    title: "Quick and Healthy Smoothie Recipes",
    excerpt:
      "Energize your mornings with these nutritious smoothie recipes using fresh fruits and vegetables from our selection.",
    image: "/tr.jpeg?height=250&width=400",
    author: "Emily Rodriguez",
    date: "March 5, 2024",
    category: "Recipes",
    readTime: "3 min",
  },
  {
    id: "6",
    title: "Supporting Local Farmers: Why It Matters",
    excerpt:
      "Learn about the importance of supporting local agriculture and how your purchases make a difference in farming communities.",
    image: "/com.jpg?height=250&width=400",
    author: "Sarah Johnson",
    date: "March 3, 2024",
    category: "Community",
    readTime: "5 min",
  },
]

const categories = ["All", "Health", "Recipes", "Seasonal", "Tips", "Sustainability", "Community"]

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPost = filteredPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="overflow-x-hidden bg-gray-50 relatable">
      <Navbar />

      <div className="px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fresh Harvest Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover tips, recipes, and insights about fresh produce, healthy eating, and sustainable farming practices.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <BlogCard post={featuredPost} featured={true} />
          </div>
        )}

        {/* Regular Posts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        )}

        <div>
          <BlogsSection />
        </div>

        {/* Newsletter Signup */}
        <div className="bg-green-600 text-white rounded-lg p-8 text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-green-100 mb-6">
            Subscribe to our newsletter for the latest articles, recipes, and farming tips.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input placeholder="Enter your email" className="bg-white text-gray-900" />
            <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
