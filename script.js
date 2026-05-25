// 기록을 저장할 배열
let lottoHistory = [];

function generateLotto() {
    const numbers = [];
    while(numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if(!numbers.includes(num)) numbers.push(num);
    }
    numbers.sort((a, b) => a - b);

    // 1. 현재 결과 표시
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    numbers.forEach((num, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.innerText = num;
            ball.style.backgroundColor = getBallColor(num);
            resultDiv.appendChild(ball);
        }, index * 100);
    });

    // 2. 기록 추가하기
    lottoHistory.push(numbers.join(', '));
    updateHistoryUI();
}

// 기록 UI 업데이트
function updateHistoryUI() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '<h3>📜 최근 추첨 기록</h3>';
    
    // 최근 5개만 보여주거나 전체를 보여줄 수 있습니다.
    lottoHistory.slice().reverse().forEach((item, index) => {
        if(index < 10) { // 최근 10개까지만 표시
            const p = document.createElement('p');
            p.className = 'history-item';
            p.innerText = `${lottoHistory.length - index}회차: [ ${item} ]`;
            historyDiv.appendChild(p);
        }
    });
}
