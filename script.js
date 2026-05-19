const display = document.getElementById('display');
const overlay = document.getElementById('overlay');

// 숫자에 천 단위 쉼표를 추가하는 함수
function formatNumber(num) {
    if (!num) return "";
    // 기존 쉼표 제거 후 숫자만 추출
    const parts = num.toString().replace(/,/g, "").split(".");
    // 정수 부분에 쉼표 넣기
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

// 계산을 위해 쉼표를 제거하는 함수
function unformatNumber(num) {
    return num.toString().replace(/,/g, "");
}

function appendToDisplay(value) {
    // 현재 디스플레이 값에서 쉼표 제거 후 새 값 추가
    let currentVal = unformatNumber(display.value);
    
    // 연산자가 아니고 점(.)이 아닐 때만 콤마 포맷팅 적용
    if (!isNaN(value) || value === '.') {
        display.value = formatNumber(currentVal + value);
    } else {
        display.value += value; // 연산자는 그대로 추가
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    let currentVal = unformatNumber(display.value);
    display.value = formatNumber(currentVal.slice(0, -1));
}

function calculate() {
    try {
        if (display.value !== '') {
            // 계산 전 모든 쉼표 제거
            let expression = unformatNumber(display.value);
            
            // 기호 변환
            expression = expression.replace(/%/g, '/100');
            expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
            
            // 계산 후 다시 쉼표 포맷팅
            let result = eval(expression);
            display.value = formatNumber(result);
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
    overlay.style.display = "block";
    window.history.pushState({menu: "open"}, "");
}

// 메뉴 닫기
function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
    if (window.history.state && window.history.state.menu === "open") {
        window.history.back();
    }
}

// 뒤로가기 버튼 감지
window.onpopstate = function(event) {
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
};
