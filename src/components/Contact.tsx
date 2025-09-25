"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Variants } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  // Animation variants for consistent timing
  const slideUp : Variants= {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
      }
    }
  };

  const slideInLeft : Variants= {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInRight : Variants= {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const scaleIn: Variants={
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const MapSection = () => {
    return (
      <section className="bg-white py-20">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className='text-red-600'>Office</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find us at 25th St - Naif - Dubai - United Arab Emirates
            </p>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1486.8524251489728!2d55.307987002385616!3d25.273703424847543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f432649d77a05%3A0x329bece680652a9d!2sDigital%20Link%20Technology%20LLC%20-%20UNV%20National%20Distributor%20in%20Dubai%2C%20UAE!5e1!3m2!1sen!2sin!4v1758793163694!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </section>
    );
  };

  return (
    <>
      {/* Your existing contact form section */}
      <div className="relative min-h-screen">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/Contact.png')`,
            filter: 'brightness(0.8)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 to-red-800/60" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="text-white"
            >
              <h1 className="text-5xl font-bold mb-6">
                Kickstart your
                <br />
                <span className="text-red-600">digital journey</span>
                <br />
                today
              </h1>
              <p className="text-xl text-red-100">
                Please fill in the requirements and we will get back to you soon.
              </p>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="w-full max-w-md mx-auto"
            >
              <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-8 border border-white/25">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/15 rounded-xl text-white placeholder-white/80 resize-none border border-transparent focus:border-red-400 focus:outline-none transition-colors duration-300"
                      required
                    />
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/15 rounded-xl text-white placeholder-white/80 resize-none border border-transparent focus:border-red-400 focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/15 rounded-xl text-white placeholder-white/80 resize-none border border-transparent focus:border-red-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/15 rounded-xl text-white placeholder-white/80 resize-none border border-transparent focus:border-red-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/15 rounded-xl text-white placeholder-white/80 resize-none border border-transparent focus:border-red-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#dc2626",
                      color: "#ffffff",
                      borderColor: "#dc2626"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    type="submit"
                    className="mx-auto block bg-transparent border border-red-400 text-white/80 font-semibold py-2 px-8 transition-colors duration-300"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div 
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-16 grid md:grid-cols-3 gap-8 text-white text-center"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-transform duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">Office Address</h3>
              <a
                href="https://maps.app.goo.gl/v8L9XJ9t6rRzYUDJ7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-red-200 transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 mr-2 text-gray-300 mt-1" />
                <span>
                  25th St - Naif - Dubai
                  <br />
                  United Arab Emirates
                </span>
              </a>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <p className="text-gray-300">
                Monday - Saturday:<br />
                9:30 AM - 5:30 PM
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-transform duration-300 space-y-2"
            >
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <a
                href="tel:+00971509664956"
                className="block text-gray-300 hover:text-red-200 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 inline-block mr-2 text-gray-300" />
                +0097150966 4956
              </a>
              <a
                href="mailto:mail@ekit-huawei-uae.com"
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-red-200 transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                mail@ekit-huawei-uae.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add the Map Section */}
      <MapSection />
    </>
  );
}