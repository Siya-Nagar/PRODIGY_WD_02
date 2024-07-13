let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('PLAY');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton('PLAY');
    lapsContainer.innerHTML = '';
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsContainer.appendChild(li);
}

function showButton(buttonKey) {
    const buttonToShow = buttonKey === 'PLAY' ? startStopButton : startStopButton;
    buttonToShow.textContent = buttonKey === 'PLAY' ? 'Start' : 'Pause';
}

startStopButton.addEventListener('click', () => {
    if (startStopButton.textContent === 'Start') {
        start();
    } else {
        pause();
    }
});

resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
