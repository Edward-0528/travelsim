import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50"></div>
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:pr-8 space-y-8">
            <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              ✨ New: 5G Network Coverage Available
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                Stay Connected
              </span>
              <br />
              <span className="text-gray-900">While Traveling</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
              {t.hero.subtitle}
            </p>
            
            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { text: t.plans.features.unlimitedTalk, color: 'text-primary-600' },
                { text: t.plans.features.unlimitedText, color: 'text-secondary-600' },
                { text: t.plans.features.unlimitedData, color: 'text-accent-600' },
                { text: t.plans.features.usCoverage, color: 'text-electric-600' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                  <CheckCircle className={`h-5 w-5 ${feature.color} mr-3 flex-shrink-0`} />
                  <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-primary-500/25 transform hover:-translate-y-1">
                <span className="relative z-10">{t.hero.ctaButton}</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="inline-flex items-center justify-center border-2 border-primary-300 text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Visual/Interactive Section */}
          <div className="lg:pl-8">
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
              
              {/* Main card */}
              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-3xl"></div>
                
                <div className="relative z-10">
                  {/* Plan header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      🔥 Most Popular
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                      {t.plans.price}
                    </div>
                    <div className="text-lg text-gray-600 font-medium">{t.plans.duration}</div>
                  </div>

                  {/* Features with colorful icons */}
                  <div className="space-y-4 mb-8">
                    {[
                      { text: t.plans.features.unlimitedTalk, gradient: 'from-primary-500 to-primary-600', emoji: '📞' },
                      { text: t.plans.features.unlimitedText, gradient: 'from-secondary-500 to-secondary-600', emoji: '💬' },
                      { text: t.plans.features.unlimitedData, gradient: 'from-accent-500 to-accent-600', emoji: '🚀' },
                      { text: t.plans.features.usCoverage, gradient: 'from-electric-500 to-electric-600', emoji: '🗺️' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center group">
                        <div className={`bg-gradient-to-r ${feature.gradient} rounded-lg p-2 mr-4 group-hover:scale-110 transition-transform duration-200`}>
                          <span className="text-white text-lg">{feature.emoji}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{feature.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action button */}
                  <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-4 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    {t.plans.buyNow} ✨
                  </button>
                  
                  {/* Trust indicators */}
                  <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span>4.9/5 Rating</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div>500K+ Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
