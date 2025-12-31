// 1. Select the HTML elements we need
const loginForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 2. Listen for the "Submit" event (when user clicks Login)
loginForm.addEventListener('submit', function(event) {
    
    // Stop the browser from reloading the page immediately
    event.preventDefault();

    // Reset errors (remove red borders from previous tries)
    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    let isValid = true;

    // 3. Validation Logic
    
    // Check Username
    if (usernameInput.value.trim() === "") {
        // 'is-invalid' is a Bootstrap class that turns the border red automatically
        usernameInput.classList.add('is-invalid'); 
        isValid = false;
    }

    // Check Password
    if (passwordInput.value.trim() === "") {
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }

    /// 4. Final Result
    if (isValid) {
        
        window.location.href = "../Dashboard/index.html"; 
    }
});