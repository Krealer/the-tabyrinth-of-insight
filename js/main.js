document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnBtn = document.querySelector('.learn');
  const wrapper = document.querySelector('.wrapper');
  const quotesView = document.getElementById('quotesView');
  const lessonsView = document.getElementById('lessonsView');
  const backBtn = document.getElementById('backBtn');
  const lessonBackBtn = document.getElementById('lessonBackBtn');

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
      });
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
});
