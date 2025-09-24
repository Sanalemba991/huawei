'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface NavigationItem {
  title: string;
  href: string;
  dropdownContent?: {
    sections: {
      title: string;
      items: Array<{
        name: string;
        href: string;
      }>;
    }[];
    links?: {
      name: string;
      href: string;
      external?: boolean;
    }[];
  } | null;
}

interface TopNavItem {
  name: string;
  href: string;
  description: string;
  isActive?: boolean;
}

const Navbar = () => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTopDropdown, setActiveTopDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [topHoverTimeout, setTopHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string>('Home');
  const [mounted, setMounted] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

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
  const navigationItems: NavigationItem[] = [
    {
      title: 'Home',
      href: '/',
      dropdownContent: null
    },
    {
      title: 'Products',
      href: '/products',
      dropdownContent: {
        sections: [
          {
            title: 'Enterprise Networking',
            items: [
              { name: 'Campus Switches', href: '/products/campus-switches' },
              { name: 'Data Center Switches', href: '/products/data-center-switches' },
              { name: 'Routers', href: '/products/routers' },
              { name: 'WLAN Products', href: '/products/wlan' },
              { name: 'Network Management', href: '/products/network-management' },
              { name: 'Network Security', href: '/products/network-security' }
            ]
          },
          {
            title: 'Computing & Cloud',
            items: [
              { name: 'Servers', href: '/products/servers' },
              { name: 'Desktop Cloud', href: '/products/desktop-cloud' },
              { name: 'Huawei Cloud', href: '/products/cloud' },
              { name: 'AI Computing', href: '/products/ai-computing' },
              { name: 'Edge Computing', href: '/products/edge-computing' }
            ]
          },
          {
            title: 'Collaboration',
            items: [
              { name: 'Video Conferencing', href: '/products/video-conferencing' },
              { name: 'Telepresence', href: '/products/telepresence' },
              { name: 'IP Phones', href: '/products/ip-phones' },
              { name: 'Unified Communications', href: '/products/unified-communications' },
              { name: 'Contact Center', href: '/products/contact-center' }
            ]
          }
        ],
        links: [
          { name: 'All Products', href: '#', external: true },
        ]
      }
    },
    {
      title: 'Solutions',
      href: '/solutions',
      dropdownContent: {
        sections: [
          {
            title: 'Solutions',
            items: [
              {
                name: 'Intelligent Office',
                href: '/solution/it-office'
              },
              {
                name: 'Intelligent Business',
                href: '/solution/it-business'
              },
              {
                name: 'Intelligent Education',
                href: '/solution/it-education'
              },
              {
                name: 'Intelligent Healthcare',
                href: '/solution/it-health'
              }
            ]
          }
        ],
        links: [
          { name: 'All Solutions', href: '/solution', external: true },
        ]
      }
    },
    {
      title: 'Support',
      href: '/support',
      dropdownContent: null
    },
    {
      title: 'Contact Us',
      href: '/contact',
      dropdownContent: null
    },
    {
      title: 'About Us',
      href: '/about',
      dropdownContent: null
    }
  ];

  // Function to determine if a nav item should be active based on current path
  const isNavItemActive = useCallback((navItem: NavigationItem, currentPath: string) => {
    // Special case for Home - only active on exact root path
    if (navItem.href === '/' && currentPath === '/') {
      return true;
    }
    
    // For other items, check if current path starts with the nav item's href
    // but exclude the home case (/) to prevent it from matching everything
    if (navItem.href !== '/' && currentPath.startsWith(navItem.href)) {
      return true;
    }
    
    // Special handling for /solution path to match Solutions nav item
    if (navItem.href === '/solutions' && currentPath.startsWith('/solution')) {
      return true;
    }
    
    return false;
  }, []);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect current page based on URL path
  useEffect(() => {
    if (!mounted) return;
    
    const updateActivePage = () => {
      const currentPath = window.location.pathname;
      
      // Find the active navigation item
      const activeNavItem = navigationItems.find(item => 
        isNavItemActive(item, currentPath)
      );
      
      if (activeNavItem) {
        setActivePage(activeNavItem.title);
      } else {
        // Fallback to Home if no match found
        setActivePage('Home');
      }
    };

    updateActivePage();
  }, [mounted, isNavItemActive, navigationItems]);

  // Also update active page when window location changes (for SPAs)
  useEffect(() => {
    if (!mounted) return;

    const handleLocationChange = () => {
      const currentPath = window.location.pathname;
      
      const activeNavItem = navigationItems.find(item => 
        isNavItemActive(item, currentPath)
      );
      
      if (activeNavItem) {
        setActivePage(activeNavItem.title);
      } else {
        setActivePage('Home');
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleLocationChange);
    
    // For SPAs that use pushState/replaceState, you might need to listen to those as well
    // This is a common pattern for Next.js routing
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setTimeout(handleLocationChange, 0);
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      setTimeout(handleLocationChange, 0);
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [mounted, isNavItemActive, navigationItems]);

  // Scroll effect
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if ((activeDropdown || activeTopDropdown) && !target.closest('.dropdown-container')) {
        setActiveDropdown(null);
        setActiveTopDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, activeTopDropdown, mounted]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (topHoverTimeout) {
        clearTimeout(topHoverTimeout);
      }
    };
  }, [hoverTimeout, topHoverTimeout]);

  const handleDropdownToggle = useCallback((title: string) => {
    if (isMobileMenuOpen) {
      // Mobile behavior - toggle on click and prevent event bubbling
      setActiveDropdown(prevActive => prevActive === title ? null : title);
      // Close other dropdowns when one is opened
      setActiveTopDropdown(null);
    } else {
      // Desktop behavior remains the same
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setActiveDropdown(title);
      setActiveTopDropdown(null);
    }
  }, [isMobileMenuOpen, hoverTimeout]);

  const handleDropdownMouseEnter = useCallback((title: string) => {
    if (!isMobileMenuOpen) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setActiveDropdown(title);
      setActiveTopDropdown(null);
      setHoveredItem(title);
    }
  }, [isMobileMenuOpen, hoverTimeout]);

  const handleDropdownMouseLeave = useCallback(() => {
    if (!isMobileMenuOpen) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      const timeout = setTimeout(() => {
        setActiveDropdown(null);
        setHoveredItem(null);
      }, 500); // 0.5 second delay
      setHoverTimeout(timeout);
    }
  }, [isMobileMenuOpen, hoverTimeout]);

  const handleNavItemMouseEnter = useCallback((title: string) => {
    setHoveredItem(title);
  }, []);

  const handleNavItemMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const handleNavItemClick = useCallback((title: string, href: string, e?: React.MouseEvent) => {
    e?.preventDefault(); // Prevent default only if event exists
    
    // Close dropdowns and mobile menu
    setActiveDropdown(null);
    setActiveTopDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Use Next.js router for navigation after state updates
    setTimeout(() => {
      router.push(href);
    }, 0);
  }, [router]);

  const handleTopDropdownToggle = useCallback((title: string) => {
    if (topHoverTimeout) {
      clearTimeout(topHoverTimeout);
      setTopHoverTimeout(null);
    }
    setActiveTopDropdown(activeTopDropdown === title ? null : title);
    setActiveDropdown(null);
  }, [activeTopDropdown, topHoverTimeout]);

  const handleTopDropdownMouseEnter = useCallback((title: string) => {
    if (topHoverTimeout) {
      clearTimeout(topHoverTimeout);
      setTopHoverTimeout(null);
    }
    setActiveTopDropdown(title);
    setActiveDropdown(null);
  }, [topHoverTimeout]);

  const handleTopDropdownMouseLeave = useCallback(() => {
    if (topHoverTimeout) {
      clearTimeout(topHoverTimeout);
    }
    const timeout = setTimeout(() => {
      setActiveTopDropdown(null);
    }, 2000); // 2 second delay
    setTopHoverTimeout(timeout);
  }, [topHoverTimeout]);

  const handleLogoClick = useCallback(() => {
    setActiveDropdown(null);
    setActiveTopDropdown(null);
    router.push('/');
  }, [router]);

  // Updated handleMobileItemClick to handle dropdowns properly
  const handleMobileItemClick = useCallback((item: NavigationItem) => {
    // If item has dropdown content, toggle the dropdown instead of navigating
    if (item.dropdownContent) {
      setMobileDropdownOpen(mobileDropdownOpen === item.title ? null : item.title);
    } else {
      // If no dropdown content, navigate to the page
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
      setActiveTopDropdown(null);
      setMobileDropdownOpen(null);
      router.push(item.href);
    }
  }, [router, mobileDropdownOpen]);

  // FIXED: Updated handleDropdownLinkClick to navigate AND close dropdown
  const handleDropdownLinkClick = useCallback((href: string) => {
    setActiveDropdown(null);
    setActiveTopDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(null);
    router.push(href);
  }, [router]);

  // Fixed mobile link click handler
  const handleMobileLinkClick = useCallback((href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveTopDropdown(null);
    setMobileDropdownOpen(null);
    router.push(href);
  }, [router]);

  // Handle mobile dropdown link click
  const handleMobileDropdownLinkClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveTopDropdown(null);
    setMobileDropdownOpen(null);
    router.push(href);
  }, [router]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

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
                    onMouseEnter={() => handleTopDropdownMouseEnter(item.title)}
                    onMouseLeave={handleTopDropdownMouseLeave}
                    className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <span>{item.title}</span>
                    <ChevronDownIcon className="w-3 h-3" />
                  </button>
                  {activeTopDropdown === item.title && (
                    <div 
                      className="top-dropdown-menu fixed top-10 left-0 w-full bg-white text-gray-900 shadow-xl z-50 border-t border-gray-200 dropdown-enter navbar-dropdown"
                      onMouseEnter={() => handleTopDropdownMouseEnter(item.title)}
                      onMouseLeave={handleTopDropdownMouseLeave}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-5 gap-6">
                          {item.items.map((subItem: TopNavItem, index: number) => (
                            <div key={index} className="group">
                              <Link
                                href={subItem.href}
                                onClick={() => handleDropdownLinkClick(subItem.href)}
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
                              </Link>
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
                    <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">Worldwide</Link>
                    <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">Asia Pacific</Link>
                    <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">Europe</Link>
                    <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200">North America</Link>
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
              <button onClick={handleLogoClick} className="focus:outline-none">
                <Image
                  src="/huaweilogo-new.png"
                  alt="Huawei"
                  width={isScrolled ? 100 : 120}
                  height={isScrolled ? 30 : 40}
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-6 w-auto' : 'h-8 w-auto'
                  }`}
                  priority
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.title} className="relative dropdown-container">
                  {item.dropdownContent ? (
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      onMouseEnter={() => handleDropdownMouseEnter(item.title)}
                      onMouseLeave={handleDropdownMouseLeave}
                      className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                        activePage === item.title || activeDropdown === item.title || hoveredItem === item.title
                          ? 'text-red-600'
                          : 'text-gray-700 hover:text-red-600'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                      {/* Active/Hover Underline */}
                      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-all duration-200 ${
                        activePage === item.title || activeDropdown === item.title || hoveredItem === item.title
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0'
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavItemClick(item.title, item.href, e)}
                      onMouseEnter={() => handleNavItemMouseEnter(item.title)}
                      onMouseLeave={handleNavItemMouseLeave}
                      className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                        activePage === item.title || hoveredItem === item.title
                          ? 'text-red-600'
                          : 'text-gray-700 hover:text-red-600'
                      }`}
                    >
                      <span>{item.title}</span>
                      {/* Active/Hover Underline */}
                      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-all duration-200 ${
                        activePage === item.title || hoveredItem === item.title
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0'
                      }`} />
                    </Link>
                  )}

                  {/* Dropdown Menu - Only show for items that have dropdownContent */}
                  {activeDropdown === item.title && item.dropdownContent && (
                    <div
                      className="dropdown-menu fixed left-0 w-full bg-white shadow-xl z-50 border-t border-gray-200 dropdown-enter navbar-dropdown"
                      style={{ top: isScrolled ? '64px' : '104px' }}
                      onMouseEnter={() => handleDropdownMouseEnter(item.title)}
                      onMouseLeave={handleDropdownMouseLeave}
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
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 block py-2"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDropdownLinkClick(subItem.href);
                                      }}
                                    >
                                      {subItem.name}
                                    </Link>
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
                                <Link
                                  key={linkIndex}
                                  href={link.href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDropdownLinkClick(link.href);
                                  }}
                                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 group"
                                >
                                  {link.name}
                                  {link.external && (
                                    <svg 
                                      className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" 
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </Link>
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
                  aria-label="Search"
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
                          autoFocus
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
                  setMobileDropdownOpen(null);
                }}
                className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg 
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto mobile-menu">
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.title} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => handleMobileItemClick(item)}
                    className={`w-full flex items-center justify-between py-3 text-sm font-medium transition-colors duration-200 relative ${
                      activePage === item.title ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                    }`}
                  >
                    <span className="relative">
                      {item.title}
                      {/* Underline for active item */}
                      {activePage === item.title && (
                        <div className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-red-600" />
                      )}
                    </span>
                    {item.dropdownContent && (
                      <ChevronDownIcon 
                        className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                          mobileDropdownOpen === item.title ? 'rotate-180' : 'rotate-0'
                        }`} 
                      />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown Content */}
                  {item.dropdownContent && mobileDropdownOpen === item.title && (
                    <div className="pb-4 pl-4 space-y-3 bg-gray-50 rounded-lg mt-2">
                      {item.dropdownContent.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-900 mt-3 first:mt-1">
                            {section.title}
                          </h4>
                          <ul className="space-y-1 pl-2">
                            {section.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <button
                                  onClick={() => handleMobileDropdownLinkClick(subItem.href)}
                                  className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 block py-1 w-full text-left"
                                >
                                  {subItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      
                      {/* Mobile Dropdown Bottom Links */}
                      {item.dropdownContent.links && (
                        <div className="pt-3 border-t border-gray-200 mt-4">
                          {item.dropdownContent.links.map((link, linkIndex) => (
                            <button
                              key={linkIndex}
                              onClick={() => handleMobileDropdownLinkClick(link.href)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 group"
                            >
                              {link.name}
                              {link.external && (
                                <svg 
                                  className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
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