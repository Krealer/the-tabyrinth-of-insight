document.addEventListener("DOMContentLoaded", () => {
  const alphabetBtn = document.querySelector(".alphabet");
  const alphabetView = document.getElementById("alphabetView");
  const mainMenu = document.getElementById("mainMenu");
  const alphabetGrid = document.getElementById("alphabetGrid");
  const alphabetBackBtn = document.getElementById("alphabetBackBtn");

  alphabetBtn.addEventListener("click", () => {
    mainMenu.style.display = "none";
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
    mainMenu.style.display = "flex";
  });
});
