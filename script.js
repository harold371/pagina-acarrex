// Improved JavaScript Code

// Global error handlers
window.addEventListener('error', function(event) {
    console.error('Error occurred: ', event.message);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection: ', event.reason);
});

// DOM element validation
function validateElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Element not found for selector: ${selector}`);
    }
    return element;
}

// Form validation
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    return re.test(String(phone));
}

// Notification system
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Scroll reveal functionality using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');
const options = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

revealElements.forEach(el => observer.observe(el));

// Dropdown toggle and close on click outside
function setupDropdown(dropdownSelector) {
    const dropdown = validateElement(dropdownSelector);
    const toggleButton = validateElement(`${dropdownSelector} .toggle-button`);

    toggleButton.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && !toggleButton.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
}

setupDropdown('.dropdown');

// Department/municipality loading from Colombia data
async function loadColombiaData() {
    try {
        const response = await fetch('https://api.example.com/colombia-data'); // Replace with actual API
        const data = await response.json();
        populateSelectOptions(data);
    } catch (error) {
        showNotification('error', 'Failed to load data.');
    }
}

function populateSelectOptions(data) {
    const select = validateElement('#municipality-select');
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

// Cotizar button functionality with confirmations
validateElement('#cotizar-button').addEventListener('click', () => {
    const confirmation = confirm('Are you sure you want to proceed?');
    if (confirmation) {
        showNotification('success', 'Proceeding with cotizar...');
    } else {
        showNotification('info', 'Cotizar canceled.');
    }
});

// Contact form submission handling
validateElement('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = validateElement('#email-input').value;
    const phone = validateElement('#phone-input').value;

    if (!validateEmail(email)) {
        showNotification('error', 'Invalid email address.');
        return;
    }

    if (!validatePhone(phone)) {
        showNotification('error', 'Invalid phone number.');
        return;
    }

    // Submit the form
    showNotification('success', 'Form submitted successfully!');
});

loadColombiaData();
