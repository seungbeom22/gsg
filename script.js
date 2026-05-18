const display = document.getElementById('display');

// 숫차 및 연산자 입력
function appendToDisplay(value) {
    display.value += value;
}

// 화면 초기화
function clearDisplay() {
    display.value = '';
}

// 마지막 글자 삭제
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// 계산 실행 로직
function calculate() {
    try {
        if (display.value !== '') {
            // [요청] % 기호를 /100으로 바꿔서 계산하도록 수정
            let expression = display.value.replace(/%/g, '/100');
            // 기호 변환 (× -> *, ÷ -> /)
            expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
            display.value = eval(expression);
        }
    } catch (error) {
        display.value = '오류';
    }
}

// 테마 변경 시 빨간 버튼은 색이 변하지 않도록 예외 처리
function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => {
        op.style.backgroundColor = color;
    });
    // 빨간 버튼(.btn-red)은 CSS의 !important 설정으로 인해 테마 변경에서 제외됩니다.
    closeMenu();
}

/* 메뉴 컨트롤 */
function openMenu() { document.getElementById("mySidenav").style.width = "250px"; }
function closeMenu() { document.getElementById("mySidenav").style.width = "0"; }
