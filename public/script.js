document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const registerForm = document.querySelector('#registerForm');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    const phone = document.querySelector('#phone');

    const loginForm = document.querySelector('#loginForm');
    const loginEmail = document.querySelector('#loginemail');
    const loginPassword = document.querySelector('#loginpassword');
    const successMessage = document.querySelector('#successMessage');

    if (registerForm) {
        console.log('Register form found');
        registerForm.addEventListener('submit', (event) => {
            let valid = true;
            let errorMessages = [];
    
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
            // Validate name
            if (!validateName(name.value)) {
                document.getElementById('nameError').textContent = 'Name must contain only letters';
                valid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }
    
            // Validate email, password, etc. (similar approach)
    
            if (!valid) {
                console.log('Validation failed:', errorMessages);
                event.preventDefault();  // Prevent form submission on error
            } else {
                window.alert('Registration completed!');
            }
        });
    }
    
    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', (event) => {
            let valid = true;
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (!validateEmail(loginEmail.value)) {
                if (successMessage) {
                    successMessage.textContent = 'Incorrect email';
                    successMessage.style.color = 'red';
                }
                valid = false;
            }
            if (!validateLogin(loginEmail.value, loginPassword.value)) {
                if (successMessage) {
                    successMessage.textContent = 'Incorrect email or password';
                    successMessage.style.color = 'red';
                }
                valid = false;
            }

            if (valid) {
                if (successMessage) {
                    successMessage.textContent = 'Login successful!';
                    successMessage.style.color = 'green';
                }
                event.preventDefault();
            } else {
                event.preventDefault();
            }
        });
    }

    function validateName(name) {
        const re = /^[A-Za-z\s'-]+$/;
        return re.test(name);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    function validatePhone(phone) {
        const re = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}$/;
        return re.test(phone);
    }

    function validateLogin(email, password) {
        const predefinedLogins = [
            { email: 'test@example.com', password: 'Password123!' },
            { email: 'user@example.com', password: 'SecurePass456$' }
        ];
        return predefinedLogins.some(login => login.email === email && login.password === password);
    }

    function adjustFontSize() {
        document.body.style.fontSize = window.innerWidth < 600 ? '14px' : '16px';
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
});