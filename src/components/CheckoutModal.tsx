import { useState, useEffect } from 'react'
import { ShoppingCart, Calendar, Smartphone, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

interface CheckoutProps {
  isOpen: boolean
  onClose: () => void
}

interface OrderSummary {
  numberOfSims: number
  tripDuration: number
  weeksNeeded: number
  baseSimsCost: number
  additionalWeeksCost: number
  totalCost: number
  startDate: string
  endDate: string
}

export const CheckoutModal: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { user, profile } = useAuth()
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')

  useEffect(() => {
    if (isOpen && profile) {
      calculateOrderSummary()
    }
  }, [isOpen, profile])

  const calculateOrderSummary = () => {
    if (!profile?.travel_start_date || !profile?.travel_end_date || !profile?.number_of_sims) {
      return
    }

    const startDate = new Date(profile.travel_start_date)
    const endDate = new Date(profile.travel_end_date)
    const tripDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const numberOfSims = profile.number_of_sims
    
    // Calculate weeks needed (7 days = 1 week, anything more requires additional weeks)
    const weeksNeeded = Math.ceil(tripDuration / 7)
    const baseWeeks = 1 // First week included in base price
    const additionalWeeks = Math.max(0, weeksNeeded - baseWeeks)
    
    // Pricing
    const baseSimPrice = 30 // $30 per SIM for first week
    const additionalWeekPrice = 15 // $15 per SIM per additional week
    
    const baseSimsCost = numberOfSims * baseSimPrice
    const additionalWeeksCost = numberOfSims * additionalWeeks * additionalWeekPrice
    const totalCost = baseSimsCost + additionalWeeksCost

    setOrderSummary({
      numberOfSims,
      tripDuration,
      weeksNeeded,
      baseSimsCost,
      additionalWeeksCost,
      totalCost,
      startDate: profile.travel_start_date,
      endDate: profile.travel_end_date
    })
  }

  const handleCheckout = async () => {
    if (!orderSummary || !user) return

    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create order record in database
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            number_of_sims: orderSummary.numberOfSims,
            trip_duration: orderSummary.tripDuration,
            weeks_needed: orderSummary.weeksNeeded,
            base_cost: orderSummary.baseSimsCost,
            additional_weeks_cost: orderSummary.additionalWeeksCost,
            total_cost: orderSummary.totalCost,
            travel_start_date: orderSummary.startDate,
            travel_end_date: orderSummary.endDate,
            payment_method: paymentMethod,
            status: 'completed',
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Error creating order:', error)
        // Continue anyway for demo purposes
      }

      setOrderComplete(true)
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetAndClose = () => {
    setOrderComplete(false)
    setIsProcessing(false)
    onClose()
  }

  if (!isOpen) return null

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your GoUSA SIM cards have been ordered successfully. You'll receive an email with tracking information and activation instructions.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-800">
                <strong>Activation Date:</strong> {new Date(orderSummary?.startDate || '').toLocaleDateString()}
              </p>
              <p className="text-sm text-green-800">
                <strong>Order Total:</strong> ${orderSummary?.totalCost}
              </p>
            </div>
            <button
              onClick={resetAndClose}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!orderSummary) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Complete Your Order
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Summary
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {/* Trip Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Trip Duration</span>
                </div>
                <span className="font-medium">{orderSummary.tripDuration} days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">SIM Cards</span>
                </div>
                <span className="font-medium">{orderSummary.numberOfSims}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Service Period</span>
                <span className="font-medium">{orderSummary.weeksNeeded} week{orderSummary.weeksNeeded > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Activation Date</span>
                <span className="font-medium">{new Date(orderSummary.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Itemized Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Breakdown</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
              {/* Base SIM Cost */}
              <div className="p-4 flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    GoUSA SIM Cards (First Week)
                  </p>
                  <p className="text-sm text-gray-500">
                    {orderSummary.numberOfSims} SIM{orderSummary.numberOfSims > 1 ? 's' : ''} × $30 each
                  </p>
                </div>
                <span className="font-semibold">${orderSummary.baseSimsCost}</span>
              </div>

              {/* Additional Weeks */}
              {orderSummary.additionalWeeksCost > 0 && (
                <div className="p-4 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Additional Service ({orderSummary.weeksNeeded - 1} week{orderSummary.weeksNeeded - 1 > 1 ? 's' : ''})
                    </p>
                    <p className="text-sm text-gray-500">
                      {orderSummary.numberOfSims} SIM{orderSummary.numberOfSims > 1 ? 's' : ''} × {orderSummary.weeksNeeded - 1} week{orderSummary.weeksNeeded - 1 > 1 ? 's' : ''} × $15 each
                    </p>
                  </div>
                  <span className="font-semibold">${orderSummary.additionalWeeksCost}</span>
                </div>
              )}

              {/* Total */}
              <div className="p-4 bg-gray-50 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-primary-600">${orderSummary.totalCost}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Method
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                </div>
              </label>
              
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                </div>
              </label>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">What's Included:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Unlimited data on T-Mobile network</li>
              <li>• No contracts or commitments</li>
              <li>• Free shipping to your address</li>
              <li>• 24/7 customer support</li>
              <li>• Activation on your travel start date</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Complete Order - ${orderSummary.totalCost}
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            By completing this order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
