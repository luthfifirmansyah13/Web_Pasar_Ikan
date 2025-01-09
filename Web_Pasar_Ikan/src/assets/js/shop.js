document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeCategoryFilter();
    initializeProductCards();
    initializeSearch();
});

function initializeCategoryFilter() {
    const filterLinks = document.querySelectorAll('.category-filter a');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            filterLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get filter category
            const category = this.textContent.toLowerCase();
            
            // Filter products (you can implement actual filtering logic here)
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        // Add fade-out animation
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Add fade-in animation
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }, 300);
    });
}

function initializeProductCards() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const cartBtn = product.querySelector('.btn-cart');
        const wishlistBtn = product.querySelector('.btn-wishlist');
        
        cartBtn.addEventListener('click', function() {
            const productName = product.querySelector('h3').textContent;
            addToCart(productName);
        });
        
        wishlistBtn.addEventListener('click', function() {
            const productName = product.querySelector('h3').textContent;
            buyNow(productName);
        });
    });
}

function addToCart(productName) {
    showNotification(`${productName} telah ditambahkan ke keranjang!`, 'success');
}

function buyNow(productName) {
    showNotification(`Memproses pembelian ${productName}...`, 'info');
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productCategory = product.querySelector('.category').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                product.style.display = '';
                product.style.animation = 'fadeIn 0.5s ease-out forwards';
            } else {
                product.style.display = 'none';
            }
        });
        
        if (searchTerm) {
            showNotification(`Menampilkan hasil pencarian untuk: ${searchTerm}`, 'info');
        }
    }
    
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

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
        case 'info':
            notification.style.backgroundColor = '#17a2b8';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
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
