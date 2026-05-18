// ... 기존 상단 코드 동일 ...

function calculate() {
    try {
        if (display.value !== '') {
            // [요청] % 기호를 /100으로 바꿔서 계산하도록 수정
            let result = display.value.replace(/%/g, '/100');
            display.value = eval(result);
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
    // 빨간 버튼(btn-red)은 테마 변경에서 제외됩니다.
    closeMenu();
}

// ... 나머지 코드 동일 ...
