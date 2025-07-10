// Loader responsible for fetching lesson data and initializing the quiz engine
(function() {
  const lessonView = document.getElementById('lessonView');
  const lessonContent = document.getElementById('lessonContent');
  const quizBackBtn = document.getElementById('quizBackBtn');
  const lessonsView = document.getElementById('lessonsView');

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
