// --- Window Manager & App Logic ---

function createWindow(title, contentHTML, width = '380px', height = '320px') {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.width = width;
    win.style.height = height;
    win.innerHTML = `
        <div class="window-header">
            <span>${title}</span>
            <button onclick="this.closest('.window').remove()">×</button>
        </div>
        <div class="window-body" style="padding: 12px; display: flex; flex-direction: column; gap: 10px; height: calc(100% - 36px); overflow-y: auto;">
            ${contentHTML}
        </div>
    `;
    document.body.appendChild(win);
    makeDraggable(win);
}

function makeDraggable(win) {
    const header = win.querySelector('.window-header');
    let isDragging = false, startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = win.offsetLeft;
        initialY = win.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        win.style.left = `${initialX + (e.clientX - startX)}px`;
        win.style.top = `${initialY + (e.clientY - startY)}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// --- Desktop Icon Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Clock in menu bar
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
            clockEl.textContent = `${timeStr} • ${dateStr}`;
        }, 1000);
    }

    // App Launchers mapping
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const appName = icon.dataset.app;
            if (appName === 'calculator') openCalculator();
            if (appName === 'notepad') openNotepad();
            if (appName === 'music') openMusicPlayer();
            if (appName === 'game') openGrayskullGame();
            if (appName === 'tasks') openTaskManager();
            if (appName === 'clock') openChronometer();
            if (appName === 'gallery') openArtGallery();
            if (appName === 'monitor') openSystemMonitor();
        });
    });
});