document.addEventListener('DOMContentLoaded', () => {
  fetch('data/katakana.json')
    .then(res => res.json())
    .then(katakana => {
      const grid = document.getElementById('katakanaGrid');
      grid.innerHTML = '';
      katakana.forEach(({ kana, romaji }) => {
        const card = document.createElement('div');
        card.className = 'katakana-card';

        const kanaEl = document.createElement('div');
        kanaEl.textContent = kana;

        const romajiEl = document.createElement('div');
        romajiEl.textContent = romaji;
        romajiEl.style.fontSize = '14px';

        card.appendChild(kanaEl);
        card.appendChild(romajiEl);
        grid.appendChild(card);
      });
    });
});
