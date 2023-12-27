let timer;
let seconds = 0; // 初期値は0秒

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    resetAlertChecks(); // ページ読み込み時にアラームチェックボックスをリセット
    initializeAudio(); // オーディオを初期化
});

// 各ボタンにイベントリスナーを追加
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('setTimerButton').addEventListener('click', setTimer);

// タイマーの表示を更新する関数
function updateDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// タイマーをスタートする関数
function startTimer() {
    if (!timer) {
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

// タイマーをストップする関数
function stopTimer() {
    clearInterval(timer);
    timer = null;
}

// タイマーをリセットする関数
function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
    resetAlertChecks();
}

// タイマーを設定する関数
function setTimer() {
    let minutes = parseInt(document.getElementById('minutesInput').value);
    if (!isNaN(minutes) && minutes > 0) {
        seconds = minutes * 60;
        updateDisplay();
    }
}

// 中間アラートをチェックする関数
function checkAlerts() {
    if (document.getElementById('alert1min').checked && seconds === 60) {
        playSound('alert1minSound');
    }
    if (document.getElementById('alert5min').checked && seconds === 5 * 60) {
        playSound('alert5minSound');
    }
    if (document.getElementById('alert10min').checked && seconds === 10 * 60) {
        playSound('alert10minSound');
    }
    if (document.getElementById('alert15min').checked && seconds === 15 * 60) {
        playSound('alert15minSound');
    }
}

// タイマー終了時のアラームを鳴らす関数
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

// アラームのチェックボックスをリセットする関数
function resetAlertChecks() {
    document.getElementById('alert1min').checked = false;
    document.getElementById('alert5min').checked = false;
    document.getElementById('alert10min').checked = false;
    document.getElementById('alert15min').checked = false;
}

// オーディオを初期化する関数
function initializeAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}
