function login() {
  window.location.href = "land.html";
}

function signup() {
  alert("Signup successful! Redirecting to login...");
  window.location.href = "login.html";
}

function logout() {
  window.location.href = "login.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}

function navigate(section) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(section).classList.remove('hidden');
}

let balance = 10.00;

function updateBalance() {
  document.getElementById("balance").textContent = `GHS ${balance.toFixed(2)}`;
}

function topUp() {
  const amount = parseFloat(document.getElementById("topUpAmount").value);
  if (!isNaN(amount) && amount > 0) {
    balance += amount;
    updateBalance();
    notify(`Top-up of GHS ${amount.toFixed(2)} successful.`);
  }
}

function startTrip() {
  if (balance >= 2.00) {
    balance -= 2.00;
    updateBalance();
    notify("Trip started. GHS 2.00 deducted.");
  } else {
    notify("Insufficient balance.");
  }
}

function endTrip() {
  balance += 0.00;
  updateBalance();
  notify(`Trip ended. Your current balance is GHS ${balance.toFixed(2)}`);
}

function notify(message) {
  const box = document.getElementById("notifications");
  if (box) {
    box.textContent = message;
    setTimeout(() => box.textContent = '', 1000);
  }
}

window.onload = function () {
  if (document.getElementById("balance")) updateBalance();
};