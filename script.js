let timerInterval;
let remainingTime = 0;

let minutesInput = document.getElementById('minutes');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resumeButton = document.getElementById('resume');
let resetButton = document.getElementById('reset');
let timerDisplay = document.getElementById('timer');

timerDisplay.style.display = "none";
resetButton.style.display = "none";
pauseButton.style.display = "none";
resumeButton.style.display = "none";

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
    if(Number.isInteger(minutes) == true && minutes > 0) {
        startTimer(minutes);
        timerDisplay.style.display = "block";
        startButton.style.display = "none";
        minutesInput.style.display = "none";
        pauseButton.style.display = "inline";
        resumeButton.style.display = "none";
        resetButton.style.display = "inline";
        minutesInput.value = '';
    } else {
        resetButton.click();
    }
});

pauseButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    remainingTime = parseInt(timerDisplay.textContent.split(':')[0]) * 60 + parseInt(timerDisplay.textContent.split(':')[1]);
    resumeButton.style.display = "inline";
    pauseButton.style.display = "none";
});

resumeButton.addEventListener('click', function () {
    startTimer(0);
    resumeButton.style.display = "none";
    pauseButton.style.display = "inline";
});

resetButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    minutesInput.value = '';
    remainingTime = 0;
    timerDisplay.style.display = "none";
    minutesInput.style.display = "inline";
    startButton.style.display = "inline"
    resumeButton.style.display = "none";
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
});
