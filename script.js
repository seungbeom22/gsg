// 3번 요청: 삼선 버튼 누르고 배경 눌렀을 때 닫히게 만들기
function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";

    // [추가] 메뉴가 열릴 때 브라우저 히스토리에 가짜 상태를 하나 추가합니다.
    history.pushState({ mode: 'menuOpen' }, '');
}

function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";

    // [추가] 메뉴가 닫힐 때, 만약 히스토리에 메뉴 열림 상태가 남아있다면 뒤로가기를 실행해 정리합니다.
    if (history.state && history.state.mode === 'menuOpen') {
        history.back();
    }
}

// [추가] 브라우저의 뒤로가기 버튼 감지 이벤트
window.onpopstate = function(event) {
    // 뒤로가기가 발생했을 때 메뉴가 열려있다면 메뉴만 닫습니다.
    const menu = document.getElementById("mySidenav");
    if (menu.style.width === "250px") {
        document.getElementById("mySidenav").style.width = "0"; 
        overlay.style.display = "none";
    }
};
