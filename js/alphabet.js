document.addEventListener("DOMContentLoaded", () => {
  const alphabetBtn = document.getElementById("alphabetBtn");
  const alphabetView = document.getElementById("alphabetView");
  const lessonsView = document.getElementById("lessonsView");
  const alphabetGrid = document.getElementById("alphabetGrid");
  const alphabetBackBtn = document.getElementById("alphabetBackBtn");

  alphabetBtn.addEventListener("click", () => {
    lessonsView.style.display = "none";
    alphabetView.style.display = "flex";

    fetch("data/kana.json")
      .then(res => res.json())
      .then(data => {
        alphabetGrid.innerHTML = ""; // Clear existing content
        data.forEach(entry => {
          const card = document.createElement("div");
          card.className = "char-card";
          card.innerHTML = `<div>${entry.kana}</div><small>${entry.romaji}</small>`;
          alphabetGrid.appendChild(card);
        });
      });
  });

  alphabetBackBtn.addEventListener("click", () => {
    alphabetView.style.display = "none";
    lessonsView.style.display = "flex";
  });
});
