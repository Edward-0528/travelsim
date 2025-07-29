// Test Supabase connection
import { supabase } from './supabaseConfig.js';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Supabase connection successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return { success: false, error: error.message };
  }
};

// Test sign up with minimal data
export const testSignUp = async () => {
  try {
    console.log('Testing sign up...');
    
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    console.log('Test signup credentials:', { email: testEmail, password: 'testpassword123' });
    
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });
    
    console.log('Test sign up result:', { data, error });
    
    if (error) {
      console.error('Detailed error:', {
        message: error.message,
        status: error.status,
        name: error.name,
        __isAuthError: error.__isAuthError
      });
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Test sign up failed:', error);
    return { success: false, error: error.message };
  }
};

// Test sign up with email confirmation disabled
export const testSignUpNoConfirmation = async () => {
  try {
    console.log('Testing sign up without email confirmation...');
    
    const testEmail = `noconfirm${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    console.log('Test signup credentials (no confirmation):', { email: testEmail });
    
    // This should work if email confirmation is disabled in Supabase
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        emailRedirectTo: undefined // Explicitly disable email confirmation
      }
    });
    
    console.log('Test sign up result (no confirmation):', { data, error });
    
    if (error) {
      console.error('Detailed error (no confirmation):', {
        message: error.message,
        status: error.status,
        name: error.name
      });
      return { success: false, error: error.message };
    }
    
    console.log('SUCCESS: User created without email confirmation!');
    return { success: true, data };
  } catch (error) {
    console.error('Test sign up failed (no confirmation):', error);
    return { success: false, error: error.message };
  }
};
