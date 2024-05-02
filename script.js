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

startButton.addEventListener('click', function () {
    let minutes = parseInt(minutesInput.value);
    if(minutes == NaN) {
        console.log("Geçersiz veri");
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
    let currentTimer = timerDisplay.textContent.split(':');
    let minutes = parseInt(currentTimer[0]);
    let seconds = parseInt(currentTimer[1]);
    remainingTime = minutes * 60 + seconds;
    startTimer(minutes);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
});

resetButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    minutesInput.value = '';
    remainingTime = 0;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
});
