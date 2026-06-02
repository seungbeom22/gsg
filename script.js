let memoryValue = 0;
let freshInput = false;

// ... 다른 함수들은 그대로 유지 ...

// ── 메모리 기록 패널 업데이트 (총합만 표시) ──
function updateMemLog() {
    let panel = document.getElementById('mem-panel');
    let totalVal = document.getElementById('mem-total-value');

    // 메모리 값이 0이면 패널 숨김, 아니면 표시
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
