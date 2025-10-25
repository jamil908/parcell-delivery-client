
import { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle, Package, 
  MessageSquare, User, Truck, Navigation, Headphones, AlertCircle 
} from 'lucide-react';
import Navbar from '@/components/shared/Navbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trackingNumber: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Parcel delivery inquiry submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', trackingNumber: '', subject: '', message: '' });
    }, 3000);
  };

  return (

    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-12 h-12 text-orange-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Delivery Support</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help with your parcel delivery? Our support team is here 24/7 to assist you with tracking, delivery issues, or any questions.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center group">
            <Truck className="w-10 h-10 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-gray-900 mb-1">Track Your Parcel</h3>
            <p className="text-sm text-gray-600">Real-time tracking updates</p>
          </button>
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center group">
            <Navigation className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-gray-900 mb-1">Schedule Pickup</h3>
            <p className="text-sm text-gray-600">Book a pickup time</p>
          </button>
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center group">
            <Headphones className="w-10 h-10 text-green-600 mx-auto mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-600">Instant support available</p>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* 24/7 Hotline */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">24/7 Hotline</h3>
                  <p className="text-white/90 text-sm mb-2">
                    Call us anytime for urgent delivery support
                  </p>
                  <p className="font-bold text-xl">+880 1800-DELIVERY</p>
                  <p className="text-sm mt-1">+880 1234-567890</p>
                </div>
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Response within 2 hours
                  </p>
                  <p className="text-sm font-semibold text-gray-800">support@deliveryhub.com</p>
                  <p className="text-sm text-gray-600">tracking@deliveryhub.com</p>
                </div>
              </div>
            </div>

            {/* Main Office */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Main Office</h3>
                  <p className="text-gray-600 text-sm">
                    456 Delivery Hub Road<br />
                    Chattogram, Bangladesh<br />
                    Postal Code: 4100
                  </p>
                </div>
              </div>
            </div>

            {/* Service Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Service Hours</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex justify-between">
                      <span>Pickup & Delivery:</span>
                      <span className="font-semibold">24/7</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Office Hours:</span>
                      <span className="font-semibold">9 AM - 9 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Customer Support:</span>
                      <span className="font-semibold">24/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Emergency Contact</h3>
                  <p className="text-sm text-red-700">
                    For lost or damaged parcels, call our emergency line immediately: 
                    <span className="block font-bold text-lg mt-1">+880 1999-URGENT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received! 📦</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for contacting us. Our support team will respond within 1-2 hours.
                  </p>
                  <p className="text-sm text-gray-500">
                    Check your email for a confirmation message with your ticket number.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-7 h-7 text-orange-600" />
                    Submit Your Inquiry
                  </h2>

                  <div className="space-y-6">
                    {/* Name & Phone Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 text-orange-600" />
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 text-orange-600" />
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                          placeholder="+880 1XXX-XXXXXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Email & Tracking Number Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 text-orange-600" />
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      {/* Tracking Number */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Package className="w-4 h-4 text-orange-600" />
                          Tracking Number
                        </label>
                        <input
                          type="text"
                          name="trackingNumber"
                          value={formData.trackingNumber}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                          placeholder="DH123456789BD (optional)"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 text-orange-600" />
                        Issue Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        required
                      >
                        <option value="">Select issue type</option>
                        <option value="tracking">📍 Tracking Issue</option>
                        <option value="delayed">⏰ Delayed Delivery</option>
                        <option value="damaged">📦 Damaged Parcel</option>
                        <option value="lost">❌ Lost Parcel</option>
                        <option value="pickup">🚚 Schedule Pickup</option>
                        <option value="pricing">💰 Pricing Inquiry</option>
                        <option value="feedback">⭐ Feedback</option>
                        <option value="other">🔧 Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 text-orange-600" />
                        Describe Your Issue <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                        placeholder="Please provide as much detail as possible about your delivery issue..."
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Include tracking number, delivery address, and date if applicable
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-semibold text-lg shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Inquiry
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      💬 Need immediate help? Call our 24/7 hotline: <span className="font-bold">+880 1800-DELIVERY</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <Package className="w-7 h-7 text-orange-600" />
            Delivery FAQs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">How do I track my parcel?</h3>
              <p className="text-gray-600 text-sm">
                Enter your tracking number on our homepage or use our mobile app. You'll get real-time updates on your parcel's location and estimated delivery time.
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">What if my parcel is delayed?</h3>
              <p className="text-gray-600 text-sm">
                Delays can happen due to weather or high volume. Check tracking for updates or contact support. We'll prioritize your delivery and keep you informed.
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">My parcel arrived damaged. What now?</h3>
              <p className="text-gray-600 text-sm">
                Contact us immediately with photos of the damage. We'll process your claim within 24 hours and arrange compensation or redelivery.
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Can I reschedule my delivery?</h3>
              <p className="text-gray-600 text-sm">
                Yes! Contact us at least 2 hours before scheduled delivery. You can change the time, date, or even the delivery address through our app or customer service.
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">What are your delivery areas?</h3>
              <p className="text-gray-600 text-sm">
                We deliver nationwide across Bangladesh. Same-day delivery available in major cities. Check our coverage map for specific areas and timing.
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">How much does delivery cost?</h3>
              <p className="text-gray-600 text-sm">
                Pricing depends on weight, distance, and delivery speed. Standard delivery starts at ৳50. Use our calculator on the homepage for exact quotes.
              </p>
            </div>
          </div>
        </div>

        {/* Service Guarantee */}
        <div className="mt-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-xl p-8 text-white text-center">
          <Package className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Delivery Promise</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Safe, fast, and reliable delivery guaranteed. We handle your parcels with care and deliver on time, every time. 
            Your satisfaction is our priority! 🚚💨
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;