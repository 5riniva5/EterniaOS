let gameInterval = null;
let spawnInterval = null;

function openGrayskullGame() {
    const content = `
        <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; text-align: center;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--accent); padding: 4px 8px; background: rgba(0,0,0,0.4); border-radius: 4px;">
                <span>Score: <strong id="game-score">0</strong></span>
                <span>Time: <strong id="game-timer">30</strong>s</span>
            </div>
            
            <div id="game-arena" style="position: relative; flex: 1; background: rgba(0,0,0,0.6); border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; margin: 6px 0; cursor: crosshair; min-height: 180px;">
                <div id="game-start-prompt" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--text);">
                    <p style="margin-bottom: 8px;">Click targets to defend Grayskull!</p>
                    <button onclick="startGrayskullGame()" style="padding: 6px 14px; background: var(--accent); color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Start Game</button>
                </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--muted);">"I have the Power!"</div>
        </div>
    `;
    createWindow('Grayskull Defender', content, '420px', '320px');
}

function startGrayskullGame() {
    const arena = document.getElementById('game-arena');
    const startPrompt = document.getElementById('game-start-prompt');
    const scoreEl = document.getElementById('game-score');
    const timerEl = document.getElementById('game-timer');
    
    if (!arena) return;
    if (startPrompt) startPrompt.style.display = 'none';
    arena.innerHTML = '';

    let score = 0;
    let timeLeft = 30;
    if (scoreEl) scoreEl.textContent = score;
    if (timerEl) timerEl.textContent = timeLeft;

    if (gameInterval) clearInterval(gameInterval);
    if (spawnInterval) clearInterval(spawnInterval);

    gameInterval = setInterval(() => {
        timeLeft--;
        if (timerEl) timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(spawnInterval);
            arena.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--accent); font-size: 1.2rem; font-weight: bold;">Game Over! Score: ${score}</div>`;
        }
    }, 1000);

    spawnInterval = setInterval(() => {
        if (timeLeft <= 0) return;
        const target = document.createElement('div');
        target.textContent = '💀';
        target.style.position = 'absolute';
        target.style.fontSize = '1.8rem';
        target.style.cursor = 'pointer';
        target.style.left = Math.random() * (arena.clientWidth - 40) + 'px';
        target.style.top = Math.random() * (arena.clientHeight - 40) + 'px';
        target.style.userSelect = 'none';
        
        target.onclick = () => {
            score += 10;
            if (scoreEl) scoreEl.textContent = score;
            target.remove();
        };

        arena.appendChild(target);

        setTimeout(() => {
            if (target.parentElement) target.remove();
        }, 1500);
    }, 800);
}