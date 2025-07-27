import React, { useState } from 'react';
import { Phone, MessageSquare, Wifi, MapPin, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface PlansSectionProps {
  setIsCheckoutOpen?: (open: boolean) => void
}

export const PlansSection: React.FC<PlansSectionProps> = ({ 
  setIsCheckoutOpen: setExternalCheckoutOpen 
}) => {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const [, setIsLocalCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Use external checkout control if provided, otherwise use local state
  const setIsCheckoutOpen = setExternalCheckoutOpen || setIsLocalCheckoutOpen

  const handleBuyNow = () => {
    if (!user) {
      // User not logged in, show auth modal
      setIsAuthModalOpen(true);
    } else if (!profile?.onboarding_completed) {
      // User logged in but hasn't completed onboarding
      alert('Please complete your travel setup first. The onboarding form will appear automatically.');
    } else {
      // User ready for checkout
      setIsCheckoutOpen(true);
    }
  };

  const features = [
    {
      icon: Phone,
      title: t.plans.features.unlimitedTalk,
      description: 'Crystal clear voice calls across the US',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100'
    },
    {
      icon: MessageSquare,
      title: t.plans.features.unlimitedText,
      description: 'Send unlimited SMS and MMS messages',
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50 to-secondary-100'
    },
    {
      icon: Wifi,
      title: t.plans.features.unlimitedData,
      description: 'Lightning-fast 5G speeds nationwide',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100'
    },
    {
      icon: MapPin,
      title: t.plans.features.usCoverage,
      description: 'Reliable coverage in all 50 states',
      gradient: 'from-electric-500 to-electric-600',
      bgGradient: 'from-electric-50 to-electric-100'
    }
  ];

  return (
    <section id="plans" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-accent-200 to-electric-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-6 py-3 rounded-full text-sm font-semibold shadow-sm mb-6">
            💎 Premium Travel Plan
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {t.plans.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The ultimate connectivity solution for modern travelers who demand the best
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Plan Card */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    <Star className="h-4 w-4 mr-2" />
                    Best Value
                  </div>
                </div>
                
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.plans.title}</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      {t.plans.price}
                    </span>
                    <div className="ml-4 text-left">
                      <div className="text-gray-600 text-lg">{t.plans.duration}</div>
                      <div className="text-gray-500 text-sm">One-time payment</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center group/item">
                      <div className={`bg-gradient-to-r ${feature.gradient} rounded-xl p-3 mr-6 group-hover/item:scale-110 transition-transform duration-200 shadow-lg`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg">{feature.title}</div>
                        <div className="text-gray-600">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-6 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center">
                    {t.plans.buyNow}
                    <span className="ml-2 text-2xl">🚀</span>
                  </span>
                </button>
                
                {/* Trust badges */}
                <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">🔒</span>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">📱</span>
                    <span>Instant Activation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300`}></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className={`bg-gradient-to-r ${feature.gradient} rounded-xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-center text-lg">{feature.title}</h4>
                    <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal for non-logged in users */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signup"
      />
    </section>
  );
};
