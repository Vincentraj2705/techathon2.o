// Typewriter Effect
function typeWriter() {
    const text = "Welcome to TECHATHON 2K26";
    const element = document.querySelector('.typewriter-text');
    if (!element) return;
    let charIndex = 0;
    let isDeleting = false;
    function type() {
        if (!isDeleting && charIndex <= text.length) {
            element.textContent = text.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 100); // Typing speed
        } else if (!isDeleting && charIndex > text.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000); // Pause before deleting
        } else if (isDeleting && charIndex >= 0) {
            element.textContent = text.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 50); // Deleting speed
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            setTimeout(type, 500); // Pause before retyping
        }
    }
    type();
}

// Always show event closed message in running banner
function setEventClosedRunningMessage() {
    const messageTextEl = document.getElementById('messageText');
    const messageBanner = document.getElementById('runningMessageBanner');
    if (messageTextEl && messageBanner) {
        messageBanner.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 50%, #dc2626 100%)';
        messageTextEl.textContent = '❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setEventClosedRunningMessage();
    if (document.querySelector('.typewriter-text')) {
        typeWriter();
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 217, 255, 0.1)';
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Form Validation and Submission
const registerForm = document.querySelector('.register-form');
const contactForm = document.querySelector('.contact-form form');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const requiredFields = ['team-name', 'leader-name', 'email', 'phone', 'department', 'year', 'team-size', 'theme', 'members'];
        
        requiredFields.forEach(field => {
            const input = registerForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // In a real application, you would send this data to a server
            console.log('Registration Data:', data);
            
            // Show success message
            alert('Registration submitted successfully! We will contact you soon.');
            registerForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to a server
        console.log('Contact Form Data:', data);
        
        // Show success message
        alert('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
    });
}

// Animate elements on scroll
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

// Observe all section elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.theme-card, .feature, .prize-card, .timeline-item, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Registration Countdown Timer
let testRegistrationDeadline = null;
// Set registration deadline to tomorrow at 8:00 PM
function getRegistrationDeadline() {
    const now = new Date();
    let deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 20, 0, 0, 0); // Tomorrow 8:00 PM
    // If today is already Jan 21 or later, keep deadline at Jan 21, 8:00 PM
    if (now.getMonth() === 0 && now.getDate() >= 21) {
        deadline = new Date(now.getFullYear(), 0, 21, 20, 0, 0, 0);
    }
    return deadline.getTime();
}
function updateCountdown() {
    // Registration closes at tomorrow 8:00 PM
    const registrationDeadline = getRegistrationDeadline();
    const now = new Date().getTime();
    const distance = registrationDeadline - now;
    
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (distance > 0 && hoursEl && minutesEl && secondsEl) {
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Update DOM
        const daysEl = document.getElementById('days');
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    } else if (distance <= 0) {
        // Registration has closed
        const countdownTimer = document.getElementById('countdownTimer');
        if (countdownTimer) {
            countdownTimer.innerHTML = '<h2 class="countdown-title" style="color: #ef4444;">Registration Closed</h2>';
        }
    }
}

// Update running message based on date
function updateRunningMessage() {
    const messageTextEl = document.getElementById('messageText');
    const messageBanner = document.getElementById('runningMessageBanner');
    if (!messageTextEl || !messageBanner) return;
    const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth(); // 0 = January
    const currentYear = now.getFullYear();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const registrationDeadline = new Date(getRegistrationDeadline());
    if (now >= registrationDeadline) {
        // Show closed message after registration closes
        messageBanner.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 50%, #dc2626 100%)';
        messageTextEl.textContent = '❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB';
        return;
    }
    // Check if we're on January 20, 2026 before midnight
    if (currentYear === 2026 && currentMonth === 0 && currentDate === 20) {
        messageTextEl.textContent = '📣 FINAL CALL! Hurry up! Registration closes tomorrow at 8:00 PM 📣 FINAL CALL! Hurry up! Registration closes tomorrow at 8:00 PM 📣 FINAL CALL! Hurry up! Registration closes tomorrow at 8:00 PM';
    }
    // Check if we're on January 21, 2026 (from midnight to 8 PM)
    else if (currentYear === 2026 && currentMonth === 0 && currentDate === 21 && (currentHour < 18)) {
        messageTextEl.textContent = '📣 FINAL CALL! Hurry up! Registration closes today at 8:00 PM 📣 FINAL CALL! Hurry up! Registration closes today at 8:00 PM 📣 FINAL CALL! Hurry up! Registration closes today at 8:00 PM';
    }
    // After 8 PM on January 21
    else if (currentYear === 2026 && currentMonth === 0 && currentDate === 21 && currentHour >= 18) {
        messageBanner.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 50%, #dc2626 100%)';
        messageTextEl.textContent = '❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB';
    }
}

// Update countdown every second
setInterval(() => {
    updateCountdown();
    updateHoursDisplay();
}, 1000);

// Update message immediately and then check every minute
updateRunningMessage();
setInterval(updateRunningMessage, 60000);

// Initialize countdown on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateHoursDisplay();
    updateRunningMessage();
});

// Update hours display on window resize
window.addEventListener('resize', updateHoursDisplay);

// Check if registration is closed and handle forms
function checkRegistrationStatus() {
    const now = new Date();
    // Registration closes at tomorrow 8:00 PM
    const registrationDeadline = new Date(getRegistrationDeadline());
    // Allow form action until 19:59 (7:59 PM) on Jan 21, 2026
    if (now < registrationDeadline) {
        // If it's Jan 21, 2026 and time is 20:00 or later, close
        if (now.getFullYear() === 2026 && now.getMonth() === 0 && now.getDate() === 21 && now.getHours() >= 18) {
            return true; // Closed
        }
        return false; // Open
    }
    return true; // Closed
}

// Show registration closed popup
function showRegistrationClosedPopup() {
    // ...existing code...
}

// Disable registration form if deadline passed
function disableRegistrationForm() {
    // ...existing code...
}

// Handle all register button clicks
function handleRegisterButtons() {
    // ...existing code...
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    // ...existing code...
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('TECHATHON 2K26 - Website Loaded Successfully! 🚀');
console.log('Nova Nexus Hub - Kings Engineering College');
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (Indian format)
function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

// Add real-time validation to email and phone fields
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
});

function showError(input, message) {
    // ...existing code...
}

function hideError(input) {
    // ...existing code...
}

// Add loading animation
function showLoading() {
    // ...existing code...
}

function hideLoading() {
    // ...existing code...
}

// Print registration details (optional feature)
function printRegistration() {
    window.print();
}

console.log('TECHATHON 2K26 - Website Loaded Successfully! 🚀');
console.log('Nova Nexus Hub - Kings Engineering College');

// Problem Statement Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
});

// Email validation

