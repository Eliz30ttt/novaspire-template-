// ================= INIT =================
function initApp() {
  if (!localStorage.getItem("balance") || isNaN(localStorage.getItem("balance"))) {
    localStorage.setItem("balance", "5250.00");
  }

  if (!localStorage.getItem("transactions")) {
    localStorage.setItem(
      "transactions",
      JSON.stringify([
        "Received $2,000.00 from Salary",
        "Sent $120.00 to John"
      ])
    );
  }

  updateUserName();
  loadDashboardTransactions();
}

// ================= USER =================
function updateUserName() {
  const email = localStorage.getItem("userEmail") || "User";
  const el = document.getElementById("userName");
  if (el) {
    el.innerText = email.split("@")[0];
  }
}

// ================= DASHBOARD =================
function loadDashboardTransactions() {
  const container = document.getElementById("transactions");
  if (!container) return;

  container.innerHTML = "";

  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  transactions.forEach(tx => {
    const div = document.createElement("div");
    div.classList.add("tx");
    const lower = tx.toLowerCase();
    if (lower.includes("sent")) div.classList.add("negative");
    else if (lower.includes("received")) div.classList.add("positive");
    div.innerText = tx;
    container.appendChild(div);
  });

  // Update balance if balance element exists
  const balanceEl = document.getElementById("balance");
  if (balanceEl) {
    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    balanceEl.innerText = "$" + balance.toFixed(2);
  }
}

// ================= UNIVERSAL BUTTONS =================
function setupSendMoney() {
  const sendBtn = document.getElementById("sendBtn");
  if (!sendBtn) return;

  sendBtn.addEventListener("click", function() {
    const recipient = document.getElementById("recipient").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (!recipient || !amount || amount <= 0) {
      alert("Enter valid recipient and amount");
      return;
    }

    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    if (amount > balance) {
      alert("Insufficient funds");
      return;
    }

    balance -= amount;
    localStorage.setItem("balance", balance.toFixed(2));

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.unshift(`Sent $${amount.toFixed(2)} to ${recipient}`);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    showToast(`$${amount.toFixed(2)} sent to ${recipient}`);

    document.getElementById("recipient").value = "";
    document.getElementById("amount").value = "";
  });
}

function setupReceiveMoney() {
  const receiveBtn = document.getElementById("receiveBtn");
  if (!receiveBtn) return;

  receiveBtn.addEventListener("click", function() {
    const sender = document.getElementById("sender").value.trim();
    const amount = parseFloat(document.getElementById("receiveAmount").value);

    if (!sender || !amount || amount <= 0) {
      alert("Enter valid sender and amount");
      return;
    }

    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    balance += amount;
    localStorage.setItem("balance", balance.toFixed(2));

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.unshift(`Received $${amount.toFixed(2)} from ${sender}`);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    showToast(`$${amount.toFixed(2)} received from ${sender}`);

    document.getElementById("sender").value = "";
    document.getElementById("receiveAmount").value = "";
  });
}

function setupAddMoney() {
  const addBtn = document.getElementById("addBtn");
  if (!addBtn) return;

  addBtn.addEventListener("click", function() {
    const amount = parseFloat(document.getElementById("addAmount").value);
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    balance += amount;
    localStorage.setItem("balance", balance.toFixed(2));

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.unshift(`Added $${amount.toFixed(2)}`);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    showToast(`$${amount.toFixed(2)} added to your account`);
    document.getElementById("addAmount").value = "";
  });
}

function setupRequestMoney() {
  const requestBtn = document.getElementById("requestBtn");
  if (!requestBtn) return;

  requestBtn.addEventListener("click", function() {
    const name = document.getElementById("requestName").value.trim();
    const amount = parseFloat(document.getElementById("requestAmount").value);

    if (!name || !amount || amount <= 0) {
      alert("Enter valid name and amount");
      return;
    }

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.unshift(`Requested $${amount.toFixed(2)} from ${name}`);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    showToast(`Request sent for $${amount.toFixed(2)} to ${name}`);
    document.getElementById("requestName").value = "";
    document.getElementById("requestAmount").value = "";
  });
}

// ================= TOAST =================
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.className = "toast show";

  setTimeout(() => { toast.className = "toast"; }, 2500);
}

// ================= INITIALIZE =================
document.addEventListener("DOMContentLoaded", function() {
  initApp();
  setupSendMoney();
  setupReceiveMoney();
  setupAddMoney();
  setupRequestMoney();
});
