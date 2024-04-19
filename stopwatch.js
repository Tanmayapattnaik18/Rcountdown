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

function toggleStopwatch() {
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');

    if (!isRunning) {
        
        startTime = Date.now();
        timerInterval = setInterval(function() {
            let now = Date.now();
            elapsedTime = Math.max(0, 300000 - (now - startTime));
            printTime();

            if (elapsedTime <= 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').classList.add('countdown-complete');
            }
        }, 1000); 

        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
        isRunning = true;
    } else {
        
        clearInterval(timerInterval);
        startButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    document.getElementById('timer').classList.remove('countdown-complete');
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');

    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    elapsedTime = 300000; 
    printTime();
    isRunning = false;
}

window.addEventListener('load', toggleStopwatch);
