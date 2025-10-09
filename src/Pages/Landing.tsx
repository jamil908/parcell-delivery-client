import React from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Package, Truck, Clock, Shield, Users, TrendingUp, LogOut } from 'lucide-react';
import { useGetMeQuery } from '@/redux/api/userApi';
import { useLogoutMutation } from '@/redux/api/authApi';
import { logout as logoutAction } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import toast from 'react-hot-toast';

const Landing = () => {
  const {data}=useGetMeQuery(undefined)
  const navigate=useNavigate()
  const name = data?.user?.name
  const dispatch = useAppDispatch();
  console.log(name,"inside landing")
  const [logoutMutaion]=useLogoutMutation()
    const handleLogout = async () => {
    try {
      await logoutMutaion().unwrap();
      dispatch(logoutAction());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      dispatch(logoutAction());
      navigate('/login');
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ParcelPro</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
              <Link to="/tracking" className="text-gray-700 hover:text-blue-600 transition">
                Track Parcel
              </Link>
             
              {
                data?.user?.role ==="sender" ? <>  <Link to="/sender-dashboard" className="text-gray-700 hover:text-blue-600 transition">
                sender dashboard
              </Link></> :''
                 
              }
              {
                data?.user?.role ==="receiver" ? <>  <Link to="/receiver-dashboard" className="text-gray-700 hover:text-blue-600 transition">
                receiver dashboard
              </Link></> :''
                 
              }
             {
              !name && <>
               <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link></>

              
             }
             {
              name ? <div>{name}
               <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
              </div>:""
             }
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Fast & Reliable Parcel Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Track your parcels in real-time with our advanced delivery system
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/tracking"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition text-lg border-2 border-white"
              >
                Track Your Parcel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ParcelPro?
            </h2>
            <p className="text-xl text-gray-600">
              We provide the best delivery experience for your parcels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Same-day and express delivery options available nationwide. Your parcels delivered on time, every time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-time Tracking
              </h3>
              <p className="text-gray-600">
                Track your parcel every step of the way with live updates and notifications.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Secure Handling
              </h3>
              <p className="text-gray-600">
                Your parcels are handled with utmost care and protected with comprehensive insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Package className="w-12 h-12" />
              </div>
              <h3 className="text-5xl font-bold mb-2">10K+</h3>
              <p className="text-xl text-blue-100">Parcels Delivered</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-5xl font-bold mb-2">5K+</h3>
              <p className="text-xl text-blue-100">Happy Customers</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-12 h-12" />
              </div>
              <h3 className="text-5xl font-bold mb-2">98%</h3>
              <p className="text-xl text-blue-100">On-Time Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust ParcelPro for their delivery needs
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold">ParcelPro</span>
              </div>
              <p className="text-gray-400">
                Fast, reliable, and secure parcel delivery service.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/tracking" className="text-gray-400 hover:text-white transition">
                    Track Parcel
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white transition">
                    Send Parcel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@parcelpro.com</li>
                <li>Phone: +880 1234-567890</li>
                <li>Address: Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ParcelPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing