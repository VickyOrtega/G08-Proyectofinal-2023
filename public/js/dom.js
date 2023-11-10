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

/*API
https://cors-anywhere.herokuapp.com/corsdemo
*/
src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"
$(document).ready(function(){
  // data
  var country;
  var countryCode;
  var city;
  var cityName;
  var temp; //kalvin
  var windspeed; // ms
  var windspeedkmH;
  var windspeedms;
  var windspeedknots;
  var description;
  var weatherID
  var humidity;
  var cTemp;
  var fTemp;
  var api;
  var tempToggle = true;
  $i=0;
  
    function letter(str) {
      return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase()
                       )}).join(' ');          
    }
  
   function setCity(city, country) { 
   city = letter(city);
   $('#city').val(city+','+country);
 }
});
  
  // https://cors-anywhere.herokuapp.com/http://ip-api.com/json
 function getlocation(){
  $.getJSON('https://freegeoip.net/json/', function(location){   
   //country= location.countryCode.toLowerCase(); ,'+country+'
   city= location.city;
   api ='https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a36e7a326a579bb5d2549c43adf7376d';
    weather(api);    
  });              
     };
 
  $('#city').keypress(function(e){

    var key = e.which;
    if( key == 13 ){
  //As ASCII Code for enter key is 13
      $('#city').submit();
      city = $(this).val();
      console.log(city)
      // if zip-code
      var zipcode = $(this).val();
      var placeholder = $('#city').attr('placeholder');
      //console.log(placeholder); 
      if (placeholder === "Buscar ciudad" ) {
      api =' https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a36e7a326a579bb5d2549c43adf7376d';
      }
      else if (placeholder === "enter zip-code" ) {
      api =' https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+'&appid=a36e7a326a579bb5d2549c43adf7376d'   
      }
      console.log('api: '+api)
      weather(api)   
    }; // end of if
   }); //end of eneter the city
    
     function weather(api) {
     $.getJSON(api, function(weather){
       cityName = weather.name;
       temp = weather.main.temp;
       windspeed = weather.wind.speed;
       description = weather.weather[0].description;
       weatherID =weather.weather[0].id;
       humidity = weather.main.humidity;
       country = weather.sys.country;
       fTemp =((temp)*(9/5)-459.67).toFixed(0);
       cTemp =(temp -  273.15).toFixed(0); 
       windspeedkmH = Math.round(windspeed*3,6).toFixed(0);
       windspeedms = windspeed.toFixed(0); 
       windspeedknots = Math.round(((1.9438*windspeed)*100)/100).toFixed(0);
       setCity(cityName, country);
       $('#weather-description').html(description).fadeIn();
       $('#temp').html(cTemp);
       $('h1 .sign').html('&deg;C')
       $('#windspeed').html(windspeedkmH);
       $('.wind-speed .sign').html(' km/h');
       $('#humidity').html(humidity);
       
           $('.wind-speed').click(function() { 
            if ($i === 0) {
           $('#windspeed').html(windspeedms);
           $('.wind-speed .sign').html('  m/s');
            $i = 1;
                 }
            else if  ($i === 1) {
            $('#windspeed').html(windspeedknots);
            $('.wind-speed .sign').html(' knots');    
             $i = 2;
                   }
             else {
            $('#windspeed').html(windspeedkmH);
            $('.wind-speed .sign').html(' km/h');
              $i = 0;
                  }  
            }); 
       $(".temperature").click(function() {
         console.log('klik');
         if(tempToggle===false) {  
         $("#temp").html(cTemp);
         $("h1 .sign").html("&deg;C");
            tempToggle=true;
            }
         else {
           $("#temp").html(fTemp);
           $("h1 .sign").html("&deg;F");
            tempToggle=false;
            }
            }); 
       changeWeatherIcon(weatherID);
     }); 
     }; 

  $('#location').on('click', getlocation);
  
  getlocation();
  
  $('#city').click(function(){
    $('#city').val("");
  }); 

  function changeWeatherIcon(weatherID) {
    var thunderstorm = [200,201,202,210,211,212,221,230,231,232];
    var snow = [600,601,602,615,611,612,616,620,621,622];
    var sun = [800];
    var rain = [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531];
    var clouds = [801,802,803,804];
    x = clouds.indexOf(weatherID);
    
    // debug coment
    // weatherID=300;
    
    var removeVisible = $('.icon').removeClass('visible');
    
    var newSrc ="https://github.com/r00bal/Demo/blob/master/wind_direction_indicator_f9f9f7.png?raw=true";
    var oldSrc ="https://github.com/r00bal/Demo/blob/master/wind_direction_indicator.png?raw=true";
   
   
  function setColorsblue() {
  $('.container').css({'background-color':'#1ad3fd'}); 
  $('.sexy_line').css({'background':'-webkit-gradient(linear, 0 0, 100% 0, from(#1ad3fd), to(#1ad3fd),color-stop(50%, #06333E)'})
  $('body, html').css({'color':'#06333E',
                        'background-color':'#e2e2e2'});
  $('h1,h3, #weather-description, #run').css({'color':'#06333E'});
  $('.sign').css({'color':'#FD3380'}); 
    $('img').attr('src',oldSrc );
  };
   function setColorsgreen() {
  $('.container').css({'background-color':'#00FFB6 '}); 
  $('.sexy_line').css({'background':'-webkit-gradient(linear, 0 0, 100% 0, from(#00FFB6), to(#00FFB6),color-stop(50%, #00402D)'})
  $('body, html').css({'color':'#FF4E40',
                        'background-color':'#0DC0FF'});
  $('h1, #weather-description, #run, h3').css({'color':'#00402D'});
  $('.sign').css({'color':'#FF4E40'}); 
      $('img').attr('src',oldSrc );
  };    
   function setColorsGrey() {
  $('.container').css({'background-color':'#363738'}); 
  $('.sexy_line').css({'background':'-webkit-gradient(linear, 0 0, 100% 0, from(#363738), to(#363738),color-stop(50%, #f9f9f7)'})
  $('body, html').css({'color':'#2E3845',
                        'background-color':'#FFFFFF'});
  $('h1, h3, #weather-description, #run').css({'color':'#f9f9f7'});
  $('.sign').css({'color':'#1ad3fd'}); 
  $('img').attr('src',newSrc );
   }
    function setColorsWhite() {
  $('.container').css({'background-color':'#1D65F0'}); 
  $('.sexy_line').css({'background':'-webkit-gradient(linear, 0 0, 100% 0, from(#1D65F0), to(#1D65F0),color-stop(50%, #01FDF3)'})
  $('body, html').css({'color':'#1FDF3',
                        'background-color':'#b1b4b8'});
  $('h1, #weather-description, #run, h3').css({'color':'#fff'});
  $('.sign').css({'color':'#1FDF3'}); 
      
  $('img').attr('src',newSrc );
  };
   
     if (thunderstorm.indexOf(weatherID) !== -1) {
      removeVisible;
     $('#storm').addClass('visible');  
       setColorsGrey();
    };
    
     if (snow.indexOf(weatherID) !== -1) {
      removeVisible;
      $('#snow').addClass('visible'); 
      setColorsWhite();
      snowing();
    };
    
    if (sun.indexOf(weatherID) !== -1) {
      removeVisible;
      $('#sunny').addClass('visible'); 
      setColorsblue();
    };
    
     if (rain.indexOf(weatherID) !== -1) {
      //setColorsgreen();
      setColorsGrey();
      removeVisible;
      $('#rain').addClass('visible'); 
    };
     if (clouds.indexOf(weatherID) !== -1) {
      removeVisible;
      $('#clouds').addClass('visible').fadeIn();; 
       setColorsblue();
    };   
    if (weatherID >= 900) {
      removeVisible;
      setColorsGrey();
      $('#run').addClass('visible run').html("<h1>RUN!</h1><h2>f@#kin run ! for your life</h2>"); 
    }
    if ((weatherID >= 700) && (weatherID  <799)) {
      removeVisible;
      setColorsgreen();
      $('#justClouds').addClass('visible');  
    }
  }; 

  function snowing() {
  
  var timer1 = 0;
  var timer2 = 0;
  var numer1 = 0; 
  var numer2 = 1;
  function randomIntFromInterval(max,min)
{ return Math.floor(Math.random()*(max-min+1)+min);}
 
     
  
  function numb() {  
   numer1 = numer1 + 2 ; if (numer1>=160) numer1 = 0;
   timer1 = setTimeout(numb,500);
    var n= (Math.floor(Math.random()*3))+1; 
    var position = randomIntFromInterval(0,10);
    var position2 = randomIntFromInterval(75,85);
    var timeFall = randomIntFromInterval(7,10); 
    
    $(".snow div:nth-child("+numer1+")").css({
  "animation": "snow"+n+" "+timeFall+"s linear",
      "left": +position+"0%",
      "top":  +position2+"%"
});
    }; 
    
   
   function numb2() {  
    numer2 = numer2+ 2 ; if (numer2>=160) numer2=1;
   timer2 = setTimeout(numb2,500);
    var nEven= (Math.floor(Math.random()*3))+1; 
    var positionEven = randomIntFromInterval(0,10);
    var position2Even = randomIntFromInterval(75,85);   
    var timeFallEven = randomIntFromInterval(7,10);
    $(".snow div:nth-child("+numer2+")").css({
  "animation": "snow"+nEven+" "+timeFallEven+"s linear",
      "left": +positionEven+"0%",
      "top":  +position2Even+"%"
});
    };
  numb();
  numb2();
      
 function makeFlakes()  { 
 var i = 0;
 var snow= "";
 var flake = '<div class="spin"></div>';
 while (i<=160) {
   snow += flake;
   i++; 
 }
 $(".snow").html(snow);
    
  makeFlakes(); 
};
$('#settings').on('click',function(){    
  $('.settings').fadeToggle('visible');
  });

$('form').click(function(){ 
var windUnit = $('input[name="wind"]:checked').val(); 
var tempUnit = $('input[name="temp"]:checked').val(); 
var cityUnit = $('input[name="city"]:checked').val(); 
  
  

  switch (tempUnit) {
    case "c" :  
      $("#temp").html(cTemp);
      $("h1 .sign").html("&deg;C");
      break;
    case "f" :  
       $("#temp").html(fTemp);
       $("h1 .sign").html("&deg;F");
       break;
}

  switch (windUnit) {
    case "ms" :  
      $('#windspeed').html(windspeedms);
      $('.wind-speed .sign').html('  m/s');
      break;
    case "knots" :                   
      $('#windspeed').html(windspeedknots);
      $('.wind-speed .sign').html(' knots');
      break;  
    case "kmh" :
      $('#windspeed').html(windspeedkmH);
      $('.wind-speed .sign').html(' km/h');
      break;
}
  
  switch (cityUnit) {
    case "name" :  
      $('#city').attr("placeholder", "Buscar ciudad"); 
      break;
    case "zip" :                   
      $('#city').attr("placeholder", "enter zip-code");
      break;  
                  }
}); 
 getlocation(); 
});