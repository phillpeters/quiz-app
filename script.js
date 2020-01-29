'use strict';

const QUESTIONS = [
  {
    id: 0,
    question: "1. What are the basic components of a fully functioning PC?",
    answers: [
      "PC Case, PSU, Motherboard, Processor, GPU, Memory, Storage",
      "PC Case, Fatherboard, Processor, GPU, Memory, PSU, Storage",
      "PC Case, Power Supply Unit, Motherboard, Processor, Memory, Minecraft, Storage",
      "Briefcase, Batteries, Paper Cutter, Whiteboard, Highlighter, Pen, Paperclip"
    ],
    correct: "PC Case, PSU, Motherboard, Processor, GPU, Memory, Storage"
  },
  {
    id: 1,
    question: "2. Which component supplies your PC with electricity?",
    answers: [
      "CPU",
      "GPU",
      "PSU",
      "RAM"
    ],
    correct: "PSU"
  },
  {
    id: 2,
    question: "3. Identify this PC component",
    img: "images/RAM-PNG-Image2.png",
    imgAlt: "RAM Module",
    answers: [
      "Processor",
      "Hard Drive",
      "CPU Cooler",
      "RAM Module"
    ],
    correct: "RAM Module"
  },
  {
    id: 3,
    question: "4. What does CPU stand for?",
    answers: [
      "Copy/Paste Utility",
      "Central Processing Unit",
      "Command Processing Unit",
      "Computer Power User"
    ],
    correct: "Central Processing Unit"
  },
  {
    id: 4,
    question: "5. If you plug your monitor into one of your Motherboard I/O ports, you have:",
    answers: [
      "A discrete GPU",
      "An integrated GPU",
      "A very powerful GPU",
      "No GPU"
    ],
    correct: "An integrated GPU"
  },
  {
    id: 5,
    question: "6. The most used tool in the assembly of a PC is:",
    answers: [
      "A #2 Philips screwdriver",
      "A Hammer",
      "An anti-static bracelet",
      "A boxcutter"
    ],
    correct: "A #2 Philips screwdriver"
  },
  {
    id: 6,
    question: "7. The substance applied to the contact surfaces of a CPU and CPU cooler is:",
    answers: [
      "Super Glue",
      "A cool gel",
      "Thermal Paste",
      "Grease"
    ],
    correct: "Thermal Paste"
  },
  {
    id: 7,
    question: "8. A common storage solution for your OS and data files is:",
    answers: [
      "OS on SSD, data on HDD",
      "OS on HDD, data on SSD",
      "OS on RAM, data on external hard drive",
      "OS on SSD, data on microSD"
    ],
    correct: "OS on SSD, data on HDD"
  }
]

const STATE = {
  currentQuestion: 0,
  score: 0
}

function generateQuestion() {
  console.log("function generateQuestion() ran");
  const QUESTION = QUESTIONS[STATE.currentQuestion];
  let imgEl = QUESTION.img
    ? '<img src="' + QUESTION.img + '" alt="' + QUESTION.imgAlt + '">'
    : "";

  return `
    <h3 class="score">Q ${STATE.currentQuestion + 1}/8 Score: ${STATE.score}</h3>
    <p>Q${QUESTION.question}</p>
    ${imgEl}
    <form class="question-form" id="form-1">
      <fieldset>
        <input type="radio" name="answer" id="answer-1" value="0" required>
        <label for="answer-1">${QUESTION.answers[0]}</label>
        <br>
        <input type="radio" name="answer" id="answer-2" value="1">
        <label for="answer-2">${QUESTION.answers[1]}</label>
        <br>
        <input type="radio" name="answer" id="answer-3" value="2">
        <label for="answer-3">${QUESTION.answers[2]}</label>
        <br>
        <input type="radio" name="answer" id="answer-4" value="3">
        <label for="answer-4">${QUESTION.answers[3]}</label>
        <br>
      </fieldset>
    </form>
    <button class="button" type="submit" form="form-1" value="submit">Submit</button>
    <button class="button" type="button" value="next" hidden>Next</button`
}

function renderQuestion() {
  console.log("function renderQuestion() ran");
  $(".js-question-area").html(generateQuestion());
}

function handleQuizStart() {
  console.log("function handleQuizStart() ran");
  $(".js-quiz-area").on("click", ".button-begin", () => {
    $(".quiz-start").toggle();
    renderQuestion();
  });
}

function handleCorrectAnswer(selectionId) {
  console.log("function handleCorrectAnswer() ran");
  STATE.score++;
  $(".score").text(`Q ${STATE.currentQuestion + 1}/8 Score: ${STATE.score}`);
  $(`label[for=${selectionId}]`).append('<br><p class="correct">&#10003; this is the correct answer</p>');
  $("button[type=submit], button[type=button]").toggle();
  $("button[type=submit]").attr("disabled", true);
  $("button[value=next]").addClass("next-correct");
  STATE.currentQuestion++;
}

function handleIncorrectAnswer(selectionId, correct) {
  console.log("function handleIncorrectAnswer() ran");
  $(`label[for=${selectionId}]`).append(`<br><p class="incorrect">&#x2717; this answer is incorrect.  The correct answer is "${correct}"</p>`);
  $("button[type=submit], button[type=button]").toggle();
  $("button[type=submit]").attr("disabled", true);
  $("button[value=next]").addClass("next-incorrect");
  STATE.currentQuestion++;
}

function handleSubmit() {
  console.log("function handleSubmit() ran");
  $(".question-area").on("click", "button[type=submit]", event => {
    event.preventDefault();
    
    let selectionId = $("input[name=answer]:checked").attr("id");
    let selectionText = $(`label[for=${selectionId}]`).text();
    let correct = QUESTIONS[STATE.currentQuestion].correct;
    $("input[name=answer]:not(:checked)").attr("disabled", true);

    if (!selectionId) {
      alert("Make a selection");
      $("input[name=answer]").removeAttr("disabled");
      $("#answer-1").focus();
      return;
    }
    
    if (selectionText === correct) {
      handleCorrectAnswer(selectionId);
    } else {
      handleIncorrectAnswer(selectionId, correct);
    }
    
  });
}

function handleNext() {
  console.log("function handleNext() ran");
  $(".question-area").on("click", "button[type=button]", event => {
    if (STATE.currentQuestion === QUESTIONS.length) {
      handleQuizFinished();
    } else {
      renderQuestion();
    }
  });
}

function handleQuizFinished() {
  console.log("function handleQuizFinished() ran");
  $('.question-area').html(`<h3 class="score">Your Score: ${STATE.score}</h3>`);
  if (STATE.score <= 3) {
    $('.question-area').append(`
      <p>You fried your motherboard!  That\'s an expensive mistake...</p>`);
  } else if (STATE.score <= 6) {
    $('.question-area').append(`
      <p>With a little help, you'll be up and running in no time!</p>`);
  } else {
    $('.question-area').append(`
      <p>You've done this before, haven't you?!</p>`);
  }

  $('.question-area').append(`<button class="button" type="button" value="restart">Restart the quiz</button>`);
}

function restartQuiz() {
  console.log("function restartQuiz() ran");
  $(".question-area").on("click", "button[value=restart]", event => {
    STATE.currentQuestion = 0;
    STATE.score = 0;
    renderQuestion();
  });
}

function handleQuizApp() {
  handleQuizStart();
  handleSubmit();
  handleNext();
  restartQuiz();
}

$(handleQuizApp);