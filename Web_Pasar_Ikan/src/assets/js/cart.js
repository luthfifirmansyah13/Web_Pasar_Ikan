document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    setupQuantityButtons();
    setupCheckboxes();
    updateTotals();
}

function setupQuantityButtons() {
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    const plusButtons = document.querySelectorAll('.qty-btn.plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantitySpan = this.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateTotals();
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantitySpan = this.previousElementSibling;
            const stockSpan = this.closest('.cart-item').querySelector('.stock');
            const stock = parseInt(stockSpan.textContent.match(/\d+/)[0]);
            let quantity = parseInt(quantitySpan.textContent);
            
            if (quantity < stock) {
                quantity++;
                quantitySpan.textContent = quantity;
                updateTotals();
            } else {
                showNotification('Stock limit reached', 'warning');
            }
        });
    });
}

function setupCheckboxes() {
    const checkboxes = document.querySelectorAll('.item-checkbox input');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateTotals();
        });
    });
}

function updateTotals() {
    let subtotal = 0;
    const shipping = 20000; // Rp.20.000 shipping fee
    
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const checkbox = item.querySelector('.item-checkbox input');
        if (checkbox.checked) {
            const price = parseInt(item.querySelector('.item-price').textContent.replace(/[^\d]/g, ''));
            const quantity = parseInt(item.querySelector('.item-quantity span').textContent);
            subtotal += price * quantity;
        }
    });
    
    const total = subtotal + shipping;
    
    // Update display
    document.querySelector('.summary-item:first-child span:last-child').textContent = 
        `Rp.${subtotal.toLocaleString('id-ID')}`;
    document.querySelector('.summary-total span:last-child').textContent = 
        `Rp.${total.toLocaleString('id-ID')}`;
}

// Checkout handler
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', function() {
    const selectedItems = document.querySelectorAll('.item-checkbox input:checked');
    
    if (selectedItems.length === 0) {
        showNotification('Please select at least one item', 'error');
        return;
    }
    
    // Simulate checkout process
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    setTimeout(() => {
        showNotification('Order placed successfully!', 'success');
        this.disabled = false;
        this.textContent = 'Buat Pesanan';
        // Here you would typically redirect to a confirmation page
    }, 2000);
});

function showNotification(message, type = 'info') {
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
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
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
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        notification.addEventListener('animationend', () => {
            document.body.removeChild(notification);
        });
    }, 3000);
}
