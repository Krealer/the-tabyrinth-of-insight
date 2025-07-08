document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnBtn = document.querySelector('.learn');
  const wrapper = document.querySelector('.wrapper');
  const quotesView = document.getElementById('quotesView');
  const lessonsView = document.getElementById('lessonsView');
  const backBtn = document.getElementById('backBtn');
  const lessonBackBtn = document.getElementById('lessonBackBtn');
  const alphabetView = document.getElementById('alphabetView');
  const alphabetGrid = document.getElementById('alphabetGrid');
  const alphabetBackBtn = document.getElementById('alphabetBackBtn');
  const hBtn = document.getElementById('hiraganaBtn');
  const kBtn = document.getElementById('katakanaBtn');
  const kanjiBtn = document.getElementById('kanjiBtn');

  let kanaData = { hiragana: [], katakana: [] };
  let kanjiData = [];

  fetch('data/quotes.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((text, idx) => {
        const card = document.createElement('div');
        card.className = 'quote-card';

        const inner = document.createElement('div');
        inner.className = 'card-inner';

        const front = document.createElement('div');
        front.className = 'card-face card-front';
        front.textContent = `Day ${idx + 1}`;

        const back = document.createElement('div');
        back.className = 'card-face card-back';
        back.textContent = text;

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.addEventListener('click', () => {
          card.classList.toggle('flip');
        });

        quotesView.insertBefore(card, backBtn);
      });
    });

  fetch('data/lessons.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(lesson => {
        const btn = document.createElement('button');
        btn.className = 'btn lesson';
        btn.textContent = lesson.title;
        lessonsView.insertBefore(btn, lessonBackBtn);
        if (lesson.title === 'Alphabet') {
          btn.addEventListener('click', () => {
            lessonsView.style.display = 'none';
            alphabetView.style.display = 'flex';
            showSet('hiragana');
          });
        }
      });
    });

  fetch('data/kana.json')
    .then(res => res.json())
    .then(data => {
      kanaData = data;
    });

  fetch('data/kanji.json')
    .then(res => res.json())
    .then(data => {
      kanjiData = data.kanji;
    });

  quoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.display = 'none';
    quotesView.style.display = 'flex';
  });

  backBtn.addEventListener('click', () => {
    quotesView.style.display = 'none';
    wrapper.style.display = 'flex';
  });

  learnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.display = 'none';
    lessonsView.style.display = 'flex';
  });

  lessonBackBtn.addEventListener('click', () => {
    lessonsView.style.display = 'none';
    wrapper.style.display = 'flex';
  });

  alphabetBackBtn.addEventListener('click', () => {
    alphabetView.style.display = 'none';
    lessonsView.style.display = 'flex';
  });

  hBtn.addEventListener('click', () => showSet('hiragana'));
  kBtn.addEventListener('click', () => showSet('katakana'));
  kanjiBtn.addEventListener('click', () => showSet('kanji'));

  function clearActive() {
    [hBtn, kBtn, kanjiBtn].forEach(b => b.classList.remove('active'));
  }

  function showSet(type) {
    clearActive();
    if (type === 'hiragana') hBtn.classList.add('active');
    if (type === 'katakana') kBtn.classList.add('active');
    if (type === 'kanji') kanjiBtn.classList.add('active');

    alphabetGrid.innerHTML = '';
    if (type === 'kanji') {
      kanjiData.forEach(k => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `<div class="kana">${k.character}</div>` +
                         `<div class="romaji">${k.reading}</div>` +
                         `<div class="meaning">${k.meaning}</div>`;
        alphabetGrid.appendChild(card);
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
