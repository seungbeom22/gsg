let memoryValue = 0;

// 테마 변경 함수: 배경색과 글자색 제어
function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const btns = document.querySelectorAll('.operator');
    // 검정색(#000000)일 때만 글자를 흰색(#ffffff)으로, 나머지는 검정색(#000000)으로 설정
    const textColor = (color === '#000000') ? '#ffffff' : '#000000';
    
    btns.forEach(btn => {
        btn.style.backgroundColor = color;
        btn.style.color = textColor;
    });
    closeMenu();
}

// 메뉴 열기/닫기
function openMenu() {
    const menu = document.getElementById("mySidenav");
    menu.style.visibility = "visible";
    menu.style.width = "250px";
}

function closeMenu() {
    const menu = document.getElementById("mySidenav");
    menu.style.width = "0";
    setTimeout(() => { menu.style.visibility = "hidden"; }, 300);
}

// 계산기 로직
function appendToDisplay(val) {
    let display = document.getElementById('display');
    if (display.value === '0' || display.value === '오류') {
        display.value = val;
    } else {
        display.value += val;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '0';
}

function calculate() {
    try {
        let display = document.getElementById('display');
        // ×, ÷ 문자를 자바스크립트 연산자로 변환
        let result = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
        display.value = result;
    } catch {
        document.getElementById('display').value = '오류';
    }
}

// 메모리 기능
function memory(type) {
    let display = document.getElementById('display');
    let val = parseFloat(display.value) || 0;
    
    if (type === 'M+') {
        memoryValue += val;
    } else if (type === 'M-') {
        memoryValue -= val;
    } else if (type === 'MR') {
        display.value = memoryValue;
    } else if (type === 'MC') {
        memoryValue = 0;
    }
}
