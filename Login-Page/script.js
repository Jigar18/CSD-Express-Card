
const loginForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');


loginForm.addEventListener('submit', function (event) {


    event.preventDefault();


    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    let isValid = true;




    if (usernameInput.value.trim() === "") {

        usernameInput.classList.add('is-invalid');
        isValid = false;
    }


    if (passwordInput.value.trim() === "") {
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }


    if (isValid) {

        window.location.href = "../Dashboard/index.html";
    }
});