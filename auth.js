import { supabase } from './supabase.js';

// Login Functionality
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  const loginMessage = document.getElementById('loginMessage');
  if (error) {
    loginMessage.textContent = `Error: ${error.message}`;
    loginMessage.style.color = 'red';
  } else {
    loginMessage.textContent = 'Login successful!';
    loginMessage.style.color = 'green';
    closeModal();
  }
});

// Sign-Up Functionality
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const { error } = await supabase.auth.signUp({ email, password });

  const signupMessage = document.getElementById('signupMessage');
  if (error) {
    signupMessage.textContent = `Error: ${error.message}`;
    signupMessage.style.color = 'red';
  } else {
    signupMessage.textContent = 'Sign-Up successful! Please check your email.';
    signupMessage.style.color = 'green';
    toggleAuth('login');
  }
});
