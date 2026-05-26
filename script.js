function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    document.querySelectorAll('.operator').forEach(op => op.style.backgroundColor = color);
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
