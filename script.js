// script.js 맨 윗줄에 추가
console.log("스크립트가 정상 연결되었습니다.");

function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
    document.getElementById("overlay").style.display = "block";
}

function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
    document.getElementById("overlay").style.display = "none";
}
