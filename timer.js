let timer;
let seconds = 0;
let isAudioUnlocked = false;

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();

    document.getElementById('startButton').addEventListener('click', startTimer);
    document.getElementById('stopButton').addEventListener('click', () => stopTimer(true));
    document.getElementById('resetButton').addEventListener('click', resetTimer);
    document.getElementById('setTimerButton').addEventListener('click', setTimer);

    // オーディオをアンロックするイベントリスナーを設定
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', unlockAudio);
    });
});

function startTimer() {
    if (seconds > 0 && !timer) {
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                updateDisplay();
                checkAlerts();
            } else {
                stopTimer(true);
                playSound('finalAlertSound');
            }
        }, 1000);
    }
}

function stopTimer(resetAlertsFlag) {
    clearInterval(timer);
    timer = null;
    if (resetAlertsFlag) {
        resetAlertChecks();
    }
}

function resetTimer() {
    stopTimer(true);
    seconds = 0;
    updateDisplay();
}

function setTimer() {
    let minutes = parseInt(document.getElementById('minutesInput').value, 10);
    if (!isNaN(minutes) && minutes > 0) {
        seconds = minutes * 60;
        updateDisplay();
        setAlertChecks(minutes);
        resetSounds(); // タイマー設定時にアラーム音をリセット
    }
}

function updateDisplay() {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function checkAlerts() {
    for (let alert in alertSetTimes) {
        if (seconds === alertSetTimes[alert] && document.getElementById(alert).checked) {
            playSound(alert + 'Sound');
        }
    }
}

function playSound(id) {
    if (isAudioUnlocked) {
        let sound = document.getElementById(id);
        if (sound) {
            sound.play();
        }
    }
}

function unlockAudio() {
    if (!isAudioUnlocked) {
        isAudioUnlocked = true;
        document.querySelectorAll('audio').forEach(audio => {
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
            }).catch(error => console.error('Audio unlock failed', error));
        });
    }
}

function setAlertChecks(minutes) {
    for (let alert in alertSetTimes) {
        document.getElementById(alert).checked = (minutes * 60 >= alertSetTimes[alert]);
    }
}

function resetAlertChecks() {
    for (let alert in alertSetTimes) {
        document.getElementById(alert).checked = false;
    }
}

function resetSounds() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

const alertSetTimes = {
    'alert15min': 15 * 60,
    'alert10min': 10 * 60,
    'alert5min': 5 * 60,
    'alert1min': 1 * 60
};
