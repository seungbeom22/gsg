const display = document.getElementById('display');

// 메뉴 열기/닫기
function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
}

function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
}

// 테마 변경 기능
function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => {
        op.style.backgroundColor = color;
    });
    closeMenu();
}

// 계산기 입력 기능
function appendValue(value) {
    if (display.value === '0' || display.value === '오류') {
        display.value = value;
    } else {
        display.value += value;
    }
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
            display.value = eval(display.value);
            // 버전 고정 (버그 수정)
        }
    } catch (error) {
        display.value = '오류';
    }
}
