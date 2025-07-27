import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LanguageSelector } from './components/layout/LanguageSelector'
import { Header } from './components/layout/Header'
import { HeroSection } from './components/HeroSection'
import { PlansSection } from './components/PlansSection'
import { NetworkMap } from './components/NetworkMap'
import { ComparisonTool } from './components/ComparisonTool'
import { Footer } from './components/Footer'
import { OnboardingModal } from './components/OnboardingModal'
import { CheckoutModal } from './components/CheckoutModal'

function AppContent() {
  const { needsOnboarding, completeOnboarding } = useAuth()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleOnboardingComplete = () => {
    completeOnboarding()
  }

  const handleOpenCheckoutFromOnboarding = () => {
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <LanguageSelector />
      <Header />
      <main>
        <HeroSection />
        <PlansSection 
          setIsCheckoutOpen={setIsCheckoutOpen}
        />
        <NetworkMap />
        <ComparisonTool />
      </main>
      <Footer />
      
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={needsOnboarding} 
        onComplete={handleOnboardingComplete}
        onOpenCheckout={handleOpenCheckoutFromOnboarding}
      />

      {/* Global Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
