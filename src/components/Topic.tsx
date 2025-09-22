"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Variants } from 'framer-motion';

const Topic = () => {
    const router = useRouter();

    // Animation variants
    const containerVariants: Variants= {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants : Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    // Refs for in-view detection
    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

    // Navigation handler for cards - FIXED: Added proper typing
    const handleCardClick = (path: string) => {
        router.push(path);
    };

    // Fixed image URLs - using proper Next.js public path structure
    const images = {
        topic: "/Topic/Topic1.jpg",
        huaweiEkit: "/Topic/Topic2.png",
        oceanProtect: "/Topic/Topic3.jpg",
        digitalPartner: "/Topic/Topic4.jpg",
        gartnerReport: "/Topic/Topic5.png"
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-red-50 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-4">
                        Data Storage Solutions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover our comprehensive range of future-proof data storage solutions designed for businesses of all sizes
                    </p>
                </motion.div>

                {/* Main Grid Layout */}
                <motion.div
                    ref={gridRef}
                    initial="hidden"
                    animate={isGridInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                    {/* Feature Card - Left Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4"
                    >
                        <div
                            onClick={() => handleCardClick("/solutions/overview")}
                            className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group h-full flex flex-col bg-cover bg-center"
                            style={{ backgroundImage: "url('/Topic/bg.jpg')" }}
                        >
                            <div className="p-5 md:p-6 flex-grow">
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-red-50 to-red-100 border border-red-200 mb-4 mx-auto"
                                >
                                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-2 animate-pulse"></div>
                                    <span className="text-red-600 text-sm font-semibold tracking-wide">Industry Innovation</span>
                                </motion.div>

                                <motion.h1
                                    variants={itemVariants}
                                    className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center"
                                >
                                    Future-Proof Data Storage Solutions
                                </motion.h1>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-gray-600 mb-4 text-center text-base leading-relaxed"
                                >
                                    A US$1 investment in future-proof data storage infrastructure generates{' '}
                                    <span className="font-semibold text-gray-800 bg-gradient-to-r from-red-100 to-red-50 px-1 py-0.5 rounded">
                                        US$60 socioeconomic benefits
                                    </span>,
                                    driving sustainable digital transformation.
                                </motion.p>

                                {/* Single big image */}
                                <div className="relative h-64 md:h-80 mt-4 rounded-lg overflow-hidden">
                                    <Image
                                        src={images.topic}
                                        alt="Future-Proof Data Storage Solutions"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="group-hover:scale-105 transition-transform duration-500 ease-out"
                                        priority // Add priority for important images
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cards Grid - Right Side */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* HUAWEI eKit */}
                        <motion.article
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => handleCardClick("/solutions/huawei-ekit")}
                        >
                            <div className="bg-white rounded-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group-hover:shadow-lg">
                                <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
                                    <Image
                                        src={images.huaweiEkit}
                                        alt="HUAWEI eKit"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow text-center">
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 self-center">
                                        Promotion
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">HUAWEI eKit</h3>
                                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                                        Powering SMB Growth: Easy deployment, simplified management, and reliable performance.
                                    </p>
                                </div>
                            </div>
                        </motion.article>

                        {/* OceanProtect */}
                        <motion.article
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => handleCardClick("/solutions/oceanprotect")}
                        >
                            <div className="bg-white rounded-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group-hover:shadow-lg">
                                <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
                                    <Image
                                        src={images.oceanProtect}
                                        alt="OceanProtect Data Protection"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow text-center">
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 self-center">
                                        Solution
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">OceanProtect Data Protection</h3>
                                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                                        Named a 2025 Gartner® Peer Insights™ Customers' Choice for data protection.
                                    </p>
                                </div>
                            </div>
                        </motion.article>

                        {/* Digital Partner */}
                        <motion.article
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => handleCardClick("/solutions/digital-partner")}
                        >
                            <div className="bg-white rounded-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group-hover:shadow-lg">
                                <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
                                    <Image
                                        src={images.digitalPartner}
                                        alt="Huawei Digital Partner"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow text-center">
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 self-center">
                                        Commercial Market
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Huawei Digital Partner</h3>
                                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                                        Accelerating the Digital Transformation of SMEs through innovative solutions.
                                    </p>
                                </div>
                            </div>
                        </motion.article>

                        {/* Gartner Report */}
                        <motion.article
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => handleCardClick("/reports/gartner")}
                        >
                            <div className="bg-white rounded-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group-hover:shadow-lg">
                                <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
                                    <Image
                                        src={images.gartnerReport}
                                        alt="Gartner Report"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow text-center">
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 self-center">
                                        Report
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Gartner Report</h3>
                                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                                        Recognized as a leader for the third consecutive year in the Magic Quadrant.
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Topic;