// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate Numbers on Scroll
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                entry.target.classList.add('animated');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target >= 1 ? Math.floor(target) + (target % 1 !== 0 ? 'M' : '') : target.toFixed(1) + 'M';
                        clearInterval(timer);
                    } else {
                        if (target >= 1) {
                            entry.target.textContent = Math.floor(current) + (target % 1 !== 0 ? 'M' : '');
                        } else {
                            entry.target.textContent = current.toFixed(1) + 'M';
                        }
                    }
                }, 16);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
};

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    
    // Set initial stat values
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        if (target >= 1) {
            stat.textContent = '0';
        } else {
            stat.textContent = '0.0';
        }
    });
});

// Form Validation (if forms are added later)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b35';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
};

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.href && this.href.includes('#')) {
            // Allow smooth scroll for anchor links
            return;
        }
        
        // Add loading state for form submissions or external links
        if (this.type === 'submit' || this.href) {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
        }
    });
});

// Lazy loading for images (if images are added)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Payment Carousel Animation
const initPaymentCarousel = () => {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    // Reset animation on load to ensure smooth start
    carouselTrack.style.animation = 'none';
    setTimeout(() => {
        carouselTrack.style.animation = '';
    }, 10);

    // Pause on hover for better UX
    const carouselContainer = carouselTrack.parentElement;
    carouselContainer.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
};

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPaymentCarousel();
});
