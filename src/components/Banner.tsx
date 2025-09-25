"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import Banners from '../../public/banner/first.jpg';

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Animation variants for staggered entrance
  const containerVariants : Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants : Variants= {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants : Variants= {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-end overflow-hidden">
      {/* Background Image with fade-in animation */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
       <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/banner/first.jpg')`,
            filter: 'brightness(0.8)'
          }}
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 "></div>
      </motion.div>
      
      {/* Text Content with staggered animation */}
      <motion.div 
        className="relative  px-8 py-8  max-w-sm mr-8 md:mr-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          variants={itemVariants}
        >
          <span className="text-red-600">A</span>ll Intelligence
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl font-bold text-red-600 mb-2"
          variants={itemVariants}
        >
          GITEX GLOBAL 2025
        </motion.h2>
        
        <motion.p 
          className="text-sm md:text-base text-gray-600 mb-6"
          variants={itemVariants}
        >
          Oct 13 – 17 | Dubai, United Arab Emirates
        </motion.p>
        
        <motion.button 
          className="px-6 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium transition-colors duration-300"
          variants={buttonVariants}
          whileHover="hover"
        >
          Learn More
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Banner;