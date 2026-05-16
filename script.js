const display = document.getElementById('display');
const versionText = document.getElementById('version-text');
let currentVersion = 1.0; // 시작 버전

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (display.value !== '') {
            // 수식 계산
            display.value = eval(display.value);
            
            // 계산이 성공할 때마다 버전이 0.1씩 상승 (예: 1.0 -> 1.1 -> 1.2)
            currentVersion = (parseFloat(currentVersion) + 0.1).toFixed(1);
            versionText.innerText = 'v' + currentVersion;
        }
    } catch (error) {
        display.value = '오류';
    }
}
