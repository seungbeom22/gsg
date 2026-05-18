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
            let expression = display.value.replace(/%/g, '/100');
            expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
            display.value = eval(expression);
        }
    } catch (error) {
        display.value = '오류';
    }
}

// 테마 변경 함수
function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => {
        op.style.backgroundColor = color;
    });
    closeMenu();
}

function openMenu() { document.getElementById("mySidenav").style.width = "250px"; }
function closeMenu() { document.getElementById("mySidenav").style.width = "0"; }
