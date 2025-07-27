export interface Translations {
  nav: {
    home: string;
    plans: string;
    coverage: string;
    comparison: string;
    login: string;
    signup: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaButton: string;
  };
  plans: {
    title: string;
    price: string;
    duration: string;
    features: {
      unlimitedTalk: string;
      unlimitedText: string;
      unlimitedData: string;
      usCoverage: string;
    };
    buyNow: string;
  };
  comparison: {
    title: string;
    provider: string;
    price: string;
    data: string;
    coverage: string;
    features: string;
  };
  map: {
    title: string;
    subtitle: string;
  };
  footer: {
    company: string;
    support: string;
    legal: string;
  };
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      plans: 'Plans',
      coverage: 'Coverage',
      comparison: 'Compare',
      login: 'Login',
      signup: 'Sign Up',
    },
    hero: {
      title: 'Stay Connected While Traveling in the US',
      subtitle: '7-day unlimited talk, text, and data for just $30',
      ctaButton: 'Get Your SIM Card',
    },
    plans: {
      title: '7-Day Travel Plan',
      price: '$30',
      duration: '7 Days',
      features: {
        unlimitedTalk: 'Unlimited Talk',
        unlimitedText: 'Unlimited Text',
        unlimitedData: 'Unlimited Data',
        usCoverage: 'US-wide Coverage',
      },
      buyNow: 'Buy Now',
    },
    comparison: {
      title: 'Compare with Other Providers',
      provider: 'Provider',
      price: 'Price',
      data: 'Data',
      coverage: 'Coverage',
      features: 'Features',
    },
    map: {
      title: 'Network Coverage',
      subtitle: 'See our extensive coverage across the United States',
    },
    footer: {
      company: 'GoUSA',
      support: 'Support',
      legal: 'Legal',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      plans: 'Planes',
      coverage: 'Cobertura',
      comparison: 'Comparar',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
    },
    hero: {
      title: 'Mantente Conectado Mientras Viajas en EE.UU.',
      subtitle: '7 días de llamadas, textos y datos ilimitados por solo $30',
      ctaButton: 'Obtén tu Tarjeta SIM',
    },
    plans: {
      title: 'Plan de Viaje de 7 Días',
      price: '$30',
      duration: '7 Días',
      features: {
        unlimitedTalk: 'Llamadas Ilimitadas',
        unlimitedText: 'Textos Ilimitados',
        unlimitedData: 'Datos Ilimitados',
        usCoverage: 'Cobertura en Todo EE.UU.',
      },
      buyNow: 'Comprar Ahora',
    },
    comparison: {
      title: 'Comparar con Otros Proveedores',
      provider: 'Proveedor',
      price: 'Precio',
      data: 'Datos',
      coverage: 'Cobertura',
      features: 'Características',
    },
    map: {
      title: 'Cobertura de Red',
      subtitle: 'Ve nuestra amplia cobertura en todo Estados Unidos',
    },
    footer: {
      company: 'GoUSA',
      support: 'Soporte',
      legal: 'Legal',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      plans: 'Plans',
      coverage: 'Couverture',
      comparison: 'Comparer',
      login: 'Se connecter',
      signup: "S'inscrire",
    },
    hero: {
      title: 'Restez Connecté en Voyageant aux États-Unis',
      subtitle: '7 jours d\'appels, SMS et données illimitées pour seulement 30$',
      ctaButton: 'Obtenez votre Carte SIM',
    },
    plans: {
      title: 'Plan de Voyage de 7 Jours',
      price: '30$',
      duration: '7 Jours',
      features: {
        unlimitedTalk: 'Appels Illimités',
        unlimitedText: 'SMS Illimités',
        unlimitedData: 'Données Illimitées',
        usCoverage: 'Couverture États-Unis',
      },
      buyNow: 'Acheter Maintenant',
    },
    comparison: {
      title: 'Comparer avec d\'Autres Fournisseurs',
      provider: 'Fournisseur',
      price: 'Prix',
      data: 'Données',
      coverage: 'Couverture',
      features: 'Fonctionnalités',
    },
    map: {
      title: 'Couverture Réseau',
      subtitle: 'Découvrez notre vaste couverture à travers les États-Unis',
    },
    footer: {
      company: 'GoUSA',
      support: 'Support',
      legal: 'Légal',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      plans: 'Tarife',
      coverage: 'Abdeckung',
      comparison: 'Vergleichen',
      login: 'Anmelden',
      signup: 'Registrieren',
    },
    hero: {
      title: 'Bleiben Sie Verbunden Während Ihrer USA-Reise',
      subtitle: '7 Tage unbegrenzte Anrufe, SMS und Daten für nur $30',
      ctaButton: 'Holen Sie sich Ihre SIM-Karte',
    },
    plans: {
      title: '7-Tage Reiseplan',
      price: '$30',
      duration: '7 Tage',
      features: {
        unlimitedTalk: 'Unbegrenzte Anrufe',
        unlimitedText: 'Unbegrenzte SMS',
        unlimitedData: 'Unbegrenzte Daten',
        usCoverage: 'USA-weite Abdeckung',
      },
      buyNow: 'Jetzt Kaufen',
    },
    comparison: {
      title: 'Vergleich mit Anderen Anbietern',
      provider: 'Anbieter',
      price: 'Preis',
      data: 'Daten',
      coverage: 'Abdeckung',
      features: 'Funktionen',
    },
    map: {
      title: 'Netzabdeckung',
      subtitle: 'Sehen Sie unsere umfassende Abdeckung in den USA',
    },
    footer: {
      company: 'GoUSA',
      support: 'Support',
      legal: 'Rechtliches',
    },
  },
  zh: {
    nav: {
      home: '首页',
      plans: '套餐',
      coverage: '覆盖',
      comparison: '比较',
      login: '登录',
      signup: '注册',
    },
    hero: {
      title: '在美国旅行时保持联系',
      subtitle: '7天无限通话、短信和数据，仅需$30',
      ctaButton: '获取您的SIM卡',
    },
    plans: {
      title: '7天旅行套餐',
      price: '$30',
      duration: '7天',
      features: {
        unlimitedTalk: '无限通话',
        unlimitedText: '无限短信',
        unlimitedData: '无限数据',
        usCoverage: '美国全境覆盖',
      },
      buyNow: '立即购买',
    },
    comparison: {
      title: '与其他运营商比较',
      provider: '运营商',
      price: '价格',
      data: '数据',
      coverage: '覆盖',
      features: '功能',
    },
    map: {
      title: '网络覆盖',
      subtitle: '查看我们在美国的广泛覆盖',
    },
    footer: {
      company: 'GoUSA',
      support: '支持',
      legal: '法律',
    },
  },
};
