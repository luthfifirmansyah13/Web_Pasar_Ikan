document.addEventListener('DOMContentLoaded', function() {
    initializeStore();
});

function initializeStore() {
    setupFollowButton();
    setupChatButton();
    setupProductCards();
}

function setupFollowButton() {
    const followBtn = document.querySelector('.btn-follow');
    
    followBtn.addEventListener('click', function() {
        const isFollowing = this.textContent === 'Mengikuti';
        
        if (isFollowing) {
            this.textContent = 'Ikuti';
            showNotification('Berhenti mengikuti toko', 'info');
        } else {
            this.textContent = 'Mengikuti';
            showNotification('Toko berhasil diikuti!', 'success');
        }
    });
}

function setupChatButton() {
    const chatBtn = document.querySelector('.btn-chat');
    
    chatBtn.addEventListener('click', function() {
        // Navigate to chat page
        window.location.href = 'chat.html';
    });
}

function setupProductCards() {
    const cartButtons = document.querySelectorAll('.btn-cart');
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            addToCart(productName);
        });
    });
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            buyNow(productName);
        });
    });
}

function addToCart(productName) {
    // Add item to cart (implement cart functionality)
    showNotification(`${productName} ditambahkan ke keranjang`, 'success');
    
    // Update cart count
    updateCartCount(1);
}

function buyNow(productName) {
    showNotification(`Memproses pembelian ${productName}...`, 'info');
    
    // Redirect to checkout page
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
}

function updateCartCount(increment) {
    // Update cart icon count (implement this if you have a cart icon)
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        let count = parseInt(cartIcon.getAttribute('data-count') || '0');
        count += increment;
        cartIcon.setAttribute('data-count', count);
        
        if (count > 0) {
            cartIcon.classList.add('has-items');
        }
    }
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
