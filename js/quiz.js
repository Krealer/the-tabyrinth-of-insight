function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let currentLessonData = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let quizCallback = null;

function startLesson(id) {
  fetch(`data/lessons/${id}.json`)
    .then(res => res.json())
    .then(questions => {
      currentLessonData = { questions };
      document.getElementById('lessonsView').style.display = 'none';
      document.getElementById('lessonView').style.display = 'flex';
      showModeSelection(currentLessonData);
    });
}

function showModeSelection(lessonData) {
  currentLessonData = lessonData;
  const view = document.getElementById('lessonView');
  view.innerHTML = `
    <h2>Select Quiz Mode</h2>
    <div class="mode-buttons">
      <button onclick="startQuiz('5')">5 Questions (Random)</button>
      <button onclick="startQuiz('10')">10 Questions (Random)</button>
      <button onclick="startQuiz('all')">All Questions (Ordered)</button>
      <button onclick="startQuiz('endless')">Endless (Random)</button>
    </div>
  `;
  view.style.display = 'flex';
}

function startQuiz(mode) {
  let questions;
  if (mode === '5') {
    questions = shuffle([...currentLessonData.questions]).slice(0, 5);
  } else if (mode === '10') {
    questions = shuffle([...currentLessonData.questions]).slice(0, 10);
  } else if (mode === 'all') {
    questions = [...currentLessonData.questions];
  } else if (mode === 'endless') {
    questions = shuffle([...currentLessonData.questions]);
    runEndlessQuiz(questions);
    return;
  }

  runQuiz(questions);
}

function runQuiz(questions, onComplete) {
  currentQuestions = questions;
  currentQuestionIndex = 0;
  quizCallback = onComplete || null;
  renderQuestion(currentQuestions[currentQuestionIndex]);
}

function runEndlessQuiz(questions) {
  if (questions.length === 0) {
    questions = shuffle([...currentLessonData.questions]);
  }
  const [first, ...rest] = questions;
  runQuiz([first], () => runEndlessQuiz(rest));
}

function renderQuestion(q) {
  const container = document.getElementById('lessonView');
  container.innerHTML = '';

  const promptEl = document.createElement('div');
  promptEl.className = 'quiz-prompt';
  promptEl.textContent = q.prompt;
  container.appendChild(promptEl);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'alphabet-grid';
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = option;
    btn.onclick = () => handleAnswer(option, q.answer);
    optionsContainer.appendChild(btn);
  });

  container.appendChild(optionsContainer);

  const backBtn = document.createElement('button');
  backBtn.className = 'back-button';
  backBtn.textContent = 'Back to Mode Selection';
  backBtn.onclick = () => showModeSelection(currentLessonData);
  container.appendChild(backBtn);
}

function handleAnswer(option, answer) {
  if (option === answer) {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      renderQuestion(currentQuestions[currentQuestionIndex]);
    } else {
      const cb = quizCallback;
      quizCallback = null;
      if (cb) {
        cb();
      } else {
        const container = document.getElementById('lessonView');
        container.innerHTML = "<div class='quiz-complete'>Lesson Complete!</div>";
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = 'Back to Mode Selection';
        backButton.onclick = () => showModeSelection(currentLessonData);
        container.appendChild(backButton);
      }
    }
  } else {
    alert('Incorrect');
  }
}
