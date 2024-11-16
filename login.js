document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const loginErrorMessage = document.getElementById("login-error-message");
  const signupErrorMessage = document.getElementById("signup-error-message");

  // Local storage for storing users
  const USERS_KEY = "users";
  const loadUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Handle Login
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const users = loadUsers();

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to index.html
    } else {
      loginErrorMessage.textContent = "Invalid username or password. Please try again.";
      loginErrorMessage.style.color = "red";
    }
  });

  // Handle Signup
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const users = loadUsers();

    if (users.some((u) => u.username === username)) {
      signupErrorMessage.textContent = "Username already exists. Please try a different one.";
      signupErrorMessage.style.color = "red";
    } else {
      users.push({ username, password });
      saveUsers(users);
      alert("Signup successful! You can now log in.");
      signupForm.reset();
    }
  });
});
