(function(){
  async function start(){
    if(!window.QUIZ_JSON) return console.error('QUIZ_JSON not defined');
    const res = await fetch(QUIZ_JSON);
    const questions = await res.json();
    runQuiz(questions);
  }

  function runQuiz(questions){
    let index = 0;
    const qEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const nextBtn = document.getElementById('next-btn');

    nextBtn.addEventListener('click', () => {
      index++;
      if(index < questions.length){
        nextBtn.disabled = true;
        nextBtn.style.display = 'none';
        renderQuestion();
      } else {
        qEl.textContent = 'Quiz Complete!';
        choicesEl.innerHTML = '';
        nextBtn.style.display = 'none';
      }
    });

    function shuffle(arr){
      for(let i=arr.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]];
      }
      return arr;
    }

    function renderQuestion(){
      const q = questions[index];
      qEl.textContent = q.question;
      choicesEl.innerHTML = '';
      shuffle([...q.options]).forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = 'button quiz-option';
        btn.addEventListener('click', () => select(btn, opt));
        choicesEl.appendChild(btn);
      });
    }

    function select(btn, choice){
      const q = questions[index];
      Array.from(choicesEl.children).forEach(b => {
        b.disabled = true;
        if(b.textContent.trim() === q.answer){
          b.classList.add('correct');
        }
      });
      if(choice !== q.answer){
        btn.classList.add('wrong');
      }
      nextBtn.style.display = 'block';
      nextBtn.disabled = false;
    }

    renderQuestion();
  }

  document.addEventListener('DOMContentLoaded', start);
})();
