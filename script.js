let timerInterval;
let remainingTime = 0;

let minutesInput = document.getElementById('minutes');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resumeButton = document.getElementById('resume');
let resetButton = document.getElementById('reset');
let timerDisplay = document.getElementById('timer');

function startTimer(duration) {
    let timer = duration * 60 + remainingTime;
    let minutes, seconds;
    
    timerInterval = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.textContent = minutes + ':' + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Süre Doldu!';
        }
    }, 1000);
}

function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // ignore submit thing
        startButton.click(); // simulate click
    }
}

minutesInput.addEventListener('keypress', handleEnterKeyPress);

startButton.addEventListener('click', function () {
    let minutes = parseInt(minutesInput.value);
    if(Number.isInteger(minutes) == false) {
        resetButton.click("click"); /* the functions directly on the reset button will be triggered */
    } else {
        startTimer(minutes);
        minutesInput.value = '';
        startButton.disabled = true;
        pauseButton.disabled = false;
        resumeButton.disabled = true;
        resetButton.disabled = false;   
    }
});

pauseButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    remainingTime = parseInt(timerDisplay.textContent.split(':')[0]) * 60 + parseInt(timerDisplay.textContent.split(':')[1]);
    pauseButton.disabled = true;
    resumeButton.disabled = false;
});

resumeButton.addEventListener('click', function () {
    startTimer(0);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
});

resetButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    minutesInput.value = '';
    remainingTime = 0;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
});
