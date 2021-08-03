const gameContainer = document.getElementById("game");
const timerText = document.getElementById('timer');
const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton')
const timerH2 = document.getElementById('timerH2')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
//ids for cards
let id = 0;
//timer
let timer = 0;
let intId = setInterval(function(){
  timerText.innerText = timer;
  timer++;
}, 1000)
//final score
let finalTime = 0;
//I couldn't get this localStorage to work! I will study more.
// let storageScore = JSON.parse(localStorage.getItem("highscore"))

// const highScore = [storageScore];

// function compareScore (){
//   if(highScore[1] > highscore[0]){
//     highScore.shift();
//   } else if (highScore[0] > highScore[1]){
//     highScore.pop();
//   }
//   localStorage.setItem("highscore", JSON.stringify(highScore))
// }

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    //I added this to check for duplicate clicks!!!!!!!
    newDiv.setAttribute('id', id);
    id++;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const picked = [];
const matches = [];
const ids = [];

function handleCardClick(event) {
  let card = event.target;
  picked.push(card);
  ids.push(card.getAttribute('id'))
  function scrubber(arr, n){
    document.body.classList.add('stopClick')
    for (let el of arr){
      setTimeout(function(){
        el.style.removeProperty('background-color')
        document.body.classList.remove('stopClick');
      }, n)
    }
  }
  for(let pick of picked){
    card.style.backgroundColor = card.className;
  }
  if(ids[0] === ids[1]){
    console.log('Duplicate')
    scrubber(picked, 0.5)
    picked.splice(0,2);
    ids.splice(0,2);
  }
  if(picked.length === 2 && picked[0].className === picked[1].className){
    matches.push(picked[0], picked [1])
    for(let match of matches){
      if(!match.classList.contains('stopClick')){
        match.classList.add('stopClick')
      }
    }
    picked.splice(0,2);
    ids.splice(0,2);
  } else if (picked.length === 2 && picked[0].className !== picked[1].className) {
    scrubber(picked, 1000);
    picked.splice(0,2);
    ids.splice(0,2)
  }
  if (matches.length === 10){
    for(let match of matches){
      match.style.backgroundImage = "url(imgs/duane.gif)";
    }
    clearInterval(intId)
    finalTime = timer;
    // highScore.push(finalTime)
    timerH2.innerText = `Your finished in ${finalTime} seconds!`
    let form = document.createElement('form');
    let submit = document.createElement('button');
    submit.setAttribute('action', 'submit')
    form.append(submit);
    timerH2.append(form);
    submit.setAttribute('id', 'startButton');
    submit.innerText = 'Play again?'
  }
}

gameBoard.classList.add('stopClick')
startButton.addEventListener('click', function(){
  gameBoard.classList.remove('stopClick');
  startButton.remove();
  timer = 0;
  timerH2.style.display = 'contents';
})


// when the DOM loads
createDivsForColors(shuffledColors);
