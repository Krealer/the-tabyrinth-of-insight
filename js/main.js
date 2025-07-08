document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const wrapper = document.querySelector('.wrapper');
  const quotesView = document.getElementById('quotesView');
  const backBtn = document.getElementById('backBtn');

  fetch('data/quotes.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(text => {
        const div = document.createElement('div');
        div.className = 'quote-block';
        div.textContent = text;
        quotesView.insertBefore(div, backBtn);
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
