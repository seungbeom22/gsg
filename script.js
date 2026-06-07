let memoryValue = 0;
let freshInput = false;
let memHistory = [];

function openMenu() {
    document.getElementById("mySidenav").classList.add("open");
    document.getElementById("overlay").classList.add("show");
    history.pushState({ menuOpen: true }, '');
}
function closeMenu() {
    document.getElementById("mySidenav").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}
window.addEventListener('popstate', function() {
    if (document.getElementById("mySidenav").classList.contains("open")) closeMenu();
});

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    document.documentElement.style.setProperty('--text-color', color === '#000000' ? '#ffffff' : '#000000');
    closeMenu();
}

function formatDisplay(val) {
    if (val === '' || val === '오류') return val;
    let parts = String(val).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function formatRawExpression(expr) {
    return expr.replace(/(\d+\.?\d*)/g, function(num) {
        let parts = num.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    });
}

function getRaw() {
    let d = document.getElementById('display');
    return d.dataset.raw !== undefined ? d.dataset.raw : d.value.replace(/,/g, '');
}

function appendToDisplay(val) {
    let d = document.getElementById('display');
    let raw = getRaw();
    const operators = ['+', '-', '*', '/'];
    const isOp = operators.includes(val);

    if (freshInput) {
        if (isOp) {
            freshInput = false;
        } else {
            raw = '';
            freshInput = false;
        }
    }

    // 연산자 연속 입력 시 마지막 연산자로 교체
    if (isOp && raw !== '' && raw !== '0') {
        const lastChar = raw.slice(-1);
        if (operators.includes(lastChar)) {
            raw = raw.slice(0, -1) + val;
            d.dataset.raw = raw;
            d.value = formatRawExpression(raw);
            return;
        }
    }

    if (raw === '0' || raw === '') {
        raw = isOp ? '0' + val : val;
    } else {
        raw += val;
    }
    d.dataset.raw = raw;
    d.value = formatRawExpression(raw);
}

function clearDisplay() {
    let d = document.getElementById('display');
    d.dataset.raw = '0';
    d.value = '0';
    freshInput = false;
}

function deleteLast() {
    let d = document.getElementById('display');
    let raw = getRaw();
    raw = raw.length <= 1 ? '0' : raw.slice(0, -1);
    d.dataset.raw = raw;
    d.value = formatRawExpression(raw);
}

function calculate() {
    try {
        let d = document.getElementById('display');
        let raw = getRaw();
        let result = eval(raw.replace(/×/g, '*').replace(/÷/g, '/'));
        d.dataset.raw = String(result);
        d.value = formatDisplay(result);
        freshInput = true;
        // 계산 후 히스토리 스택 초기화 (뒤로가기 한번에 나가도록)
        history.replaceState(null, '');
    } catch {
        let d = document.getElementById('display');
        d.dataset.raw = '오류';
        d.value = '오류';
    }
}

function showToast(msg) {
    let t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => t.classList.remove('show'), 1500);
}

function updateMemLog() {
    let panel = document.getElementById('mem-panel');
    let totalVal = document.getElementById('mem-total-value');
    let histEl = document.getElementById('mem-history');

    if (memoryValue === 0 && memHistory.length === 0) {
        panel.style.display = 'none';
        return;
    }
    panel.style.display = 'block';
    totalVal.textContent = formatDisplay(memoryValue);

    histEl.innerHTML = '';
    let reversed = memHistory.slice().reverse();
    reversed.forEach(function(e, i) {
        let el = document.createElement('div');
        el.className = 'mem-history-item' + (i === 0 ? ' latest' : '');
        el.innerHTML = '<span class="log-op">' + e.op + '</span>' + '<span class="log-val">' + formatDisplay(e.val) + '</span>' + '<span class="log-arrow">→</span>' + '<span class="log-total">' + formatDisplay(e.total) + '</span>';
        histEl.appendChild(el);
    });
}

function memory(type) {
    let d = document.getElementById('display');
    let raw = getRaw();
    let v = parseFloat(raw.replace(/,/g, '')) || 0;

    if (type === 'M+') {
        memoryValue += v;
        memHistory.push({ op: 'M+', val: v, total: memoryValue });
        freshInput = true;
        updateMemLog();
    } else if (type === 'M-') {
        memoryValue -= v;
        memHistory.push({ op: 'M−', val: v, total: memoryValue });
        freshInput = true;
        updateMemLog();
    } else if (type === 'MR') {
        d.dataset.raw = String(memoryValue);
        d.value = formatDisplay(memoryValue);
        showToast('MR : ' + formatDisplay(memoryValue));
        freshInput = true;
    } else if (type === 'MC') {
        memoryValue = 0;
        memHistory = [];
        updateMemLog();
        let msg = document.getElementById('mem-clear-msg');
        msg.textContent = '메모리 초기화';
        clearTimeout(window._mcTimer);
        window._mcTimer = setTimeout(() => { msg.textContent = ''; }, 5000);
    }
}
