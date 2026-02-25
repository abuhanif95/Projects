// File: script.js
// Add this file to your project and include it in index.html before closing body tag
// <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==================== MOBILE MENU TOGGLE ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        // Create mobile menu container
        const mobileMenuContainer = document.createElement('div');
        mobileMenuContainer.className = 'mobile-menu-container';
        mobileMenuContainer.style.cssText = `
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            z-index: 1000;
            border-radius: 0 0 12px 12px;
            padding: 20px;
        `;
        
        // Clone navigation links for mobile
        const mobileNavList = document.createElement('ul');
        mobileNavList.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
        `;
        
        const originalLinks = navMenu.querySelectorAll('li');
        originalLinks.forEach(link => {
            const li = document.createElement('li');
            const a = link.querySelector('a').cloneNode(true);
            a.style.cssText = `
                text-decoration: none;
                color: #424247;
                font-weight: 600;
                display: block;
                padding: 10px;
                border-radius: 8px;
                transition: all 0.3s ease;
            `;
            a.addEventListener('mouseenter', (e) => {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.color = '#ff5400';
            });
            a.addEventListener('mouseleave', (e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#424247';
            });
            li.appendChild(a);
            mobileNavList.appendChild(li);
        });
        
        mobileMenuContainer.appendChild(mobileNavList);
        document.querySelector('header').appendChild(mobileMenuContainer);
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = mobileMenuContainer.style.display === 'block';
            mobileMenuContainer.style.display = isVisible ? 'none' : 'block';
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenuContainer.contains(e.target)) {
                mobileMenuContainer.style.display = 'none';
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
        
        // Close menu on window resize (if desktop view)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                mobileMenuContainer.style.display = 'none';
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // ==================== SEARCH FORM HANDLING ====================
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = this.querySelector('input[type="text"]').value.trim();
            const when = this.querySelector('#when').value;
            const type = this.querySelector('#type').value;
            
            if (!destination) {
                showNotification('Please enter a destination', 'error');
                return;
            }
            
            // Simulate search (in real app, would redirect to search results)
            showNotification(`Searching for ${destination}...`, 'success');
            
            // Optional: Reset form after search
            // this.reset();
        });
    }

    // ==================== NEWSLETTER FORM HANDLING ====================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            
            // Basic validation
            if (!name || !email) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            showNotification(`Thank you ${name}! You've been subscribed.`, 'success');
            this.reset();
        });
    }

    // ==================== BOOK NOW BUTTONS ====================
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get tour details from parent card
            const card = this.closest('.card');
            const tourName = card.querySelector('h3').textContent;
            const priceElement = card.querySelector('.price');
            const price = priceElement ? priceElement.textContent.replace('Price:', '').trim() : 'Contact for price';
            
            showNotification(`Booking ${tourName} - ${price}`, 'success');
            
            // Optional: Scroll to booking section or open modal
            // You can add modal functionality here
        });
    });

    // ==================== READ MORE BUTTON ====================
    const readMoreBtn = document.querySelector('.popular-tour .btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const popularTourSection = document.querySelector('.popular-tour');
            const extraContent = document.createElement('div');
            extraContent.className = 'extra-tour-content';
            extraContent.style.cssText = `
                margin-top: 30px;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 12px;
                animation: slideDown 0.5s ease;
            `;
            
            extraContent.innerHTML = `
                <h3 style="color: #1a1a1a; margin-bottom: 15px;">More Popular Destinations</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="padding: 15px; background: white; border-radius: 8px;">
                        <i class="fas fa-umbrella-beach" style="color: #ff5400; font-size: 24px;"></i>
                        <h4 style="margin: 10px 0;">Greece</h4>
                        <p style="font-size: 14px;">Santorini & Athens</p>
                    </div>
                    <div style="padding: 15px; background: white; border-radius: 8px;">
                        <i class="fas fa-mountain" style="color: #ff5400; font-size: 24px;"></i>
                        <h4 style="margin: 10px 0;">Switzerland</h4>
                        <p style="font-size: 14px;">Swiss Alps</p>
                    </div>
                    <div style="padding: 15px; background: white; border-radius: 8px;">
                        <i class="fas fa-city" style="color: #ff5400; font-size: 24px;"></i>
                        <h4 style="margin: 10px 0;">Japan</h4>
                        <p style="font-size: 14px;">Tokyo & Kyoto</p>
                    </div>
                </div>
            `;
            
            // Check if content already exists
            if (!document.querySelector('.extra-tour-content')) {
                popularTourSection.querySelector('.left').appendChild(extraContent);
                this.textContent = 'Show Less';
            } else {
                document.querySelector('.extra-tour-content').remove();
                this.textContent = 'Read More';
            }
        });
    }

    // ==================== SEE ALL PACKAGES BUTTON ====================
    const seeAllBtn = document.querySelector('.deals-section > .btn');
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate loading more packages
            showNotification('Loading more packages...', 'success');
            
            // In a real app, you'd fetch and display more packages
            setTimeout(() => {
                showNotification('5 new packages available!', 'success');
            }, 1500);
        });
    }

    // ==================== DESTINATION HOVER EFFECTS ====================
    const destinationItems = document.querySelectorAll('.destination > div');
    destinationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            const strong = this.querySelector('strong');
            
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.5s ease';
            
            if (strong) {
                strong.style.fontSize = '34px';
                strong.style.transition = 'font-size 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            const strong = this.querySelector('strong');
            
            img.style.transform = 'scale(1)';
            if (strong) {
                strong.style.fontSize = '30px';
            }
        });
    });

    // ==================== VIDEO CONTAINER INTERACTION ====================
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('click', function() {
            const iframe = this.querySelector('iframe');
            if (iframe) {
                // Toggle play/pause by reloading src (simple approach)
                const src = iframe.src;
                iframe.src = src.includes('autoplay=1') ? src.replace('autoplay=1', 'autoplay=0') : src + '&autoplay=1';
            }
        });
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'info') {
        // Remove existing notification if present
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
            cursor: pointer;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Click to dismiss
        notification.addEventListener('click', () => notification.remove());
    }

    // ==================== UTILITY FUNCTIONS ====================
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==================== ADD ANIMATION STYLES ====================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        nav ul {
            transition: all 0.3s ease;
        }
        
        .deal, .choose-card, .destination > div {
            transition: all 0.3s ease;
        }
        
        .deal:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
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

    // Observe elements for scroll animations
    document.querySelectorAll('.popular-tour, .destination-section, .choose-section, .deals-section, .perfect-place-section, .newsletter-section')
        .forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

    // ==================== PRICE CALCULATOR (DEMO FEATURE) ====================
    // Add price calculator to deals section
    const dealCards = document.querySelectorAll('.deal .card');
    dealCards.forEach(card => {
        const priceElement = card.querySelector('.price');
        if (priceElement) {
            const priceText = priceElement.textContent;
            const priceMatch = priceText.match(/\$(\d+)/g);
            
            if (priceMatch && priceMatch.length >= 2) {
                const minPrice = parseInt(priceMatch[0].replace('$', ''));
                const maxPrice = parseInt(priceMatch[1].replace('$', ''));
                
                // Add quick price info tooltip
                const priceInfo = document.createElement('div');
                priceInfo.style.cssText = `
                    font-size: 13px;
                    color: #666;
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                `;
                priceInfo.innerHTML = `
                    <i class="fas fa-info-circle" style="color: #ff5400;"></i>
                    <span>Per person, twin sharing</span>
                `;
                priceElement.appendChild(priceInfo);
            }
        }
    });

    console.log('SHT Travel website initialized with enhanced features!');
});