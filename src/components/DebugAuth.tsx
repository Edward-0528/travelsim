import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const DebugAuth = () => {
  const [testEmail, setTestEmail] = useState('test@example.com')
  const [testPassword, setTestPassword] = useState('testpassword123')
  const [result, setResult] = useState('')

  const testSignup = async () => {
    console.log('Testing signup...')
    setResult('Testing signup...')
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            first_name: 'Test',
            last_name: 'User',
          }
        }
      })

      console.log('Signup result:', { data, error })
      
      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult(`Success! User ID: ${data.user?.id}, Session: ${data.session ? 'Yes' : 'No'}, Email confirmed: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`)
      }
    } catch (err) {
      console.error('Signup error:', err)
      setResult(`Unexpected error: ${err}`)
    }
  }

  const checkSettings = async () => {
    console.log('Checking Supabase settings...')
    setResult('Checking settings...')
    
    try {
      // Try to get current user
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Current user:', user)
      
      // Check if we can query the auth schema (this will tell us about settings)
      const { data, error } = await supabase.auth.getSession()
      console.log('Current session:', { data, error })
      
      setResult(`Current user: ${user ? user.email : 'None'}, Session: ${data.session ? 'Active' : 'None'}`)
    } catch (err) {
      console.error('Settings check error:', err)
      setResult(`Settings check error: ${err}`)
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-white border-2 border-red-500 p-4 rounded-lg shadow-lg z-50 max-w-md">
      <h3 className="font-bold text-red-600 mb-2">Debug Auth</h3>
      
      <div className="mb-2">
        <input
          type="email"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          placeholder="Test email"
          className="w-full p-1 border rounded mb-1"
        />
        <input
          type="password"
          value={testPassword}
          onChange={(e) => setTestPassword(e.target.value)}
          placeholder="Test password"
          className="w-full p-1 border rounded"
        />
      </div>
      
      <div className="flex gap-2 mb-2">
        <button
          onClick={testSignup}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Test Signup
        </button>
        <button
          onClick={checkSettings}
          className="bg-green-500 text-white px-2 py-1 rounded text-sm"
        >
          Check Settings
        </button>
      </div>
      
      <div className="text-xs bg-gray-100 p-2 rounded max-h-32 overflow-y-auto">
        <pre>{result}</pre>
      </div>
    </div>
  )
}
