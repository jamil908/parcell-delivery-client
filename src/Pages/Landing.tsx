import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Globe,
  Zap,
  Shield,
  ChevronRight,
  type LucideIcon,
  CornerRightUp,
  Factory,
  Truck,
  Plane,
  Home,
  CheckCircle2,
  ScanSearch,
  Star,
  TrendingUp,
  Users,
  MapPin,
  ChevronLeft,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/shared/Navbar";

gsap.registerPlugin(ScrollTrigger);

interface ProcessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}
interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}
interface StepProps extends CardProps {
  step: number;
}
interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
  icon: LucideIcon;
}
interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, label, suffix = "", icon: Icon }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={counterRef} className="stat-card relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className="text-5xl font-black bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-zinc-400 font-medium">{label}</div>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, company, content, rating }) => (
  <div className="testimonial-card flex-shrink-0 w-full md:w-[450px] px-4">
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-500/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-zinc-300 leading-relaxed mb-6 italic">"{content}"</p>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <div className="text-white font-bold">{name}</div>
            <div className="text-zinc-400 text-sm">{role} at {company}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const JourneyStep: React.FC<StepProps> = ({ icon: Icon, title, description, step }) => (
  <div className="journey-step flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] px-6">
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-500/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 text-center h-[520px] flex flex-col items-center justify-center shadow-2xl">
        <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mb-8 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>
        <p className="text-cyan-400 font-mono text-[10px] mb-3 tracking-[0.5em] uppercase font-bold">Phase 0{step}</p>
        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight leading-tight">{title}</h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto font-medium">{description}</p>
      </div>
    </div>
  </div>
);

