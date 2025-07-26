fetch('data/kanji.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('kanjiGrid');
    data.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'kanji-card';
      card.innerHTML = `
        <div class="kanji">${entry.kanji}</div>
        <div class="meaning">${entry.meanings.join(', ')}</div>
        <div class="reading">
          <strong>On:</strong> ${entry.onyomi.join(', ')}<br>
          <strong>Kun:</strong> ${entry.kunyomi.join(', ')}
        </div>
      `;
      grid.appendChild(card);
    });
  });
