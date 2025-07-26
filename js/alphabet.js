document.addEventListener("DOMContentLoaded", () => {
  const alphabetBtn = document.querySelector(".menu-button.alphabet");
  const alphabetView = document.getElementById("alphabetView");
  const alphabetBackBtn = document.getElementById("alphabetBackBtn");

  if (alphabetBtn && alphabetView && alphabetBackBtn) {
    alphabetBtn.addEventListener("click", () => {
      document.getElementById("mainMenu").classList.add("hidden");
      alphabetView.classList.remove("hidden");
    });

    alphabetBackBtn.addEventListener("click", () => {
      alphabetView.classList.add("hidden");
      document.getElementById("mainMenu").classList.remove("hidden");
    });
  }
});
