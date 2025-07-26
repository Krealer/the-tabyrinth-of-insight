document.addEventListener('DOMContentLoaded', () => {
  const quoteBtn = document.querySelector('.quote');
  const learnBtn = document.querySelector('.learn');
  const mainMenu = document.getElementById('mainMenu');
  const quotesView = document.getElementById('quotesView');
  const quoteGrid = document.querySelector('#quotesView .quote-grid');
  const backBtn = document.getElementById('backBtn');

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
  }

  quoteBtn.addEventListener('click', e => {
    e.preventDefault();
    hideAllViews();
    quotesView.style.display = 'flex';
    quotesView.scrollTop = 0;
  });

  backBtn.addEventListener('click', () => {
    hideAllViews();
    mainMenu.style.display = 'flex';
  });

});
