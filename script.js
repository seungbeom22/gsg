const display = document.getElementById('display');

function appendToDisplay(value) {
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
            // [요청] % 기호를 /100으로 바꿔서 계산
            let result = display.value.replace(/%/g, '/100');
            display.value = eval(result);
        }
    } catch (error) {
        display.value = '오류';
    }
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => {
        op.style.backgroundColor = color;
    });
    // .btn-red는 CSS에서 !important로 설정되어 있어 여기서 바뀌지 않습니다.
    closeMenu();
}

function openMenu() { document.getElementById("mySidenav").style.width = "250px"; }
function closeMenu() { document.getElementById("mySidenav").style.width = "0"; }
