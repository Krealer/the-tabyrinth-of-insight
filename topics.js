const topicLessonCounts = {
  writing: 3,
  vocab: 3,
  grammar: 3
};

function loadTopic(topicId) {
  // Clear the hub
  const hub = document.getElementById('course-hub');
  if (hub) hub.remove();

  switch (topicId) {
    case 'writing':
      loadWritingLessons();
      break;
    case 'vocab':
      loadVocabLessons();
      break;
    case 'grammar':
      loadGrammarLessons();
      break;
    default:
      alert(`Unknown topic: ${topicId}`);
  }
}
