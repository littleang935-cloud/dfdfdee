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
  Lock,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

const LandingPage = ({ onLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'
    } relative overflow-hidden`}>
      
                   {/* Dynamic Moving Background */}
             <div className="absolute inset-0 overflow-hidden">
               {/* Floating particles */}
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   className={`absolute w-2 h-2 rounded-full ${
                     isDarkMode ? 'bg-white/20' : 'bg-blue-500/20'
                   }`}
                   style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                   }}
                   animate={{
                     y: [0, -100, 0],
                     opacity: [0, 1, 0],
                   }}
                   transition={{
                     duration: 8 + Math.random() * 4,
                     repeat: Infinity,
                     delay: Math.random() * 5,
                     ease: "easeInOut",
                   }}
                 />
               ))}

               {/* Animated gradient orbs */}
               <motion.div
                 className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
                   isDarkMode
                     ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                     : 'bg-gradient-to-r from-blue-200/30 to-purple-200/30'
                 }`}
                 animate={{
                   x: [0, 50, 0],
                   y: [0, -30, 0],
                   scale: [1, 1.1, 1],
                 }}
                 transition={{
                   duration: 25,
                   repeat: Infinity,
                   ease: "easeInOut",
                 }}
               />
               <motion.div
                 className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
                   isDarkMode
                     ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10'
                     : 'bg-gradient-to-r from-purple-200/30 to-pink-200/30'
                 }`}
                 animate={{
                   x: [0, -50, 0],
                   y: [0, 30, 0],
                   scale: [1, 1.2, 1],
                 }}
                 transition={{
                   duration: 30,
                   repeat: Infinity,
                   ease: "easeInOut",
                 }}
               />

               {/* Additional floating elements */}
               <motion.div
                 className={`absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-2xl ${
                   isDarkMode
                     ? 'bg-gradient-to-r from-green-500/5 to-blue-500/5'
                     : 'bg-gradient-to-r from-green-200/20 to-blue-200/20'
                 }`}
                 animate={{
                   x: [0, 30, 0],
                   y: [0, -20, 0],
                   rotate: [0, 180, 360],
                 }}
                 transition={{
                   duration: 40,
                   repeat: Infinity,
                   ease: "easeInOut",
                 }}
               />

               {/* Moving lines */}
               {[...Array(5)].map((_, i) => (
                 <motion.div
                   key={`line-${i}`}
                   className={`absolute h-px w-32 ${
                     isDarkMode ? 'bg-white/10' : 'bg-blue-500/10'
                   }`}
                   style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                   }}
                   animate={{
                     x: [0, 200, 0],
                     opacity: [0, 1, 0],
                   }}
                   transition={{
                     duration: 15 + Math.random() * 10,
                     repeat: Infinity,
                     delay: Math.random() * 10,
                     ease: "easeInOut",
                   }}
                 />
               ))}

               {/* Subtle grid pattern */}
               <div className={`absolute inset-0 opacity-5 ${
                 isDarkMode ? 'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]'
                 : 'bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)]'
               } bg-[length:20px_20px]`} />
             </div>

                   {/* Theme Toggle - Bottom Right */}
             <motion.button
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               onClick={toggleTheme}
               className={`fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                 isDarkMode
                   ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                   : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
               }`}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
             >
               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </motion.button>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold flex items-center gap-2"
        >
          <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>Med</span>
          <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>Chain</span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onLogin}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            isDarkMode 
              ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
          }`}
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
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className={`bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent ${
              isDarkMode ? 'from-blue-400 to-green-400' : 'from-blue-600 to-green-600'
            }`}>
              Next-Generation
            </span>
            <br />
            <span className={`bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${
              isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
            }`}>
              Healthcare
            </span>
          </h1>
          <h2 className={`text-2xl md:text-3xl font-semibold mb-8 ${
            isDarkMode ? 'text-white/80' : 'text-gray-700'
          }`}>
            Blockchain-Powered Medical Inventory
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-12 ${
            isDarkMode ? 'text-white/70' : 'text-gray-600'
          }`}>
            Secure, transparent, and automated inventory management for healthcare facilities. 
            Every transaction recorded on the blockchain for complete audit trails.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Get Started <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/50 border-gray-200 shadow-lg'
              }`}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{stat.value}</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-white/70' : 'text-gray-600'
              }`}>{stat.label}</div>
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
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Why Choose MedChain?</h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-white/70' : 'text-gray-600'
          }`}>
            Experience the future of healthcare inventory management with cutting-edge blockchain technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/50 border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              <feature.icon className={`w-12 h-12 mb-6 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{feature.title}</h3>
              <p className={`${
                isDarkMode ? 'text-white/70' : 'text-gray-600'
              }`}>{feature.description}</p>
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
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Trusted by Healthcare Leaders</h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-white/70' : 'text-gray-600'
          }`}>
            See what healthcare professionals are saying about MedChain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl backdrop-blur-sm border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/50 border-gray-200 shadow-lg'
              }`}
            >
              <p className={`text-lg mb-6 italic ${
                isDarkMode ? 'text-white/80' : 'text-gray-700'
              }`}>"{testimonial.quote}"</p>
              <div>
                <div className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{testimonial.author}</div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-white/60' : 'text-gray-500'
                }`}>{testimonial.role}</div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-white/60' : 'text-gray-500'
                }`}>{testimonial.hospital}</div>
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
          viewport={{ once: true }}
          className={`text-center max-w-4xl mx-auto p-12 rounded-3xl backdrop-blur-sm border ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/50 border-gray-200 shadow-xl'
          }`}
        >
          <h2 className={`text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Ready to Transform Your Healthcare Inventory?</h2>
          <p className={`text-xl mb-8 ${
            isDarkMode ? 'text-white/70' : 'text-gray-600'
          }`}>
            Join leading healthcare facilities worldwide in adopting blockchain-powered inventory management. 
            Experience the future of secure, transparent, and automated healthcare supply chain management.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Start Free Trial <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;