"use client";
import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" }
      ]
    },
    {
      title: "Products",
      links: [
        { name: "HUAWEI eKit", href: "/products/ekit" },
        { name: "All Products", href: "/products" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "Intelligent Office", href: "/solution/it-office" },
        { name: "Intelligent Business", href: "/solution/it-business" },
        { name: "Intelligent Education", href: "/solution/it-education" },
        { name: "Intelligent Healthcare", href: "/solution/it-health" },
      ]
    },
    {
      title: "Contact Information",
      isContact: true
    }
  ];

  const bottomLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Statement", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
    { name: "Cookie Settings", href: "/cookie-settings" }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "Address",
      value: "Bantian, Longgang District, Shenzhen 518129, P.R. China",
      url: "https://maps.google.com/?q=Bantian,Longgang+District,Shenzhen,518129,China",
      type: "map"
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      value: "contact@huawei.com",
      url: "mailto:contact@huawei.com",
      type: "email"
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Phone",
      value: "+86 755 28780808",
      url: "tel:+8675528780808",
      type: "phone"
    }
  ];

  const socialIcons = [
    { 
      icon: <Facebook className="w-4 h-4" />, 
      href: "https://www.facebook.com/Huawei", 
      label: "Facebook" 
    },
    { 
      icon: <Instagram className="w-4 h-4" />, 
      href: "https://www.instagram.com/huawei/", 
      label: "Instagram" 
    },
    { 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 2.038c5.458 0 9.883 4.425 9.883 9.883 0 5.458-4.425 9.883-9.883 9.883S2.134 17.379 2.134 11.921c0-5.458 4.425-9.883 9.883-9.883zm0 1.8c-4.458 0-8.083 3.625-8.083 8.083s3.625 8.083 8.083 8.083 8.083-3.625 8.083-8.083-3.625-8.083-8.083-8.083zm-2.4 10.8h4.8v1.2h-4.8v-1.2zm0-2.4h4.8v1.2h-4.8v-1.2zm0-2.4h4.8v1.2h-4.8v-1.2z"/>
        </svg>
      ), 
      href: "https://www.threads.net/@huawei", 
      label: "Threads" 
    }
  ];

  // Function to handle internal navigation
  const handleInternalLink = (href: string) => {
    console.log(`Navigating to: ${href}`);
    window.location.href = href;
  };

  // Function to handle external link clicks
  const handleExternalLink = (url: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Logo and Follow Section */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <div className="mb-4">
                <div 
                  className="flex items-center cursor-pointer hover:cursor-pointer" 
                  onClick={() => handleInternalLink("/")}
                >
                  <div className="w-10 h-7 bg-red-600 flex items-center justify-center rounded">
                    <span className="text-white font-bold text-sm">华为</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900 hover:cursor-pointer">HUAWEI</span>
                </div>
              </div>

              {/* Social Media Icons - EXTERNAL LINKS */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
                  Follow Us
                </h3>
                <div className="flex space-x-3">
                  {socialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      onClick={(e) => handleExternalLink(social.href, e)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors duration-200 hover:cursor-pointer"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
                  {section.title}
                </h3>
                {section.isContact ? (
                  <div className="space-y-3">
                    {contactInfo.map((contact, contactIndex) => (
                      <div key={contactIndex} className="flex items-start space-x-2">
                        <div className="text-red-600 mt-0.5 flex-shrink-0">
                          {contact.icon}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {contact.label}
                          </p>
                          {/* Contact Info - EXTERNAL LINKS with direct actions */}
                          {contact.type === 'email' || contact.type === 'phone' || contact.type === 'map' ? (
                            <a
                              href={contact.url}
                              className="text-xs text-gray-600 hover:text-red-600 mt-0.5 leading-tight block transition-colors duration-200 hover:cursor-pointer"
                              onClick={(e) => {
                                if (contact.type === 'email' || contact.type === 'phone') {
                                  return;
                                }
                                handleExternalLink(contact.url, e);
                              }}
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <button
                              onClick={() => handleInternalLink(contact.url)}
                              className="text-xs text-gray-600 hover:text-red-600 mt-0.5 leading-tight block transition-colors duration-200 hover:cursor-pointer text-left"
                            >
                              {contact.value}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {section.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button 
                          onClick={() => handleInternalLink(link.href)}
                          className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 block hover:cursor-pointer"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <div className="mb-3 md:mb-0">
              <p className="text-xs text-gray-500">
                Copyright © Huawei Technologies Co., Ltd. 1998–2025 All Rights Reserved.
              </p>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap items-center space-x-4">
              {bottomLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <button 
                    onClick={() => handleInternalLink(link.href)}
                    className="text-xs text-gray-500 hover:text-red-600 transition-colors duration-200 hover:cursor-pointer"
                  >
                    {link.name}
                  </button>
                  {index < bottomLinks.length - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;