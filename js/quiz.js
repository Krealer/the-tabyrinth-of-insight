function renderQuestion(q) {
  const container = document.getElementById("lessonView");
  container.innerHTML = "";

  const promptEl = document.createElement("div");
  promptEl.className = "quiz-prompt";
  promptEl.textContent = q.prompt;
  container.appendChild(promptEl);

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "alphabet-grid"; // or reuse .kanji-grid
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = option;
    btn.onclick = () => handleAnswer(option, q.answer);
    optionsContainer.appendChild(btn);
  });

  container.appendChild(optionsContainer);
}

let currentLessonData = null;
let currentQuestionIndex = 0;

function startLesson(id) {
  fetch(`data/lessons/${id}.json`)
    .then(res => res.json())
    .then(questions => {
      currentLessonData = questions;
      currentQuestionIndex = 0;
      document.getElementById('lessonsView').style.display = 'none';
      document.getElementById('lessonView').style.display = 'flex';
      renderQuestion(currentLessonData[currentQuestionIndex]);
    });
}

function handleAnswer(option, answer) {
  if (option === answer) {
    currentQuestionIndex++;
    if (currentLessonData && currentQuestionIndex < currentLessonData.length) {
      renderQuestion(currentLessonData[currentQuestionIndex]);
    } else {
      const container = document.getElementById('lessonView');
      container.innerHTML = "<div class='quiz-complete'>Lesson Complete!</div>";
    }
  } else {
    alert('Incorrect');
  }
}
