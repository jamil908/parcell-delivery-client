
import { Link } from 'react-router-dom';
import { Package, Target, Eye, Users, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';


const About = () => {
  return (
   <div className="min-h-screen bg-white">
      {/* Navbar */}
    <Navbar></Navbar>

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white hover:text-blue-100 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-5xl font-bold mb-4">About ParcelPro</h1>
          <p className="text-xl text-blue-100">
            Your trusted partner in parcel delivery services
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              ParcelPro is a modern parcel delivery management system designed to streamline 
              the entire delivery process from sender to receiver. Our mission is to provide 
              fast, reliable, and transparent delivery services across Bangladesh.
            </p>
            
            <p className="text-gray-600 mb-6">
              Founded in 2025, we've quickly grown to become one of the most trusted names 
              in the logistics industry. With our advanced tracking system, automated 
              notifications, and user-friendly interface, we make parcel delivery simple 
              and stress-free for everyone involved.
            </p>

            <p className="text-gray-600 mb-12">
              Whether you're a business sending multiple parcels daily or an individual 
              sending occasional packages, ParcelPro provides the tools and reliability 
              you need to ensure your parcels arrive safely and on time.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To revolutionize the parcel delivery industry by providing innovative, 
                reliable, and customer-centric solutions that exceed expectations and 
                build lasting relationships.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the leading parcel delivery service in Bangladesh, known for 
                our commitment to excellence, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Same-Day Delivery</h4>
                  <p className="text-gray-600">
                    Need it fast? Our same-day delivery ensures your parcel reaches its destination within hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Express Delivery</h4>
                  <p className="text-gray-600">
                    Our express service guarantees next-day delivery for urgent shipments.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Real-Time Tracking</h4>
                  <p className="text-gray-600">
                    Track your parcel every step of the way with live GPS tracking and updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Secure Handling</h4>
                  <p className="text-gray-600">
                    Your parcels are protected with comprehensive insurance and careful handling.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Nationwide Coverage</h4>
                  <p className="text-gray-600">
                    We deliver to all major cities and districts across Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600">
                    Our customer support team is always available to assist you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Send Your First Parcel?</h3>
            <p className="mb-6">Join thousands of satisfied customers today</p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 ParcelPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default About