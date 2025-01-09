document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
});

function initializeCheckout() {
    setupPaymentButtons();
    setupCloseButton();
    setupOrderButton();
    setupChatButton();
}

function setupPaymentButtons() {
    const paymentButtons = document.querySelectorAll('.payment-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
}

function setupCloseButton() {
    const closeButton = document.querySelector('.close-btn');
    
    closeButton.addEventListener('click', function() {
        // Navigate back to previous page
        window.history.back();
    });
}

function setupOrderButton() {
    const orderButton = document.querySelector('.btn-order');
    
    orderButton.addEventListener('click', function() {
        // Get selected payment method
        const selectedPayment = document.querySelector('.payment-btn.active');
        if (!selectedPayment) {
            showNotification('Pilih metode pembayaran terlebih dahulu', 'error');
            return;
        }

        // Get order notes
        const notes = document.getElementById('notes').value;

        // Create order object
        const order = {
            address: {
                name: 'Jeri Jeriani',
                phone: '082243652231',
                street: 'Jl. Mayor Abdurahman 02/04',
                city: 'Sumedang',
                province: 'Jawa Barat',
                postalCode: '4321'
            },
            store: 'Taurus12Store',
            items: [
                {
                    name: 'Ikan Bandeng Per KG',
                    price: 40000,
                    quantity: 2,
                    subtotal: 80000
                }
            ],
            notes: notes,
            paymentMethod: selectedPayment.textContent,
            shipping: 20000,
            total: 100000
        };

        // Simulate order processing
        processOrder(order);
    });
}

function setupChatButton() {
    const chatButton = document.querySelector('.btn-chat');
    
    chatButton.addEventListener('click', function() {
        // Navigate to chat page
        window.location.href = 'chat.html';
    });
}

function processOrder(order) {
    // Show loading state
    const orderButton = document.querySelector('.btn-order');
    const originalText = orderButton.textContent;
    orderButton.textContent = 'Memproses Pesanan...';
    orderButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        orderButton.textContent = originalText;
        orderButton.disabled = false;

        // Show success message
        showNotification('Pesanan berhasil dibuat!', 'success');

        // Redirect to order confirmation page after 1 second
        setTimeout(() => {
            window.location.href = 'order-confirmation.html';
        }, 1000);
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem',
        borderRadius: '5px',
        color: '#fff',
        zIndex: '1000',
        animation: 'slideIn 0.5s ease-out'
    });

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add CSS animations
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

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
