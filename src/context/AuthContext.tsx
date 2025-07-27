import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  loading: boolean
  needsOnboarding: boolean
  completeOnboarding: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
          
          // If this is a new user confirmation and no profile exists, create one
          if (event === 'SIGNED_IN' && !profile && session.user.user_metadata) {
            const { first_name, last_name } = session.user.user_metadata
            if (first_name && last_name) {
              await createProfile(
                session.user.id, 
                session.user.email || '', 
                first_name, 
                last_name
              )
              await fetchProfile(session.user.id)
            }
          }
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(data)
      // Check if user needs onboarding - handle both old and new database schemas
      // If onboarding_completed doesn't exist, assume they need onboarding
      const needsOnboardingCheck = data.hasOwnProperty('onboarding_completed') 
        ? !data.onboarding_completed 
        : true // New users without the column need onboarding
      setNeedsOnboarding(needsOnboardingCheck)
    } catch (error) {
      console.error('Error fetching profile:', error)
      // If there's an error fetching profile, assume new user needs onboarding
      setNeedsOnboarding(true)
    }
  }

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true)
      
      // Sign up the user without email confirmation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // Disable email confirmation
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })

      if (authError) {
        return { error: authError }
      }

      // Check if user was created and signed in immediately
      if (authData.user && authData.session) {
        // Profile will be automatically created by database trigger
        // Fetch the profile to update state
        await fetchProfile(authData.user.id)
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error during signup:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (userId: string, email: string, firstName: string, lastName: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert([
          {
            id: userId,
            email: email,
            first_name: firstName,
            last_name: lastName,
            updated_at: new Date().toISOString(),
          }
        ], {
          onConflict: 'id'
        })

      if (error) {
        console.error('Error creating profile:', error)
      }
    } catch (error) {
      console.error('Error creating profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const completeOnboarding = async () => {
    setNeedsOnboarding(false)
    // Refresh profile to get updated data
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      
      // Clear local state first for immediate UI update
      setUser(null)
      setProfile(null)
      setSession(null)
      setNeedsOnboarding(false)
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Error during sign out:', error)
        // Even if Supabase signout fails, we've already cleared local state
      }
      
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
      // Ensure local state is cleared even if there's an error
      setUser(null)
      setProfile(null)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    profile,
    session,
    signUp,
    signIn,
    signOut,
    loading,
    needsOnboarding,
    completeOnboarding,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
