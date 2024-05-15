let timerInterval;
let remainingTime = 0;

let minutesInput = document.getElementById('minutes');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resumeButton = document.getElementById('resume');
let resetButton = document.getElementById('reset');
let timerDisplay = document.getElementById('timer');

Notification.requestPermission();

function sendNotification(v1, v2) {
    var title = v1;
    var body = v2;
    new Notification(title, { body });
}

function timer(status) {
    if(status == true)
        timerDisplay.style.display = "block";
    else if(status == false) {
        timerDisplay.style.display = "none";
    } else {
        console.log("timer function called with unexpected parameter!");
    }
}

function start(status) {
    if(status == true)
        startButton.style.display = "inline";
    else if(status == false) {
        startButton.style.display = "none";
    } else {
        console.log("start function called with unexpected parameter!");
    }
}

function pause(status) {
    if(status == true)
        pauseButton.style.display = "inline";
    else if(status == false) {
        pauseButton.style.display = "none";
    } else {
        console.log("pause function called with unexpected parameter!");
    }
}

function resume(status) {
    if(status == true)
        resumeButton.style.display = "inline";
    else if(status == false) {
        resumeButton.style.display = "none";
    } else {
        console.log("resume function called with unexpected parameter!");
    }
}

function reset(status) {
    if(status == true)
        resetButton.style.display = "inline";
    else if(status == false) {
        resetButton.style.display = "none";
    } else {
        console.log("reset function called with unexpected parameter!");
    }
}

function minput(status) {
    if(status == true)
        minutesInput.style.display = "inline";
    else if(status == false) {
        minutesInput.style.display = "none";
    } else {
        console.log("minput function called with unexpected parameter!");
    }
}

timer(false);
start(true);
pause(false);
resume(false);
reset(false);
minput(true);

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
            timerDisplay.textContent = "Time is up!";
            sendNotification("Time is up!", "The timer you set has expired!");
            start(false);
            pause(false);
            resume(false);
            reset(true);
        }
    }, 1000);
}

function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        startButton.click();
    }
}

minutesInput.addEventListener('keypress', handleEnterKeyPress);

startButton.addEventListener('click', function () {
    let minutes = parseInt(minutesInput.value);
    if(Number.isInteger(minutes) == true && minutes > 0) {
        startTimer(minutes);
        timer(true);
        pause(true);
        reset(true);
        start(false);
        pause(true);
        minput(false);
        minutesInput.value = '';
    } else {
        resetButton.click();
    }
});

pauseButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    remainingTime = parseInt(timerDisplay.textContent.split(':')[0]) * 60 + parseInt(timerDisplay.textContent.split(':')[1]);
    resume(true);
    pause(false);
});

resumeButton.addEventListener('click', function () {
    startTimer(0);
    resume(false);
    pause(true);
});

resetButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    minutesInput.value = '';
    remainingTime = 0;
    timer(false);
    start(true);
    pause(false);
    resume(false);
    reset(false);
    minput(true);
});
