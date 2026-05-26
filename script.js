// ... (기존 상단 로직 동일)

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    
    // 검정색 테마일 때 글자색을 흰색으로, 아니면 검정색으로 설정
    const textColor = (color === '#000000') ? '#ffffff' : '#000000';
    document.documentElement.style.setProperty('--text-color', textColor);
    
    document.querySelectorAll('.operator').forEach(op => op.style.backgroundColor = color);
    closeMenu();
}

function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";
    setTimeout(() => { overlay.style.opacity = "1"; }, 10);
}

function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 300);
}

// ... (나머지 로직 동일)
