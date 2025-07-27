import React, { useState } from 'react';
import { Check, X, Star, Trophy, Zap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Provider {
  name: string;
  price: string;
  data: string;
  coverage: string;
  logo: string;
  features: {
    unlimitedTalk: boolean;
    unlimitedText: boolean;
    unlimitedData: boolean;
    hotspot: boolean;
    international: boolean;
  };
  rating: number;
  popular?: boolean;
  highlight: string;
  gradient: string;
}

export const ComparisonTool: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const providers: Provider[] = [
    {
      name: 'GoUSA',
      price: '$30',
      data: 'Unlimited',
      coverage: '99.5%',
      logo: '🚀',
      features: {
        unlimitedTalk: true,
        unlimitedText: true,
        unlimitedData: true,
        hotspot: true,
        international: true,
      },
      rating: 4.9,
      popular: true,
      highlight: 'Best Value',
      gradient: 'from-primary-500 to-secondary-500'
    },
    {
      name: 'Verizon',
      price: '$65',
      data: 'Unlimited',
      coverage: '95%',
      logo: '📱',
      features: {
        unlimitedTalk: true,
        unlimitedText: true,
        unlimitedData: true,
        hotspot: true,
        international: false,
      },
      rating: 4.2,
      popular: false,
      highlight: 'Limited Hotpot',
      gradient: 'from-gray-400 to-gray-500'
    },
    {
      name: 'AT&T',
      price: '$65.99',
      data: 'Unlimited',
      coverage: '92%',
      logo: '🔵',
      features: {
        unlimitedTalk: true,
        unlimitedText: true,
        unlimitedData: true,
        hotspot: true,
        international: false,
      },
      rating: 3.8,
      popular: false,
      highlight: 'Limited Hotspot',
      gradient: 'from-gray-400 to-gray-500'
    },
    {
      name: 'Google Fi',
      price: '$50',
      data: 'Unlimited',
      coverage: '89%',
      logo: '🟢',
      features: {
        unlimitedTalk: true,
        unlimitedText: true,
        unlimitedData: true,
        hotspot: true,
        international: true,
      },
      rating: 4.0,
      popular: false,
      highlight: 'Limited Coverage',
      gradient: 'from-gray-400 to-gray-500'
    },
  ];

  const featuresList = [
    { key: 'unlimitedTalk', label: 'Unlimited Talk', icon: '📞' },
    { key: 'unlimitedText', label: 'Unlimited Text', icon: '💬' },
    { key: 'unlimitedData', label: 'Unlimited Data', icon: '🚀' },
    { key: 'hotspot', label: 'Mobile Hotspot', icon: '📶' },
    { key: 'international', label: 'International', icon: '🌍' },
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredProviders = selectedFeatures.length === 0
    ? providers
    : providers.filter(provider =>
        selectedFeatures.every(feature =>
          provider.features[feature as keyof typeof provider.features]
        )
      );

  return (
    <section id="comparison" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/20 to-electric-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-300 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            ⚡ Smart Comparison Tool
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              {t.comparison.title}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See why GoUSA offers the best value for your money with our side-by-side comparison
          </p>
        </div>

        {/* Feature Filters */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-300">Filter by Features:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {featuresList.map((feature) => (
              <button
                key={feature.key}
                onClick={() => toggleFeature(feature.key)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedFeatures.includes(feature.key)
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.label}
              </button>
            ))}
          </div>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProviders.map((provider, index) => (
            <div
              key={index}
              className={`relative group ${
                provider.popular ? 'transform scale-105 lg:scale-110' : ''
              }`}
            >
              {/* Glow effect for popular */}
              {provider.popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              )}
              
              <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 ${
                provider.popular
                  ? 'bg-white/10 border-primary-500/50 shadow-2xl'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}>
                {/* Popular badge */}
                {provider.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-accent-500 to-electric-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Trophy className="h-4 w-4 mr-2" />
                      Recommended
                    </div>
                  </div>
                )}

                {/* Provider header */}
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{provider.logo}</div>
                  <h3 className="text-2xl font-bold mb-2">{provider.name}</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className={`text-4xl font-bold ${
                      provider.popular 
                        ? 'bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent'
                        : 'text-gray-300'
                    }`}>
                      {provider.price}
                    </span>
                    <span className="ml-2 text-gray-400">/ 7 days</span>
                  </div>
                  
                  {/* Data & Coverage */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-secondary-400 mr-2" />
                      <span className="text-gray-300">{provider.data} Data</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-gray-300">{provider.coverage} Coverage</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(provider.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-500'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-300">{provider.rating}</span>
                    </div>
                  </div>

                  <div className={`text-sm font-medium ${
                    provider.popular ? 'text-primary-400' : 'text-gray-400'
                  }`}>
                    {provider.highlight}
                  </div>
                </div>

                {/* Features grid */}
                <div className="space-y-3 mb-8">
                  {featuresList.map(({ key, label, icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">{icon}</span>
                        <span className="text-gray-300 text-sm">{label}</span>
                      </div>
                      {provider.features[key as keyof typeof provider.features] ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                {provider.popular && (
                  <button className="w-full font-bold py-4 rounded-2xl transition-all duration-300 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                    <span className="flex items-center justify-center">
                      {t.plans.buyNow}
                      <Zap className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No providers match your selected features</div>
            <button
              onClick={() => setSelectedFeatures([])}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-300 px-6 py-3 rounded-full text-sm mb-6">
            💡 Pro Tip: GoUSA offers the best value with unlimited everything!
          </div>
        </div>
      </div>
    </section>
  );
};
