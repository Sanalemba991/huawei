"use client";
import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Products", href: "/products" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Products",
      links: [
        { name: "HUAWEI eKit", href: "/products/ekit" },
        { name: "HUAWEI Camera", href: "/products/camera" },
      
      ]
    },
    {
      title: "Contact",
      isContact: true
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-3.5 h-3.5" />,
      value: "25th St - Naif - Dubai - United Arab Emirates",
      url: "https://maps.app.goo.gl/v8L9XJ9t6rRzYUDJ7"
    },
    {
      icon: <Mail className="w-3.5 h-3.5" />,
      value: "mail@ekit-huawei-uae.com",
      url: "mailto:mail@ekit-huawei-uae.com"
    },
    {
      icon: <Phone className="w-3.5 h-3.5" />,
      value: "+0097150966 4956",
      url: "tel:+0097150966 4956"
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
    }
  ];

  const handleInternalLink = (href: string) => {
    console.log(`Navigating to: ${href}`);
    window.location.href = href;
  };

  const handleExternalLink = (url: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Section */}
            <div className="space-y-4">
              <div 
                className="flex items-center cursor-pointer hover:cursor-pointer" 
                onClick={() => handleInternalLink("/")}
              >
                <div className="w-8 h-6 bg-red-600 flex items-center justify-center rounded-sm">
                  <span className="text-white font-bold text-xs">华为</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">HUAWEI</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                UAE Distributor for innovative Huawei eKit solutions and enterprise digital transformation.
              </p>

              {/* Social Media Icons */}
              
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {section.title}
                </h3>
                
                {section.isContact ? (
                  <div className="space-y-3">
                    {contactInfo.map((contact, contactIndex) => (
                      <div key={contactIndex} className="flex items-center">
                        <div className="text-red-600 mr-2 flex-shrink-0">
                          {contact.icon}
                        </div>
                        <a
                          href={contact.url}
                          className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 hover:cursor-pointer"
                          onClick={(e) => {
                            if (contact.url.includes('maps.google')) {
                              handleExternalLink(contact.url, e);
                            }
                          }}
                        >
                          {contact.value}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {section.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button 
                          onClick={() => handleInternalLink(link.href)}
                          className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 text-left hover:cursor-pointer"
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
        <div className="border-t border-gray-100 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-500">
              © 2025 Huawei Technologies Co., Ltd. All Rights Reserved.
            </p>
            
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 text-xs">
              <button 
                onClick={() => handleInternalLink('/contact')}
                className="text-gray-500 hover:text-red-600 transition-colors duration-200 hover:cursor-pointer"
              >
                Terms of Service
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => handleInternalLink('/privacy')}
                className="text-gray-500 hover:text-red-600 transition-colors duration-200 hover:cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => handleInternalLink('/cookies')}
                className="text-gray-500 hover:text-red-600 transition-colors duration-200 hover:cursor-pointer"
              >
               Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;