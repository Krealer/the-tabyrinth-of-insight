document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnBtn = document.querySelector('.learn');
  const mainMenu = document.getElementById('mainMenu');
  const quotesView = document.getElementById('quotesView');
  const quoteGrid = document.querySelector('#quotesView .quote-grid');
  const lessonsView = document.getElementById('lessonsView');
  const backBtn = document.getElementById('backBtn');
  const lessonBackBtn = document.getElementById('lessonBackBtn');
  const lessonView = document.getElementById('lessonView');
  const lessonContent = document.getElementById('lessonContent');
  const quizBackBtn = document.getElementById('quizBackBtn');
  const alphabetView = document.getElementById('alphabetView');
  const alphabetGrid = document.getElementById('alphabetGrid');
  const alphabetBackBtn = document.getElementById('alphabetBackBtn');
  const hBtn = document.getElementById('hiraganaBtn');
  const kBtn = document.getElementById('katakanaBtn');
  const kanjiBtn = document.getElementById('kanjiBtn');

  let kanaData = { hiragana: [], katakana: [] };
  let kanjiData = [];
  let activeSet = 'hiragana';

  fetch('data/quotes.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((entry, idx) => {
        const day = entry.day || idx + 1;
        const text = entry.quote || entry;

        const card = document.createElement('div');
        card.className = 'quote-card';

        const inner = document.createElement('div');
        inner.className = 'quote-card-inner';

        const front = document.createElement('div');
        front.className = 'quote-card-front';
        front.textContent = `Day ${day}`;

        const back = document.createElement('div');
        back.className = 'quote-card-back';
        back.textContent = text;

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.addEventListener('click', () => {
          card.classList.toggle('flipped');
        });

        quoteGrid.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to load quotes:', err));

  fetch('data/lessons.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(lesson => {
        const btn = document.createElement('button');
        btn.className = 'menu-button lesson';
        btn.textContent = lesson.title;
        lessonsView.insertBefore(btn, lessonBackBtn);
        if (lesson.title === 'Alphabet') {
          btn.addEventListener('click', () => {
            hideAllViews();
            resetAlphabet();
            alphabetView.style.display = 'flex';
            showSet('hiragana');
          });
        } else {
          btn.addEventListener('click', () => {
            hideAllViews();
            startLesson(`lessons/lesson${lesson.id}.json`);
          });
        }
      });
    })
    .catch(err => console.error('Failed to load lessons:', err));

  fetch('data/kana.json')
    .then(res => res.json())
    .then(data => {
      kanaData = data;
      if (alphabetView.style.display !== 'none' && alphabetGrid.textContent === 'Loading...') {
        showSet(activeSet);
      }
    })
    .catch(err => console.error('Failed to load kana:', err));

  fetch('data/kanji.json')
    .then(res => res.json())
    .then(data => {
      kanjiData = data.kanji;
      if (alphabetView.style.display !== 'none' && alphabetGrid.textContent === 'Loading...') {
        showSet(activeSet);
      }
    })
    .catch(err => console.error('Failed to load kanji:', err));

  function hideAllViews() {
    mainMenu.style.display = 'none';
    quotesView.style.display = 'none';
    lessonsView.style.display = 'none';
    lessonView.style.display = 'none';
    alphabetView.style.display = 'none';
  }

  function resetAlphabet() {
    alphabetGrid.innerHTML = '';
    clearActive();
    alphabetView.scrollTop = 0;
  }

  quoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllViews();
    quotesView.style.display = 'flex';
  });

  backBtn.addEventListener('click', () => {
    document.querySelectorAll('.quote-card.flipped').forEach(c => c.classList.remove('flipped'));
    hideAllViews();
    mainMenu.style.display = 'flex';
  });

  learnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllViews();
    lessonsView.style.display = 'flex';
  });

  lessonBackBtn.addEventListener('click', () => {
    hideAllViews();
    mainMenu.style.display = 'flex';
  });

  alphabetBackBtn.addEventListener('click', () => {
    alphabetView.classList.add('fade-out');
    setTimeout(() => {
      resetAlphabet();
      hideAllViews();
      lessonsView.style.display = 'flex';
      alphabetView.classList.remove('fade-out');
    }, 300);
  });

  hBtn.addEventListener('click', () => showSet('hiragana'));
  kBtn.addEventListener('click', () => showSet('katakana'));
  kanjiBtn.addEventListener('click', () => showSet('kanji'));

  function clearActive() {
    [hBtn, kBtn, kanjiBtn].forEach(b => b.classList.remove('active'));
  }

  function showSet(type) {
    activeSet = type;
    clearActive();
    if (type === 'hiragana') hBtn.classList.add('active');
    if (type === 'katakana') kBtn.classList.add('active');
    if (type === 'kanji') kanjiBtn.classList.add('active');

    alphabetGrid.innerHTML = '';

    if (type === 'kanji' && kanjiData.length === 0) {
      alphabetGrid.textContent = 'Loading...';
      return;
    }
    if ((type === 'hiragana' || type === 'katakana') && kanaData[type].length === 0) {
      alphabetGrid.textContent = 'Loading...';
      return;
    }
    if (type === 'kanji') {
      const title = document.createElement('h3');
      title.className = 'kana-section-title';
      title.textContent = 'Grade 1 Kanji';
      alphabetGrid.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'kanji-grid';
      kanjiData.forEach(k => {
        const card = document.createElement('div');
        card.className = 'char-card kanji-card';
        const readings = Array.isArray(k.readings) ? k.readings.join(' / ') : k.readings;
        card.innerHTML = `<div class="kana">${k.character}</div>` +
                         `<div class="romaji">${readings}</div>` +
                         `<div class="meaning">${k.meaning}</div>`;
        grid.appendChild(card);
      });
      alphabetGrid.appendChild(grid);
    } else if (type === 'hiragana' || type === 'katakana') {
      const groups = kanaData[type].reduce((acc, k) => {
        (acc[k.type] = acc[k.type] || []).push(k);
        return acc;
      }, {});
      const order = ['basic', 'dakuten', 'handakuten', 'youon'];
      const titles = {
        basic: 'Basic',
        dakuten: 'Dakuten',
        handakuten: 'Handakuten',
        youon: 'Yōon'
      };
      order.forEach(key => {
        if (!groups[key]) return;
        const section = document.createElement('div');
        section.className = 'kana-section';
        const title = document.createElement('h3');
        title.className = 'kana-section-title';
        title.textContent = titles[key];
        section.appendChild(title);
        const grid = document.createElement('div');
        grid.className = 'alphabet-grid';
        groups[key].forEach(k => {
          const card = document.createElement('div');
          card.className = `char-card ${key}`;
          card.innerHTML = `<div class="kana">${k.kana}</div>` +
                           `<div class="romaji">${k.romaji}</div>`;
          grid.appendChild(card);
        });
        section.appendChild(grid);
        alphabetGrid.appendChild(section);
      });
    } else {
      kanaData[type].forEach(k => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `<div class="kana">${k.kana}</div>` +
                         `<div class="romaji">${k.romaji}</div>`;
        alphabetGrid.appendChild(card);
      });
    }
  }
});
