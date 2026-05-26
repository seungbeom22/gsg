const display = document.getElementById('display');
const overlay = document.getElementById('overlay');
const memIndicator = document.getElementById('memory-indicator');
let memoryValue = 0;

function formatNumber(num) {
    if (!num) return "";
    const parts = num.toString().replace(/,/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function unformatNumber(num) { 
    return num.toString().replace(/,/g, ""); 
}

function updateMemIndicator() {
    memIndicator.innerText = memoryValue !== 0 ? `메모리(M): ${formatNumber(memoryValue)}` : "";
}

function memory(type) {
    let currentVal = parseFloat(unformatNumber(display.value)) || 0;
    switch(type) {
        case 'MC': memoryValue = 0; break;
        case 'MR': display.value = formatNumber(memoryValue); break;
        case 'M+': 
            memoryValue += currentVal; 
            display.value = ''; 
            break;
        case 'M-': 
            memoryValue -= currentVal; 
            display.value = ''; 
            break;
    }
    updateMemIndicator();
}

function appendToDisplay(value) {
    let currentVal = unformatNumber(display.value);
    if (!isNaN(value) || value === '.') {
        display.value = formatNumber(currentVal + value);
    } else {
        display.value += value;
    }
}

function clearDisplay() { 
    display.value = ''; 
}

function deleteLast() {
    let currentVal = unformatNumber(display.value);
    display.value = formatNumber(currentVal.slice(0, -1));
}

function calculate() {
    try {
        if (display.value !== '') {
            let expression = unformatNumber(display.value);
            expression = expression.replace(/%/g, '/100').replace(/×/g, '*').replace(/÷/g, '/');
            let result = eval(expression);
            display.value = formatNumber(result);
        }
    } catch (error) { 
        display.value = '오류'; 
    }
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    document.querySelectorAll('.operator').forEach(op => op.style.backgroundColor = color);
    closeMenu();
}

function openMenu() { 
    document.getElementById("mySidenav").style.width = "250px"; 
    overlay.style.display = "block";
    window.history.pushState({menu: "open"}, "");
}

function closeMenu() { 
    document.getElementById("mySidenav").style.width = "0"; 
    overlay.style.display = "none";
    if (window.history.state && window.history.state.menu === "open") {
        window.history.back();
    }
}

window.onpopstate = function() {
    if (document.getElementById("mySidenav").style.width !== "0") {
        closeMenu();
    }
};
