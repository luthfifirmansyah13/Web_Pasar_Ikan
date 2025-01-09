document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.sign-in-btn');

    // Add loading state to button
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            submitBtn.disabled = true;
        } else {
            submitBtn.innerHTML = 'Submit';
            submitBtn.disabled = false;
        }
    }

    // Show message function
    function showMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        forgotPasswordForm.insertBefore(messageDiv, forgotPasswordForm.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    forgotPasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate email
            const email = emailInput.value;
            if (!email) {
                showMessage('error', 'Please enter your email address');
                return;
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Store email for verification page
            localStorage.setItem('resetEmail', email);
            
            showMessage('success', 'Password reset instructions have been sent to your email!');
            
            // Redirect to verification page
            setTimeout(() => {
                window.location.href = 'verify-code.html';
            }, 1500);
        } catch (error) {
            showMessage('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    });

    // Add floating label behavior
    const inputs = document.querySelectorAll('input[type="email"]');
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
});
