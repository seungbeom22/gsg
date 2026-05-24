:root { --main-theme: #ff9500; }
body { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #F8F9FA; margin: 0; font-family: 'Arial', sans-serif; overflow: hidden; touch-action: none; }
.calculator { background-color: #ffffff; padding: 15px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 280px; }
#memory-indicator { font-size: 11px; color: #666; text-align: right; height: 15px; margin-bottom: 5px; }
#display { width: 100%; height: 50px; font-size: 24px; text-align: right; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box; }
.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
button { padding: 12px 0; font-size: 16px; cursor: pointer; border: none; border-radius: 8px; background-color: #e0e0e0; font-weight: bold; }
.operator { background-color: var(--main-theme); color: white; }
.btn-equal { grid-column: span 2; }
.btn-red { background-color: #ff3b30; color: white; }
.mem-btn { background-color: #555; color: white; font-size: 12px; }
/* 나머지 사이드 메뉴 스타일은 유지 */
.side-menu { height: 100%; width: 0; position: fixed; z-index: 10; top: 0; left: 0; background-color: #1c1c1e; overflow-x: hidden; transition: 0.5s; padding-top: 60px; }
.menu-content { padding: 20px; color: white; }
.closebtn { position: absolute; top: 0; right: 25px; font-size: 36px; cursor: pointer; }
.theme-buttons { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
