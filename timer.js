let timer;
let seconds = 0; // 初期値は0秒
let alertSetTimes = { 'alert1min': 60, 'alert5min': 300, 'alert10min': 600, 'alert15min': 900 }; // アラーム時間を秒で設定

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setTimer);

// ページがロードされた時にタイマーの表示を更新
updateDisplay();

function startTimer() {
    if (seconds > 0) { // タイマーがセットされていることを確認
        stopTimer(); // 既存のタイマーを停止（もしあれば）
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                updateDisplay();
                checkAlerts();
            } else {
                stopTimer();
                playSound('finalAlertSound'); // 最終アラーム
            }
        }, 1000);
    } else {
        console.log("タイマーはセットされていません。"); // ここにユーザー向けの警告を表示できます。
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
    resetAlerts();
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
    // 全てのアラートを一旦リセット
    for (let alert in alertSetTimes) {
        document.getElementById(alert).checked = false;
    }
    // 設定された時間に応じてアラートをセット
    for (let alert in alertSetTimes) {
        if (minutes * 60 >= alertSetTimes[alert]) {
            document.getElementById(alert).checked = true;
        }
    }
}

function resetAlerts() {
    for (let alert in alertSetTimes) {
        document.getElementById(alert).checked = false;
    }
}
