export function loadLearnJapaneseMenu() {
  const content = document.getElementById('main-content');
  if (!content) {
    console.error('No #main-content to render into.');
    return;
  }

  content.innerHTML = '';

  const header = document.createElement('h1');
  header.textContent = 'Learn Japanese';
  content.appendChild(header);

  const button = document.createElement('button');
  button.className = 'menu-button';
  button.textContent = 'Hiragana: Lesson 1';
  button.onclick = () => alert('Lesson loaded!');
  content.appendChild(button);
}
