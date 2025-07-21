/*
    Author: Pramod Dhungana

    I built this JavaScript file for my CSCI 355 Web Design project at Queens College.
    I used DOM manipulation, event handling, and Web APIs to make the site interactive and user-friendly.
    Every feature here was coded by me to demonstrate my web development skills.
*/
// Global variables
let currentModal = null;

// When the page loads, I set up all the modals and password validation so everything works right away.
document.addEventListener('DOMContentLoaded', function() {
    initializeModals();
    initializePasswordValidation();
});

// Initialize modal functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // I wrote this function to handle opening and closing modals, including clicking outside or pressing Escape.
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModal) {
            closeModal(currentModal);
        }
    });
}

// I wrote this function to set up real-time password validation using DOM events.
// Whenever the user types in the password field, my code checks the requirements and gives instant feedback.
function initializePasswordValidation() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
}

// Modal management functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        currentModal = modal;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        currentModal = null;
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// I created these functions to show browser, window, screen, and location info using JavaScript's Web APIs.
function showNavigatorInfo() {
    const content = `
        <h2>Navigator Information</h2>
        <div class="browser-info">
            <div class="info-item">
                <span class="info-label">App Name:</span>
                <span class="info-value">${navigator.appName}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Product:</span>
                <span class="info-value">${navigator.product}</span>
            </div>
            <div class="info-item">
                <span class="info-label">App Version:</span>
                <span class="info-value">${navigator.appVersion}</span>
            </div>
            <div class="info-item">
                <span class="info-label">User Agent:</span>
                <span class="info-value">${navigator.userAgent}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Platform:</span>
                <span class="info-value">${navigator.platform}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Language:</span>
                <span class="info-value">${navigator.language}</span>
            </div>
        </div>
    `;
    showInfoModal(content);
}

function showWindowInfo() {
    const content = `
        <h2>Window Information</h2>
        <div class="browser-info">
            <div class="info-item">
                <span class="info-label">Inner Height:</span>
                <span class="info-value">${window.innerHeight}px</span>
            </div>
            <div class="info-item">
                <span class="info-label">Inner Width:</span>
                <span class="info-value">${window.innerWidth}px</span>
            </div>
        </div>
    `;
    showInfoModal(content);
}

function showScreenInfo() {
    const content = `
        <h2>Screen Information</h2>
        <div class="browser-info">
            <div class="info-item">
                <span class="info-label">Width:</span>
                <span class="info-value">${screen.width}px</span>
            </div>
            <div class="info-item">
                <span class="info-label">Height:</span>
                <span class="info-value">${screen.height}px</span>
            </div>
            <div class="info-item">
                <span class="info-label">Available Width:</span>
                <span class="info-value">${screen.availWidth}px</span>
            </div>
            <div class="info-item">
                <span class="info-label">Available Height:</span>
                <span class="info-value">${screen.availHeight}px</span>
            </div>
            <div class="info-item">
                <span class="info-label">Color Depth:</span>
                <span class="info-value">${screen.colorDepth} bits</span>
            </div>
            <div class="info-item">
                <span class="info-label">Pixel Depth:</span>
                <span class="info-value">${screen.pixelDepth} bits</span>
            </div>
        </div>
    `;
    showInfoModal(content);
}

function showLocationInfo() {
    const content = `
        <h2>Location Information</h2>
        <div class="browser-info">
            <div class="info-item">
                <span class="info-label">HREF:</span>
                <span class="info-value">${location.href}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Hostname:</span>
                <span class="info-value">${location.hostname}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Pathname:</span>
                <span class="info-value">${location.pathname}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Protocol:</span>
                <span class="info-value">${location.protocol}</span>
            </div>
        </div>
    `;
    showInfoModal(content);
}

function showInfoModal(content) {
    const modalBody = document.getElementById('modal-body');
    if (modalBody) {
        modalBody.innerHTML = content;
        openModal('infoModal');
    }
}

// Password Functions
function showPasswordForm() {
    openModal('passwordModal');
    // Reset password field and validation
    const passwordInput = document.getElementById('password');
    const feedback = document.getElementById('password-feedback');
    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.style.borderColor = '#e1e5e9';
    }
    if (feedback) {
        feedback.textContent = '';
        feedback.className = '';
    }
    resetPasswordRequirements();
}

function validatePassword() {
    const password = this.value;
    const feedback = document.getElementById('password-feedback');
    const passwordInput = this;
    
    // Password requirements
    const hasLength = password.length >= 10;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    
    // Update requirement indicators
    updateRequirement('length-check', hasLength);
    updateRequirement('letter-check', hasLetter);
    updateRequirement('digit-check', hasDigit);
    updateRequirement('symbol-check', hasSymbol);
    
    // Check if all requirements are met
    const isValid = hasLength && hasLetter && hasDigit && hasSymbol;
    
    // Update feedback
    if (password.length === 0) {
        feedback.textContent = '';
        feedback.className = '';
        passwordInput.style.borderColor = '#e1e5e9';
    } else if (isValid) {
        feedback.textContent = '✓ Password is valid!';
        feedback.className = 'valid';
        passwordInput.style.borderColor = '#28a745';
    } else {
        feedback.textContent = '✗ Password does not meet all requirements';
        feedback.className = 'invalid';
        passwordInput.style.borderColor = '#dc3545';
    }
}

function updateRequirement(elementId, isValid) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            element.classList.add('invalid');
            element.classList.remove('valid');
        }
    }
}

function resetPasswordRequirements() {
    const requirements = ['length-check', 'letter-check', 'digit-check', 'symbol-check'];
    requirements.forEach(req => {
        const element = document.getElementById(req);
        if (element) {
            element.classList.remove('valid', 'invalid');
        }
    });
}

// When someone clicks 'Developer Info', I show my bio and portfolio link in a modal.
function showDeveloperInfo() {
    const content = `
        <div class="developer-info">
            <div class="developer-photo">PD</div>
            <h3>Pramod Dhungana</h3>
            <p>I'm a driven Computer Science student at Queens College with a deep passion for building impactful software. 
                From full-stack apps to AI research, I love turning ideas into real products that help people.</p>
            <p>This site showcases what I've learned in web development — including client-server interaction, responsive UI, and DOM manipulation.</p>
            <p><strong>Skills:</strong> HTML5, CSS3, JavaScript, React, Node.js, Python, Web APIs, Responsive Design</p>
            <p><strong>Portfolio:</strong> <a href="https://sahayatri.net/" target="_blank" rel="noopener noreferrer">My Portfolio</a></p>
        </div>
    `;
    showInfoModal(content);
}

function showContactForm() {
    openModal('contactModal');
}

// I made this function to open the contact form modal so users can email me directly.
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:pramodkumar.dhungana97@qmail.cuny.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Close modal
            closeModal(document.getElementById('contactModal'));
            
            // Show success message
            alert('Email client opened! Please send the email manually.');
        });
    }
});

// I added this utility to update the main content area dynamically if needed.
function updateDynamicContent(content) {
    const dynamicContent = document.getElementById('dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = content;
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add loading animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = '<div class="spinner"></div>';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}

// Add CSS for spinner
const spinnerCSS = `
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject spinner CSS
const style = document.createElement('style');
style.textContent = spinnerCSS;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    alert('An error occurred. Please check the console for details.');
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Page loaded successfully');
    console.log('Load time:', performance.now(), 'ms');
});
