// Function to check if the entered password is correct
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    const correctPassword = "PsuMapa2017";
    
    if (passwordInput === correctPassword) {
        // Password is correct, redirect to the main page
        window.location.href = "index.html"; // Ensure this points to your main content HTML file
    } else {
        // Password is incorrect, show error message
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
    }
}
