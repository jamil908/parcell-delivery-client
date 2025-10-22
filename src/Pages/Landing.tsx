import { Link } from "react-router-dom";
import {
  Package,
  Globe,
  Zap,
  Shield,
  ChevronRight,
  type LucideIcon,
  CornerRightUp,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";

interface ProcessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, color }) => (
  <div className="relative text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
    <div
      className={`mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-md ${
        color === "text-cyan-600" ? "bg-cyan-500" : "bg-gray-500"
      }`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>

    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 max-w-7xl mx-auto">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section
        className="relative pt-24 pb-32 md:pt-40 md:pb-48 bg-gray-50 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/global-logistic-airplane-parcel-box-concept-air-delivery-shipping-generative-ai-282417895.jpg')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <span className="inline-block text-sm font-semibold text-cyan-600 uppercase tracking-wider mb-3 bg-cyan-100 px-3 py-1 rounded-full">
                The Future of Logistics
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
                Next-Gen <span className="text-cyan-600">Global Shipping</span>. Simplified.
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-xl lg:max-w-none mx-auto">
                Leverage our AI-powered network for unparalleled speed, transparency, and reliability in every delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-cyan-600 text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-cyan-700 transition duration-300 shadow-xl shadow-cyan-200/50"
                >
                  Start Shipping Now
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
                <Link
                  to="/tracking"
                  className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-3.5 rounded-lg font-semibold text-lg border border-gray-300 hover:bg-gray-100 transition duration-300"
                >
                  Track Parcel ID
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end mt-12 lg:mt-0">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.HTIe1eeTMuF6tXkSINGfDgHaEK?pid=Api&P=0&h=220"
                alt="Digital logistics dashboard"
                className="w-full object-center max-w-lg rounded-2xl shadow-2xl border-4 border-white transform hover:scale-[1.03] transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Globe}
            title="Global Coverage"
            description="Ship to over 150 countries with optimized routes and consolidated shipping lanes."
          />
          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            description="Utilizing next-day air and high-speed ground transport for guaranteed quick deliveries."
          />
          <FeatureCard
            icon={Shield}
            title="Maximum Security"
            description="Every package is insured and monitored 24/7 by our dedicated security team."
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Seamless Process</h2>
          <p className="text-xl text-gray-600">From order creation to final delivery in three simple steps.</p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-10">
          <svg
            className="absolute hidden md:block w-full h-full left-0 top-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            <polyline
              points="0,50 33,50 33,25 66,25 66,50 100,50"
              stroke="#CBD5E1"
              fill="none"
              strokeWidth="1"
              strokeDasharray="5, 5"
            />
          </svg>

          <ProcessCard
            icon={Package}
            title="1. Create Shipment"
            description="Instantly generate labels, select carriers, and schedule pickup via our intuitive platform."
            color="text-cyan-600"
          />

          <ProcessCard
            icon={Globe}
            title="2. Smart Transit"
            description="Your package moves through our automated hubs. Track its precise location globally in real-time."
            color="text-gray-600"
          />

          <ProcessCard
            icon={ChevronRight}
            title="3. Final Delivery"
            description="Confirm successful delivery with digital signature and geotagging for absolute proof of arrival."
            color="text-cyan-600"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Ready to Upgrade Your Shipping?
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-10">
            Join the platform built for speed, security, and enterprise scale.
          </p>
          <Link
            to="/register"
            className="inline-block bg-cyan-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-cyan-700 transition duration-300 shadow-2xl shadow-cyan-400/30 transform hover:-translate-y-1"
          >
            Get Started Free Trial
          </Link>
        </div>
      </section>

   <section>
     <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Logo/Branding */}
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Package className="w-8 h-8 text-cyan-500" />
                <span className="text-2xl font-extrabold">Parcel<span className="text-cyan-500">Pro</span></span>
              </Link>
              <p className="text-gray-400 text-sm">
                Advanced logistics, made simple.
              </p>
            </div>
            
            {/* Links */}
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-white">Platform</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/tracking" className="text-gray-400 hover:text-cyan-500 transition">Track Shipment</Link></li>
                    <li><Link to="/register" className="text-gray-400 hover:text-cyan-500 transition">Book a Pickup</Link></li>
                    <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition">Pricing Plans</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/about" className="text-gray-400 hover:text-cyan-500 transition">About Us</Link></li>
                    <li><Link to="/contact" className="text-gray-400 hover:text-cyan-500 transition">Contact Support</Link></li>
                    <li><a href="#" className="text-gray-400 hover:text-cyan-500 transition">Careers</a></li>
                  </ul>
                </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><CornerRightUp className="inline w-4 h-4 mr-2 text-cyan-500" />Global Operations</li>
                <li><a href="mailto:support@parcelpro.com" className="hover:text-cyan-500">support@parcelpro.com</a></li>
                <li>+1 (800) 555-0199</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} ParcelPro Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
   </section>



    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <Icon className="w-12 h-12 text-cyan-600 mb-4" strokeWidth={1.5} />
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Landing;
