let timer;
let seconds = 0; // 初期値は0秒

document.getElementById('startButton').addEventListener('click', function() {
    unlockAudio();
    startTimer();
});
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setTimer);

function unlockAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        }).catch(() => {});
    });
    // イベントリスナーを削除
    document.body.removeEventListener('touchstart', unlockAudio, false);
}

document.body.addEventListener('touchstart', unlockAudio, false);

function updateDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                updateDisplay();
                checkAlerts();
            } else {
                stopTimer();
                playFinalAlertSound();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
}

function setTimer() {
    let minutes = parseInt(document.getElementById('minutesInput').value);
    if (!isNaN(minutes) && minutes > 0) {
        seconds = minutes * 60;
        updateDisplay();
        autoCheckAlerts(minutes);
    }
}

function checkAlerts() {
    // 中間アラームのチェックと音声再生
}

function playFinalAlertSound() {
    const finalAlertSound = document.getElementById('finalAlertSound');
    finalAlertSound.play();
}

function autoCheckAlerts(minutes) {
    // 中間アラームの自動チェックロジック
    document.getElementById('alert1min').checked = minutes >= 1;
    document.getElementById('alert5min').checked = minutes >= 5;
    document.getElementById('alert10min').checked = minutes >= 10;
    document.getElementById('alert15min').checked = minutes >= 15;
}

updateDisplay();
