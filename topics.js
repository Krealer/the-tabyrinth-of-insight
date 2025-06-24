const topicLessonCounts = {
  writing: 3,
  // vocab: 5,
  // grammar: 4,
};

function loadTopic(topicId) {
  // Clear the hub
  const hub = document.getElementById('course-hub');
  if (hub) hub.remove();

  switch (topicId) {
    case 'writing':
      loadWritingLessons();
      break;
    default:
      alert(`Unknown topic: ${topicId}`);
  }
}
