document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSearch();
});

function initializeAnimations() {
    // Add animation delay to blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.setProperty('--order', index);
    });

    // Add fade-in animation to elements as they appear in viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe blog cards
    blogCards.forEach(card => {
        observer.observe(card);
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const blogCards = document.querySelectorAll('.blog-card');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            blogCards.forEach(card => {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease-out forwards';
            });
            return;
        }

        let hasResults = false;
        
        blogCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const category = card.querySelector('.category').textContent.toLowerCase();
            const date = card.querySelector('.date').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || 
                category.includes(searchTerm) || 
                date.includes(searchTerm)) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease-out forwards';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (hasResults) {
            showNotification(`Showing results for: ${searchTerm}`);
        } else {
            showNotification('No results found', 'warning');
        }
    }

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

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
