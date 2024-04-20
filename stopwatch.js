let startTime;
let elapsedTime = 300000;
let timerInterval;
let isRunning = false;

function formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);

    let formattedTime = `${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    return formattedTime;
}

function printTime() {
    document.getElementById('timer').textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now();
    timerInterval = setInterval(function() {
        let now = Date.now();
        elapsedTime = Math.max(0, elapsedTime - (now - startTime));
        printTime();

        if (elapsedTime <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').classList.add('countdown-complete');
        }
        startTime = now; 
    }, 1000);

    isRunning = true;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
}

function toggleStopwatch() {
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');

    if (!isRunning) {
        startStopwatch();
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
    } else {
        pauseStopwatch();
        startButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    document.getElementById('timer').classList.remove('countdown-complete');
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');

    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    elapsedTime = 300000;
    printTime();
    isRunning = false;
}

window.addEventListener('load', function() {

    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    startStopwatch(); 
});

document.getElementById('startButton').addEventListener('click', toggleStopwatch);
document.getElementById('stopButton').addEventListener('click', toggleStopwatch);
document.getElementById('resetButton').addEventListener('click', resetStopwatch);


printTime();
