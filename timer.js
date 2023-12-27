let timer;
let seconds = 0;
let isAudioUnlocked = false;

document.addEventListener('DOMContentLoaded', function() {
    // タイマーの表示を初期化
    updateDisplay();

    // 各ボタンのイベントリスナーを設定
    document.getElementById('startButton').addEventListener('click', startTimer);
    document.getElementById('stopButton').addEventListener('click', stopTimer);
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
                stopTimer();
                playSound('finalAlertSound');
            }
        }, 1000);
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
    resetAlertChecks();
}

function setTimer() {
    let minutes = parseInt(document.getElementById('minutesInput').value, 10);
    if (!isNaN(minutes) && minutes > 0) {
        seconds = minutes * 60;
        updateDisplay();
        setAlertChecks();
    }
}

function updateDisplay() {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function checkAlerts() {
    ['15', '10', '5', '1'].forEach(number => {
        let alertTime = number + 'min';
        if (seconds === alertSetTimes[alertTime] && document.getElementById('alert' + alertTime).checked) {
            playSound('alert' + alertTime + 'Sound');
        }
    });
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

function setAlertChecks() {
    let minutes = seconds / 60;
    ['15', '10', '5', '1'].forEach(number => {
        let checkbox = document.getElementById('alert' + number + 'min');
        checkbox.checked = minutes >= number;
    });
}

function resetAlertChecks() {
    ['15', '10', '5', '1'].forEach(number => {
        document.getElementById('alert' + number + 'min').checked = false;
    });
}

const alertSetTimes = {
    'alert15min': 15 * 60,
    'alert10min': 10 * 60,
    'alert5min': 5 * 60,
    'alert1min': 1 * 60
};
