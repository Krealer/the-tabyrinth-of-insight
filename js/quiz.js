import { loadLearnJapaneseMenu } from './main.js';

let currentQuestions = [];
let currentQuestionIndex = 0;
let endless = false;
let pool = [];
let allPool = [];
let currentType = '';

export function loadQuiz(type) {
  const container = document.getElementById('main-content');
  container.innerHTML = '';

  const modes = ['5', '10', 'all', 'endless'];
  modes.forEach(mode => {
    const btn = document.createElement('button');
    btn.className = 'menu-button';
    btn.innerText =
      mode === 'all'
        ? 'All questions'
        : mode === 'endless'
        ? 'Endless'
        : `${mode} questions`;
    btn.onclick = () => startQuiz(type, mode);
    container.appendChild(btn);
  });

  const backBtn = document.createElement('button');
  backBtn.className = 'back-button';
  backBtn.innerText = 'Back to Learn Japanese';
  backBtn.onclick = loadLearnJapaneseMenu;
  container.appendChild(backBtn);
}

async function startQuiz(type, mode) {
  currentType = type;
  const response = await fetch(`data/lessons/${type}_lesson1.json`);
  const questions = await response.json();
  let selected = [];
  endless = false;
  if (mode === '5' || mode === '10') {
    selected = shuffle([...questions]).slice(0, parseInt(mode));
  } else if (mode === 'all') {
    selected = [...questions];
  } else if (mode === 'endless') {
    endless = true;
    allPool = [...questions];
    pool = shuffle([...questions]);
    selected = [pool.shift()];
  }
  runQuiz(selected);
}

function runQuiz(questions) {
  currentQuestions = questions;
  currentQuestionIndex = 0;
  renderQuestion(currentQuestions[currentQuestionIndex]);
}

function renderQuestion(question) {
  const container = document.getElementById('main-content');
  container.innerHTML = '';

  const qDiv = document.createElement('div');
  qDiv.className = 'question-text';
  qDiv.textContent = question.prompt;
  container.appendChild(qDiv);

  const answersDiv = document.createElement('div');
  answersDiv.className = 'answer-buttons';
  shuffle([...question.options]).forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    answersDiv.appendChild(btn);
  });
  container.appendChild(answersDiv);

  const backBtn = document.createElement('button');
  backBtn.className = 'back-button';
  backBtn.innerText = 'Back to Mode Selection';
  backBtn.onclick = () => loadQuiz(currentType);
  container.appendChild(backBtn);
}

function checkAnswer(option) {
  if (option === currentQuestions[currentQuestionIndex].answer) {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      renderQuestion(currentQuestions[currentQuestionIndex]);
    } else if (endless) {
      if (pool.length === 0) {
        pool = shuffle([...allPool]);
      }
      currentQuestions = [pool.shift()];
      currentQuestionIndex = 0;
      renderQuestion(currentQuestions[0]);
    } else {
      showComplete();
    }
  } else {
    alert('Incorrect');
  }
}

function showComplete() {
  const container = document.getElementById('main-content');
  container.innerHTML = "<div class='quiz-complete'>Lesson Complete!</div>";
  const backBtn = document.createElement('button');
  backBtn.className = 'back-button';
  backBtn.innerText = 'Back to Mode Selection';
  backBtn.onclick = () => loadQuiz(currentType);
  container.appendChild(backBtn);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
