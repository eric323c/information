import { supabase } from './supabase.js'; // Import your Supabase client

// Open and Close Modal Functions
function openModal() {
  document.getElementById('authModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('authModal').style.display = 'none';
}

// Toggle Between Login and Register Forms
function toggleAuth(authType) {
  if (authType === 'register') {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('registerFormContainer').style.display = 'block';
  } else {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('registerFormContainer').style.display = 'none';
  }
}

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const loginMessage = document.getElementById('loginMessage');
  if (error) {
    loginMessage.textContent = `Error: ${error.message}`;
    loginMessage.style.color = 'red';
  } else {
    loginMessage.textContent = 'Login successful!';
    loginMessage.style.color = 'green';
    // Redirect to dashboard or perform other actions
    window.location.href = '/dashboard';
  }
});

// Handle Registration Form Submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  const signupMessage = document.getElementById('signupMessage');
  if (error) {
    signupMessage.textContent = `Error: ${error.message}`;
    signupMessage.style.color = 'red';
  } else {
    signupMessage.textContent = 'Signup successful! Please check your email to confirm.';
    signupMessage.style.color = 'green';
    toggleAuth('login'); // Switch back to login form
  }
});
