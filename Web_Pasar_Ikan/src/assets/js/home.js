// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSearch();
    initializeCart();
    initializeProductCards();
    initializeWishlist();
});

function initializeAnimations() {
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .blog-card').forEach(el => {
        observer.observe(el);
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // Add loading state
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (searchInput.value.trim() !== '') {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-search"></i>';
                // Add search functionality here
            }, 1000);
        }
    });

    // Add suggestions
    searchInput.addEventListener('input', debounce(function() {
        // Add suggestion functionality here
    }, 300));
}

function initializeCart() {
    const cartIcon = document.querySelector('.nav-icons a:nth-child(2)');
    let cartCount = 0;

    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            
            cartCount++;
            updateCartNotification(cartCount);
            
            showNotification(`${productName} ditambahkan ke keranjang!`);
        });
    });

    function updateCartNotification(count) {
        if (count > 0) {
            cartIcon.classList.add('has-notification');
        }
    }
}

function initializeProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        const img = card.querySelector('img');
        const cartIcon = card.querySelector('.cart-icon');
        
        // Add loading state for images
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Add quick view functionality
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            showQuickView(productName, price, img.src);
        });
    });
}

function showQuickView(name, price, image) {
    const quickView = document.createElement('div');
    quickView.className = 'quick-view';
    quickView.innerHTML = `
        <div class="quick-view-content">
            <button class="close-btn">&times;</button>
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p class="price">${price}</p>
            <div class="actions">
                <button class="btn-cart">Tambah ke Keranjang</button>
                <button class="btn-wishlist">
                    <i class="far fa-heart"></i>
                    Wishlist
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(quickView);
    setTimeout(() => quickView.classList.add('active'), 10);

    const closeBtn = quickView.querySelector('.close-btn');
    const wishlistBtn = quickView.querySelector('.btn-wishlist');
    
    // Check if product is in wishlist
    const isInWishlist = (JSON.parse(localStorage.getItem('wishlist')) || [])
        .some(item => item.name === name);
    
    if (isInWishlist) {
        wishlistBtn.classList.add('active');
        wishlistBtn.querySelector('i').className = 'fas fa-heart';
    }

    closeBtn.addEventListener('click', () => {
        quickView.classList.remove('active');
        setTimeout(() => quickView.remove(), 300);
    });

    wishlistBtn.addEventListener('click', function() {
        const isActive = this.classList.toggle('active');
        const icon = this.querySelector('i');
        
        if (isActive) {
            icon.className = 'fas fa-heart';
            // Trigger wishlist add in main view
            const productCard = document.querySelector(`.product-card h3[text="${name}"]`)?.closest('.product-card');
            if (productCard) {
                productCard.querySelector('.wishlist-btn').click();
            }
        } else {
            icon.className = 'far fa-heart';
            // Trigger wishlist remove in main view
            const productCard = document.querySelector(`.product-card h3[text="${name}"]`)?.closest('.product-card');
            if (productCard) {
                productCard.querySelector('.wishlist-btn.active')?.click();
            }
        }
    });
}

function initializeWishlist() {
    const wishlistIcon = document.querySelector('.nav-icons a:nth-child(1)');
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    let wishlistCounter = document.createElement('span');
    wishlistCounter.className = 'wishlist-counter';
    wishlistIcon.appendChild(wishlistCounter);
    
    updateWishlistCounter();

    document.querySelectorAll('.product-card').forEach(card => {
        // Add wishlist button to each product card
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'wishlist-btn';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        card.appendChild(wishlistBtn);

        // Check if product is already in wishlist
        const productName = card.querySelector('h3').textContent;
        if (isInWishlist(productName)) {
            wishlistBtn.classList.add('active');
            wishlistBtn.querySelector('i').className = 'fas fa-heart';
        }

        // Add click event
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isActive = this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (isActive) {
                // Add to wishlist
                icon.className = 'fas fa-heart';
                addToWishlist(card);
                showWishlistPopup(productName, 'ditambahkan ke');
            } else {
                // Remove from wishlist
                icon.className = 'far fa-heart';
                removeFromWishlist(productName);
                showWishlistPopup(productName, 'dihapus dari');
            }
            
            updateWishlistCounter();
        });
    });

    function addToWishlist(card) {
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        const productImage = card.querySelector('img').src;
        
        if (!isInWishlist(productName)) {
            wishlistItems.push({
                name: productName,
                price: productPrice,
                image: productImage
            });
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        }
    }

    function removeFromWishlist(productName) {
        wishlistItems = wishlistItems.filter(item => item.name !== productName);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }

    function isInWishlist(productName) {
        return wishlistItems.some(item => item.name === productName);
    }

    function updateWishlistCounter() {
        wishlistCounter.textContent = wishlistItems.length;
        if (wishlistItems.length > 0) {
            wishlistCounter.classList.add('show');
        } else {
            wishlistCounter.classList.remove('show');
        }
    }

    function showWishlistPopup(productName, action) {
        const popup = document.createElement('div');
        popup.className = 'wishlist-popup';
        popup.innerHTML = `
            <i class="fas fa-heart"></i>
            <div class="message">
                <strong>${productName}</strong> telah ${action} wishlist
            </div>
        `;
        
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
        
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 3000);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add styles for new interactive elements
const styles = `
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.quick-view.active {
    opacity: 1;
}

.quick-view-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    position: relative;
    transform: translateY(20px);
    transition: transform 0.3s ease;
}

.quick-view.active .quick-view-content {
    transform: translateY(0);
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
}

.notification.show {
    transform: translateX(0);
}

.wishlist-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
}

.wishlist-popup.show {
    transform: translateX(0);
}

.wishlist-popup i {
    font-size: 1.5rem;
    margin-right: 1rem;
}

.wishlist-popup .message {
    display: inline-block;
}

.wishlist-popup .message strong {
    font-weight: bold;
}

.wishlist-counter {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--primary-color);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 50%;
    font-size: 0.8rem;
    transform: translateX(50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.wishlist-counter.show {
    opacity: 1;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
