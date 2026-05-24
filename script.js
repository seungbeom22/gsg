const display = document.getElementById('display');
const memIndicator = document.getElementById('memory-indicator');
let memoryValue = 0;

function formatNumber(num) {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function unformatNumber(num) { return num.toString().replace(/,/g, ""); }

function memory(type) {
    let currentVal = parseFloat(unformatNumber(display.value)) || 0;
    if(type === 'MC') memoryValue = 0;
    else if(type === 'MR') display.value = formatNumber(memoryValue);
    else if(type === 'M+') { memoryValue += currentVal; clearDisplay(); }
    else if(type === 'M-') { memoryValue -= currentVal; clearDisplay(); }
    memIndicator.innerText = memoryValue !== 0 ? `M: ${formatNumber(memoryValue)}` : "";
}

function appendToDisplay(value) { display.value = formatNumber(unformatNumber(display.value) + value); }
function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = formatNumber(unformatNumber(display.value).slice(0, -1)); }
function calculate() {
    try { display.value = formatNumber(eval(unformatNumber(display.value).replace(/×/g, '*').replace(/÷/g, '/'))); }
    catch { display.value = '오류'; }
}
