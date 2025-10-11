// Typing Animation
class TypingAnimation {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.startValue = 0;
        this.init();
    }

    init() {
        this.animate();
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        
        const progress = Math.min((timestamp - this.startTime) / this.duration, 1);
        const currentValue = Math.floor(progress * (this.target - this.startValue) + this.startValue);
        
        this.element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame((timestamp) => this.animate(timestamp));
        }
    }
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
                
                // Trigger skill bar animation for skills
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .stats, .skill-item, .service-card, .portfolio-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animate counters in stats section
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        new CounterAnimation(counter, target);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('light-theme', !isDark);
        
        // Update icon
        themeToggle.className = isDark ? 'fas fa-moon theme-toggle' : 'fas fa-sun theme-toggle';
    });
}

// Static Profile Image (no parallax)
function initParallax() {
    // Profile image is now static - no parallax effect
    return;
}

// Static Glow Ring (no animation)
function initGlowRing() {
    // Glow ring is now static - no animation needed
    return;
}

// Portfolio Item Hover Effects
function initPortfolioEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            form.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00BFFF, #0099CC)' : 
                   type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ff8e8e)' : 
                   'linear-gradient(45deg, #00BFFF, #0077AA)'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Skill Items Animation
function initSkillAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = 'skillPulse 0.6s ease';
        });
    });
}

// Add skill pulse animation to CSS dynamically
function addSkillPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes skillPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Download CV Button
function initDownloadCV() {
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const fileUrl = './assets/images/PraveenRaju_2025_Resume.pdf';  // Your PDF file path
            const fileName = 'My_CV.pdf';

            const link = document.createElement('a');
            link.href = fileUrl;
            // link.download = fileName;
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);

            window.open(fileUrl, '_blank'); 
            // Optional: custom notification
            showNotification('CV downloaded', 'success');

            
        });
    }
}

// Hero Buttons
function initHeroButtons() {
    const hireBtn = document.querySelector('.btn-hire');
    const contactBtn = document.querySelector('.btn-contact');
    
    if (hireBtn) {
        hireBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Thank you for your interest! I will contact you soon.', 'success');
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['Frontend', 'Backend', 'Full Stack', 'React', 'JavaScript', 'Developer'];
        new TypingAnimation(typingElement, words, 100, 50, 2000);
    }
    
    // Initialize all other features
    initSmoothScroll();
    initScrollAnimations();
    initThemeToggle();
    initParallax();
    initGlowRing();
    initPortfolioEffects();
    initContactForm();
    initNavbarScroll();
    addSkillPulseAnimation();
    initSkillAnimation();
    initDownloadCV();
    initHeroButtons();
    
    // Add some initial animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add loading animation
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any size-dependent animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth <= 768) {
        // Adjust layout for mobile
        heroContent.style.gridTemplateColumns = '1fr';
    }
});

// Add some extra interactive effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Any scroll-based animations can be added here
}, 16)); // ~60fps
