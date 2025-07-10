// Loader responsible for fetching lesson data and initializing the quiz engine
(function() {
  const lessonView = document.getElementById('lessonView');
  const lessonContent = document.getElementById('lessonContent');
  const quizBackBtn = document.getElementById('quizBackBtn');
  const lessonsView = document.getElementById('lessonsView');
  const lesson2Btn = document.getElementById('lesson2Btn');

  if (lesson2Btn) {
    lesson2Btn.addEventListener('click', () => {
      fetch('lessons/lesson2.json')
        .then(res => res.json())
        .then(data => loadLesson(data));
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
          }
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
