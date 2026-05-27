let memoryValue = 0;

function openMenu() {
    let m = document.getElementById("mySidenav");
    m.style.width = "250px";
}

function closeMenu() {
    let m = document.getElementById("mySidenav");
    m.style.width = "0";
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const textColor = (color === '#000000') ? '#ffffff' : '#000000';
    document.documentElement.style.setProperty('--text-color', textColor);
    closeMenu();
}

function appendToDisplay(val) {
    let d = document.getElementById('display');
    if (d.value === '0') d.value = val;
    else d.value += val;
}

function clearDisplay() {
    document.getElementById('display').value = '0';
}

function deleteLast() {
    let d = document.getElementById('display');
    if (d.value.length <= 1) d.value = '0';
    else d.value = d.value.slice(0, -1);
}

function calculate() {
    try {
        let d = document.getElementById('display');
        d.value = eval(d.value.replace(/×/g, '*').replace(/÷/g, '/'));
    } catch {
        document.getElementById('display').value = '오류';
    }
}

function showToast(msg) {
    let t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => t.classList.remove('show'), 1500);
}

function memory(type) {
    let d = document.getElementById('display');
    let v = parseFloat(d.value) || 0;
    if (type === 'M+') { memoryValue += v; showToast('M+ : ' + memoryValue); }
    else if (type === 'M-') { memoryValue -= v; showToast('M- : ' + memoryValue); }
    else if (type === 'MR') { d.value = memoryValue; showToast('MR : ' + memoryValue); }
    else if (type === 'MC') { memoryValue = 0; showToast('메모리 초기화'); }
}
