document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnJapaneseBtn = document.querySelector('.learn');
  const mainMenu = document.getElementById('mainMenu');
  const quotesView = document.getElementById('quotesView');
  const quoteGrid = document.querySelector('#quotesView .quote-grid');
  const backBtn = document.getElementById('backBtn');
  const lessonsView = document.getElementById('lessonsView');
  const lessonBackBtn = document.getElementById('lessonBackBtn');
  const hiraganaGrid = document.querySelector('.alphabet-grid');

  // Load and render daily quotes
  fetch('data/quotes.json')
    .then(res => res.json())
    .then(data => {
      quoteGrid.innerHTML = '';
      data.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'quote-card';
        const dayLabel = document.createElement('div');
        dayLabel.className = 'quote-day';
        dayLabel.textContent = `Day ${entry.day}`;
        const quoteText = document.createElement('div');
        quoteText.className = 'quote-entry';
        quoteText.textContent = entry.quote;
        card.appendChild(dayLabel);
        card.appendChild(quoteText);
        quoteGrid.appendChild(card);
      });
    });

  function hideAllViews() {
    mainMenu.style.display = 'none';
    quotesView.style.display = 'none';
    lessonsView.style.display = 'none';
  }

  quoteBtn.addEventListener('click', e => {
    e.preventDefault();
    hideAllViews();
    quotesView.style.display = 'flex';
    quotesView.scrollTop = 0;
  });

  learnJapaneseBtn.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    lessonsView.style.display = 'flex';
  });

  lessonBackBtn.addEventListener('click', () => {
    lessonsView.style.display = 'none';
    mainMenu.style.display = 'flex';
  });

  backBtn.addEventListener('click', () => {
    hideAllViews();
    mainMenu.style.display = 'flex';
  });

  // Load and render full Hiragana alphabet
  if (hiraganaGrid) {
    fetch('data/hiragana_full.json')
      .then(res => res.json())
      .then(data => {
        data.forEach(entry => {
          const card = document.createElement('div');
          card.className = 'char-card';
          card.innerHTML = `\n        <div class="kana">${entry.kana}</div>\n        <div class="romaji">${entry.romaji}</div>\n      `;
          hiraganaGrid.appendChild(card);
        });
      });
  }

});
