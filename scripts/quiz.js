(function(){
  async function initQuiz(jsonPath){
    const res = await fetch(jsonPath);
    const questions = await res.json();
    let current = 0;
    let score = 0;
    const promptEl = document.getElementById('prompt');
    const optionsEl = document.querySelector('.options');
    const scoreEl = document.getElementById('score');
    const nextBtn = document.getElementById('next');
    const manual = !!nextBtn;

    function shuffle(arr){
      for(let i=arr.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
      }
      return arr;
    }

    function showQuestion(){
      const q = questions[current];
      promptEl.textContent = q.question;
      optionsEl.innerHTML = '';
      if(manual && nextBtn){
        nextBtn.style.display = 'none';
        nextBtn.disabled = true;
      }
      shuffle([...q.options]).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'button quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => select(btn, opt));
        optionsEl.appendChild(btn);
      });
    }

    function select(btn, choice){
      const q = questions[current];
      if(optionsEl.dataset.answered) return;
      optionsEl.dataset.answered = '1';
      const correct = choice === q.answer;
      if(correct) score++;
      document.querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = true;
        if(b.textContent.trim() === q.answer){
          b.classList.add('correct');
        }
      });
      if(!correct) btn.classList.add('wrong');
      if(manual && nextBtn){
        nextBtn.style.display = 'inline-block';
        nextBtn.disabled = false;
      } else {
        setTimeout(nextQuestion, 800);
      }
    }

    function nextQuestion(){
      optionsEl.dataset.answered = '';
      current++;
      if(current < questions.length){
        showQuestion();
      } else {
        promptEl.textContent = `Score: ${score} / ${questions.length}`;
        optionsEl.innerHTML = '';
        if(manual && nextBtn){
          nextBtn.style.display = 'none';
        }
      }
    }

    if(manual && nextBtn){
      nextBtn.addEventListener('click', nextQuestion);
    }
    showQuestion();
  }

  window.initQuiz = initQuiz;
})();
