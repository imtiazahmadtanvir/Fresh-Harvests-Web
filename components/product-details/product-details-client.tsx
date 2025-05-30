"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Plus, Minus, ArrowLeft, Truck, Shield, RefreshCw, Check } from "lucide-react"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import { useCart } from "../CartProvider/cart-context"


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

interface ProductDetailsClientProps {
  productId: string
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading product details...</p>
    </div>
  </div>
)

export default function ProductDetailsClient({ productId }: ProductDetailsClientProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const { addToCart, isInCart } = useCart()
  const router = useRouter()

  // Mock data for demonstration
  const mockRating = 4.5
  const mockReviews = 128
  const mockInStock = true

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)

        // Fetch all products first
        const productResponse = await fetch("https://code-commando.com/api/v1/products")
        const productData = await productResponse.json()

        if (productData.success) {
          const currentProduct = productData.data.find((p: Product) => p.id === productId)
          if (currentProduct) {
            setProduct(currentProduct)

            // Get related products from same category
            const related = productData.data
              .filter((p: Product) => p.categoryId === currentProduct.categoryId && p.id !== productId)
              .slice(0, 4)
            setRelatedProducts(related)
          } else {
            setError("Product not found")
          }
        }

        // Fetch categories
        const categoryResponse = await fetch("https://code-commando.com/api/v1/category")
        const categoryData = await categoryResponse.json()

        if (categoryData.success) {
          setCategories(categoryData.data)
        }
      } catch (err) {
        setError("Failed to load product details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [productId])

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)

    // Create product object for cart
    const cartProduct = {
      id: product.id,
      name: product.productName,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
      category: getCategoryName(product.categoryId),
      inStock: mockInStock,
    }

    // Add to cart with selected quantity
    addToCart(cartProduct, quantity)

    // Show success state
    setJustAdded(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    setIsAddingToCart(false)

    // Reset success state after 3 seconds
    setTimeout(() => setJustAdded(false), 3000)
  }

  const handleAddRelatedToCart = async (relatedProduct: Product) => {
    const cartProduct = {
      id: relatedProduct.id,
      name: relatedProduct.productName,
      price: relatedProduct.price,
      image: relatedProduct.images[0] || "/placeholder.svg",
      category: getCategoryName(relatedProduct.categoryId),
      inStock: true,
    }

    addToCart(cartProduct, 1)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.categoryName || "Unknown"
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "The product you're looking for doesn't exist."}</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const inCartAlready = isInCart(product.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-green-600">
            Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.productName}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg?height=500&width=500"}
                alt={product.productName}
                fill
                className="object-contain p-8"
                priority
              />
              {!mockInStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
              {inCartAlready && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">In Cart</Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=80&width=80"}
                      alt={`${product.productName} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {getCategoryName(product.categoryId)}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.productName}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(mockRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {mockRating} ({mockReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <Badge className="bg-red-500">20% OFF</Badge>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {mockInStock ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || isAddingToCart}
                    className="px-3"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={isAddingToCart}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">kg</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={toggleFavorite}
                  className={`flex-1 ${isFavorite ? "text-red-500 border-red-500" : ""}`}
                  disabled={isAddingToCart}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Saved" : "Save as favorite"}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!mockInStock || isAddingToCart}
                  className={`flex-1 transition-all duration-300 ${
                    justAdded ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : justAdded ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {inCartAlready ? "Add More" : "Add to cart"}
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Actions */}
              {justAdded && (
                <div className="flex gap-2">
                  <Link href="/cart" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/shop" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Quality guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RefreshCw className="w-4 h-4 text-green-600" />
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                {product.description ||
                  "Experience the finest quality with our premium fresh produce. Each item is carefully selected to ensure maximum freshness and flavor."}
              </p>
              <p className="mb-4">
                Our commitment to excellence means you receive only the best products, sourced from trusted local
                farmers and suppliers. Every item undergoes rigorous quality checks to meet our high standards.
              </p>
              <p>
                Perfect for healthy meals, cooking, and snacking. Rich in essential nutrients and vitamins, this product
                supports a healthy lifestyle while delivering exceptional taste.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <CardContent className="p-4">
                    <Link href={`/product-details/${relatedProduct.id}`}>
                      <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg?height=200&width=200"}
                          alt={relatedProduct.productName}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                        {isInCart(relatedProduct.id) && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-orange-500 text-white text-xs">In Cart</Badge>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        {relatedProduct.productName}
                      </h3>
                      <p className="text-green-600 font-bold mb-3">${relatedProduct.price.toFixed(2)}</p>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => handleAddRelatedToCart(relatedProduct)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {isInCart(relatedProduct.id) ? "Add More" : "Add to cart"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
