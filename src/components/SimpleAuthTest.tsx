import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export const SimpleAuthTest = () => {
  const { signUp, signIn, user, profile, loading } = useAuth()
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('password123')
  const [firstName, setFirstName] = useState('Test')
  const [lastName, setLastName] = useState('User')
  const [result, setResult] = useState('')

  const testSignUp = async () => {
    setResult('Testing signup...')
    try {
      const result = await signUp(email, password, firstName, lastName)
      if (result.error) {
        setResult(`Signup error: ${result.error.message}`)
      } else {
        setResult('Signup successful!')
      }
    } catch (error) {
      setResult(`Signup exception: ${error}`)
    }
  }

  const testSignIn = async () => {
    setResult('Testing signin...')
    try {
      const result = await signIn(email, password)
      if (result.error) {
        setResult(`Signin error: ${result.error.message}`)
      } else {
        setResult('Signin successful!')
      }
    } catch (error) {
      setResult(`Signin exception: ${error}`)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-blue-600 mb-3">Auth Test</h3>
      
      <div className="space-y-2 mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded text-sm"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="p-2 border rounded text-sm"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="p-2 border rounded text-sm"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={testSignUp}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Sign Up
        </button>
        <button
          onClick={testSignIn}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Sign In
        </button>
      </div>

      <div className="text-xs space-y-1">
        <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
        <div><strong>User:</strong> {user ? user.email : 'None'}</div>
        <div><strong>Profile:</strong> {profile ? `${profile.first_name} ${profile.last_name}` : 'None'}</div>
      </div>
      
      <div className="text-xs bg-gray-100 p-2 rounded mt-2 max-h-20 overflow-y-auto">
        {result}
      </div>
    </div>
  )
}
