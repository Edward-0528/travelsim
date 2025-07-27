import React, { useState } from 'react';
import { Menu, X, Smartphone, User, LogOut, Package } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../AuthModal';
import { OrderHistoryModal } from '../OrderHistoryModal';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const { t } = useLanguage();
  const { user, profile, signOut } = useAuth();

  const handleSignUp = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              GoUSA
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <a href="#home" className="text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              {t.nav.home}
            </a>
            <a href="#plans" className="text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              {t.nav.plans}
            </a>
            <a href="#coverage" className="text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              {t.nav.coverage}
            </a>
            <a href="#comparison" className="text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              {t.nav.comparison}
            </a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {profile?.first_name || user.email}
                  </span>
                </div>
                <button 
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <Package className="h-4 w-4" />
                  <span>Orders</span>
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleSignIn}
                  className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  {t.nav.login}
                </button>
                <button 
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t.nav.signup}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-primary-50">
              <a href="#home" className="text-gray-700 hover:text-primary-600 hover:bg-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200">
                {t.nav.home}
              </a>
              <a href="#plans" className="text-gray-700 hover:text-primary-600 hover:bg-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200">
                {t.nav.plans}
              </a>
              <a href="#coverage" className="text-gray-700 hover:text-primary-600 hover:bg-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200">
                {t.nav.coverage}
              </a>
              <a href="#comparison" className="text-gray-700 hover:text-primary-600 hover:bg-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200">
                {t.nav.comparison}
              </a>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="space-y-2">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2 px-4 py-3 text-gray-700">
                        <User className="h-5 w-5" />
                        <span className="text-base font-medium">
                          {profile?.first_name || user.email}
                        </span>
                      </div>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 hover:bg-white px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleSignIn}
                        className="text-gray-700 hover:text-primary-600 hover:bg-white block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200"
                      >
                        {t.nav.login}
                      </button>
                      <button 
                        onClick={handleSignUp}
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white block px-4 py-3 rounded-lg text-base font-semibold w-full text-left transition-all duration-200 shadow-lg"
                      >
                        {t.nav.signup}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Order History Modal */}
      <OrderHistoryModal 
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
      />
    </header>
  );
};
