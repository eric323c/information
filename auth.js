import { supabase } from './supabase.js';

// Sign-Up User
export async function signUpUser(email, password, name = null) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error signing up:', err.message);
    return null;
  }
}

// Log-In User
export async function logInUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error logging in:', err.message);
    return null;
  }
}

