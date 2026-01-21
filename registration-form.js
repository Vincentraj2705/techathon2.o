// Registration Form Handler
// Paste your Web App URL here:
const REGISTRATION_FORM_URL = 'https://script.google.com/macros/s/AKfycbx2KKFX8ztqoR9DywRPvVyTeSTaG-HOpFC2moBa3eWMZ3BMBsn_JGnArP3rwUWgF4oz/exec';


// --- Registration Closure Logic ---
// Returns true if registration is closed, false if open
function getRegistrationDeadline() {
    const now = new Date();
    let deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18, 0, 0, 0); // Tomorrow 6:00 PM
    // If today is already Jan 21 or later, keep deadline at Jan 21, 6:00 PM
    if (now.getMonth() === 0 && now.getDate() >= 21) {
        deadline = new Date(now.getFullYear(), 0, 21, 18, 0, 0, 0);
    }
    return deadline.getTime();
}
function checkRegistrationStatus() {
    const now = new Date();
    const registrationDeadline = new Date(getRegistrationDeadline());
    // Allow form action until 17:59 (5:59 PM) on Jan 21, 2026
    if (now < registrationDeadline) {
        if (now.getFullYear() === 2026 && now.getMonth() === 0 && now.getDate() === 21 && now.getHours() >= 20) {
            return true; // Closed
        }
        return false; // Open
    }
    return true; // Closed
}
function showRegistrationClosedPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'registration-closed-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000; animation: fadeIn 0.3s ease;`;
    const popup = document.createElement('div');
    popup.style.cssText = `background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%); border: 2px solid #ef4444; border-radius: 15px; padding: 2rem; max-width: 400px; text-align: center; box-shadow: 0 0 50px rgba(239,68,68,0.5); animation: slideIn 0.3s ease;`;
    popup.innerHTML = `<div style="font-size: 4rem; margin-bottom: 1rem;">❌</div><h2 style="color: #ef4444; margin-bottom: 1rem; font-size: 1.8rem;">Registration Closed</h2><p style="color: #94a3b8; margin-bottom: 1.5rem; font-size: 1.1rem;">Oops! Registration has closed.<br>Better luck next time!</p><button id="closePopupBtn" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; padding: 0.8rem 2rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">OK</button>`;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.getElementById('closePopupBtn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}
function disableRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm && checkRegistrationStatus()) {
        const inputs = registrationForm.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => { input.disabled = true; input.style.opacity = '0.5'; input.style.cursor = 'not-allowed'; });
        const message = document.createElement('div');
        message.style.cssText = `background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 1.5rem; border-radius: 10px; text-align: center; margin-bottom: 2rem; font-size: 1.2rem; font-weight: 600; box-shadow: 0 5px 20px rgba(239,68,68,0.3);`;
        message.innerHTML = '❌ Registration has closed. Better luck next time!';
        registrationForm.insertBefore(message, registrationForm.firstChild);
        registrationForm.addEventListener('submit', (e) => { e.preventDefault(); showRegistrationClosedPopup(); });
    }
}
function handleRegisterButtons() {
    const registerLinks = document.querySelectorAll('a[href="register.html"], .mobile-register-btn, .nav-register-highlight, .mobile-register-card');
    registerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (checkRegistrationStatus()) {
                e.preventDefault();
                showRegistrationClosedPopup();
            }
        });
    });
}

function updateRunningMessage() {
    const messageTextEl = document.getElementById('messageText');
    const messageBanner = document.getElementById('runningMessageBanner');
    if (!messageTextEl || !messageBanner) return;
    const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentHour = now.getHours();
    const registrationDeadline = new Date(getRegistrationDeadline());
    messageBanner.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 50%, #dc2626 100%)';
    messageTextEl.textContent = '❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB ❌ Oops! Registration has closed. Better luck next time. Stay tuned for next event - NOVA NEXUS HUB';
    return;
}
setInterval(updateRunningMessage, 60000);

document.addEventListener('DOMContentLoaded', function() {
    // Force running message to always show registration closed
    const messageTextEl = document.getElementById('messageText');
    const messageBanner = document.getElementById('runningMessageBanner');
    if (messageTextEl && messageBanner) {
        messageBanner.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 50%, #dc2626 100%)';
        messageTextEl.textContent = '❌ Oops! Registration has closed as of 6:00 PM today. Better luck next time! 📢 Stay tuned for next event - NOVA NEXUS ❌ Oops! Registration has closed as of 6:00 PM today. Better luck next time! 📢 Stay tuned for next event - NOVA NEXUS ❌ Oops! Registration has closed as of 6:00 PM today. Better luck next time! 📢 Stay tuned for next event - NOVA NEXUS';
    }
    disableRegistrationForm();
    handleRegisterButtons();
});

// Show message function
function showMessage(type, text) {
    // Remove any existing messages
    const existingMsg = document.querySelector('.form-popup-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create popup message
    const popup = document.createElement('div');
    popup.className = `form-popup-message form-popup-${type}`;
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}
