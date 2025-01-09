document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    // Coordinates for Balong Hardi Sumedang
    const location = { lat: -6.8496, lng: 107.9235 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            }
        ]
    });
    
    // Create marker
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Balong Hardi Sumedang',
        icon: {
            url: 'images/map-marker.png',
            scaledSize: new google.maps.Size(40, 40)
        },
        animation: google.maps.Animation.DROP
    });
    
    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 5px 0; color: #0066b2;">Balong Hardi Sumedang</h3>
                <p style="margin: 0; color: #666;">Jl. Pasarean, Balong Hardi, Sumedang</p>
            </div>
        `
    });
    
    // Show info window when marker is clicked
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    // Add custom map controls
    addCustomControls(map);
}

function addCustomControls(map) {
    // Add zoom controls
    const zoomInButton = document.createElement('button');
    zoomInButton.className = 'custom-map-control';
    zoomInButton.innerHTML = '<i class="fas fa-plus"></i>';
    zoomInButton.onclick = () => map.setZoom(map.getZoom() + 1);
    
    const zoomOutButton = document.createElement('button');
    zoomOutButton.className = 'custom-map-control';
    zoomOutButton.innerHTML = '<i class="fas fa-minus"></i>';
    zoomOutButton.onclick = () => map.setZoom(map.getZoom() - 1);
    
    // Create container for custom controls
    const controlDiv = document.createElement('div');
    controlDiv.className = 'custom-map-controls';
    controlDiv.appendChild(zoomInButton);
    controlDiv.appendChild(zoomOutButton);
    
    // Add custom controls to the map
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

// Add notification system
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
