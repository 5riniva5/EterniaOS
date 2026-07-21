function createWindow(title, contentHTML, width = '380px', height = '260px') {
    // Remove existing window of the same title if open
    const existing = document.getElementById(`window-${title.replace(/\s+/g, '')}`);
    if (existing) {
        existing.remove();
    }

    const win = document.createElement('div');
    win.id = `window-${title.replace(/\s+/g, '')}`;
    win.className = 'window';
    win.style.width = width;
    win.style.height = height;
    win.style.top = `${Math.random() * 60 + 80}px`;
    win.style.left = `${Math.random() * 100 + 100}px`;

    win.innerHTML = `
        <div class="window-header">
            <span>${title}</span>
            <button onclick="this.closest('.window').remove()">✕</button>
        </div>
        <div class="window-body" style="padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column;">
            ${contentHTML}
        </div>
    `;

    document.body.appendChild(win);
    makeDraggable(win);
}

function makeDraggable(element) {
    const header = element.querySelector('.window-header');
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
        
        // Bring to front
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 500);
        element.style.zIndex = 1000;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        element.style.left = `${initialX + dx}px`;
        element.style.top = `${initialY + dy}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}