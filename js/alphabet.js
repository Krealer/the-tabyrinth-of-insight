import { loadLearnJapaneseMenu } from './main.js';

export async function loadAlphabet() {
  const container = document.getElementById('main-content');
  container.innerHTML = '<h2>Hiragana</h2><div id="hiraganaGrid" class="hiragana-grid"></div>';
  const grid = container.querySelector('#hiraganaGrid');

  const data = await fetch('data/hiragana.json').then(res => res.json());
  data.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'hiragana-card';

    const kana = document.createElement('div');
    kana.textContent = entry.kana;

    const romaji = document.createElement('div');
    romaji.textContent = entry.romaji;
    romaji.style.fontSize = '14px';

    card.appendChild(kana);
    card.appendChild(romaji);
    grid.appendChild(card);
  });

  const backBtn = document.createElement('button');
  backBtn.className = 'back-button';
  backBtn.innerText = 'Back';
  backBtn.onclick = loadLearnJapaneseMenu;
  container.appendChild(backBtn);
}
