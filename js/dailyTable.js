const dailyTableData = [
  { category: "Must Do", task: "History", status: "❌" },
  { category: "Must Do", task: "Languages", status: "❌" },
  { category: "Must Do", task: "Education", status: "❌" },
  { category: "Must Do", task: "About Me", status: "✅" },
  { category: "Must Do", task: "Psychology", status: "❌" },
];

function showDailyTable() {
  const container = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  if (mainMenu) mainMenu.style.display = "none";
  container.style.display = "flex";
  container.innerHTML = `
    <div class="header-title">Daily Table</div>
    <div class="daily-table">
      ${dailyTableData
        .map(
          (item) => `
        <div class="daily-row">
          <div class="cell category">${item.category}</div>
          <div class="cell task">${item.task}</div>
          <div class="cell status">${item.status}</div>
        </div>
      `
        )
        .join("")}
      <button class="menu-button" onclick="goBack()">Back</button>
    </div>
  `;
}

function goBack() {
  const container = document.getElementById("content");
  container.style.display = "none";
  document.getElementById("mainMenu").style.display = "flex";
}
