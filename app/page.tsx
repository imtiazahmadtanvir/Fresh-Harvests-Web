import Header from "@/components/navbar/Navbar"
import ProductCategories from "@/components/product-category/ProductCategories"
import AboutSection from "@/components/about/AboutSection"
import BlogSection from "@/components/blog/BlogSection"
import Footer from "@/components/footer/Footer"
import Banner from "@/components/banner/banner"
import Testimonial from "@/components/testimonial/Testimonial"
import FloatingChatbot from "@/components/chatbot/floating-chatbot"
import SeasonalFruitBanner from "@/components/special-offer/special-food-offers"
import Navbar from "@/components/navbar/Navbar"

export default function HomePage() {
  return (
    <div className="overflow-x-hidden min-h-screen">
     
<div className="sticky top-0 z-50 bg-white shadow">
  <Navbar></Navbar>
  </div>     
      <main className="relative top-0">
        <Banner/>
        <ProductCategories />
        <AboutSection />
        <SeasonalFruitBanner />
        <Testimonial/>
        <BlogSection />
        <FloatingChatbot/>
      </main>
      <Footer />
    </div>
  )
}
