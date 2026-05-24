const display = document.getElementById('display');
const memIndicator = document.getElementById('memory-indicator');
let memoryValue = 0;

function formatNumber(num) {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function unformatNumber(num) { return num.toString().replace(/,/g, ""); }
function updateMemIndicator() { memIndicator.innerText = memoryValue !== 0 ? `M: ${formatNumber(memoryValue)}` : ""; }

function memory(type) {
    let currentVal = parseFloat(unformatNumber(display.value)) || 0;
    if(type === 'MC') memoryValue = 0;
    else if(type === 'MR') display.value = formatNumber(memoryValue);
    else if(type === 'M+') memoryValue += currentVal;
    else if(type === 'M-') memoryValue -= currentVal;
    updateMemIndicator();
}

function appendToDisplay(value) {
    let currentVal = unformatNumber(display.value);
    display.value = formatNumber(currentVal + value);
}

function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = formatNumber(unformatNumber(display.value).slice(0, -1)); }

function calculate() {
    try {
        let expression = unformatNumber(display.value).replace(/×/g, '*').replace(/÷/g, '/');
        display.value = formatNumber(eval(expression));
    } catch { display.value = '오류'; }
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    document.querySelectorAll('.operator').forEach(op => op.style.backgroundColor = color);
    closeMenu();
}

function openMenu() { document.getElementById("mySidenav").style.width = "250px"; }
function closeMenu() { document.getElementById("mySidenav").style.width = "0"; }
