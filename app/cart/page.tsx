"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, CreditCard, Truck, Shield, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/footer/Footer"
import Navbar from "@/components/navbar/Navbar"
import { useCart } from "@/components/CartProvider/cart-context"
import { CartItem } from "@/components/CartProvider/cart-item"


export default function CartPage() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const discount = isPromoApplied ? subtotal * 0.1 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal + shipping - discount + tax

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "fresh10") {
      setIsPromoApplied(true)
    }
  }

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Proceeding to checkout...")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/shop">
              <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>

            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Continue Shopping */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-4">Want to add more items?</p>
                <Link href="/shop">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={isPromoApplied}
                  />
                  <Button onClick={handleApplyPromo} disabled={isPromoApplied || !promoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                {isPromoApplied && (
                  <Badge className="bg-green-100 text-green-800">
                    <Gift className="w-3 h-3 mr-1" />
                    FRESH10 applied - 10% off!
                  </Badge>
                )}
                <p className="text-xs text-gray-500">Try code: FRESH10 for 10% off</p>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (FRESH10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-gray-500">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
                )}
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button onClick={handleCheckout} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Button>

            {/* Features */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Free delivery on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% quality guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
