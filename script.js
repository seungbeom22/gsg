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

// 메뉴 열기
function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block"; // 오버레이 켜기
    
    // 뒤로가기 누를 때 메뉴만 닫히게 하기 위해 기록 추가
    window.history.pushState({menu: "open"}, "");
}

// 메뉴 닫기
function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none"; // 오버레이 끄기
    
    // 수동으로 메뉴를 닫았을 때 기록 정리
    if (window.history.state && window.history.state.menu === "open") {
        window.history.back();
    }
}

// 뒤로가기 버튼 감지
window.onpopstate = function(event) {
    // 뒤로가기 발생 시 메뉴 닫기
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
};
