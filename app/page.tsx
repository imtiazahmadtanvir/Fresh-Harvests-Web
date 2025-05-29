import Header from "@/components/Navbar"
import ProductCategories from "@/components/ProductCategories"
import AboutSection from "@/components/AboutSection"
import BlogSection from "@/components/BlogSection"
import Footer from "@/components/Footer"
import Banner from "@/components/banner"
import Testimonial from "@/components/Testimonial"
import FloatingChatbot from "@/components/chatbot/floating-chatbot"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Banner/>
        <ProductCategories />
        <AboutSection />
        <Testimonial/>
        <BlogSection />
        <FloatingChatbot/>
      </main>
      <Footer />
    </div>
  )
}
