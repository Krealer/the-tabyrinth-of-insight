document.addEventListener('DOMContentLoaded', () => {
  const lesson1View = document.getElementById('lesson1View');
  const lesson1Content = document.getElementById('lesson1Content');
  const lesson1BackBtn = document.getElementById('lesson1BackBtn');
  const lessonsView = document.getElementById('lessonsView');

  let questions = [];
  let current = 0;
  let score = 0;

  function loadQuestions() {
    return fetch('lessons/lesson1.json')
      .then(res => res.json());
  }

  function showScore() {
    lesson1Content.innerHTML = `\n      <h3 class="final-score">You got ${score}/${questions.length} correct!</h3>\n    `;
    const retry = document.createElement('button');
    retry.className = 'btn retry-btn';
    retry.textContent = 'Retry';
    retry.addEventListener('click', startQuiz);
    lesson1Content.appendChild(retry);
  }

  function handleSubmit(input, q, submitBtn) {
    if (input.disabled) return;
    const user = input.value.trim();
    if (!user) return;
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    if (user.toLowerCase() === q.answer.toLowerCase()) {
      feedback.textContent = '✅ Correct';
      feedback.classList.add('correct');
      score++;
    } else {
      feedback.textContent = `❌ Incorrect. ${q.answer}`;
      feedback.classList.add('wrong');
    }
    input.disabled = true;
    submitBtn.disabled = true;
    lesson1Content.appendChild(feedback);

    const next = document.createElement('button');
    next.className = 'btn next-btn';
    next.textContent = current === questions.length - 1 ? 'Finish' : 'Next';
    next.addEventListener('click', () => {
      current++;
      if (current < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    });
    lesson1Content.appendChild(next);
  }

  function showQuestion() {
    const q = questions[current];
    lesson1Content.innerHTML = '';
    const promptEl = document.createElement('div');
    promptEl.className = 'quiz-prompt';
    promptEl.textContent = `What is ${q.prompt}?`;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'quiz-input';
    input.autofocus = true;
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn quiz-submit';
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', () => handleSubmit(input, q, submitBtn));
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSubmit(input, q, submitBtn);
    });
    lesson1Content.appendChild(promptEl);
    lesson1Content.appendChild(input);
    lesson1Content.appendChild(submitBtn);
  }

  function startQuiz() {
    current = 0;
    score = 0;
    loadQuestions()
      .then(qs => {
        questions = qs.sort(() => Math.random() - 0.5);
        showQuestion();
      })
      .catch(err => {
        lesson1Content.textContent = 'Failed to load lesson.';
        console.error(err);
      });
  }

  window.startLesson1 = startQuiz;

  lesson1BackBtn.addEventListener('click', () => {
    lesson1View.classList.add('fade-out');
    setTimeout(() => {
      lesson1Content.innerHTML = '';
      lesson1View.style.display = 'none';
      lesson1View.classList.remove('fade-out');
      lessonsView.style.display = 'flex';
    }, 300);
  });
});
