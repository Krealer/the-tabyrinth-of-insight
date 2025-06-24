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
  },
  {
    title: "Lesson 3: Numbers 1–5",
    content: `
      <p>Here are the numbers 1 through 5 in Japanese:</p>
      <ul>
        <li>1 – いち (ichi)</li>
        <li>2 – に (ni)</li>
        <li>3 – さん (san)</li>
        <li>4 – し / よん (shi / yon)</li>
        <li>5 – ご (go)</li>
      </ul>
    `,
    quiz: {
      question: "What is the Japanese word for 4?",
      options: ["に", "し", "ご"],
      answer: "し"
    }
  },
  {
    title: "Lesson 4: Basic Greetings",
    content: `
      <p>Common greetings in Japanese:</p>
      <ul>
        <li>こんにちは (konnichiwa) – Hello / Good afternoon</li>
        <li>おはよう (ohayou) – Good morning</li>
        <li>こんばんは (konbanwa) – Good evening</li>
        <li>さようなら (sayounara) – Goodbye</li>
      </ul>
    `,
    quiz: {
      question: "How do you say 'Good morning' in Japanese?",
      options: ["こんばんは", "おはよう", "こんにちは"],
      answer: "おはよう"
    }
  },
  {
    title: "Lesson 5: Sentence Basics",
    content: `
      <p>Japanese sentence structure often follows this pattern:</p>
      <p><strong>Topic + は (wa) + comment</strong></p>
      <p>Example: わたしはがくせいです。</p>
      <p>Means: "I am a student." (watashi wa gakusei desu)</p>
    `,
    quiz: {
      question: "What does 'わたしはがくせいです' mean?",
      options: ["I am a teacher", "I am a student", "I am hungry"],
      answer: "I am a student"
    }
  },
  {
    title: "Lesson 6: Saying Yes and No",
    content: `
      <p>In Japanese, basic agreement and disagreement are:</p>
      <ul>
        <li><strong>はい</strong> (hai) – Yes</li>
        <li><strong>いいえ</strong> (iie) – No</li>
      </ul>
      <p>These are simple but very commonly used in daily speech.</p>
    `,
    quiz: {
      question: "How do you say 'No' in Japanese?",
      options: ["はい", "いいえ", "すみません"],
      answer: "いいえ"
    }
  },
  {
    title: "Lesson 7: Common Questions",
    content: `
      <p>These are useful question words in Japanese:</p>
      <ul>
        <li><strong>なに</strong> (nani) – What</li>
        <li><strong>どこ</strong> (doko) – Where</li>
        <li><strong>いつ</strong> (itsu) – When</li>
        <li><strong>なぜ</strong> (naze) – Why</li>
      </ul>
      <p>Example: なにこれ？ (nani kore?) – What is this?</p>
    `,
    quiz: {
      question: "What does 'なに' mean?",
      options: ["Why", "What", "Where"],
      answer: "What"
    }
  },
  {
    title: "Lesson 8: Basic Verbs",
    content: `
      <p>Here are 5 very common Japanese verbs:</p>
      <ul>
        <li><strong>たべる</strong> (taberu) – to eat</li>
        <li><strong>のむ</strong> (nomu) – to drink</li>
        <li><strong>みる</strong> (miru) – to see/watch</li>
        <li><strong>いく</strong> (iku) – to go</li>
        <li><strong>する</strong> (suru) – to do</li>
      </ul>
    `,
    quiz: {
      question: "What is the Japanese verb for 'to eat'?",
      options: ["たべる", "いく", "のむ"],
      answer: "たべる"
    }
  },
  {
    title: "Lesson 9: Days of the Week",
    content: `
      <p>Days of the week in Japanese end with <strong>ようび</strong> (youbi):</p>
      <ul>
        <li>Monday – げつようび (getsuyoubi)</li>
        <li>Tuesday – かようび (kayoubi)</li>
        <li>Wednesday – すいようび (suiyoubi)</li>
        <li>Thursday – もくようび (mokuyoubi)</li>
        <li>Friday – きんようび (kinyoubi)</li>
      </ul>
    `,
    quiz: {
      question: "What is the Japanese word for Monday?",
      options: ["げつようび", "きんようび", "すいようび"],
      answer: "げつようび"
    }
  },
  {
    title: "Lesson 10: Basic Adjectives",
    content: `
      <p>Common Japanese adjectives include:</p>
      <ul>
        <li><strong>たかい</strong> (takai) – tall/expensive</li>
        <li><strong>ちいさい</strong> (chiisai) – small</li>
        <li><strong>あたらしい</strong> (atarashii) – new</li>
        <li><strong>ふるい</strong> (furui) – old</li>
        <li><strong>おいしい</strong> (oishii) – delicious</li>
      </ul>
    `,
    quiz: {
      question: "What is the Japanese adjective for 'delicious'?",
      options: ["たかい", "おいしい", "ふるい"],
      answer: "おいしい"
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
