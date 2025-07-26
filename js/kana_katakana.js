document.addEventListener('DOMContentLoaded', () => {
  fetch('data/katakana.json')
    .then(res => res.json())
    .then(katakana => {
      const grid = document.getElementById('katakanaGrid');
      katakana.forEach(({ kana, romaji }) => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `<strong>${kana}</strong><br><span>${romaji}</span>`;
        grid.appendChild(card);
      });
    });
});
