// Generic quiz engine capable of running any lesson dataset
// Usage: loadLesson(data, options)
// options: {viewEl, contentEl, backBtn, onExit}

(function() {
  const state = {
    firstPass: [],
    retryQueue: [],
    current: 0,
    retryIndex: 0,
    inRetry: false,
    correctFirst: 0,
    correctSecond: 0,
    quizMode: 'mix',
    lessonData: null,
    viewEl: null,
    contentEl: null,
    backBtn: null,
    onExit: null
  };

  function normalizeInput(str) {
    return (str || '').toString().trim().toLowerCase();
  }

  function cleanup() {
    state.firstPass = [];
    state.retryQueue = [];
    state.current = 0;
    state.retryIndex = 0;
    state.inRetry = false;
    state.correctFirst = 0;
    state.correctSecond = 0;
    state.quizMode = 'mix';
    state.lessonData = null;
    if (state.contentEl) state.contentEl.innerHTML = '';
  }

  function showScore() {
    const totalCorrect = state.correctFirst + state.correctSecond;
    const incorrect = state.firstPass.length - totalCorrect;
    state.contentEl.classList.remove('retry');
    state.contentEl.innerHTML =
      `<h3 class="final-score">📝 Score: ${totalCorrect}/${state.firstPass.length}</h3>` +
      `<p>${state.correctFirst} correct on first try</p>` +
      `<p>${state.correctSecond} correct on second try</p>` +
      `<p>${incorrect} incorrect</p>`;
    const retry = document.createElement('button');
    retry.className = 'btn retry-btn';
    retry.textContent = 'Retry';
    retry.addEventListener('click', showModeOptions);
    state.contentEl.appendChild(retry);
  }

  function nextQuestion() {
    if (!state.inRetry) {
      state.current++;
      if (state.current < state.firstPass.length) {
        showQuestion();
      } else if (state.retryQueue.length > 0) {
        state.inRetry = true;
        state.retryIndex = 0;
        showQuestion();
      } else {
        showScore();
      }
    } else {
      state.retryIndex++;
      if (state.retryIndex < state.retryQueue.length) {
        showQuestion();
      } else {
        showScore();
      }
    }
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
      state.contentEl.appendChild(msg);
      if (isRetry) state.correctSecond++; else state.correctFirst++;
    } else {
      const wrong = document.createElement('div');
      wrong.className = 'quiz-feedback wrong';
      wrong.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
      state.contentEl.appendChild(wrong);
      if (!isRetry) {
        const retryNote = document.createElement('div');
        retryNote.className = 'quiz-feedback';
        retryNote.textContent = '🔁 You\u2019ll retry this question later.';
        state.contentEl.appendChild(retryNote);
        state.retryQueue.push(q);
      } else {
        const finalNote = document.createElement('div');
        finalNote.className = 'quiz-feedback wrong';
        finalNote.textContent = `Still incorrect. Final answer: ${q.answer}`;
        state.contentEl.appendChild(finalNote);
      }
    }

    const next = document.createElement('button');
    next.className = 'btn next-btn';
    const lastFirst = !state.inRetry && state.current === state.firstPass.length - 1;
    const lastRetry = state.inRetry && state.retryIndex === state.retryQueue.length - 1;
    next.textContent = (lastFirst && state.retryQueue.length === 0) || lastRetry ? 'Finish' : 'Next';
    next.addEventListener('click', nextQuestion);
    state.contentEl.appendChild(next);
  }

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
      state.contentEl.appendChild(msg);
      if (isRetry) state.correctSecond++; else state.correctFirst++;
    } else {
      btn.classList.add('wrong');
      const right = buttons.find(b => normalizeInput(b.textContent) === normalizeInput(q.answer));
      if (right) right.classList.add('correct');
      const wrong = document.createElement('div');
      wrong.className = 'quiz-feedback wrong';
      wrong.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
      state.contentEl.appendChild(wrong);
      if (!isRetry) {
        const retryNote = document.createElement('div');
        retryNote.className = 'quiz-feedback';
        retryNote.textContent = '🔁 You\u2019ll retry this question later.';
        state.contentEl.appendChild(retryNote);
        state.retryQueue.push(q);
      } else {
        const finalNote = document.createElement('div');
        finalNote.className = 'quiz-feedback wrong';
        finalNote.textContent = `Still incorrect. Final answer: ${q.answer}`;
        state.contentEl.appendChild(finalNote);
      }
    }

    const next = document.createElement('button');
    next.className = 'btn next-btn';
    const lastFirst = !state.inRetry && state.current === state.firstPass.length - 1;
    const lastRetry = state.inRetry && state.retryIndex === state.retryQueue.length - 1;
    next.textContent = (lastFirst && state.retryQueue.length === 0) || lastRetry ? 'Finish' : 'Next';
    next.addEventListener('click', nextQuestion);
    state.contentEl.appendChild(next);
  }

  function showQuestion() {
    state.contentEl.innerHTML = '';
    const q = state.inRetry ? state.retryQueue[state.retryIndex] : state.firstPass[state.current];
    state.contentEl.classList.toggle('retry', state.inRetry);

    const promptEl = document.createElement('div');
    promptEl.className = 'quiz-prompt';
    promptEl.textContent = `What is ${q.prompt}?`;
    state.contentEl.appendChild(promptEl);

    if (q.type === 'input') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'quiz-input';
      input.autofocus = true;

      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn quiz-submit';
      submitBtn.textContent = 'Submit';
      submitBtn.addEventListener('click', () => handleSubmit(input, q, submitBtn, state.inRetry));
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubmit(input, q, submitBtn, state.inRetry);
      });

      state.contentEl.appendChild(input);
      state.contentEl.appendChild(submitBtn);
    } else if (q.type === 'multiple-choice') {
      const buttons = [];
      const choices = Array.isArray(q.choices) ? [...new Set(q.choices)] : [];
      if (choices.length === 0) {
        const err = document.createElement('div');
        err.textContent = 'Question has no choices';
        state.contentEl.appendChild(err);
        return;
      }
      choices.forEach(choice => {
        const b = document.createElement('button');
        b.className = 'btn quiz-option';
        b.textContent = choice;
        b.addEventListener('click', () => handleChoice(b, buttons, q, state.inRetry));
        buttons.push(b);
        state.contentEl.appendChild(b);
      });
    } else {
      const err = document.createElement('div');
      err.textContent = 'Unsupported question type.';
      state.contentEl.appendChild(err);
    }
  }

  function startQuiz(mode = 'mix') {
    if (mode === 'mixed') mode = 'mix';
    if (mode === 'multiple-choice') mode = 'mcq';
    state.quizMode = mode;
    state.current = 0;
    state.retryIndex = 0;
    state.inRetry = false;
    state.correctFirst = 0;
    state.correctSecond = 0;
    state.retryQueue = [];
    state.contentEl.classList.remove('retry');
    const qs = state.lessonData.questions || [];
    let filtered = qs;
    if (state.quizMode === 'input') filtered = qs.filter(q => q.type === 'input');
    if (state.quizMode === 'mcq') filtered = qs.filter(q => q.type === 'multiple-choice');
    state.firstPass = filtered.sort(() => Math.random() - 0.5);
    showQuestion();
  }

  function showModeOptions() {
    state.contentEl.innerHTML = '';
    const title = document.createElement('h3');
    title.className = 'quiz-prompt';
    title.textContent = 'Choose question style';
    state.contentEl.appendChild(title);

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
      state.contentEl.appendChild(btn);
    });
  }

  window.loadLesson = function(lessonData, opts = {}) {
    cleanup();
    if (Array.isArray(lessonData)) {
      lessonData = { questions: lessonData };
    }
    state.lessonData = lessonData;
    state.viewEl = opts.viewEl || document.getElementById('lessonView');
    state.contentEl = opts.contentEl || document.getElementById('lessonContent');
    state.backBtn = opts.backBtn || document.getElementById('quizBackBtn');
    state.onExit = typeof opts.onExit === 'function' ? opts.onExit : null;

    if (state.backBtn) {
      state.backBtn.onclick = () => {
        state.viewEl.classList.add('fade-out');
        setTimeout(() => {
          cleanup();
          state.viewEl.style.display = 'none';
          state.viewEl.classList.remove('fade-out');
          if (state.onExit) state.onExit();
        }, 300);
      };
    }

    if (state.viewEl) state.viewEl.style.display = 'flex';
    if (opts.selectedMode) {
      startQuiz(opts.selectedMode);
    } else {
      showModeOptions();
    }
  };
})();
