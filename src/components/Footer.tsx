import React from 'react';
import { Smartphone, Facebook, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-electric-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center">
          {/* Company Info */}
          <div className="max-w-2xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg mr-3">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {t.footer.company}
              </span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Your trusted partner for staying connected while traveling in the United States. 
              Reliable, affordable, and hassle-free mobile connectivity with cutting-edge technology.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 p-3 rounded-lg transition-all duration-300 group">
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 p-3 rounded-lg transition-all duration-300 group">
                <Twitter className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 p-3 rounded-lg transition-all duration-300 group">
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 GoUSA. All rights reserved. Made with ❤️ for travelers.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
