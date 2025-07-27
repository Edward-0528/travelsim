import { useState } from 'react'
import { Calendar, Users, Smartphone, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

interface OnboardingProps {
  isOpen: boolean
  onComplete: () => void
  onOpenCheckout?: () => void
}

interface OnboardingData {
  startDate: string
  endDate: string
  numberOfSims: number
  imei: string
}

export const OnboardingModal: React.FC<OnboardingProps> = ({ isOpen, onComplete, onOpenCheckout }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    startDate: '',
    endDate: '',
    numberOfSims: 1,
    imei: ''
  })
  const { user } = useAuth()

  const steps = [
    {
      title: 'Travel Dates',
      icon: Calendar,
      description: 'When will you be traveling?'
    },
    {
      title: 'SIM Cards',
      icon: Users,
      description: 'How many SIM cards do you need?'
    },
    {
      title: 'Device Info',
      icon: Smartphone,
      description: 'Your device IMEI number'
    }
  ]

  const handleInputChange = (field: keyof OnboardingData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.startDate && data.endDate && new Date(data.startDate) <= new Date(data.endDate)
      case 2:
        return data.numberOfSims >= 1 && data.numberOfSims <= 10
      case 3:
        return data.imei.length >= 14 // IMEI is typically 15 digits, allow some flexibility
      default:
        return false
    }
  }

  const handleComplete = async () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      // Save onboarding data to profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          travel_start_date: data.startDate,
          travel_end_date: data.endDate,
          number_of_sims: data.numberOfSims,
          device_imei: data.imei,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error saving onboarding data:', error)
        alert('There was an error saving your information. Please try again.')
        return
      }

      // Success - complete onboarding and open checkout
      onComplete()
      
      // Small delay to ensure the onboarding modal closes first
      setTimeout(() => {
        if (onOpenCheckout) {
          onOpenCheckout()
        }
      }, 300)
    } catch (error) {
      console.error('Unexpected error during onboarding:', error)
      alert('There was an unexpected error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Welcome to GoUSA!
            </h2>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep
              const StepIcon = step.icon

              return (
                <div key={stepNumber} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  {stepNumber < steps.length && (
                    <div className={`w-12 h-1 mx-2 transition-all duration-200 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {/* Step 1: Travel Dates */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Start Date
                </label>
                <input
                  type="date"
                  value={data.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel End Date
                </label>
                <input
                  type="date"
                  value={data.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  min={data.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {data.startDate && data.endDate && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Trip Duration:</strong> {Math.ceil((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Your 7-day SIM plan will be activated on your travel start date.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Number of SIMs */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of SIM Cards
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => data.numberOfSims > 1 && handleInputChange('numberOfSims', data.numberOfSims - 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    disabled={data.numberOfSims <= 1}
                  >
                    -
                  </button>
                  <div className="px-6 py-3 bg-gray-50 rounded-lg text-center min-w-[80px]">
                    <span className="text-2xl font-bold text-gray-900">{data.numberOfSims}</span>
                  </div>
                  <button
                    onClick={() => data.numberOfSims < 10 && handleInputChange('numberOfSims', data.numberOfSims + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    disabled={data.numberOfSims >= 10}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Each SIM card costs $30 for 7 days of unlimited data
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Total Cost:</strong> ${data.numberOfSims * 30}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  All SIM cards will be activated simultaneously on your travel start date.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: IMEI */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device IMEI Number
                </label>
                <input
                  type="text"
                  value={data.imei}
                  onChange={(e) => handleInputChange('imei', e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter your device IMEI (15 digits)"
                  maxLength={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Find your IMEI by dialing *#06# on your phone or checking Settings → About
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Make sure your device is unlocked and compatible with T-Mobile network frequencies.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span>{isSubmitting ? 'Saving...' : 'Complete Setup'}</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
