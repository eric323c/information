document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Placeholder login credentials for validation
    const validUsername = "admin";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // Redirect after successful login
    } else {
      errorMessage.textContent = "Invalid username or password. Please try again.";
      errorMessage.style.color = "red";
    }
  });
});
