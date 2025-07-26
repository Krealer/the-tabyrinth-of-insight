fetch('data/kanji.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('kanjiGrid');
    data.forEach(entry => {
      const kanjiCard = document.createElement('div');
      kanjiCard.className = 'kanji-card';
      kanjiCard.innerHTML = `
        <div class="kanji-character">${entry.kanji}</div>
        <div class="kanji-meaning">${entry.meanings.join(', ')}</div>
        <div class="kanji-readings">
          <strong>On:</strong> ${entry.onyomi.join(', ')}<br>
          <strong>Kun:</strong> ${entry.kunyomi.join(', ')}
        </div>
      `;
      grid.appendChild(kanjiCard);
    });
  });
