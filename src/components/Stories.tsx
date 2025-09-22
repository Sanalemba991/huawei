"use client";
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Variants } from 'framer-motion';
const Stories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true});

  const stories = [
    {
      id: 1,
      title: "Jimma University",
      subtitle: "A Smart Campus Network to Guide the Intelligent Transformation of Education in Ethiopia",
      category: "Education"
    },
    {
      id: 2,
      title: "Tech Innovation Hub",
      subtitle: "Revolutionizing Digital Infrastructure for Modern Enterprises Across Africa",
      category: "Technology"
    },
    {
      id: 3,
      title: "Healthcare Systems",
      subtitle: "Implementing Smart Solutions for Better Patient Care and Medical Excellence",
      category: "Healthcare"
    },
    {
      id: 4,
      title: "Financial Services",
      subtitle: "Secure Digital Banking Solutions Transforming Financial Accessibility",
      category: "Finance"
    },
    {
      id: 5,
      title: "Manufacturing Corp",
      subtitle: "IoT-Driven Smart Factory Solutions for Industry 4.0 Transformation",
      category: "Manufacturing"
    },
    {
      id: 6,
      title: "Retail Solutions",
      subtitle: "Next-Generation Retail Technology Enhancing Customer Experience",
      category: "Retail"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants : Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants : Variants= {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideVariants : Variants= {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className=" mt-15 max-w-7xl mx-auto px-4 py-16 "
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Customer Stories</h2>
        <div className="w-16 h-1 bg-red-500 mx-auto"></div>
      </motion.div>

      {/* Slider Container */}
      <motion.div variants={itemVariants} className="relative group">
        {/* Main Slider */}
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {stories.map((story, index) => (
              <motion.div 
                key={story.id} 
                className="w-full flex-shrink-0"
                initial="hidden"
                animate={currentSlide === index ? "visible" : "hidden"}
                variants={slideVariants}
              >
                <div className="flex flex-col lg:flex-row min-h-[400px]">
                  {/* Image Placeholder */}
                  <motion.div 
                    className="w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center p-8">
                      <p className="text-gray-600 text-sm">Image placeholder for {story.category}</p>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <motion.div 
                      className="mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full mb-4">
                        {story.category}
                      </span>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-3xl font-bold text-gray-900 mb-4"
                      whileHover={{ color: "#dc2626" }}
                      transition={{ duration: 0.3 }}
                    >
                      {story.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 text-lg leading-relaxed mb-8"
                      initial={{ opacity: 0 }}
                      animate={currentSlide === index ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {story.subtitle}
                    </motion.p>
                    
                    <motion.button 
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-all duration-200 group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                      <svg 
                        className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-red-600" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-red-600" />
        </motion.button>
      </motion.div>

      {/* Scroll to Top Button */}
      
    </motion.div>
  );
};

export default Stories;