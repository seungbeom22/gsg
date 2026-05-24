function openMenu() { document.getElementById("side-menu").style.width = "250px"; document.getElementById("overlay").style.display = "block"; }
function closeMenu() { document.getElementById("side-menu").style.width = "0"; document.getElementById("overlay").style.display = "none"; }
function appendToDisplay(value) { document.getElementById('display').value += value; }
function clearDisplay() { document.getElementById('display').value = ''; }
function deleteLast() { let d = document.getElementById('display'); d.value = d.value.slice(0, -1); }
function calculate() { try { document.getElementById('display').value = eval(document.getElementById('display').value); } catch { document.getElementById('display').value = 'Error'; } }
function memory(op) { /* 메모리 기능 */ }
