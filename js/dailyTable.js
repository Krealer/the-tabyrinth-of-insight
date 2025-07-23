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
    <button class="wide-button" onclick="loadDailyTable('18/7/2025')">18/7/2025</button>
    <button class="wide-button" onclick="loadDailyTable('19/7/2025')">19/7/2025</button>
    <button class="wide-button" onclick="loadDailyTable('20/7/2025')">20/7/2025</button>
    <button class="menu-button" onclick="goBack()">Back</button>
  `;
}

function loadTable(date) {
  fetch('daily_table.json')
    .then(response => response.json())
    .then(data => {
      const tableData = data.tables.find(t => t.date === date);
      if (!tableData || !tableData.data) return;

      const container = document.getElementById('content');
      container.innerHTML = `
        <div class="header-title">Table — ${date}</div>
        <div id="table-display"></div>
        <button class="menu-button" onclick="showTableMenu()">Back</button>
      `;

      const tableContainer = document.getElementById('table-display');
      tableContainer.innerHTML = '';
      const table = document.createElement('table');

      const headers = Object.keys(tableData.data[0]);
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      tableData.data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(key => {
          const td = document.createElement('td');
          td.textContent = row[key];
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });

      tableContainer.appendChild(table);
    });
}

function loadDailyTable(date) {
  fetch('data/daily_tables.json')
    .then(res => res.json())
    .then(allTables => {
      const table = allTables.find(t => t.date === date);
      if (!table) return;

      const container = document.getElementById('content');
      container.innerHTML = `
        <div class="header-title">Table — ${date}</div>
        <div class="daily-table">
          ${table.entries
            .map(item => `
              <div class="daily-row">
                <div class="cell category">${item.category}</div>
                <div class="cell task">${item.task}</div>
                <div class="cell status">${item.status}</div>
              </div>
            `)
            .join('')}
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
