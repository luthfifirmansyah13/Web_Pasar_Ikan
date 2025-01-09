document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

function initializeChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const attachmentBtn = document.querySelector('.attachment-btn');
    const attachmentModal = document.getElementById('attachmentModal');
    const closeModalBtn = document.querySelector('.close-btn');
    
    // Sample initial messages
    const initialMessages = [
        {
            text: "Selamat datang di Ruang Ikan! Ada yang bisa kami bantu?",
            type: "received",
            time: "10:00"
        },
        {
            text: "Saya ingin menanyakan stok ikan salmon",
            type: "sent",
            time: "10:01"
        },
        {
            text: "Untuk ikan salmon masih tersedia. Apakah ada yang ingin ditanyakan lagi?",
            type: "received",
            time: "10:02"
        }
    ];
    
    // Add initial messages
    initialMessages.forEach(msg => addMessage(msg.text, msg.type, msg.time));
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Handle attachment button
    attachmentBtn.addEventListener('click', function() {
        attachmentModal.classList.add('active');
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        attachmentModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    attachmentModal.addEventListener('click', function(e) {
        if (e.target === attachmentModal) {
            attachmentModal.classList.remove('active');
        }
    });
    
    // Handle attachment options
    const attachmentOptions = document.querySelectorAll('.attachment-option');
    attachmentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.querySelector('span').textContent.toLowerCase();
            handleAttachment(type);
        });
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();
    
    if (text) {
        // Add user message
        addMessage(text, 'sent', getCurrentTime());
        messageInput.value = '';
        
        // Simulate auto-reply after 1 second
        setTimeout(() => {
            const replies = [
                "Baik, akan saya proses pesanan Anda.",
                "Terima kasih atas pertanyaannya. Ada yang bisa kami bantu lagi?",
                "Untuk informasi lebih lanjut, silakan hubungi customer service kami.",
                "Stok masih tersedia. Apakah Anda ingin melakukan pemesanan?"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            addMessage(randomReply, 'received', getCurrentTime());
        }, 1000);
    }
}

function addMessage(text, type, time) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = time;
    
    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleAttachment(type) {
    const attachmentModal = document.getElementById('attachmentModal');
    
    // Simulate attachment handling
    showNotification(`${type} attachment selected`, 'info');
    
    // Close modal
    attachmentModal.classList.remove('active');
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
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
