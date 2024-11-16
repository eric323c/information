import { supabase } from './supabase.js';

// Sign Up User
export async function signUpUser(email, password, name, avatar_url = null) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          avatar_url,
        },
      },
    });

    if (error) throw error;

    alert('Sign up successful! Please check your email for verification.');
    return data;
  } catch (err) {
    alert(`Error signing up: ${err.message}`);
    console.error(err);
  }
}

// Log In User
export async function logInUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    alert('Login successful!');
    return data;
  } catch (err) {
    alert(`Error logging in: ${err.message}`);
    console.error(err);
  }
}

// Log Out User
export async function logOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    alert('Logged out successfully!');
  } catch (err) {
    alert(`Error logging out: ${err.message}`);
    console.error(err);
  }
}
