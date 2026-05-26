// ... (기존 상단 로직 동일)

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    
    // 검정 테마일 때 글자색 하얀색으로, 아닐 땐 검정색으로 설정
    if (color === '#000000') {
        document.documentElement.style.setProperty('--text-color', '#000000'); // 계산기 글자
        document.documentElement.style.setProperty('--menu-text', '#ffffff');  // 메뉴 글자
    } else {
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--menu-text', '#ffffff');
    }
    
    document.querySelectorAll('.operator').forEach(op => op.style.backgroundColor = color);
    closeMenu();
}

function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
    window.history.pushState({menu: "open"}, "");
}

function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 300);
    if (window.history.state && window.history.state.menu === "open") {
        window.history.back();
    }
}
// ... (하단 로직 동일)
// ... (기존 계산 로직 동일)

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    
    // 검정색 선택 시 dark-mode 클래스 추가
    if (color === '#000000') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    document.querySelectorAll('.operator').forEach(op => op.style.backgroundColor = color);
    closeMenu();
}

function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
}

function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 400);
}

// ... (계산 관련 함수들 그대로 유지)
