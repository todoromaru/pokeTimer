let timer;
let seconds = 0; // 初期値は0秒
let alertSetTimes = {
    'alert1min': 60,
    'alert5min': 300,
    'alert10min': 600,
    'alert15min': 900
}; // アラーム時間を秒で設定

// ページがロードされた時にタイマーの表示を更新
document.addEventListener('DOMContentLoaded', updateDisplay);

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', () => stopTimer(true));
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setTimer);

function startTimer() {
    if (seconds > 0) { // タイマーがセットされていることを確認
        if (timer) {
            stopTimer(false); // 既存のタイマーを停止（もしあれば）
        }
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                updateDisplay();
                checkAlerts();
            } else {
                stopTimer(true);
                playSound('finalAlertSound'); // 最終アラーム
            }
        }, 1000);
    } else {
        console.log("タイマーはセットされていません。"); // ここにユーザー向けの警告を表示できます。
    }
}

function stopTimer(resetAlertsFlag) {
    clearInterval(timer);
    timer = null;
    if (resetAlertsFlag) {
        resetAlerts(); // タイマーを停止したときにアラートをリセット
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
        setAlerts(minutes);
    }
}

function updateDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function checkAlerts() {
    for (let alert in alertSetTimes) {
        if (seconds === alertSetTimes[alert] && document.getElementById(alert).checked) {
            playSound(alert + 'Sound');
        }
    }
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.play();
    }
}

function setAlerts(minutes) {
    // 設定された時間に応じてアラートをセット
    for (let alert in alertSetTimes) {
        document.getElementById(alert).checked = (minutes * 60 >= alertSetTimes[alert]);
    }
}

function resetAlerts() {
    // すべてのアラートをオフにする
    for (let alert in alertSetTimes) {
        document.getElementById(alert).checked = false;
    }
}
