document.addEventListener('DOMContentLoaded', () => {
  const lesson2View = document.getElementById('lesson2View');
  const lesson2Content = document.getElementById('lesson2Content');
  const lesson2BackBtn = document.getElementById('lesson2BackBtn');
  const lessonsView = document.getElementById('lessonsView');

  let firstPass = [];
  let retryQueue = [];
  let current = 0;
  let retryIndex = 0;
  let inRetry = false;
  let quizMode = 'mix';

  let correctFirst = 0;
  let correctSecond = 0;

  function loadQuestions() {
    return fetch('lessons/lesson2.json').then(res => res.json());
  }

  // PATCH: normalize user input and answers
  function normalizeInput(str) {
    return str.trim().toLowerCase();
  }

  function showScore() {
    const totalCorrect = correctFirst + correctSecond;
    const incorrect = firstPass.length - totalCorrect;
    lesson2Content.classList.remove('retry');
    lesson2Content.innerHTML = `
      <h3 class="final-score">📝 Score: ${totalCorrect}/${firstPass.length}</h3>
      <p>${correctFirst} correct on first try</p>
      <p>${correctSecond} correct on second try</p>
      <p>${incorrect} incorrect</p>
    `;
    const retry = document.createElement('button');
    retry.className = 'btn retry-btn';
    retry.textContent = 'Retry';
    retry.addEventListener('click', showModeOptions);
    lesson2Content.appendChild(retry);
  }

  function handleSubmit(input, q, submitBtn, isRetry) {
    if (input.disabled) return;
    const user = normalizeInput(input.value);
    if (!user) return;

    const correct = user === normalizeInput(q.answer);
    input.disabled = true;
    submitBtn.disabled = true;

    if (correct) {
      const msg = document.createElement('div');
      msg.className = 'quiz-feedback correct';
      msg.textContent = isRetry ? '✅ Correct on second attempt!' : '✅ Correct!';
      lesson2Content.appendChild(msg);
      if (isRetry) correctSecond++; else correctFirst++;
    } else {
      const wrong = document.createElement('div');
      wrong.className = 'quiz-feedback wrong';
      wrong.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
      lesson2Content.appendChild(wrong);
      if (!isRetry) {
        const retryNote = document.createElement('div');
        retryNote.className = 'quiz-feedback';
        retryNote.textContent = '🔁 You\u2019ll retry this question later.';
        lesson2Content.appendChild(retryNote);
        retryQueue.push(q);
      } else {
        const finalNote = document.createElement('div');
        finalNote.className = 'quiz-feedback wrong';
        finalNote.textContent = `Still incorrect. Final answer: ${q.answer}`;
        lesson2Content.appendChild(finalNote);
      }
    }

    const next = document.createElement('button');
    next.className = 'btn next-btn';
    const lastFirst = !inRetry && current === firstPass.length - 1;
    const lastRetry = inRetry && retryIndex === retryQueue.length - 1;
    next.textContent = (lastFirst && retryQueue.length === 0) || lastRetry ? 'Finish' : 'Next';
    next.addEventListener('click', () => {
      if (!inRetry) {
        current++;
        if (current < firstPass.length) {
          showQuestion();
        } else if (retryQueue.length > 0) {
          inRetry = true;
          retryIndex = 0;
          showQuestion();
        } else {
          showScore();
        }
      } else {
        retryIndex++;
        if (retryIndex < retryQueue.length) {
          showQuestion();
        } else {
          showScore();
        }
      }
    });
    lesson2Content.appendChild(next);
  }

  // PATCH: handle multiple choice interactions
  function handleChoice(btn, buttons, q, isRetry) {
    if (btn.disabled) return;
    buttons.forEach(b => (b.disabled = true));
    const user = normalizeInput(btn.textContent);
    const correct = user === normalizeInput(q.answer);

    if (correct) {
      btn.classList.add('correct');
      const msg = document.createElement('div');
      msg.className = 'quiz-feedback correct';
      msg.textContent = isRetry ? '✅ Correct on second attempt!' : '✅ Correct!';
      lesson2Content.appendChild(msg);
      if (isRetry) correctSecond++; else correctFirst++;
    } else {
      btn.classList.add('wrong');
      const right = buttons.find(b => normalizeInput(b.textContent) === normalizeInput(q.answer));
      if (right) right.classList.add('correct');
      const wrong = document.createElement('div');
      wrong.className = 'quiz-feedback wrong';
      wrong.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
      lesson2Content.appendChild(wrong);
      if (!isRetry) {
        const retryNote = document.createElement('div');
        retryNote.className = 'quiz-feedback';
        retryNote.textContent = '🔁 You\u2019ll retry this question later.';
        lesson2Content.appendChild(retryNote);
        retryQueue.push(q);
      } else {
        const finalNote = document.createElement('div');
        finalNote.className = 'quiz-feedback wrong';
        finalNote.textContent = `Still incorrect. Final answer: ${q.answer}`;
        lesson2Content.appendChild(finalNote);
      }
    }

    const next = document.createElement('button');
    next.className = 'btn next-btn';
    const lastFirst = !inRetry && current === firstPass.length - 1;
    const lastRetry = inRetry && retryIndex === retryQueue.length - 1;
    next.textContent = (lastFirst && retryQueue.length === 0) || lastRetry ? 'Finish' : 'Next';
    next.addEventListener('click', () => {
      if (!inRetry) {
        current++;
        if (current < firstPass.length) {
          showQuestion();
        } else if (retryQueue.length > 0) {
          inRetry = true;
          retryIndex = 0;
          showQuestion();
        } else {
          showScore();
        }
      } else {
        retryIndex++;
        if (retryIndex < retryQueue.length) {
          showQuestion();
        } else {
          showScore();
        }
      }
    });
    lesson2Content.appendChild(next);
  }


  function showQuestion() {
    lesson2Content.innerHTML = '';
    const q = inRetry ? retryQueue[retryIndex] : firstPass[current];
    lesson2Content.classList.toggle('retry', inRetry);

    const promptEl = document.createElement('div');
    promptEl.className = 'quiz-prompt';
    promptEl.textContent = `What is ${q.prompt}?`;
    lesson2Content.appendChild(promptEl);

    if (q.type === 'input') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'quiz-input';
      input.autofocus = true;

      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn quiz-submit';
      submitBtn.textContent = 'Submit';
      submitBtn.addEventListener('click', () => handleSubmit(input, q, submitBtn, inRetry));
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubmit(input, q, submitBtn, inRetry);
      });

      lesson2Content.appendChild(input);
      lesson2Content.appendChild(submitBtn);
    } else if (q.type === 'multiple-choice') {
      const buttons = [];
      const choices = Array.isArray(q.choices) ? [...new Set(q.choices)] : [];
      // BUG FIX: guard against empty or invalid choice arrays
      if (choices.length === 0) {
        const err = document.createElement('div');
        err.textContent = 'Question has no choices';
        lesson2Content.appendChild(err);
        return;
      }
      choices.forEach(choice => {
        const b = document.createElement('button');
        b.className = 'btn quiz-option';
        b.textContent = choice;
        b.addEventListener('click', () => handleChoice(b, buttons, q, inRetry));
        buttons.push(b);
        lesson2Content.appendChild(b);
      });
    } else {
      // BUG FIX: handle unsupported question types
      const err = document.createElement('div');
      err.textContent = 'Unsupported question type.';
      lesson2Content.appendChild(err);
    }
  }

  function startQuiz(mode = 'mix') {
    quizMode = mode; // PATCH: allow question style selection
    current = 0;
    retryIndex = 0;
    inRetry = false;
    correctFirst = 0;
    correctSecond = 0;
    retryQueue = [];
    lesson2Content.classList.remove('retry');
    loadQuestions()
      .then(qs => {
        let filtered = qs;
        if (quizMode === 'input') filtered = qs.filter(q => q.type === 'input');
        if (quizMode === 'mcq') filtered = qs.filter(q => q.type === 'multiple-choice');
        firstPass = filtered.sort(() => Math.random() - 0.5);
        showQuestion();
      })
      .catch(err => {
        lesson2Content.textContent = 'Failed to load lesson.';
        console.error(err);
      });
  }

  // PATCH: choose between input, mcq or mix modes
  function showModeOptions() {
    lesson2Content.innerHTML = '';
    const title = document.createElement('h3');
    title.className = 'quiz-prompt';
    title.textContent = 'Choose question style';
    lesson2Content.appendChild(title);

    const modes = [
      { key: 'mix', label: 'Mix' },
      { key: 'input', label: 'Typing Only' },
      { key: 'mcq', label: 'Multiple Choice Only' }
    ];
    modes.forEach(m => {
      const btn = document.createElement('button');
      btn.className = 'btn mode-btn';
      btn.textContent = m.label;
      btn.addEventListener('click', () => startQuiz(m.key));
      lesson2Content.appendChild(btn);
    });
  }

  window.startLesson2 = showModeOptions;

  lesson2BackBtn.addEventListener('click', () => {
    lesson2View.classList.add('fade-out');
    setTimeout(() => {
      lesson2Content.innerHTML = '';
      lesson2View.style.display = 'none';
      lesson2View.classList.remove('fade-out');
      lessonsView.style.display = 'flex';
    }, 300);
  });
});
