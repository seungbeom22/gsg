const display = document.getElementById('display');

// 메뉴 열기
function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
}

// 메뉴 닫기
function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
}

// 테마 변경
function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    // 연산자 버튼들의 그림자 색상도 어울리게 변경 (간단히 처리)
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => {
        op.style.boxShadow = `0 4px rgba(0,0,0,0.5)`;
    });
}

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
            // eval 대신 안전한 계산 방식을 쓰는 것이 좋지만, 
            // 현재 구조를 유지하며 버그(버전 상승)만 제거했습니다.
            display.value = eval(display.value);
            
            // v1.1 업데이트: 버전이 올라가는 버그를 삭제했습니다.
        }
    } catch (error) {
        display.value = '오류';
    }
}
