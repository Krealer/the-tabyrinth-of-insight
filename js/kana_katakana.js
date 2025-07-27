import { loadLearnJapaneseMenu } from './main.js';

export async function loadKatakana() {
  const container = document.getElementById('main-content');
  container.innerHTML = '<h2>Katakana</h2><div id="katakanaGrid" class="katakana-grid"></div>';
  const grid = container.querySelector('#katakanaGrid');

  const katakana = await fetch('data/katakana.json').then(res => res.json());
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

  const backBtn = document.createElement('button');
  backBtn.className = 'back-button';
  backBtn.innerText = 'Back';
  backBtn.onclick = loadLearnJapaneseMenu;
  container.appendChild(backBtn);
}
