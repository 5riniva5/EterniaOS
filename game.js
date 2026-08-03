function openGame() {
    const content = `
        <div style="display:flex;flex-direction:column;height:100%;gap:8px;width:100%;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-family:monospace;color:var(--muted);">
                <div>SCORE: <b id="si-score" style="color:var(--accent);">0</b></div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
                    <span id="si-level" style="font-size:0.8rem;color:var(--accent);">LEVEL 1 / 25</span>
                    <span id="si-best" style="font-size:0.8rem;color:#fbbf24;">BEST 0</span>
                    <button id="si-pause" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border-color);background:transparent;cursor:pointer;color:var(--text);">Pause</button>
                    <button id="si-restart" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border-color);background:transparent;cursor:pointer;color:var(--text);">Restart</button>
                    <label style="font-size:0.75rem;color:var(--muted);">Speed</label>
                    <input id="si-speed" type="range" min="40" max="200" step="10" value="100" style="width:110px;accent-color:var(--accent);">
                </div>
            </div>
            <canvas id="si-canvas" width="420" height="320" style="background: linear-gradient(#02040a,#051020); border:1px solid var(--border-color); border-radius:8px; box-shadow:0 0 20px var(--accent-glow);"></canvas>
            <div style="font-size:0.75rem;color:var(--muted);">Defend Eternia as <span style="color:var(--accent);">He-Man</span> — survive all 25 escalating waves!</div>
        </div>
    `;
    createWindow('He-Man Defense', content, '480px', '430px');

    setTimeout(() => {
        const canvas = document.getElementById('si-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const scoreEl = document.getElementById('si-score');
        const levelEl = document.getElementById('si-level');
        const bestEl = document.getElementById('si-best');
        const W = canvas.width;
        const H = canvas.height;
        const player = { x: W / 2, y: H - 28, w: 40, h: 14 };
        const maxLevels = 25;
        const storageKey = 'eternia_game_progress';
        let bullets = [];
        let enemyBullets = [];
        let enemies = [];
        const enemyW = 36;
        const enemyH = 20;
        const enemyGap = 12;
        let dir = 1;
        let score = 0;
        let lives = 3;
        let isPaused = false;
        let gameOverState = false;
        let tick = 0;
        let left = false;
        let right = false;
        let loopDelay = 35;
        let interval = null;
        let level = 1;
        let enemyStep = 0.9;
        let enemyFireGap = 58;
        let enemyBulletSpeed = 3;
        let highScore = 0;
        let bestLevel = 1;

        function loadProgress() {
            try {
                const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}');
                highScore = Number(parsed.highScore || 0);
                bestLevel = Number(parsed.bestLevel || 1);
            } catch (error) {
                highScore = 0;
                bestLevel = 1;
            }
        }

        function saveProgress() {
            try {
                localStorage.setItem(storageKey, JSON.stringify({ highScore, bestLevel }));
            } catch (error) {
                // Ignore storage issues
            }
        }

        function updateHud() {
            if (scoreEl) scoreEl.textContent = score;
            if (levelEl) levelEl.textContent = `LEVEL ${level} / ${maxLevels}`;
            if (bestEl) bestEl.textContent = `BEST ${highScore} • LV ${bestLevel}`;
        }

        function refreshHighScore() {
            loadProgress();
            updateHud();
        }

        function registerScoreProgress() {
            const currentBest = highScore;
            if (score > currentBest || (score === currentBest && level > bestLevel)) {
                highScore = score;
                bestLevel = level;
                saveProgress();
            }
            updateHud();
        }

        function updateDifficulty() {
            const sliderValue = parseInt(document.getElementById('si-speed').value || '100', 10);
            const sliderFactor = (sliderValue - 40) / 160;
            loopDelay = Math.max(24, 44 - Math.round(sliderFactor * 16));
            enemyStep = 0.75 + level * 0.04 + sliderFactor * 0.3;
            enemyFireGap = Math.max(22, 70 - Math.round(level * 1.8) - Math.round(sliderFactor * 10));
            enemyBulletSpeed = 2.2 + level * 0.08 + sliderFactor * 0.6;
        }

        function initEnemies() {
            enemies = [];
            const rowCount = Math.min(6, 2 + Math.floor((level - 1) / 4));
            const colCount = Math.min(8, 6 + Math.floor((level - 1) / 5));
            const topOffset = -((rowCount * (enemyH + enemyGap)) + 40);
            for (let r = 0; r < rowCount; r++) {
                for (let c = 0; c < colCount; c++) {
                    enemies.push({
                        x: 28 + c * (enemyW + enemyGap),
                        y: topOffset + r * (enemyH + enemyGap) + 15,
                        targetY: 24 + r * (enemyH + enemyGap),
                        alive: true,
                        entered: false
                    });
                }
            }
            dir = 1;
        }

        function drawPlayer() {
            ctx.fillStyle = '#00f3ff';
            ctx.fillRect(player.x - player.w / 2, player.y - player.h / 2, player.w, player.h);
            ctx.fillStyle = '#fff'; ctx.font = '12px monospace'; ctx.textAlign = 'center'; ctx.fillText('HE-MAN', player.x, player.y - 10);
        }

        function drawEnemies() {
            ctx.font = '16px monospace';
            enemies.forEach((en) => {
                if (!en.alive) return;
                ctx.fillStyle = '#7c3aed';
                ctx.fillRect(en.x, en.y, enemyW, enemyH);
                ctx.fillStyle = '#fff';
                ctx.fillText('☠', en.x + enemyW / 2, en.y + enemyH / 1.4);
            });
        }

        function fireBullet() { bullets.push({ x: player.x, y: player.y - 10, dy: -5.5 }); }
        function fireEnemyBullet() {
            const shooters = enemies.filter((en) => en.alive && en.entered);
            if (!shooters.length) return;
            const shooter = shooters[Math.floor(Math.random() * shooters.length)];
            enemyBullets.push({ x: shooter.x + enemyW / 2, y: shooter.y + enemyH, dy: enemyBulletSpeed });
        }

        function drawHUD() {
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fillRect(0, 0, W, 28);
            ctx.fillStyle = '#cbd5e1';
            ctx.font = '12px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`Lives: ${lives}`, 10, 18);
            ctx.textAlign = 'center';
            ctx.fillText(`Score: ${score}`, W / 2, 18);
            ctx.textAlign = 'right';
            ctx.fillText(`Level ${level}`, W - 10, 18);
        }

        function update() {
            if (isPaused || gameOverState) return;
            tick++;
            bullets.forEach((b) => { b.y += b.dy; });
            enemyBullets.forEach((b) => { b.y += b.dy; });
            const activeEnemies = enemies.filter((en) => en.alive);
            if (activeEnemies.length) {
                const allEntered = activeEnemies.every((en) => en.entered);
                if (!allEntered) {
                    activeEnemies.forEach((en) => {
                        if (!en.entered) {
                            en.y += 0.8 + level * 0.03;
                            if (en.y >= en.targetY) {
                                en.y = en.targetY;
                                en.entered = true;
                            }
                        }
                    });
                } else {
                    const leftMost = Math.min(...activeEnemies.map((en) => en.x));
                    const rightMost = Math.max(...activeEnemies.map((en) => en.x + enemyW));
                    if (rightMost + enemyStep * dir > W - 20 || leftMost + enemyStep * dir < 20) {
                        dir *= -1;
                        activeEnemies.forEach((en) => { en.y += 10 + Math.min(level, 12) * 0.4; });
                    } else {
                        activeEnemies.forEach((en) => { en.x += enemyStep * dir; });
                    }
                }
            }
            if (tick % enemyFireGap === 0) fireEnemyBullet();
            bullets = bullets.filter((b) => b.y > -10);
            enemyBullets = enemyBullets.filter((b) => b.y < H + 10);
            bullets.forEach((b) => {
                enemies.forEach((en) => {
                    if (!en.alive) return;
                    if (b.x > en.x && b.x < en.x + enemyW && b.y > en.y && b.y < en.y + enemyH) {
                        en.alive = false; b.hit = true; score += 100 + level * 10; updateHud();
                    }
                });
            });
            bullets = bullets.filter((b) => !b.hit);
            enemyBullets.forEach((b) => {
                if (b.x > player.x - player.w / 2 && b.x < player.x + player.w / 2 && b.y > player.y - player.h / 2 && b.y < player.y + player.h / 2) {
                    b.hit = true; lives -= 1;
                }
            });
            enemyBullets = enemyBullets.filter((b) => !b.hit);
            if (lives <= 0) {
                gameOverState = true;
                gameOver();
                return;
            }
            if (enemies.every((en) => !en.alive)) {
                gameOverState = true;
                winLevel();
            }
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#02040a';
            ctx.fillRect(0, 0, W, H);
            drawHUD();
            drawPlayer();
            drawEnemies();
            bullets.forEach((b) => { ctx.fillStyle = '#00f3ff'; ctx.fillRect(b.x - 2, b.y - 6, 4, 8); });
            enemyBullets.forEach((b) => { ctx.fillStyle = '#ff4f8e'; ctx.fillRect(b.x - 2, b.y - 6, 4, 8); });
        }

        function gameOver() {
            clearInterval(interval);
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = '#ff4f8e';
            ctx.font = 'bold 24px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('YOU DIED', W / 2, H / 2 - 8);
            ctx.fillStyle = '#fff';
            ctx.font = '12px monospace';
            ctx.fillText(`Final Score: ${score}`, W / 2, H / 2 + 18);
            registerScoreProgress();
            if (typeof window.showNotification === 'function') {
                const prevBest = highScore;
                window.showNotification('Game Over', `Score: ${score} • Best ${prevBest}`);
            }
        }

        function winLevel() {
            clearInterval(interval);
            if (level >= maxLevels) {
                ctx.fillStyle = 'rgba(0,0,0,0.72)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#34d399';
                ctx.font = 'bold 22px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('ALL 25 WAVES CLEARED', W / 2, H / 2);
                registerScoreProgress();
                if (typeof window.showNotification === 'function') {
                    window.showNotification('Victory', 'You defeated all 25 waves of Skeletor!');
                }
                return;
            }
            level += 1;
            updateHud();
            if (typeof window.showNotification === 'function') {
                window.showNotification(`Wave ${level}`, `Level ${level} incoming — the challenge grows.`);
            }
            startLevel(level);
        }

        function handleKeyDown(e) {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') { left = true; e.preventDefault(); }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') { right = true; e.preventDefault(); }
            if (e.code === 'Space') { if (!e.repeat) fireBullet(); e.preventDefault(); }
        }

        function handleKeyUp(e) {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') right = false;
        }

        function movementTick() { if (left) player.x -= 5; if (right) player.x += 5; player.x = Math.max(player.w / 2, Math.min(W - player.w / 2, player.x)); }

        function startLevel(nextLevel) {
            level = nextLevel;
            bullets = [];
            enemyBullets = [];
            initEnemies();
            gameOverState = false;
            tick = 0;
            left = false;
            right = false;
            isPaused = false;
            updateDifficulty();
            updateHud();
            startLoop();
            draw();
        }

        function resetGame() {
            score = 0;
            lives = 3;
            refreshHighScore();
            startLevel(1);
        }

        function startLoop() {
            clearInterval(interval);
            interval = setInterval(() => {
                if (!isPaused && !gameOverState) {
                    movementTick();
                    update();
                    draw();
                } else {
                    draw();
                }
            }, loopDelay);
        }

        const pauseBtn = document.getElementById('si-pause');
        const restartBtn = document.getElementById('si-restart');
        const speedInput = document.getElementById('si-speed');

        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
            draw();
        });
        restartBtn.addEventListener('click', resetGame);
        speedInput.addEventListener('input', () => {
            updateDifficulty();
            startLoop();
        });

        refreshHighScore();
        updateDifficulty();
        startLevel(1);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        const winElem = canvas.closest('.os-window');
        if (winElem) {
            const closeBtn = winElem.querySelector('.close-btn');
            if (closeBtn) closeBtn.addEventListener('click', () => { clearInterval(interval); window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); });
        }
    }, 100);
}