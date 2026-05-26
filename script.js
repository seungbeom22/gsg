function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const btns = document.querySelectorAll('.operator');
    btns.forEach(btn => {
        btn.style.backgroundColor = color;
        // 검정색 테마일 때만 글자를 흰색으로, 나머지는 검정색으로
        btn.style.color = (color === '#000000') ? '#fff' : '#000';
    });
    closeMenu();
}
function openMenu() { document.getElementById("mySidenav").style.width = "250px"; }
function closeMenu() { document.getElementById("mySidenav").style.width = "0"; }
function appendToDisplay(val) { document.getElementById('display').value += val; }
function clearDisplay() { document.getElementById('display').value = ''; }
function calculate() {
    try { document.getElementById('display').value = eval(document.getElementById('display').value.replace(/×/g, '*').replace(/÷/g, '/')); }
    catch { document.getElementById('display').value = '오류'; }
}
