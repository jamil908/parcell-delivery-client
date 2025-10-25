import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Library, MessageSquare, User } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
  <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Library className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Get in Touch</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our library? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm">
                    123 Library Street<br />
                    Chattogram, Bangladesh<br />
                    Postal Code: 4000
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    support@libraryhub.com
                  </p>
                  <p className="text-gray-600 text-sm">
                    info@libraryhub.com
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    +880 1234-567890
                  </p>
                  <p className="text-gray-600 text-sm">
                    +880 1987-654321
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Opening Hours</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent! 🎉</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-7 h-7 text-indigo-600" />
                    Send us a Message
                  </h2>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 text-indigo-600" />
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="membership">Membership Question</option>
                        <option value="book-request">Book Request</option>
                        <option value="borrowing">Borrowing Issue</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                        placeholder="Tell us what's on your mind..."
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum 10 characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-semibold text-lg shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">How do I become a member?</h3>
              <p className="text-gray-600 text-sm">
                Visit our library with a valid ID and proof of address. Fill out the membership form and you'll receive your library card immediately.
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">How long can I borrow books?</h3>
              <p className="text-gray-600 text-sm">
                Standard loan period is 14 days. You can renew books online or by phone if they're not reserved by others.
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Are there any late fees?</h3>
              <p className="text-gray-600 text-sm">
                Yes, late returns incur a small daily fee. However, we offer grace periods and reminder services to help you avoid charges.
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Can I request specific books?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely! Fill out a book request form and we'll do our best to add it to our collection within 2-4 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;