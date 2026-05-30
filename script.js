let memoryValue = 0;
let justCalculated = false;
let freshInput = false;

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
    if (document.getElementById("mySidenav").classList.contains("open")) {
        closeMenu();
    }
});

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-theme', color);
    const textColor = (color === '#000000') ? '#ffffff' : '#000000';
    document.documentElement.style.setProperty('--text-color', textColor);
    closeMenu();
}

// 숫자를 1000단위 쉼표 포맷
function formatDisplay(val) {
    if (val === '' || val === '오류') return val;
    let parts = String(val).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// 수식 문자열에서 숫자 토큰마다 쉼표 적용
function formatRawExpression(expr) {
    return expr.replace(/(\d+\.?\d*)/g, function(num) {
        let parts = num.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    });
}

// display의 raw 계산용 값 읽기
function getRaw() {
    let d = document.getElementById('display');
    return d.dataset.raw !== undefined ? d.dataset.raw : d.value.replace(/,/g, '');
}

function appendToDisplay(val) {
    let d = document.getElementById('display');
    let raw = getRaw();

    // M+/M-/= 직후 새 입력 시 초기화
    if (freshInput) {
        // 연산자면 이어서, 숫자면 새로 시작
        if (['+', '-', '*', '/'].includes(val)) {
            freshInput = false; // 연산자는 이전 결과에 이어붙임
        } else {
            raw = '';
            freshInput = false;
        }
    }

    if (raw === '0' || raw === '') {
        if (['+', '-', '*', '/'].includes(val)) {
            raw = '0' + val;
        } else {
            raw = val;
        }
    } else {
        raw += val;
    }

    d.dataset.raw = raw;
    d.value = formatRawExpression(raw);
    justCalculated = false;
}

function clearDisplay() {
    let d = document.getElementById('display');
    d.dataset.raw = '0';
    d.value = '0';
    freshInput = false;
    justCalculated = false;
}

function deleteLast() {
    let d = document.getElementById('display');
    let raw = getRaw();
    if (raw.length <= 1) {
        raw = '0';
    } else {
        raw = raw.slice(0, -1);
    }
    d.dataset.raw = raw;
    d.value = formatRawExpression(raw);
}

function calculate() {
    try {
        let d = document.getElementById('display');
        let raw = getRaw();
        let result = eval(raw.replace(/×/g, '*').replace(/÷/g, '/'));
        let resultStr = String(result);
        d.dataset.raw = resultStr;
        d.value = formatDisplay(result);
        justCalculated = true;
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

// 오른쪽 플로팅 메모리 뱃지
function showMemoryBadge(label, val) {
    let badge = document.getElementById('memory-badge');
    badge.innerHTML = '<span class="badge-label">' + label + '</span><span class="badge-val">' + formatDisplay(val) + '</span>';
    badge.classList.add('show');
    clearTimeout(window._badgeTimer);
    window._badgeTimer = setTimeout(() => badge.classList.remove('show'), 2000);
}

function memory(type) {
    let d = document.getElementById('display');
    let raw = getRaw();
    let v = parseFloat(raw.replace(/,/g, '')) || 0;

    if (type === 'M+') {
        memoryValue += v;
        showMemoryBadge('M+', memoryValue);
        freshInput = true;
    } else if (type === 'M-') {
        memoryValue -= v;
        showMemoryBadge('M−', memoryValue);
        freshInput = true;
    } else if (type === 'MR') {
        d.dataset.raw = String(memoryValue);
        d.value = formatDisplay(memoryValue);
        showToast('MR : ' + formatDisplay(memoryValue));
        freshInput = true;
    } else if (type === 'MC') {
        memoryValue = 0;
        showToast('메모리 초기화');
    }
}
