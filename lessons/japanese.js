const japaneseLessons = [
  {
    title: "Lesson 1: Introduction to Japanese",
    content: `
      <p>Japanese has three writing systems:</p>
      <ul>
        <li><strong>Hiragana (ひらがな)</strong> – phonetic, native words</li>
        <li><strong>Katakana (カタカナ)</strong> – phonetic, foreign words</li>
        <li><strong>Kanji (漢字)</strong> – logographic, Chinese characters</li>
      </ul>
    `,
    quiz: {
      question: "Which system is used for native Japanese words?",
      options: ["Katakana", "Kanji", "Hiragana"],
      answer: "Hiragana"
    }
  },
  {
    title: "Lesson 2: Hiragana Basics",
    content: `
      <p>Here are the five basic vowel sounds in Hiragana:</p>
      <p>あ (a), い (i), う (u), え (e), お (o)</p>
    `,
    quiz: {
      question: "Which of these is the Hiragana for 'e'?",
      options: ["あ", "え", "お"],
      answer: "え"
    }
  }
];

function loadJapaneseLesson(index) {
  const course = document.getElementById('course-container');
  const lesson = japaneseLessons[index];

  course.innerHTML = `
    <div class="dialogue-box" style="max-height: 90vh; overflow-y: auto;">
      <h2>${lesson.title}</h2>
      ${lesson.content}
      <p><strong>${lesson.quiz.question}</strong></p>
      ${lesson.quiz.options.map(opt => `
        <button onclick="checkAnswer('${opt}', '${lesson.quiz.answer}', ${index})">${opt}</button>
      `).join('')}
      <br><br>
      <button onclick="exitCourse()">Leave Course</button>
    </div>
  `;
}

function checkAnswer(selected, correct, index) {
  const course = document.getElementById('course-container');
  const message = selected === correct
    ? "<p style='color:lime'>✅ Correct!</p>"
    : "<p style='color:orangered'>❌ Try again.</p>";

  course.querySelector(".dialogue-box").insertAdjacentHTML('beforeend', message);

  if (selected === correct) {
    const key = `jp_lesson_${index}_done`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, 'true');
      if (typeof gainWisdom === 'function') gainWisdom(1);
    }

    if (japaneseLessons[index + 1]) {
      setTimeout(() => loadJapaneseLesson(index + 1), 1000);
    }
  }
}

function exitCourse() {
  const course = document.getElementById('course-container');
  if (course) course.remove();
}
