document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('verifyCodeForm');
    const inputs = document.querySelectorAll('.verification-code input');
    const submitBtn = document.querySelector('.sign-in-btn');
    const resendBtn = document.getElementById('resendCode');
    let resendTimer = 60;

    // Set email from localStorage if available
    const userEmail = localStorage.getItem('resetEmail') || 'example@mail.com';
    document.querySelector('.user-email').textContent = userEmail;

    // Focus first input on load
    inputs[0].focus();

    // Handle input behavior
    inputs.forEach((input, index) => {
        // Handle paste event
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text').trim();
            if (!/^\d+$/.test(pastedText)) return; // Only allow numbers

            const digits = pastedText.split('').slice(0, inputs.length);
            digits.forEach((digit, i) => {
                if (inputs[i]) {
                    inputs[i].value = digit;
                    if (inputs[i + 1]) inputs[i + 1].focus();
                }
            });
        });

        // Handle keyup event
        input.addEventListener('keyup', (e) => {
            const currentInput = e.target;
            const nextInput = currentInput.nextElementSibling;
            const prevInput = currentInput.previousElementSibling;

            // Clear invalid characters (non-numbers)
            if (!/^\d*$/.test(currentInput.value)) {
                currentInput.value = '';
                return;
            }

            // Auto focus next input
            if (nextInput && currentInput.value !== '') {
                nextInput.focus();
            }

            // Handle backspace
            if (e.key === 'Backspace') {
                if (prevInput) {
                    prevInput.focus();
                }
            }

            // Enable submit button if all fields are filled
            const isComplete = Array.from(inputs).every(input => input.value.length === 1);
            submitBtn.disabled = !isComplete;
        });

        // Handle focus event
        input.addEventListener('focus', () => {
            input.select();
        });
    });

    // Add loading state to button
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            submitBtn.disabled = true;
        } else {
            submitBtn.innerHTML = 'Verify';
            submitBtn.disabled = false;
        }
    }

    // Show message function
    function showMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        form.insertBefore(messageDiv, form.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Get verification code
            const code = Array.from(inputs).map(input => input.value).join('');
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (code === '123456') { // Demo validation
                showMessage('success', 'Code verified successfully!');
                
                // Redirect to reset password page
                setTimeout(() => {
                    window.location.href = 'reset-password.html';
                }, 1000);
            } else {
                showMessage('error', 'Invalid verification code');
                inputs.forEach(input => input.value = '');
                inputs[0].focus();
            }
        } catch (error) {
            showMessage('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    });

    // Handle resend code
    function updateResendButton() {
        if (resendTimer > 0) {
            resendBtn.textContent = `Resend Code (${resendTimer}s)`;
            resendBtn.style.pointerEvents = 'none';
            resendBtn.style.opacity = '0.5';
            resendTimer--;
            setTimeout(updateResendButton, 1000);
        } else {
            resendBtn.textContent = 'Resend Code';
            resendBtn.style.pointerEvents = 'auto';
            resendBtn.style.opacity = '1';
        }
    }

    resendBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showMessage('success', 'New verification code sent!');
            resendTimer = 60;
            updateResendButton();
        } catch (error) {
            showMessage('error', 'Failed to resend code. Please try again.');
        }
    });
});
