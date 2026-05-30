let memoryValue = 0;
let freshInput = false;
let memHistory = []; // { op, inputVal, total }

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
    if (freshInput) {
        if (['+', '-', '*', '/'].includes(val)) {
            freshInput = false;
        } else {
            raw = '';
            freshInput = false;
        }
    }
    if (raw === '0' || raw === '') {
        raw = ['+', '-', '*', '/'].includes(val) ? '0' + val : val;
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

// 메모리 히스토리 패널 업데이트
function updateMemoryPanel() {
    // 합계 업데이트
    document.getElementById('mem-total').innerHTML =
        '<span>합계</span>' + formatDisplay(memoryValue);

    // 기록 목록 (최신순, 최대 20개)
    let hist = document.getElementById('mem-history');
    hist.innerHTML = '';
    let entries = memHistory.slice().reverse().slice(0, 20);
    entries.forEach(function(e) {
        let el = document.createElement('div');
        el.className = 'mem-entry';
        el.innerHTML =
            '<span class="op">' + e.op + ' ' + formatDisplay(e.val) + '</span><br>' +
            '<span class="val">= ' + formatDisplay(e.total) + '</span>';
        hist.appendChild(el);
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
        updateMemoryPanel();
    } else if (type === 'M-') {
        memoryValue -= v;
        memHistory.push({ op: 'M−', val: v, total: memoryValue });
        freshInput = true;
        updateMemoryPanel();
    } else if (type === 'MR') {
        d.dataset.raw = String(memoryValue);
        d.value = formatDisplay(memoryValue);
        showToast('MR : ' + formatDisplay(memoryValue));
        freshInput = true;
    } else if (type === 'MC') {
        memoryValue = 0;
        memHistory = [];
        updateMemoryPanel();
        showToast('메모리 초기화');
    }
}
