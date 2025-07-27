document.addEventListener("DOMContentLoaded", () => {
  const hiraganaBtn = document.getElementById("hiraganaBtn");
  const hiraganaView = document.getElementById("hiraganaView");
  const lessonsView = document.getElementById("lessonsView");
  const hiraganaGrid = document.getElementById("hiraganaGrid");
  const hiraganaBackBtn = document.getElementById("hiraganaBackBtn");

  hiraganaBtn.addEventListener("click", () => {
    lessonsView.classList.add("hidden");
    hiraganaView.classList.remove("hidden");

    fetch("data/hiragana.json")
      .then(res => res.json())
      .then(data => {
        hiraganaGrid.innerHTML = ""; // Clear existing content
        data.forEach(entry => {
          const card = document.createElement("div");
          card.className = "hiragana-card";

          const kana = document.createElement("div");
          kana.textContent = entry.kana;

          const romaji = document.createElement("div");
          romaji.textContent = entry.romaji;
          romaji.style.fontSize = "14px";

          card.appendChild(kana);
          card.appendChild(romaji);
          hiraganaGrid.appendChild(card);
        });
      });
  });

  hiraganaBackBtn.addEventListener("click", () => {
    hiraganaView.classList.add("hidden");
    lessonsView.classList.remove("hidden");
  });
});
