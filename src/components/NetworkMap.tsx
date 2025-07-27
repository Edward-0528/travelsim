import React from 'react';
import { MapPin, Signal, Users, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NetworkMap: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Signal,
      value: '99.5%',
      label: 'Network Reliability'
    },
    {
      icon: MapPin,
      value: '50',
      label: 'States Covered'
    },
    {
      icon: Users,
      value: '2M+',
      label: 'Happy Customers'
    },
    {
      icon: Award,
      value: '#1',
      label: 'Travel SIM Provider'
    }
  ];

  return (
    <section id="coverage" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.map.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.map.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* T-Mobile Network Partnership */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-12 text-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <div className="max-w-2xl mx-auto">
              {/* T-Mobile Partnership Badge */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full inline-flex items-center space-x-3 mb-6 shadow-lg">
                <Signal className="h-6 w-6" />
                <span className="font-bold text-lg">Powered by T-Mobile Network</span>
                <div className="w-2 h-2 bg-electric-400 rounded-full animate-pulse"></div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                America's Leading 5G Network
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                GoUSA partners with T-Mobile to deliver nationwide coverage you can trust. 
                Experience the same reliable network that millions of Americans depend on daily.
              </p>

              {/* Network Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                  <div className="bg-electric-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Signal className="h-6 w-6 text-electric-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">5G Speed</h4>
                  <p className="text-sm text-gray-600">Ultra-fast 5G in major cities and extended range everywhere</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                  <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Nationwide</h4>
                  <p className="text-sm text-gray-600">Coverage in all 50 states with 99.5% reliability</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                  <div className="bg-secondary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Award className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Trusted</h4>
                  <p className="text-sm text-gray-600">Award-winning network quality and customer satisfaction</p>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => window.open('https://www.t-mobile.com/coverage/coverage-map', '_blank')}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold inline-flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>View T-Mobile Coverage Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
