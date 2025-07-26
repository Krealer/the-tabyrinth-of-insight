document.addEventListener("DOMContentLoaded", () => {
  const hiraganaBtn = document.getElementById("hiraganaBtn");
  const hiraganaView = document.getElementById("hiraganaView");
  const lessonsView = document.getElementById("lessonsView");
  const hiraganaGrid = document.getElementById("hiraganaGrid");
  const hiraganaBackBtn = document.getElementById("hiraganaBackBtn");

  hiraganaBtn.addEventListener("click", () => {
    lessonsView.style.display = "none";
    hiraganaView.style.display = "flex";

    fetch("data/kana.json")
      .then(res => res.json())
      .then(data => {
        hiraganaGrid.innerHTML = ""; // Clear existing content
        data.forEach(entry => {
          const card = document.createElement("div");
          card.className = "char-card";
          card.innerHTML = `<div>${entry.kana}</div><small>${entry.romaji}</small>`;
          hiraganaGrid.appendChild(card);
        });
      });
  });

  hiraganaBackBtn.addEventListener("click", () => {
    hiraganaView.style.display = "none";
    lessonsView.style.display = "flex";
  });
});
