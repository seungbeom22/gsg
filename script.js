function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const btns = document.querySelectorAll('.operator');
    btns.forEach(btn => {
        btn.style.backgroundColor = color;
        btn.style.color = (color === '#000000') ? '#ffffff' : '#000000';
    });
    closeMenu();
}
function openMenu() { 
    document.getElementById("mySidenav").style.visibility = "visible";
    document.getElementById("mySidenav").style.width = "250px"; 
}
function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    setTimeout(() => { document.getElementById("mySidenav").style.visibility = "hidden"; }, 300);
}
function appendToDisplay(val) { document.getElementById('display').value += val; }
function clearDisplay() { document.getElementById('display').value = ''; }
function calculate() {
    try { document.getElementById('display').value = eval(document.getElementById('display').value.replace(/×/g, '*').replace(/÷/g, '/')); }
    catch { document.getElementById('display').value = '오류'; }
}
