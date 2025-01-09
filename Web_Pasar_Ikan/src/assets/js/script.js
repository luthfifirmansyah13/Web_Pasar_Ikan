document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const signInBtn = document.querySelector('.sign-in-btn');
    
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

    // Add loading state to button
    function setLoading(isLoading) {
        if (isLoading) {
            signInBtn.innerHTML = '<div class="loading-spinner"></div>';
            signInBtn.disabled = true;
        } else {
            signInBtn.innerHTML = 'Sign In';
            signInBtn.disabled = false;
        }
    }

    // Show message function
    function showMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        loginForm.insertBefore(messageDiv, loginForm.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (emailInput.value === 'demo@example.com' && passwordInput.value === 'password') {
                showMessage('success', 'Login successful!');
                // Store email if remember me is checked
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', emailInput.value);
                }
                
                // Redirect after success message
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage('error', 'Invalid email or password');
            }
        } catch (error) {
            showMessage('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    });

    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
});document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Check if there are stored credentials
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
        emailInput.value = storedEmail;
        rememberMeCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const email = emailInput.value;
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;

        // Store email if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, rememberMe });
        
        // For demo purposes, show success message
        alert('Login successful!');
    });
});
