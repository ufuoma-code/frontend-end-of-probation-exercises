const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "In which year did Nigeria gain independence?",
    options: ["1950", "1960", "1970", "1980"],
    answer: "1960"
  }
];

let currentQuestion = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";
  currentQuiz.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, currentQuiz.answer);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.style.background = "#8bc34a";
    score++;
  } else {
    selectedBtn.style.background = "#f44336";
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
});

function showResult() {
  const timestamp = new Date().toLocaleString();
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.innerHTML = `Your Score: ${score}/${quizData.length}<br>
  Completed on: ${timestamp}`;
}


loadQuestion();
