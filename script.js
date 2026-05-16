const display = document.getElementById('display');

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
        // 입력된 수식을 계산해주는 함수입니다.
        display.value = eval(display.value);
    } catch (error) {
        display.value = '오류';
    }
}
