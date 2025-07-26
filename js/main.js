document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnJapaneseBtn = document.querySelector('.learn');
  const mainMenu = document.getElementById('mainMenu');
  const quotesView = document.getElementById('quotesView');
  const quoteGrid = document.querySelector('#quotesView .quote-grid');
  const backBtn = document.getElementById('backBtn');
  const lessonsView = document.getElementById('lessonsView');
  const lessonBackBtn = document.getElementById('lessonBackBtn');
  const hiraganaGrid = document.getElementById('hiraganaGrid');
  const katakanaBtn = document.getElementById('katakanaBtn');
  const katakanaGrid = document.getElementById('katakanaGrid');
  const kanjiBtn = document.getElementById('kanjiBtn');
  const kanjiView = document.getElementById('kanjiView');
  const kanjiBackBtn = document.getElementById('kanjiBackBtn');

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

  // Load and render Katakana alphabet on demand
  if (katakanaBtn) {
    katakanaBtn.addEventListener('click', async () => {
      lessonsView.classList.add('hidden');
      document.getElementById('katakanaView').classList.remove('hidden');
      katakanaGrid.innerHTML = '';
      const response = await fetch('data/katakana.json');
      const katakana = await response.json();
      katakana.forEach(char => {
        const div = document.createElement('div');
        div.className = 'char-card';
        div.innerHTML = `<div>${char.kana}</div><small>${char.romaji}</small>`;
        katakanaGrid.appendChild(div);
      });
    });
  }

  if (kanjiBtn && kanjiView && kanjiBackBtn) {
    kanjiBtn.addEventListener('click', () => {
      hideAllViews();
      kanjiView.style.display = 'flex';
    });

    kanjiBackBtn.addEventListener('click', () => {
      kanjiView.style.display = 'none';
      document.getElementById('lessonsView').style.display = 'flex';
    });
  }

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

function returnToLearnJapanese() {
  document.getElementById('hiraganaView')?.classList.add('hidden');
  document.getElementById('katakanaView')?.classList.add('hidden');
  document.getElementById('lessonsView').classList.remove('hidden');
}

function showKatakana() {
  document.getElementById('lessonsView').classList.add('hidden');
  document.getElementById('katakanaView').classList.remove('hidden');
}
