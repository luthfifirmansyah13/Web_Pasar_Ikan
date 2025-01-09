document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

function initializeForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            showLoadingState();
            
            setTimeout(() => {
                // Simulate successful submission
                showSuccessMessage();
                form.reset();
                hideLoadingState();
            }, 1500);
        }
    });

    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        // Specific field validations
        switch (field.id) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^\d{10,12}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number (10-12 digits)';
                }
                break;
        }
    }
    
    // Update field styling and show error message if needed
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    } else {
        field.classList.remove('error');
    }
    
    return isValid;
}

function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send a message';
}

function showSuccessMessage() {
    // Remove any existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create and show new success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
    
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(successDiv, form);
    
    // Show the success message with animation
    successDiv.style.display = 'block';
    successDiv.style.animation = 'fadeIn 0.5s ease-out';
    
    // Remove the success message after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.5s ease-in';
        successDiv.addEventListener('animationend', () => {
            successDiv.remove();
        });
    }, 5000);
}

// Add notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '5px',
        color: '#fff',
        zIndex: '1000',
        animation: 'slideIn 0.5s ease-out'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'info':
            notification.style.backgroundColor = '#17a2b8';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-in';
        notification.addEventListener('animationend', () => {
            document.body.removeChild(notification);
        });
    }, 3000);
}
