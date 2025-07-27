import { loadQuiz } from './quiz.js';
import { loadAlphabet } from './alphabet.js';
import { loadKatakana } from './kana_katakana.js';

function clearMainContent() {
  const container = document.getElementById('main-content');
  container.innerHTML = '';
}

export function showMainMenu() {
  clearMainContent();
  const container = document.getElementById('main-content');

  const learnBtn = document.createElement('button');
  learnBtn.className = 'menu-button';
  learnBtn.innerText = 'Learn Japanese';
  learnBtn.onclick = loadLearnJapaneseMenu;
  container.appendChild(learnBtn);
}

export function loadLearnJapaneseMenu() {
  clearMainContent();
  const container = document.getElementById('main-content');

  const buttons = [
    { label: 'Hiragana', onClick: () => loadAlphabet() },
    { label: 'Katakana', onClick: () => loadKatakana() },
    { label: 'Kanji', onClick: () => alert('Kanji loading soon...') },
    { label: 'Hiragana: Lesson 1', onClick: () => loadQuiz('hiragana') },
    { label: 'Katakana: Lesson 1', onClick: () => loadQuiz('katakana') },
    { label: 'Back', onClick: showMainMenu }
  ];

  for (const { label, onClick } of buttons) {
    const btn = document.createElement('button');
    btn.className = 'menu-button';
    btn.innerText = label;
    btn.onclick = onClick;
    container.appendChild(btn);
  }
}

document.addEventListener('DOMContentLoaded', showMainMenu);
