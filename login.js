// login.js

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    const correctPassword = "PsuMapa2017";

    if (passwordInput === correctPassword) {
        // Set a flag to indicate the user is logged in
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to the main page
        window.location.href = "index.html";
    } else {
        // Show error message if password is incorrect
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
    }
}