const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, step }) => {
  const colors = [
    { from: "from-purple-500", to: "to-pink-500", shadow: "shadow-purple-500/50" },
    { from: "from-cyan-500", to: "to-blue-500", shadow: "shadow-cyan-500/50" },
    { from: "from-blue-500", to: "to-purple-500", shadow: "shadow-blue-500/50" }
  ];
  const colorSet = colors[step - 1] || colors[0];

  return (
    <div className="process-card relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorSet.from}/20 ${colorSet.to}/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-500">
        {/* Step Number */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
          {step}
        </div>
        <div className={`mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorSet.from} ${colorSet.to} transition-all duration-500 shadow-lg ${colorSet.shadow} group-hover:scale-110`}>
          <Icon className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-12" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight text-center">{title}</h3>
        <p className="text-zinc-400 leading-relaxed text-center">{description}</p>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: LucideIcon; title: string; description: string }> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="feature-item relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative flex flex-col items-center text-center p-8">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-6">
        <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm font-medium max-w-xs">{description}</p>
    </div>
  </div>
);

const Landing = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLElement>(null);
  const journeyScrollerRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: TestimonialProps[] = [
    {
      name: "Sarah Chen",
      role: "Logistics Director",
      company: "TechCorp",
      content: "ParcelPro has transformed our global shipping operations. The real-time tracking and AI optimization have reduced our delivery times by 40%.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Supply Chain Manager",
      company: "GlobalTrade Inc",
      content: "The most reliable delivery system we've ever used. Their customer support is exceptional and the platform is incredibly intuitive.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Owner",
      company: "StyleHub",
      content: "As a small business, ParcelPro has been a game-changer. Affordable rates, fast delivery, and happy customers. What more could I ask for?",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      const heroTl = gsap.timeline();
      
      heroTl.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
      })
      .from(".hero-image", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      }, "-=1");

      // 2. Stats Animation
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });

      // 3. Features Animation
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });

      // 4. Process Cards
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%",
        },
        scale: 0.95,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.4)"
      });

      // 5. Testimonials
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 6. Journey - Horizontal Scroll
      const sections = gsap.utils.toArray<HTMLElement>(".journey-step");
      
      if (journeySectionRef.current && journeyScrollerRef.current) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: journeySectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${journeyScrollerRef.current?.scrollWidth || 0}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black font-sans text-zinc-100 overflow-x-hidden">
      <Navbar />

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-32 md:pt-48 md:pb-48 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 hero-content text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text uppercase tracking-wider">
                  Next-Gen Delivery System
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
                <span className="text-white">Ship</span>{" "}
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Smarter</span>
                <br />
                <span className="text-white">Deliver</span>{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Faster</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-10 text-zinc-400 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the future of parcel delivery with AI-powered routing, real-time tracking, and guaranteed on-time delivery across 150+ countries.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-8">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:-translate-y-1"
                >
                  Start Shipping Now
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/tracking"
                  className="inline-flex items-center justify-center bg-white/5 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  Track Parcel
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="hidden lg:flex items-center space-x-3 text-zinc-500 text-sm">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Scroll to explore</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="hero-image relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.HTIe1eeTMuF6tXkSINGfDgHaEK?pid=Api&P=0&h=220"
                  alt="Logistics Dashboard"
                  className="relative w-full max-w-lg rounded-3xl shadow-3xl border border-white/10 hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Trusted <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Worldwide</span>
            </h2>
            <p className="text-zinc-400 text-lg">The numbers speak for themselves</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter end={1000000} label="Parcels Delivered" suffix="+" icon={Package} />
            <StatCounter end={150} label="Countries Served" suffix="+" icon={Globe} />
            <StatCounter end={50000} label="Happy Customers" suffix="+" icon={Users} />
            <StatCounter end={99} label="Success Rate" suffix="%" icon={TrendingUp} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ParcelPro</span>
            </h2>
            <p className="text-zinc-400 text-lg">Cutting-edge technology meets exceptional service</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={Globe}
              title="Global Network"
              description="Connect to 150+ countries with our intelligent routing system and local delivery partners."
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Analytics"
              description="Track every movement with millisecond precision and get detailed insights on your deliveries."
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Protected"
              description="End-to-end encryption, blockchain verification, and insurance coverage for complete peace of mind."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Simple</span> Process
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              From pickup to delivery, we've streamlined every step
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard
              step={1}
              icon={Package}
              title="Book & Pack"
              description="Schedule pickup online and we'll collect your parcel with auto-generated labels and documentation."
            />
            <ProcessCard
              step={2}
              icon={MapPin}
              title="Track & Monitor"
              description="Real-time GPS tracking with AI-optimized routing ensures the fastest path to your destination."
            />
            <ProcessCard
              step={3}
              icon={CheckCircle2}
              title="Deliver & Confirm"
              description="Secure delivery with digital proof-of-delivery and instant notifications to all parties."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              What Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Customers</span> Say
            </h2>
            <p className="text-zinc-400 text-lg">Join thousands of satisfied customers worldwide</p>
          </div>

          <div className="relative">
            <div className="flex justify-center items-center overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 flex justify-center">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 w-8"
                      : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section ref={journeySectionRef} className="h-screen flex flex-col justify-center bg-black overflow-hidden relative border-y border-white/5">
        <div className="px-6 mb-16 max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            THE <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">JOURNEY</span>
          </h2>
          <p className="text-cyan-400/70 font-mono text-xs tracking-[0.5em] mt-6 flex items-center">
            <span className="w-10 h-[1px] bg-gradient-to-r from-purple-500 to-cyan-500 mr-4"></span>
            SCROLL TO NAVIGATE
          </p>
        </div>

        <div ref={journeyScrollerRef} className="flex flex-nowrap pl-[10vw]">
          <JourneyStep step={1} icon={Factory} title="Origin Scan" description="Package analyzed, weighed, and optimized for the perfect transit path." />
          <JourneyStep step={2} icon={Truck} title="Local Transit" description="Our electric fleet moves cargo to regional distribution hubs." />
          <JourneyStep step={3} icon={Plane} title="Global Transport" description="Automated air-cargo handles cross-border deliveries with precision." />
          <JourneyStep step={4} icon={Home} title="Final Mile" description="Last-leg delivery to your doorstep with real-time updates." />
          <JourneyStep step={5} icon={CheckCircle2} title="Delivered" description="Digital proof-of-delivery and instant confirmation to all parties." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Ship?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that trust ParcelPro for their global shipping needs.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:-translate-y-1 hover:scale-105"
          >
            Get Started Today
            <ChevronRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Parcel<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Pro</span>
                </span>
              </Link>
              <p className="text-zinc-400 max-w-sm leading-relaxed text-sm mb-6">
                Redefining global commerce with high-performance logistics powered by AI and cutting-edge technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li><Link to="/tracking" className="hover:text-purple-400 transition">Track Parcel</Link></li>
                <li><Link to="/register" className="hover:text-purple-400 transition">Get Started</Link></li>
                <li><Link to="/about" className="hover:text-purple-400 transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-purple-400 transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li className="flex items-center">
                  <CornerRightUp className="w-4 h-4 mr-2 text-purple-400" />
                  HQ: Palo Alto, CA
                </li>
                <li className="text-purple-400 font-bold">+1-800-PARCEL</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
            <p>&copy; {new Date().getFullYear()} ParcelPro. All rights reserved. Powered by innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;