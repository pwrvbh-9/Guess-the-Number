let randomGenNo = parseInt(Math.random() * 100 + 1);

const submit = document.getElementById('submitBtn');
const userInput = document.getElementById('guessedNumber');
const guessSlot = document.querySelector('.guesses'); 
const remaining = document.querySelector('.lastResult'); 
const smallerBigger = document.querySelector('.biggerOrSmaller');
const startAgain = document.querySelector('.result'); 

const p = document.createElement('p');

let prevGuess = [];
let numOfGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        const guess = parseInt(userInput.value)
        // console.log(guess);
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    if(isNaN(guess)) {
        alert('Please enter a valid number')
    } else if(guess < 1) {
        alert('Please enter a number more than or equal to 1')
    } else if (guess > 100) {
        alert('Please enter a number lower than or equal to 100')
    } else {
        prevGuess.push(guess)
        if(numOfGuess === 6) {
            displayGuess(guess)
            displayMsg(`Game Over, Randomly generated number was ${randomGenNo}`)
            endGame()
        } else  {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    if(guess === randomGenNo) {
        displayMsg('Hooray! Your guess was right');
        endGame()
    } else if (guess < randomGenNo) {
        displayMsg('Nope! Try some bigger number')
    } else if (guess > randomGenNo) {
        displayMsg('Nope! Try some smaller number')
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `
    numOfGuess++;
    remaining.innerHTML = `${7-numOfGuess}`
}

function displayMsg(msg) {
    smallerBigger.innerHTML = `<h2>${msg}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame" style="cursor: pointer;">Start new Game</h2>`;
    startAgain.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener('click', function (e) {
      randomGenNo = parseInt(Math.random() * 100 + 1);
      prevGuess = [];
      numOfGuess = 1;
      guessSlot.innerHTML = '';
      remaining.innerHTML = `${6 - numOfGuess} `;
      userInput.removeAttribute('disabled');
      startAgain.removeChild(p);
      playGame = true;
    });
}