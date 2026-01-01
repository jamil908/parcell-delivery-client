import { Link } from 'react-router-dom';
import { Package, Target, Eye, Users, ArrowLeft, Zap, Shield, Globe, TrendingUp, Award } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-zinc-400 hover:text-purple-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-6">
              <Package className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text uppercase tracking-wider">
                About Us
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Redefining <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Delivery</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in modern parcel delivery, powered by cutting-edge technology and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
              <p className="text-lg md:text-xl text-zinc-300 mb-6 leading-relaxed">
                ParcelPro is a modern parcel delivery management system designed to streamline 
                the entire delivery process from sender to receiver. Our mission is to provide 
                fast, reliable, and transparent delivery services across 150+ countries.
              </p>
              
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Founded in 2025, we've quickly grown to become one of the most trusted names 
                in the logistics industry. With our advanced AI-powered tracking system, automated 
                notifications, and intuitive interface, we make parcel delivery simple 
                and stress-free for everyone involved.
              </p>

              <p className="text-zinc-400 leading-relaxed">
                Whether you're a business sending multiple parcels daily or an individual 
                sending occasional packages, ParcelPro provides the tools and reliability 
                you need to ensure your parcels arrive safely and on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl hover:border-purple-500/50 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Our Mission</h3>
                <p className="text-zinc-400 leading-relaxed">
                  To revolutionize the parcel delivery industry by providing innovative, 
                  reliable, and customer-centric solutions powered by AI and automation that exceed expectations and 
                  build lasting relationships worldwide.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl hover:border-cyan-500/50 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Our Vision</h3>
                <p className="text-zinc-400 leading-relaxed">
                  To become the global leader in parcel delivery services, known for 
                  our commitment to excellence, technological innovation, and exceptional customer satisfaction across every touchpoint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-zinc-400 text-lg">Everything you need for seamless delivery</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Same-Day Delivery', desc: 'Lightning-fast delivery within hours to your destination.' },
              { icon: TrendingUp, title: 'Express Delivery', desc: 'Guaranteed next-day delivery for urgent shipments.' },
              { icon: Package, title: 'Real-Time Tracking', desc: 'GPS tracking with millisecond-precision updates.' },
              { icon: Shield, title: 'Secure Handling', desc: 'Comprehensive insurance and careful parcel protection.' },
              { icon: Globe, title: 'Worldwide Coverage', desc: 'Deliver to 150+ countries with local expertise.' },
              { icon: Users, title: '24/7 Support', desc: 'Round-the-clock customer support team ready to help.' },
            ].map((service, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1M+', label: 'Parcels Delivered' },
              { number: '150+', label: 'Countries Served' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '99.9%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Award className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses and individuals who trust ParcelPro for their delivery needs
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:-translate-y-1 hover:scale-105"
          >
            Start Shipping Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-600 text-sm">&copy; {new Date().getFullYear()} ParcelPro. All rights reserved. Powered by innovation.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;