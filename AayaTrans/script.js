// script.js

// DOM Elements
const paymentModal = document.getElementById('paymentModal');
const topUpBtn = document.getElementById('topUpBtn');
const closeModal = document.querySelectorAll('.close-modal');
const confirmPayment = document.getElementById('confirmPayment');
const amountInput = document.getElementById('amount');
const paymentMethods = document.querySelectorAll('.payment-method');
const cardPaymentFields = document.getElementById('cardPaymentFields');
const mobilePaymentFields = document.getElementById('mobilePaymentFields');
const startTripBtn = document.getElementById('startTripBtn');
const endTripBtn = document.getElementById('endTripBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const navLinks = document.querySelectorAll('nav a');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

// View All Trips button and section
const viewAllTripsBtn = document.getElementById('viewAllTripsBtn');
const allTripsSection = document.getElementById('TripHistory');
viewAllTripsBtn.addEventListener('click', () => {
    allTripsSection.style.display = 'block';
    allTripsSection.scrollIntoView({ behavior: 'smooth' });
});

// logout function

function logout() {
  alert("Logout successful! Redirecting to login...");
  window.location.href = "login.html";
}

// navigation functions
function dashboard() {
  window.location.href = document.getElementById("dash");
}

function balance() {
  window.location.href = document.getElementById("bal");
}
function tripMgt() {
  window.location.href = document.getElementById("mgt");
}
function tripHis() {
  window.location.href = document.getElementById("his");
}
function quick() {
  window.location.href = document.getElementById("action");
}
function profile() {
  window.location.href = document.getElementById("prof");
}
function security() {
  window.location.href = document.getElementById("secur");
}
// Open modal
topUpBtn.addEventListener('click', () => {
    paymentModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close modal
closeModal.forEach(btn => {
    btn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Update payment button text
amountInput.addEventListener('input', () => {
    if (amountInput.value) {
        const amount = parseFloat(amountInput.value).toFixed(2);
        confirmPayment.textContent = `Pay GHS ${amount}`;
    } else {
        confirmPayment.textContent = 'Pay GHS 0.00';
    }
});

// Payment method selection
paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
        
        const methodType = method.getAttribute('data-method');
        if (methodType === 'card') {
            cardPaymentFields.style.display = 'block';
            mobilePaymentFields.style.display = 'none';
        } else {
            cardPaymentFields.style.display = 'none';
            mobilePaymentFields.style.display = 'block';
        }
    });
});

// Simulate payment process
confirmPayment.addEventListener('click', () => {
    const amount = amountInput.value || '30.00';
    
    // Show loading state
    confirmPayment.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    confirmPayment.disabled = true;
    
    setTimeout(() => {
        alert(`Payment of GHS ${amount} processed successfully! Your balance has been updated.`);
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        amountInput.value = '30';
        confirmPayment.innerHTML = 'Pay GHS 30.00';
        confirmPayment.disabled = false;
        
        // Update balance in UI (simulated)
        const balanceElement = document.querySelector('.balance-amount');
        const currentBalance = parseFloat(balanceElement.textContent.replace('GHS ', ''));
        const newBalance = currentBalance + parseFloat(amount);
        balanceElement.textContent = `GHS ${newBalance.toFixed(2)}`;
        
        // Update last top-up info
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        document.querySelector('.balance-info').textContent =
        `Last top-up: ${dateString}, ${timeString} (GHS ${amount})`;
    }, 2000);
});

// Trip management
startTripBtn.addEventListener('click', function() {
    this.disabled = true;
    endTripBtn.disabled = false;
    
    const tripStatus = document.querySelector('.trip-status');
    tripStatus.textContent = 'Trip in progress';
    tripStatus.className = 'trip-status status-active';
    
    // Show notification
    showNotification('Trip started!', 'Your shuttle trip has begun. Enjoy your ride!');
});

endTripBtn.addEventListener('click', function() {
    this.disabled = true;
    startTripBtn.disabled = false;
    
    const tripStatus = document.querySelector('.trip-status');
    tripStatus.textContent = 'No active trip';
    tripStatus.className = 'trip-status status-inactive';
    
    // Update balance
    const balanceElement = document.querySelector('.balance-amount');
    const currentBalance = parseFloat(balanceElement.textContent.replace('GHS ', ''));
    const newBalance = currentBalance - 2.00;
    balanceElement.textContent = `GHS ${newBalance.toFixed(2)}`;
    
    // Add a new trip to history
    const historyContainer = document.querySelector('.trip-history');
    const now = new Date();
    const startTime = new Date(now.getTime() - 15 * 60000); // 15 minutes ago
    
    const newTrip = document.createElement('div');
    newTrip.className = 'history-item';
    newTrip.innerHTML = `
        <div class="history-details">
            <span class="history-location">Current Location → Science Block</span>
            <span class="history-time">${formatTime(startTime)} - ${formatTime(now)}</span>
        </div>
        <div class="history-amount">-GHS 2.00</div>
    `;
    historyContainer.prepend(newTrip);
    
    // Show notification
    showNotification('Trip completed!', 'GHS 2.00 has been deducted from your balance.');
});

// Sidebar toggle functionality
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const icon = sidebarToggle.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
        icon.className = 'fas fa-chevron-right';
    } else {
        icon.className = 'fas fa-chevron-left';
    }
});

// Navigation active state (top links)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Sidebar navigation active state
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Helper functions
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function showNotification(title, message) {
    // In a real app, use a proper notification system
    alert(`${title}\n\n${message}`);
}

// Initialize page data
document.addEventListener('DOMContentLoaded', () => {
    // Set initial balance
    document.querySelector('.balance-amount').textContent = 'GHS 24.50';
    // Set last top-up time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.querySelector('.balance-info').textContent =
        `Last top-up: Today, ${timeString} (GHS 30.00)`;
});
