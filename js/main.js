document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnJapaneseButton = document.getElementById('learnJapaneseButton');
  const mainMenu = document.getElementById('mainMenu');
  const quotesView = document.getElementById('quotesView');
  const quoteGrid = document.querySelector('#quotesView .quote-grid');
  const backBtn = document.getElementById('backBtn');
  const lessonsView = document.getElementById('lessonsView');
  const lessonBackBtn = document.getElementById('lessonBackBtn');
  const hiraganaGrid = document.getElementById('hiraganaGrid');
  const hiraganaBtn = document.getElementById('hiraganaBtn');
  const katakanaBtn = document.getElementById('katakanaBtn');
  const kanjiBtn = document.getElementById('kanjiBtn');
  const katakanaGrid = document.getElementById('katakanaGrid');
  const hiraganaView = document.getElementById('hiraganaView');
  const katakanaView = document.getElementById('katakanaView');
  const kanjiView = document.getElementById('kanjiView');

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

  function hideAllAlphabetViews() {
    hiraganaView.classList.add('hidden');
    katakanaView.classList.add('hidden');
    kanjiView.classList.add('hidden');
  }

  hiraganaBtn.addEventListener('click', () => {
    hideAllAlphabetViews();
    lessonsView.classList.add('hidden');
    hiraganaView.classList.remove('hidden');
  });

  katakanaBtn.addEventListener('click', () => {
    hideAllAlphabetViews();
    lessonsView.classList.add('hidden');
    katakanaView.classList.remove('hidden');
  });

  kanjiBtn.addEventListener('click', () => {
    hideAllAlphabetViews();
    lessonsView.classList.add('hidden');
    kanjiView.classList.remove('hidden');
    showKanjiView();
  });

  quoteBtn.addEventListener('click', e => {
    e.preventDefault();
    hideAllViews();
    quotesView.style.display = 'flex';
    quotesView.scrollTop = 0;
  });

  learnJapaneseButton.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    lessonsView.style.display = 'flex';
  });

  // Initialize lesson buttons
  document.getElementById("learnJapaneseButton").onclick = () => {
    document.getElementById("lessonsView").style.display = "flex";
  };

  fetch("data/lessons.json")
    .then(res => res.json())
    .then(lessons => {
      const container = document.getElementById("lessonsView");

      // Insert lesson buttons *after* the alphabet buttons but *before* the Back button
      const alphabetButtons = container.querySelectorAll(".learn-japanese-button");
      const backButton = container.querySelector("button.back-button");

      lessons.forEach(lesson => {
        const btn = document.createElement("button");
        btn.className = "learn-japanese-button";
        btn.textContent = lesson.title;
        btn.onclick = () => startLesson(lesson.id);

        container.insertBefore(btn, backButton);
      });
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
        div.className = 'katakana-card';

        const kana = document.createElement('div');
        kana.textContent = char.kana;

        const romaji = document.createElement('div');
        romaji.textContent = char.romaji;
        romaji.style.fontSize = '14px';

        div.appendChild(kana);
        div.appendChild(romaji);
        katakanaGrid.appendChild(div);
      });
    });
  }


  // Load and render full Hiragana alphabet
  if (hiraganaGrid) {
    fetch('data/hiragana_full.json')
      .then(res => res.json())
      .then(data => {
        data.forEach(entry => {
          const card = document.createElement('div');
          card.className = 'hiragana-card';

          const kana = document.createElement('div');
          kana.textContent = entry.kana;

          const romaji = document.createElement('div');
          romaji.textContent = entry.romaji;
          romaji.style.fontSize = '14px';

          card.appendChild(kana);
          card.appendChild(romaji);
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

function showKanjiView() {
  document.getElementById('lessonsView')?.classList.add('hidden');
  document.getElementById('mainMenu').classList.add('hidden');
  document.getElementById('kanjiView').classList.remove('hidden');

  const grid = document.getElementById('kanjiGrid');
  grid.innerHTML = '';

  fetch('data/kanji.json')
    .then(res => res.json())
    .then(kanjiData => {
      kanjiData.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'kanji-card';

        const char = document.createElement('div');
        char.className = 'kanji-character';
        char.textContent = entry.kanji;

        const meaning = document.createElement('div');
        meaning.className = 'kanji-meaning';
        meaning.textContent = entry.meaning;

        card.appendChild(char);
        card.appendChild(meaning);
        grid.appendChild(card);

        // Preserve search data for future functionality
        card.dataset.kanji = entry.kanji;
        card.dataset.meanings = entry.meaning;
        card.dataset.readings = [...(entry.on || []), ...(entry.kun || [])].join(' ');
        card.dataset.vocab = (entry.vocabulary || []).map(v => `${v.word} ${v.kana} ${v.meaning}`).join(' ');

        // Future step: add onclick logic here
      });

      document.getElementById("kanjiSearchInput").addEventListener("input", function (e) {
        const query = e.target.value.toLowerCase();

        document.querySelectorAll(".kanji-card").forEach(card => {
          const kanji = card.dataset.kanji || "";
          const meanings = (card.dataset.meanings || "").toLowerCase();
          const readings = (card.dataset.readings || "").toLowerCase();
          const vocab = (card.dataset.vocab || "").toLowerCase();

          const match =
            kanji.includes(query) ||
            meanings.includes(query) ||
            readings.includes(query) ||
            vocab.includes(query);

          card.style.display = match ? "block" : "none";
        });
      });
    });
}

function hideKanjiView() {
  document.getElementById('kanjiView').classList.add('hidden');
  document.getElementById('lessonsView')?.classList.remove('hidden');
}

function createKanjiModal(entry) {
  const modal = document.createElement('div');
  modal.className = 'kanji-modal-overlay';

  modal.innerHTML = `
    <div class="kanji-modal">
      <span class="kanji-modal-close" onclick="this.parentElement.parentElement.remove()">×</span>
      <div class="kanji-modal-content">
        <div class="kanji-modal-char">${entry.kanji}</div>
        <div class="kanji-modal-meaning">${entry.meaning}</div>
        <div class="kanji-modal-section"><strong>On'yomi:</strong> ${entry.on.join(', ')}</div>
        <div class="kanji-modal-section"><strong>Kun'yomi:</strong> ${entry.kun.join(', ')}</div>
        <div class="kanji-modal-section"><strong>Kana Components:</strong>
          <span class="kana-tag">${entry.kana_components.join("</span> <span class='kana-tag'>")}</span>
        </div>
      </div>
    </div>
  `;

  const modalContent = modal.querySelector('.kanji-modal-content');

  if (entry.vocabulary && entry.vocabulary.length > 0) {
    const vocabHTML = entry.vocabulary.map(vocab => `
      <div class="kanji-vocab-entry">
        <span class="kanji-vocab-word">${vocab.word}</span>
        <span class="kanji-vocab-kana">[${vocab.kana}]</span>
        <span class="kanji-vocab-meaning">– ${vocab.meaning}</span>
      </div>
    `).join("");

    modalContent.innerHTML += `
      <div class="kanji-modal-section"><strong>Vocabulary:</strong><br>${vocabHTML}</div>
    `;
  }

  document.body.appendChild(modal);
}
