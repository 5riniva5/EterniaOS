function openGame() {
    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 100%;">
            <div style="display: flex; justify-content: space-between; width: 300px; font-size: 0.85rem; font-family: monospace; color: var(--muted);">
                <span>SCORE: <b id="snake-score" style="color: var(--accent);">0</b></span>
                <span style="color: var(--accent);">CONTROLS: ARROWS</span>
            </div>
            <canvas id="snake-canvas" width="300" height="300" style="background: rgba(0,0,0,0.6); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 0 15px var(--accent-glow);"></canvas>
            <div style="font-size: 0.7rem; color: var(--muted); text-align: center;">Eat glowing nodes to charge the grid!</div>
        </div>
    `;
    createWindow('Cyberpunk Snake', content, '350px', '390px');

    setTimeout(() => {
        const canvas = document.getElementById('snake-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const gridSize = 15;
        const tileCount = 20;
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 5, y: 5 };
        let dx = 1;
        let dy = 0;
        let score = 0;
        let gameInterval;

        function gameLoop() {
            update();
            if (isGameOver()) {
                clearInterval(gameInterval);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 18px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 10);
                ctx.fillStyle = '#f8fafc';
                ctx.font = '12px monospace';
                ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 15);
                return;
            }
            draw();
        }

        function update() {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                const scoreElem = document.getElementById('snake-score');
                if (scoreElem) scoreElem.innerText = score;
                generateFood();
            } else {
                snake.pop();
            }

            snake.unshift(head);
        }

        function generateFood() {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        }

        function isGameOver() {
            const head = snake[0];
            // Wall collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return true;
            // Self collision
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) return true;
            }
            return false;
        }

        function draw() {
            // Background grid clearing
            ctx.fillStyle = '#06080c';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw glowing food node
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#38bdf8';
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4);

            // Draw snake body with neon glow
            ctx.shadowColor = '#22c55e';
            snake.forEach((part, index) => {
                ctx.fillStyle = index === 0 ? '#4ade80' : '#22c55e';
                ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
            });
            ctx.shadowBlur = 0; // Reset shadow
        }

        // Key Controls
        function handleKeyDown(e) {
            if (['ArrowUp', 'KeyW'].includes(e.code) && dy === 0) { dx = 0; dy = -1; e.preventDefault(); }
            if (['ArrowDown', 'KeyS'].includes(e.code) && dy === 0) { dx = 0; dy = 1; e.preventDefault(); }
            if (['ArrowLeft', 'KeyA'].includes(e.code) && dx === 0) { dx = -1; dy = 0; e.preventDefault(); }
            if (['ArrowRight', 'KeyD'].includes(e.code) && dx === 0) { dx = 1; dy = 0; e.preventDefault(); }
        }

        window.addEventListener('keydown', handleKeyDown);
        gameInterval = setInterval(gameLoop, 100);
    }, 100);
}