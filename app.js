// Global Window Manager for EterniaOS
let zIndexCounter = 100;

function createWindow(title, contentHTML, width = '360px', height = '280px') {
    const desktop = document.getElementById('desktop') || document.body;
    
    // Create Window Container
    const win = document.createElement('div');
    win.className = 'os-window';
    win.style.cssText = `
        position: absolute;
        top: calc(50% - ${parseInt(height)/2}px + ${(Math.random() * 40 - 20)}px);
        left: calc(50% - ${parseInt(width)/2}px + ${(Math.random() * 40 - 20)}px);
        width: ${width};
        height: ${height};
        background: #0b0f19;
        border: 1px solid var(--border-color, #38bdf8);
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px rgba(56, 189, 248, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: ${zIndexCounter++};
        font-family: inherit;
    `;

    // Window Titlebar
    const titlebar = document.createElement('div');
    titlebar.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: rgba(56, 189, 248, 0.08);
        border-bottom: 1px solid var(--border-color, #38bdf8);
        cursor: move;
        user-select: none;
    `;
    titlebar.innerHTML = `
        <span style="font-weight: bold; font-size: 0.85rem; color: var(--accent, #38bdf8);">${title}</span>
        <button class="close-btn" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; font-size: 0.9rem;">✕</button>
    `;

    // Window Body Content Area
    const body = document.createElement('div');
    body.style.cssText = `
        flex: 1;
        padding: 12px;
        overflow-y: auto;
        color: var(--text, #f8fafc);
        display: flex;
        flex-direction: column;
    `;
    body.innerHTML = contentHTML;

    win.appendChild(titlebar);
    win.appendChild(body);
    desktop.appendChild(win);

    // Bring to front on click
    win.addEventListener('mousedown', () => {
        win.style.zIndex = zIndexCounter++;
    });

    // Close button handler
    titlebar.querySelector('.close-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        win.remove();
    });

    // Dragging Logic
    let isDragging = false;
    let startX, startY;

    titlebar.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - win.offsetLeft;
        startY = e.clientY - win.offsetTop;
        win.style.zIndex = zIndexCounter++;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.left = `${e.clientX - startX}px`;
        win.style.top = `${e.clientY - startY}px`;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Master App Launch Handlers
window.launchApp = function(appName) {
    switch(appName) {
        case 'music': if (typeof openMusicPlayer === 'function') openMusicPlayer(); break;
        case 'tasks': if (typeof openTaskManager === 'function') openTaskManager(); break;
        case 'calculator': if (typeof openCalculator === 'function') openCalculator(); break;
        case 'notepad': if (typeof openNotepad === 'function') openNotepad(); break;
        case 'game': if (typeof openGame === 'function') openGame(); break;
        case 'gallery': if (typeof openGallery === 'function') openGallery(); break;
        case 'monitor': if (typeof openMonitor === 'function') openMonitor(); break;
        case 'clock': if (typeof openClock === 'function') openClock(); break;
        case 'terminal': if (typeof openTerminal === 'function') openTerminal(); break;
        default: console.log('App not found:', appName);
    }
};

// Global Boot Event Initializer
window.addEventListener('DOMContentLoaded', () => {
    console.log('EterniaOS Kernel initialized successfully.');
});