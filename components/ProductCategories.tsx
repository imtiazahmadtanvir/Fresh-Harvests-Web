"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import LoadingSpinner from "@/components/shared/loading-spinner"
import SectionHeading from "@/components/shared/SectionHeading"

interface Product {
  id: string
  productName: string
  price: number
  images: string[]
  categoryId: string
  description: string
}

interface Category {
  id: string
  categoryName: string
}

export default function FreshProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch products
        const productResponse = await fetch("https://code-commando.com/api/v1/products")
        const productData = await productResponse.json()

        if (productData.success) {
          setProducts(productData.data)
          setFilteredProducts(productData.data)
        } else {
          throw new Error("Failed to fetch products")
        }

        // Fetch categories
        const categoryResponse = await fetch("https://code-commando.com/api/v1/category")
        const categoryData = await categoryResponse.json()

        if (categoryData.success) {
          setCategories(categoryData.data)
        } else {
          throw new Error("Failed to fetch categories")
        }
      } catch (err) {
        setError("Failed to load products or categories")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductsAndCategories()
  }, [])

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)

    if (category === "All") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.categoryId === category))
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">Error: {error}</p>
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 mt-10">
      {/* Render category filter buttons */}
      <div className="mb-6 text-center">
        <SectionHeading
          subheading="Our Products"
          heading="Our Fresh Products"
          paragraph="We pride ourselves on providing a wide variety of fresh and flavourful, fruits, vegetables and ingredients"
        />
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["All", ...categories.map((cat) => cat.id)].map((categoryId, index) => {
            const categoryName =
              categoryId === "All" ? "All" : categories.find((cat) => cat.id === categoryId)?.categoryName
            return (
              <button
                key={index}
                onClick={() => handleCategoryFilter(categoryId)}
                className={`px-5 py-3 font-semibold rounded-lg border transition-colors ${
                  selectedCategory === categoryId
                    ? "bg-green-600 text-white border-green-600"
                    : "text-gray-500 border-gray-300 hover:border-green-600 hover:text-green-600"
                }`}
              >
                {categoryName}
              </button>
            )
          })}
        </div>
      </div>

      {/* Render products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 8).map((product) => (
            <Link href={`/product-details/${product.id}`} key={product.id} className="group">
              <div className="border p-4 rounded-lg shadow-md flex flex-col items-center h-full transition-all hover:shadow-lg">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=200&width=200"}
                    alt={product.productName}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold mt-2 text-center group-hover:text-green-600 transition-colors">
                  {product.productName}
                </h3>
                <p className="text-center font-bold text-green-600 mt-1">${product.price}</p>
                <button className="w-full border-gray-300 text-gray-800 border-2 p-2 mt-4 rounded-lg bg-white hover:text-white hover:bg-orange-500 hover:border-orange-500 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center py-8 text-gray-500">No products available</p>
        )}
      </div>
      <div className="flex justify-center mt-10">
        <button className="border border-orange-500 text-orange-500 font-bold bg-transparent px-5 py-3 text-center rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300">
          See all Products
        </button>
      </div>
    </div>
  )
}
