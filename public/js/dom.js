async function putJSON(data) {
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

    try {
      const response = await fetch("/login", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      if (result.validar == false) {
        alert("Los datos son incorrectos")
      } else {
        //Envio el formularia desde dom para cambiar de pagina
        //Podria usar tambien un changeScreen()
        document.getElementById("form1").submit()
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
  function login() {
    //Leo los datos del input
    let usuario = document.getElementById("usuarioId").value
    let contraseña = document.getElementById("password").value

    //Creo un objeto de forma instantanea
    let data = {
        user: usuario,
        pass: contraseña
    }

    //data es el objeto que le paso al back
    putJSON(data)
  }

$(".custom-carousel").owlCarousel({
  autoWidth: true,
  loop: true
});
$(document).ready(function () {
  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});


function irALogin() {
  location.href = '/register'
}

/*jueg matematica*/ 
const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")

let state = {
  score: 0,
  wrongAnswers: 0
}

function updateProblem() {
  state.currentProblem = generateProblem()
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProblem()

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    updateProblem()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
  }
  checkLogic()
}
/*chequea que el resultado sea siempre positivo*/


function generateProblem() {
  let numberOne, numberTwo, operator, correctAnswer;

  do {
    numberOne = generateNumber(10);
    numberTwo = generateNumber(10);
    operator = ['+', '-', 'x'][generateNumber(2)];

    if (operator === '+') {
      correctAnswer = numberOne + numberTwo;
    } else if (operator === '-') {
      correctAnswer = numberOne - numberTwo;
    } else if (operator === 'x') {
      correctAnswer = numberOne * numberTwo;
    }
  } while (correctAnswer < 0);

  return {
    numberOne,
    numberTwo,
    operator
  };
}

function checkLogic() {
  if (state.score === 10) {
    endMessage.textContent = "¡HAS GANADO! Se nota que has estado practicando";
    document.body.classList.add("overlay-is-open");
    document.getElementById("final-score").textContent = `Puntaje final: ${state.score}`;
    setTimeout(() => resetButton.focus(), 331);
  }

  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Has perdido, repasa e intentalo de nuevo";
    document.body.classList.add("overlay-is-open");
    document.getElementById("final-score").textContent = `Tu puntaje final es de : ${state.score}`;
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}



/*jueging*/ 
let currentQuestion = document.querySelector('.question');
let choice1 = document.querySelector('#choice1-text');
let choice2 = document.querySelector('#choice2-text');
let choice3 = document.querySelector('#choice3-text');
let choice4 = document.querySelector('#choice4-text');

let result = document.querySelector('.result');
let button = document.querySelector('.submit');

let questionNum = 1;

const questions = {
  1: "Clara __ my best friend",
  2: "I __ an honest boy",
  3: "My toys  ___ in the box",
  4: "A/AM/I/STUDENT",
  5: "FATHER/HE/MY/IS/",
  6: "ELEPHANT/THE/BIG/IS",
  7: "I _____ football yesterday.",
  8: "My teacher ____ very happy",
  9: "She _____ a picture.",
  10: "We ______ the castle."
};

const choices = { 
  1: ["are", "is", "am", "were"],
  2: ['am', 'are', 'is', "being"],
  3: ['is', 'am', 'are', 'was'],
  4: [" Student i am", "I am a student", "Am i a student", 'A student I am'],
  5: ['He is my father', 'My father is he', 'My father he is.', 'Is my father he'],
  6: ['Is the elephant big', 'Big is the elephant', 'The elephant is big ', 'The elephant were big'],
  7: ["play", "plays", "played", 'playing'],
  8: ['Was', 'Were', 'Are', 'being'],
  9: ['paint', 'painted ', 'is painted', 'were painting'],
  10: ["visit", "visited", "visits", 'visiting']
};

currentQuestion.textContent = questions[questionNum];
choice1.textContent = choices[questionNum][0];
choice2.textContent = choices[questionNum][1];
choice3.textContent = choices[questionNum][2];
choice4.textContent = choices[questionNum][3];

const checkChoice = () => {
   if (questionNum == 1) {
      if (document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
    };
  if (questionNum == 2) {
    if (document.querySelector('#choice1').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice4').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
  };
  if (questionNum == 3) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
    };
    if (questionNum == 4) {
    if (document.querySelector('#choice2').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
      };
     if (questionNum == 5) {
    if (document.querySelector('#choice1').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice3').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
        };
        if (questionNum == 6) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
          };
      if (questionNum == 7) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
        };
       if (questionNum == 8) {
    if (document.querySelector('#choice1').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice3').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
         };
         if (questionNum == 9) {
    if (document.querySelector('#choice3').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice2').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      };
           };
           if (questionNum == 10) {
    if (document.querySelector('#choice2').checked && !document.querySelector('#choice4').checked && !document.querySelector('#choice3').checked && !document.querySelector('#choice1').checked) {
        result.textContent = "Respuesta correcta!";
        result.style.color = 'green';
        
      } else {
        result.textContent = "Respuesta incorrecta!";
        result.style.color = 'red';
      }
  };
  
  button.setAttribute('value', 'Question suivante');
  button.setAttribute('onclick', 'nextQuestion()');
  button.style.width = '200px';
};

const nextQuestion = () => {
  console.log('next');
  questionNum+=1;
  if (questionNum < 10) {
    console.log(questionNum);
    currentQuestion.textContent = questions[questionNum];
    choice1.textContent = choices[questionNum][0];
    choice2.textContent = choices[questionNum][1];
    choice3.textContent = choices[questionNum][2];
    choice4.textContent = choices[questionNum][3];
  };
  button.setAttribute('value', 'Verifier');
  button.setAttribute('onclick', 'checkChoice()');
  button.style.width = '130px';
  result.textContent = "";
  document.querySelector('#choice1').checked = false;
  document.querySelector('#choice2').checked = false;
  document.querySelector('#choice3').checked = false;
  document.querySelector('#choice4').checked = false;
};