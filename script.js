// script.js
let memoryValue = 0;
let freshInput = false;

// ... (상단 함수들 유지) ...

// ── 메모리 합계 표시 업데이트 ──
function updateMemLog() {
    let panel = document.getElementById('mem-panel');
    let totalVal = document.getElementById('mem-total-value');

    // 메모리 값이 0이면 패널을 숨기고, 값이 있으면 표시
    if (memoryValue === 0) {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
        totalVal.textContent = formatDisplay(memoryValue);
    }
}

function memory(type) {
    let d = document.getElementById('display');
    let raw = getRaw();
    let v = parseFloat(raw.replace(/,/g, '')) || 0;

    if (type === 'M+') {
        memoryValue += v;
        freshInput = true;
        updateMemLog();
    } else if (type === 'M-') {
        memoryValue -= v;
        freshInput = true;
        updateMemLog();
    } else if (type === 'MR') {
        d.dataset.raw = String(memoryValue);
        d.value = formatDisplay(memoryValue);
        showToast('MR : ' + formatDisplay(memoryValue));
        freshInput = true;
    } else if (type === 'MC') {
        memoryValue = 0;
        updateMemLog();
        showToast('메모리 초기화');
    }
}
