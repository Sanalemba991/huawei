"use client";
import React, { useState } from 'react';
import { 
    Smartphone, 
    MapPin, 
    Shield, 
    CheckCircle, 
    Building, 
    Headphones, 
    GraduationCap, 
    Globe, 
    Handshake, 
    ShoppingBag, 
    Settings, 
    Wrench, 
    Lock, 
    Signal, 
    Phone ,ChevronDown
} from 'lucide-react';

const faqData = [
    {
        question: "What products and services does Huawei offer in the UAE?",
        answer: "Huawei provides a comprehensive range of ICT solutions including smartphones, tablets, wearables, laptops, networking equipment, 5G solutions, cloud services, AI technologies, and enterprise solutions for various industries including government, finance, transportation, and energy sectors.",
        icon: <Smartphone className="w-4 h-4 text-gray-600" />
    },
    {
        question: "Where can I find Huawei service centers in the UAE?",
        answer: "Huawei has authorized service centers across all major emirates including Dubai, Abu Dhabi, Sharjah, and Ajman. You can locate the nearest service center through our official website's service locator or Huawei Mobile Services app.",
        icon: <MapPin className="w-4 h-4 text-gray-600" />
    },
    {
        question: "Does Huawei provide warranty for its products in the UAE?",
        answer: "Yes, Huawei offers standard warranty periods for all genuine products purchased in the UAE. Smartphones typically come with 12-24 months warranty, while other products have varying warranty periods. Please check the specific product documentation for details.",
        icon: <Shield className="w-4 h-4 text-gray-600" />
    },
    {
        question: "How can I check if my Huawei product is genuine?",
        answer: "You can verify your product's authenticity through the Huawei official website using the serial number/IMEI, or by visiting any authorized Huawei service center in the UAE for professional verification.",
        icon: <CheckCircle className="w-4 h-4 text-gray-600" />
    },
    {
        question: "What enterprise solutions does Huawei offer in the UAE?",
        answer: "Huawei provides enterprise solutions including cloud computing, data center infrastructure, enterprise networking, wireless solutions, video conferencing systems, and industry-specific digital transformation solutions tailored for UAE market needs.",
        icon: <Building className="w-4 h-4 text-gray-600" />
    },
    {
        question: "How can I get technical support for Huawei products?",
        answer: "Technical support is available through multiple channels: 24/7 hotline, online chat support, email support, and in-person assistance at authorized service centers. You can also access our knowledge base and community forums for self-help.",
        icon: <Headphones className="w-4 h-4 text-gray-600" />
    },
    {
        question: "Does Huawei offer training programs in the UAE?",
        answer: "Yes, Huawei offers various training programs and certifications through the Huawei Authorized Learning Partners in the UAE, covering technologies like 5G, cloud computing, AI, and IoT for professionals and students.",
        icon: <GraduationCap className="w-4 h-4 text-gray-600" />
    },
    {
        question: "What is Huawei's presence in the UAE market?",
        answer: "Huawei has been operating in the UAE for over 20 years, working closely with government entities, telecom operators, and enterprise customers to drive digital transformation and support the UAE's vision for a smart nation.",
        icon: <Globe className="w-4 h-4 text-gray-600" />
    },
    {
        question: "How can I become a Huawei partner in the UAE?",
        answer: "Businesses interested in partnership can apply through the Huawei official website's partner portal or contact our enterprise business department directly for partnership opportunities and requirements.",
        icon: <Handshake className="w-4 h-4 text-gray-600" />
    },
    {
        question: "Where can I buy genuine Huawei products in the UAE?",
        answer: "Genuine Huawei products are available through authorized retailers, major electronics stores, e-commerce platforms like Amazon.ae and Noon.com, and Huawei's official experience stores across the UAE.",
        icon: <ShoppingBag className="w-4 h-4 text-gray-600" />
    },
    {
        question: "Does Huawei provide customized solutions for UAE businesses?",
        answer: "Yes, Huawei offers tailored solutions for UAE businesses across various sectors including government, finance, oil & gas, transportation, and education, with local support teams understanding specific market requirements.",
        icon: <Settings className="w-4 h-4 text-gray-600" />
    },
    {
        question: "What after-sales services does Huawei provide?",
        answer: "Our after-sales services include warranty support, repair services, software updates, technical consultations, spare parts availability, and customer education programs to ensure optimal product performance.",
        icon: <Wrench className="w-4 h-4 text-gray-600" />
    },
    {
        question: "How does Huawei ensure data security and privacy?",
        answer: "Huawei follows strict global cybersecurity and data privacy standards, implementing end-to-end security measures across all products and services, with compliance to UAE data protection regulations.",
        icon: <Lock className="w-4 h-4 text-gray-600" />
    },
    {
        question: "What is Huawei's role in 5G development in the UAE?",
        answer: "Huawei is a key partner in the UAE's 5G rollout, working with telecom operators to deploy advanced 5G networks that support high-speed connectivity, IoT applications, and smart city initiatives.",
        icon: <Signal className="w-4 h-4 text-gray-600" />
    },
    {
        question: "How can I contact Huawei UAE customer service?",
        answer: "You can reach us through our customer service hotline, email support, social media channels, or by visiting our offices in Dubai Internet City. For enterprise inquiries, dedicated account managers are available.",
        icon: <Phone className="w-4 h-4 text-gray-600" />
    }
];
import { motion, AnimatePresence } from 'framer-motion';
import { Variants } from 'framer-motion';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

 
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Animation variants for items
  const itemVariants : Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Animation variants for accordion content
  const accordionVariants: Variants = {
    collapsed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    expanded: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-50">
      {/* FAQ Content */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Everything You Need to Know
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Find answers to the most common questions about our marine and oilfield equipment services, 
              quality standards, and how we can support your industry needs.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="space-y-3"
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <motion.button
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleItem(index)}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-medium text-gray-800 pr-4">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <motion.div
                      animate={{ rotate: openItems[index] ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {openItems[index] && (
                    <motion.div
                      variants={accordionVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1">
                        <div className="pl-7">
                          <motion.p 
                            className="text-gray-700 text-sm leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {item.answer}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;