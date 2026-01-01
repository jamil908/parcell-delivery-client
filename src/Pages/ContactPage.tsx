import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle, Package, 
  MessageSquare, User, Headphones, AlertCircle, ArrowLeft
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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Contact inquiry submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', trackingNumber: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
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
              <Headphones className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text uppercase tracking-wider">
                24/7 Support
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Get in <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Need help with your parcel? Our support team is here 24/7 to assist you with tracking, delivery issues, or any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Contact Cards */}
            {[
              { icon: Phone, title: '24/7 Hotline', info: '+1-800-PARCEL', gradient: 'from-purple-500 to-pink-500' },
              { icon: Mail, title: 'Email Us', info: 'support@parcelpro.com', gradient: 'from-cyan-500 to-blue-500' },
              { icon: MapPin, title: 'Visit Us', info: 'Palo Alto, CA', gradient: 'from-blue-500 to-purple-500' },
              { icon: Clock, title: 'Office Hours', info: '24/7 Service', gradient: 'from-purple-600 to-cyan-600' }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-500 text-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm">{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-20 h-20 text-cyan-400 mx-auto mb-4 animate-bounce" />
                      <h3 className="text-3xl font-black text-white mb-2">Message Received!</h3>
                      <p className="text-zinc-400 mb-4">
                        Thank you for contacting us. Our support team will respond within 1-2 hours.
                      </p>
                      <p className="text-sm text-zinc-500">
                        Check your email for a confirmation message with your ticket number.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-2">
                        <MessageSquare className="w-8 h-8 text-purple-400" />
                        Send us a Message
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                              <User className="w-4 h-4 text-purple-400" />
                              Full Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-zinc-500"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                              <Mail className="w-4 h-4 text-purple-400" />
                              Email <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-zinc-500"
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>

                        {/* Phone & Tracking */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                              <Phone className="w-4 h-4 text-purple-400" />
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-zinc-500"
                              placeholder="+1 XXX-XXX-XXXX"
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                              <Package className="w-4 h-4 text-purple-400" />
                              Tracking Number
                            </label>
                            <input
                              type="text"
                              name="trackingNumber"
                              value={formData.trackingNumber}
                              onChange={handleChange}
                              className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-zinc-500"
                              placeholder="TRK123456 (optional)"
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                            <MessageSquare className="w-4 h-4 text-purple-400" />
                            Subject <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            required
                          >
                            <option value="">Select issue type</option>
                            <option value="tracking">📍 Tracking Issue</option>
                            <option value="delayed">⏰ Delayed Delivery</option>
                            <option value="damaged">📦 Damaged Parcel</option>
                            <option value="lost">❌ Lost Parcel</option>
                            <option value="pricing">💰 Pricing Inquiry</option>
                            <option value="feedback">⭐ Feedback</option>
                            <option value="other">🔧 Other</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-2">
                            <MessageSquare className="w-4 h-4 text-purple-400" />
                            Message <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none placeholder-zinc-500"
                            placeholder="Describe your issue in detail..."
                            required
                          />
                          <p className="text-sm text-zinc-500 mt-1">
                            Include tracking number, delivery address, and date if applicable
                          </p>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center gap-2 font-bold text-lg"
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
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Emergency Contact */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border border-red-500/30 p-6 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-red-400 mb-2 text-lg">Emergency Contact</h3>
                      <p className="text-sm text-zinc-300 mb-2">
                        For lost or damaged parcels, call immediately:
                      </p>
                      <p className="text-2xl font-black text-white">+1-999-URGENT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-black text-white mb-4">Quick Help</h3>
                  <div className="space-y-4">
                    {[
                      { q: 'How do I track my parcel?', a: 'Enter your tracking number on the homepage or tracking page.' },
                      { q: 'What if delivery is delayed?', a: 'Check tracking for updates or contact our 24/7 support team.' },
                      { q: 'Can I reschedule delivery?', a: 'Yes! Contact us at least 2 hours before scheduled delivery.' }
                    ].map((faq, index) => (
                      <div key={index} className="border-l-2 border-purple-500 pl-4">
                        <h4 className="font-bold text-white text-sm mb-1">{faq.q}</h4>
                        <p className="text-zinc-400 text-xs">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-600 text-sm">&copy; {new Date().getFullYear()} ParcelPro. All rights reserved. Powered by innovation.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;