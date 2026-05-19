const display = document.getElementById('display');
const overlay = document.getElementById('overlay');

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

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => {
        op.style.backgroundColor = color;
    });
    closeMenu();
}

// 3번 요청: 삼선 버튼 누르고 배경 눌렀을 때 닫히게 만들기
function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";
}

function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
}
