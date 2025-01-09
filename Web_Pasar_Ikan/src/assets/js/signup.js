document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signUpBtn = document.querySelector('.sign-in-btn');

    // Add password strength indicator
    function createPasswordStrengthIndicator() {
        const strengthDiv = document.createElement('div');
        strengthDiv.className = 'password-strength';
        const strengthBar = document.createElement('div');
        strengthBar.className = 'password-strength-bar';
        strengthDiv.appendChild(strengthBar);
        passwordInput.parentNode.appendChild(strengthDiv);
        return strengthBar;
    }

    const strengthBar = createPasswordStrengthIndicator();

    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        return strength;
    }

    passwordInput.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        strengthBar.style.width = `${strength}%`;
        if (strength < 50) {
            strengthBar.style.background = '#ff4444';
        } else if (strength < 75) {
            strengthBar.style.background = '#ffbb33';
        } else {
            strengthBar.style.background = '#00C851';
        }
    });

    // Real-time password confirmation check
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });

    // Add loading state to button
    function setLoading(isLoading) {
        if (isLoading) {
            signUpBtn.innerHTML = '<div class="loading-spinner"></div>';
            signUpBtn.disabled = true;
        } else {
            signUpBtn.innerHTML = 'Sign Up';
            signUpBtn.disabled = false;
        }
    }

    // Show message function
    function showMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        signupForm.insertBefore(messageDiv, signupForm.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate password strength
            const strength = checkPasswordStrength(passwordInput.value);
            if (strength < 75) {
                showMessage('error', 'Please choose a stronger password');
                return;
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showMessage('success', 'Account created successfully!');
            
            // Redirect after success message
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            showMessage('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    });

    // Add floating label behavior
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label) {
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });
});document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match!');
            return;
        }

        // Get form values
        const formData = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            rememberMe: rememberMeCheckbox.checked
        };

        // Store email if remember me is checked
        if (formData.rememberMe) {
            localStorage.setItem('rememberedEmail', formData.email);
        }

        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', formData);
        
        // For demo purposes, show success message and redirect
        alert('Signup successful!');
        window.location.href = 'index.html';
    });

    // Password validation
    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    }

    passwordInput.addEventListener('change', validatePassword);
    confirmPasswordInput.addEventListener('keyup', validatePassword);
});
