
// Initialize balance and transactions if first time
if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", 4820.55);
  localStorage.setItem("transactions", JSON.stringify([]));
}

// Login function
function login() {
  // Simple mock login: any email/password works
  window.location.href = "dashboard.html";
}

// Load dashboard info
function loadDashboard() {
  // Update balance
  document.getElementById("balance").innerText =
    "$" + parseFloat(localStorage.getItem("balance")).toFixed(2);

  // Load transactions
  const transactions = JSON.parse(localStorage.getItem("transactions"));
  const container = document.getElementById("transactions");
  container.innerHTML = "";

  transactions.forEach(tx => {
    const div = document.createElement("div");
    div.innerText = tx;
    container.appendChild(div);
  });
}

// Navigate to Send Money page
function goToSend() {
  window.location.href = "send.html";
}

// Go back to dashboard
function goBack() {
  window.location.href = "dashboard.html";
}

// Send money logic
function sendMoney() {
  const amount = parseFloat(document.getElementById("amount").value);
  let balance = parseFloat(localStorage.getItem("balance"));

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  if (amount > balance) {
    alert("Insufficient funds");
    return;
  }

  // Deduct balance
  balance -= amount;
  localStorage.setItem("balance", balance);

  // Add transaction
  const transactions = JSON.parse(localStorage.getItem("transactions"));
  const recipient = document.getElementById("recipient").value || "Unknown";
  const newTx = `Sent $${amount.toFixed(2)} to ${recipient}`;
  transactions.unshift(newTx);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // Redirect to dashboard
  window.location.href = "dashboard.html";
}
