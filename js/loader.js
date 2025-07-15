// Loader responsible for fetching lesson data and initializing the quiz engine
(function() {
  const lessonView = document.getElementById('lessonView');
  const lessonContent = document.getElementById('lessonContent');
  const quizBackBtn = document.getElementById('quizBackBtn');
  const lessonsView = document.getElementById('lessonsView');
  const lesson2Btn = document.getElementById('lesson2Btn');
  const modeSelect = document.getElementById('modeSelect');
  const modeForm = document.getElementById('modeForm');
  const modeStartBtn = document.getElementById('modeStartBtn');
  const modeBackBtn = document.getElementById('modeBackBtn');
  const debugMode = new URLSearchParams(location.search).has('debug');

  function getSelectedMode() {
    const checked = modeForm.querySelector('input[name="mode"]:checked');
    return checked ? checked.value : 'mixed';
  }

  function showModeSelector() {
    lessonsView.style.display = 'none';
    modeSelect.style.display = 'flex';
  }

  function hideModeSelector() {
    modeSelect.style.display = 'none';
    lessonsView.style.display = 'flex';
  }

  if (lesson2Btn) {
    lesson2Btn.addEventListener('click', showModeSelector);
  }

  if (modeBackBtn) modeBackBtn.addEventListener('click', hideModeSelector);

  if (modeStartBtn) {
    modeStartBtn.addEventListener('click', () => {
      fetch('lessons/lesson2.json')
        .then(res => res.json())
        .then(lesson => {
          const selected = getSelectedMode();
          const filtered = lesson.questions.filter(q =>
            selected === 'mixed' ? true : q.type === selected
          );
          hideModeSelector();
          loadLesson({ title: lesson.title, questions: filtered }, {
            viewEl: lessonView,
            contentEl: lessonContent,
            backBtn: quizBackBtn,
            onExit: () => {
              lessonsView.style.display = 'flex';
            },
            selectedMode: selected === 'mixed' ? 'mix' : selected === 'multiple-choice' ? 'mcq' : 'input',
            debug: debugMode,
            debugEl: document.getElementById('debugInfo')
          });
        })
        .catch(err => {
          console.error('Failed to load lesson:', err);
          lessonContent.textContent = 'Failed to load lesson.';
          lessonView.style.display = 'flex';
        });
    });
  }

  window.startLesson = function(path) {
    fetch(path)
      .then(res => res.json())
      .then(data => {
        loadLesson(data, {
          viewEl: lessonView,
          contentEl: lessonContent,
          backBtn: quizBackBtn,
          onExit: () => {
            lessonsView.style.display = 'flex';
          },
          debug: debugMode,
          debugEl: document.getElementById('debugInfo')
        });
        lessonsView.style.display = 'none';
      })
      .catch(err => {
        console.error('Failed to load lesson:', err);
        lessonContent.textContent = 'Failed to load lesson.';
        lessonView.style.display = 'flex';
      });
  };
})();
