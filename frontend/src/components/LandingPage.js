import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Activity,
  Database,
  Lock
} from 'lucide-react';

const LandingPage = ({ onLogin }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingBubbles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-white/10 backdrop-blur-sm"
      style={{
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));

  const stats = [
    { label: "Items Tracked", value: "1,247", icon: Database },
    { label: "Uptime", value: "99.9%", icon: Activity },
    { label: "Support", value: "24/7", icon: Users },
    { label: "Healthcare Partners", value: "50+", icon: Globe },
  ];

  const features = [
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Every transaction is immutably recorded on the blockchain, ensuring complete transparency and audit trails."
    },
    {
      icon: AlertTriangle,
      title: "Real-time Alerts",
      description: "Instant notifications for low stock, expiring items, and critical inventory levels."
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered insights and predictive analytics to optimize inventory management."
    },
    {
      icon: Users,
      title: "Multi-role Access",
      description: "Role-based access control for administrators, managers, staff, and suppliers."
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "Meet international healthcare standards and regulatory requirements."
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description: "Trusted by leading healthcare facilities worldwide for reliable inventory management."
    }
  ];

  const testimonials = [
    {
      quote: "MedChain has revolutionized our inventory management. The blockchain transparency gives us complete confidence in our supply chain.",
      author: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      hospital: "City General Hospital"
    },
    {
      quote: "The automated alerts and real-time tracking have significantly reduced our stockouts and improved patient care.",
      author: "Michael Chen",
      role: "Hospital Administrator",
      hospital: "Regional Medical Center"
    },
    {
      quote: "The AI-powered analytics help us predict demand accurately and optimize our inventory levels like never before.",
      author: "Dr. Emily Rodriguez",
      role: "Director of Operations",
      hospital: "University Health System"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Moving Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingBubbles}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-white"
        >
          <span className="text-blue-400">Med</span>
          <span className="text-green-400">Chain</span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onLogin}
          className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          Login
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Next-Generation
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/80 mb-8">
            Blockchain-Powered Medical Inventory
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
            Secure, transparent, and automated inventory management for healthcare facilities. 
            Every transaction recorded on the blockchain for complete audit trails.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Get Started <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-blue-400">MedChain</span>?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the future of healthcare inventory management with cutting-edge blockchain technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-green-400">Healthcare Leaders</span>
          </h2>
          <p className="text-xl text-white/70">
            See what healthcare professionals are saying about MedChain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-blue-400 text-sm">{testimonial.role}</div>
                <div className="text-white/60 text-sm">{testimonial.hospital}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="text-purple-400">Healthcare Inventory</span>?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join leading healthcare facilities worldwide in adopting blockchain-powered inventory management. 
            Experience the future of secure, transparent, and automated healthcare supply chain management.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300"
          >
            Start Free Trial
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;