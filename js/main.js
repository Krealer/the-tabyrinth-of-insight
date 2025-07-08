document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const wrapper = document.querySelector('.wrapper');
  const quotesView = document.getElementById('quotesView');
  const backBtn = document.getElementById('backBtn');

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

  quoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.display = 'none';
    quotesView.style.display = 'flex';
  });

  backBtn.addEventListener('click', () => {
    quotesView.style.display = 'none';
    wrapper.style.display = 'flex';
  });
});
