import { Leaf, Users, Award, Heart, Truck, Shield } from "lucide-react"
import Navbar from "@/components/navbar/Navbar"
import AboutSectionEnhanced from "@/components/about/AboutSection"
import Footer from "@/components/footer/Footer"

const stats = [
  { icon: <Users className="w-6 h-6 text-green-600" />, number: "10,000+", label: "Happy Customers" },
  { icon: <Heart className="w-6 h-6 text-green-600" />, number: "500+", label: "Local Farmers" },
  { icon: <Leaf className="w-6 h-6 text-green-600" />, number: "50+", label: "Product Varieties" },
  { icon: <Award className="w-6 h-6 text-green-600" />, number: "5", label: "Years of Excellence" },
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

            {/* Mission Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-green-100 mb-8">
              To revolutionize the way people access fresh, healthy food by creating a sustainable ecosystem that
              benefits farmers, communities, and the environment.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <Truck className="w-12 h-12 mb-4 text-green-200" />
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-green-100 text-sm">Fresh produce delivered to your door within 24 hours</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 mb-4 text-green-200" />
                <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                <p className="text-green-100 text-sm">Hand-picked, inspected, and guaranteed fresh</p>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="w-12 h-12 mb-4 text-green-200" />
                <h3 className="text-lg font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-green-100 text-sm">Sustainable packaging and carbon-neutral delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSectionEnhanced />
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from selecting our farming partners to delivering products to
              your door.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Integrity</h3>
              <p className="text-gray-600 mt-2 text-sm">We stand by honesty, transparency, and fairness in all dealings.</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Care</h3>
              <p className="text-gray-600 mt-2 text-sm">We care deeply for our farmers, customers, and the planet.</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Excellence</h3>
              <p className="text-gray-600 mt-2 text-sm">Striving for the highest standards in quality and service.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                {stat.icon}
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.number}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}
