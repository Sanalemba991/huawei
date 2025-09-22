'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, MagnifyingGlassIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTopDropdown, setActiveTopDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Top navigation data
  const topNavItems = [
    {
      title: 'Enterprise',
      items: [
        { 
          name: 'Enterprise', 
          href: '#',
          description: 'Enterprise products, solutions & services',
          isActive: true
        },
        { 
          name: 'Huawei Cloud', 
          href: '#',
          description: 'Cloud products, solutions & services'
        },
        { 
          name: 'Carrier', 
          href: '#',
          description: 'Products, Solutions and Services for Carrier'
        },
        { 
          name: 'Consumer', 
          href: '#',
          description: 'Phones, laptops, tablets, wearables & other devices'
        },
        { 
          name: 'Corporate', 
          href: '#',
          description: 'About Huawei, Press & Events , and More'
        }
      ]
    }
  ];

  // Main navigation data
  const navigationItems = [
    {
      title: 'Products and Solutions',
      href: '#',
      dropdownContent: {
        sections: [
          {
            title: 'Products',
            items: [
              'Enterprise Networking',
              'Optical Networking',
              'Data Storage',
              'Intelligent Collaboration',
              'Enterprise Wireless',
              'Enterprise Services and Software',
              'Management System',
              'Huawei Cloud',
              'HUAWEI eKit'
            ]
          },
          {
            title: 'Product Portfolio',
            items: [
              'Data Center',
              'Digital Site',
              'Intelligent Campus',
              'Wide Area Network'
            ]
          },
          {
            title: 'Industries',
            items: [
              'Commercial Market',
              'Education',
              'Electric Power',
              'Finance',
              'Government',
              'Healthcare',
              'ISP',
              'Manufacturing',
              'Mining and Smelting',
              'Oil & Gas and Chemicals',
              'Retail',
              'Transportation'
            ]
          }
        ],
        links: [
          { name: 'New Products', href: '#', external: true },
          { name: 'All Products and Solutions', href: '#' },
          { name: 'Resource Center', href: '#' }
        ]
      }
    },
    {
      title: 'Learning and Tech Support',
      href: '#',
      dropdownContent: {
        sections: [
          {
            title: 'Support Center',
            items: [
              'Online Support',
              'Service Request',
              'Service Hotlines',
              'Tools',
              'Maintenance Status',
              'RMA Status',
              'Get License',
              'Warranty'
            ]
          },
          {
            title: 'Product Support',
            items: [
              'Documentation',
              'Software Download',
              'Knowledge',
              'Base Bulletins',
              'Multimedia Portal',
              'Online Courses',
              'Multilingual Documents',
              'HUAWEI eKit'
            ]
          },
          {
            title: 'Industry Solution Support',
            items: [
              'Government',
              'Finance',
              'Construction / Real Estate'
            ]
          },
          {
            title: 'Training and Certification',
            items: [
              'Learning Resources',
              'Courses and Classes',
              'Certification',
              'ICT Academy',
              'Learning Partner',
              'Enterprise Training',
              'More Info'
            ]
          }
        ],
        links: [
          { name: 'Technical Support Home', href: '#', external: true },
          { name: 'Community', href: '#', external: true }
        ]
      }
    },
    {
      title: 'Partners',
      href: '#',
      dropdownContent: {
        sections: [
          {
            title: 'Become Partner',
            items: [
              'Join Sales Partner Program',
              'Join Service Partner Program',
              'Join Solution Partner Program'
            ]
          },
          {
            title: 'Partner Policy',
            items: [
              'Partner Policy'
            ]
          },
          {
            title: 'Partner Support',
            items: [
              'Huawei Partner University',
              'Partner Bidding & Network Design Toolkits',
              'Huawei Partner Marketing WorkSpace'
            ]
          }
        ],
        links: [
          { name: 'Partner Home', href: '#', external: true }
        ]
      }
    },
    {
      title: 'How to Buy',
      href: '#',
      dropdownContent: {
        sections: [
          {
            title: 'Ask the Chatbot',
            items: [
              'Instantly find the answers to all your questions about Huawei products and solutions.'
            ]
          },
          {
            title: 'Contact Huawei Sales',
            items: [
              'Looking to make a purchase? Leave your details and we\'ll be in touch.'
            ]
          },
          {
            title: 'Find a Reseller',
            items: [
              'Find your local reseller now.'
            ]
          }
        ],
        links: [
          { name: 'Ask Now', href: '#' },
          { name: 'Get in Touch', href: '#' },
          { name: 'Find a Reseller', href: '#' },
          { name: 'How to Buy', href: '#' }
        ]
      }
    },
    {
      title: 'About Us',
      href: '#',
      dropdownContent: {
        sections: [
          {
            title: 'Discover More',
            items: [
              'About Huawei Enterprise',
              'News Room',
              'Events',
              'Case Studies',
              'Knowledge Hub',
              'Video Center',
              'ICT Insights',
              'Blogs'
            ]
          },
          {
            title: 'Hot Topics',
            items: [
              'Accelerate Industrial Intelligence',
              'City of Intelligence',
              '100 Intelligent Transformation Stories'
            ]
          },
          {
            title: 'Contact Us',
            items: [
              'Global Service Hotline',
              'Branch Office'
            ]
          }
        ]
      }
    }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((activeDropdown || activeTopDropdown) && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
        setActiveTopDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, activeTopDropdown]);

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
    setActiveTopDropdown(null);
  };

  const handleTopDropdownToggle = (title: string) => {
    setActiveTopDropdown(activeTopDropdown === title ? null : title);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Navigation Bar - Always visible but hidden when scrolled */}
      <div className={`bg-gray-900 text-white text-sm transition-all duration-300 ${
        isScrolled ? 'h-0 overflow-hidden' : 'h-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-6">
              {topNavItems.map((item) => (
                <div key={item.title} className="relative dropdown-container">
                  <button 
                    onClick={() => handleTopDropdownToggle(item.title)}
                    onMouseEnter={() => {
                      setActiveTopDropdown(item.title);
                      setActiveDropdown(null);
                    }}
                    onMouseLeave={() => {
                      setActiveTopDropdown(null);
                    }}
                    className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <span>{item.title}</span>
                    <ChevronDownIcon className="w-3 h-3" />
                  </button>
                  {activeTopDropdown === item.title && (
                    <div 
                      className="top-dropdown-menu fixed top-10 left-0 w-full bg-white text-gray-900 shadow-xl z-50 border-t border-gray-200 dropdown-enter navbar-dropdown"
                      onMouseEnter={() => setActiveTopDropdown(item.title)}
                      onMouseLeave={() => {
                        setActiveTopDropdown(null);
                      }}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-5 gap-6">
                          {item.items.map((subItem, index) => (
                            <div key={index} className="group">
                              <a
                                href={subItem.href}
                                className={`block p-4 rounded-lg transition-all duration-200 ${
                                  subItem.isActive 
                                    ? 'bg-red-50 border-l-4 border-red-600' 
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className={`font-semibold ${
                                    subItem.isActive ? 'text-red-600' : 'text-gray-900'
                                  }`}>
                                    {subItem.name}
                                  </h3>
                                  <ChevronDownIcon className="w-4 h-4 text-gray-400 rotate-90" />
                                </div>
                                <p className="text-sm text-gray-600">
                                  {subItem.description}
                                </p>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors duration-200">
                  <GlobeAltIcon className="w-4 h-4" />
                  <span>Worldwide</span>
                  <ChevronDownIcon className="w-3 h-3" />
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-white text-gray-900 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">Worldwide</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">Asia Pacific</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">Europe</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">North America</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Becomes fixed when scrolled */}
      <nav className={`w-full bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/huaweilogo-new.png"
                alt="Huawei"
                width={isScrolled ? 100 : 120}
                height={isScrolled ? 30 : 40}
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-6 w-auto' : 'h-8 w-auto'
                }`}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.title} className="relative dropdown-container">
                  <button
                    onClick={() => handleDropdownToggle(item.title)}
                    onMouseEnter={() => {
                      setActiveDropdown(item.title);
                      setActiveTopDropdown(null);
                    }}
                    onMouseLeave={() => {
                      setActiveDropdown(null);
                    }}
                    className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeDropdown === item.title
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-700 hover:text-red-600'
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === item.title && item.dropdownContent && (
                    <div
                      className="dropdown-menu fixed left-0 w-full bg-white shadow-xl z-50 border-t border-gray-200 dropdown-enter navbar-dropdown"
                      style={{ top: isScrolled ? '64px' : '104px' }}
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => {
                        setActiveDropdown(null);
                        setActiveTopDropdown(null);
                      }}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {item.dropdownContent.sections.map((section, index) => (
                            <div key={index} className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <a
                                      href="#"
                                      className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                                    >
                                      {subItem}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {/* Bottom Links */}
                        {item.dropdownContent.links && (
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap gap-6">
                              {item.dropdownContent.links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.href}
                                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                                >
                                  {link.name}
                                  {link.external && (
                                    <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setActiveDropdown(null);
                    setActiveTopDropdown(null);
                  }}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Search"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <button className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition-colors duration-200">
                          <MagnifyingGlassIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setActiveDropdown(null);
                  setActiveTopDropdown(null);
                }}
                className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.title} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => handleDropdownToggle(item.title)}
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                  >
                    <span>{item.title}</span>
                    <ChevronDownIcon className={`w-4 h-4 transform transition-transform duration-200 ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.title && item.dropdownContent && (
                    <div className="pb-4 space-y-4">
                      {item.dropdownContent.sections.map((section, index) => (
                        <div key={index} className="ml-4">
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-2">
                            {section.title}
                          </h4>
                          <ul className="space-y-1">
                            {section.items.slice(0, 3).map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a
                                  href="#"
                                  className="block text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 py-1"
                                >
                                  {subItem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump when navbar becomes fixed */}
      {isScrolled && <div className="h-16"></div>}
    </>
  );
};

export default Navbar;