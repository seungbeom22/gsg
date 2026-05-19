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

// 메뉴 열기 (뒤로가기 제어 추가)
function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";
    // 가짜 상태 추가 (뒤로가기 방지용)
    history.pushState({ menuOpen: true }, '');
}

// 메뉴 닫기
function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
    // 수동으로 닫을 때 가짜 히스토리 기록도 제거
    if (history.state && history.state.menuOpen) {
        history.back();
    }
}

// 브라우저 뒤로가기 버튼 클릭 시 이벤트
window.onpopstate = function(event) {
    // 메뉴가 열려있다면 사이트가 나가는 대신 메뉴만 닫음
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
};
