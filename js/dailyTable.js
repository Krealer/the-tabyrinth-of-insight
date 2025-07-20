function requestDailyTablePassword() {
  const modal = document.getElementById('passwordModal');
  const error = document.getElementById('errorMsg');
  const input = document.getElementById('dailyPassword');
  if (error) error.style.display = 'none';
  if (input) {
    input.value = '';
    input.type = 'password';
  }
  modal.style.display = 'flex';
}

function closePasswordModal() {
  document.getElementById('passwordModal').style.display = 'none';
}

function toggleDailyPassword() {
  const input = document.getElementById('dailyPassword');
  if (input.type === 'password') {
    input.type = 'text';
    document.getElementById('togglePassword').textContent = 'Hide';
  } else {
    input.type = 'password';
    document.getElementById('togglePassword').textContent = 'Show';
  }
}

function verifyDailyTablePassword() {
  const input = document.getElementById('dailyPassword').value;
  if (input === 'Sh4dow') {
    closePasswordModal();
    showTableMenu();
  } else {
    document.getElementById('errorMsg').style.display = 'block';
  }
}

function showTableMenu() {
  const container = document.getElementById('content');
  const mainMenu = document.getElementById('mainMenu');
  if (mainMenu) mainMenu.style.display = 'none';
  container.style.display = 'flex';
  container.innerHTML = `
    <div class="header-title">Daily Table</div>
    <button class="wide-button" onclick="loadTable('2025-07-18')">18/7/2025</button>
    <button class="wide-button" onclick="loadTable('2025-07-19')">19/7/2025</button>
    <button class="menu-button" onclick="goBack()">Back</button>
  `;
}

function loadTable(dateKey) {
  fetch(`tables/${dateKey}.json`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('content');
      container.innerHTML = `
        <div class="header-title">Table — ${dateKey.replace(/-/g, '/')}</div>
        <div class="daily-table">
          ${data.map(item => `
            <div class="daily-row">
              <div class="cell category">${item.category}</div>
              <div class="cell task">${item.task}</div>
              <div class="cell status">${item.status}</div>
            </div>
          `).join('')}
        </div>
        <button class="menu-button" onclick="showTableMenu()">Back</button>
      `;
    });
}

function goBack() {
  const container = document.getElementById('content');
  container.style.display = 'none';
  document.getElementById('mainMenu').style.display = 'flex';
}
