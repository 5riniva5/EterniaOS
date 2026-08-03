const dockApps = ['music', 'game', 'gallery', 'notes', 'terminal', 'appstore'];
const desktopApps = ['calculator', 'clock', 'settings', 'tasks', 'monitor', 'music', 'gallery', 'game', 'terminal', 'notes', 'appstore', 'devlogs'];
const appCatalog = [
    { id: 'settings', name: 'Settings', desc: 'Control theme, clock, volume, layout, and system options.', icon: 'settings' },
    { id: 'devlogs', name: 'Devlogs', desc: 'A living history of the build, with progress notes and milestones.', icon: 'devlogs' },
    { id: 'calculator', name: 'Calculator', desc: 'Fast arithmetic and scientific math for day-to-day work.', icon: 'calc' },
    { id: 'clock', name: 'Clock', desc: 'Live time, date, and a sleek digital widget.', icon: 'clock' },
    { id: 'tasks', name: 'Tasks', desc: 'Keep your mission list organized in orbit.', icon: 'tasks' },
    { id: 'monitor', name: 'Monitor', desc: 'A polished system status overview with live telemetry.', icon: 'monitor' },
    { id: 'notes', name: 'Notes', desc: 'A quick workspace for codex entries and ideas.', icon: 'notes' },
    { id: 'terminal', name: 'Terminal', desc: 'A neon command console for your digital operations.', icon: 'terminal' },
    { id: 'gallery', name: 'Gallery', desc: 'Browse visual memories in a refined media hub.', icon: 'gallery' },
    { id: 'music', name: 'Music', desc: 'A futuristic jukebox with playlists and audio controls.', icon: 'music' },
    { id: 'game', name: 'He-Man Defense', desc: 'Classic arcade shooting with Skeletor forces.', icon: 'game' }
];
let zIndexCounter = 100;

function appIconMarkup(id) {
    const specs = {
        music: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 4v10.2A2.2 2.2 0 1 1 6.8 12H7V6.5l7-1.5v8.2A2.2 2.2 0 1 1 11.8 12H12V5.2l-3 .7Z" fill="currentColor"/></svg>',
        game: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 8h14v8H5z" stroke="currentColor" stroke-width="1.7"/><path d="M8 11h2m4 0h2M9 9v4m6-2h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        gallery: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" stroke-width="1.7"/><path d="M8 15l2.5-3 2 2.5 3-4 2.5 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        notes: '<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 8h8M8 12h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        terminal: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 10l2 2-2 2M12 14h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        appstore: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 5h10l-2 4H9L7 5Zm0 6h10l-2 8H9l-2-8Z" fill="currentColor"/></svg>',
        calculator: '<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 8h8M8 12h8M8 16h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        tasks: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 10h8M8 14h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        monitor: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 18h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        devlogs: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 8h8M8 12h5M8 16h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        settings: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" stroke="currentColor" stroke-width="1.7"/><path d="M20.5 12h-2.2a6.3 6.3 0 0 0-.6-1.8l1.5-1.7-1.7-1.7-1.7 1.5A6.27 6.27 0 0 0 13.3 5.7V3.5h-2.6v2.2a6.27 6.27 0 0 0-2.7 1.1L6.3 6.3 4.6 8l1.5 1.7a6.3 6.3 0 0 0-.6 1.8H3.3v2.6h2.2c.1.6.3 1.2.6 1.8l-1.5 1.7 1.7 1.7 1.7-1.5c.8.5 1.8.9 2.7 1.1v2.2h2.6v-2.2c.9-.2 1.8-.6 2.7-1.1l1.7 1.5 1.7-1.7-1.5-1.7c.3-.5.5-1.1.6-1.8h2.2v-2.6Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    return specs[id] || specs.appstore;
}

function getAppLabel(id) {
    const entry = appCatalog.find((app) => app.id === id);
    return entry ? entry.name : id;
}

function renderDesktopLaunchers() {
    const grid = document.getElementById('desktop-grid');
    if (!grid) return;
    grid.innerHTML = '';
    desktopApps.forEach((id) => {
        const btn = document.createElement('div');
        btn.className = 'desktop-icon';
        btn.setAttribute('data-app', id);
        btn.draggable = true;
        btn.onclick = () => launchApp(id);
        btn.innerHTML = `<span>${appIconMarkup(id)}</span><span>${getAppLabel(id)}</span>`;
        btn.addEventListener('dragstart', (event) => {
            btn.classList.add('dragging');
            event.dataTransfer.setData('text/plain', id);
        });
        btn.addEventListener('dragend', () => btn.classList.remove('dragging'));
        btn.addEventListener('dragover', (event) => event.preventDefault());
        btn.addEventListener('drop', (event) => {
            event.preventDefault();
            const sourceApp = event.dataTransfer.getData('text/plain');
            moveDesktopItem(sourceApp, id);
        });
        grid.appendChild(btn);
    });
}

function moveDesktopItem(from, to) {
    const fromIndex = desktopApps.indexOf(from);
    const toIndex = desktopApps.indexOf(to);
    if (fromIndex < 0 || toIndex < 0) return;
    const [item] = desktopApps.splice(fromIndex, 1);
    desktopApps.splice(toIndex, 0, item);
    renderDesktopLaunchers();
}

function renderDock() {
    const dock = document.getElementById('taskbar-icons');
    if (!dock) return;
    dock.innerHTML = '';
    dockApps.forEach((id) => {
        const item = document.createElement('div');
        item.className = 'dock-item';
        item.draggable = true;
        item.dataset.app = id;
        item.innerHTML = appIconMarkup(id);
        item.title = getAppLabel(id);
        item.addEventListener('dragstart', (event) => {
            item.classList.add('dragging');
            event.dataTransfer.setData('text/plain', id);
        });
        item.addEventListener('dragend', () => item.classList.remove('dragging'));
        item.addEventListener('click', () => launchApp(id));
        dock.appendChild(item);
    });
}

function moveDockItem(from, to) {
    const fromIndex = dockApps.indexOf(from);
    const toIndex = dockApps.indexOf(to);
    if (fromIndex < 0 || toIndex < 0) return;
    const [item] = dockApps.splice(fromIndex, 1);
    dockApps.splice(toIndex, 0, item);
    renderDock();
}

function createWindow(title, contentHTML, width = '360px', height = '280px') {
    const desktop = document.getElementById('desktop') || document.body;
    const win = document.createElement('div');
    win.className = 'os-window';
    const w = parseInt(width, 10) || 360;
    const h = parseInt(height, 10) || 280;
    win.dataset.id = `win-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    win.style.width = `${w}px`;
    win.style.height = `${h}px`;
    win.style.left = `calc(50% - ${w / 2}px + ${Math.random() * 36 - 18}px)`;
    win.style.top = `calc(50% - ${h / 2}px + ${Math.random() * 36 - 18}px)`;
    win.style.zIndex = zIndexCounter++;

    const titlebar = document.createElement('div');
    titlebar.className = 'titlebar';
    titlebar.innerHTML = `<span class="title">${title}</span><div class="controls"><button class="minimize-btn" title="Minimize">—</button><button class="maximize-btn" title="Maximize">▢</button><button class="close-btn" title="Close">✕</button></div>`;

    const body = document.createElement('div');
    body.className = 'body';
    body.innerHTML = contentHTML;

    win.appendChild(titlebar);
    win.appendChild(body);
    desktop.appendChild(win);

    function bringToFront() { win.style.zIndex = zIndexCounter++; }
    win.addEventListener('mousedown', bringToFront);

    titlebar.querySelector('.close-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        const tile = document.querySelector(`#taskbar-icons .taskbar-tile[data-wid="${win.dataset.id}"]`);
        if (tile) tile.remove();
        win.remove();
    });

    titlebar.querySelector('.minimize-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        win.style.display = 'none';
        const dock = document.getElementById('taskbar-icons');
        if (dock) {
            const tile = document.createElement('div');
            tile.className = 'taskbar-tile';
            tile.dataset.wid = win.dataset.id;
            tile.innerHTML = `<span>${title}</span><span class="badge">•</span>`;
            tile.onclick = () => { win.style.display = 'flex'; bringToFront(); tile.remove(); };
            dock.appendChild(tile);
        }
    });

    titlebar.querySelector('.maximize-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        if (win.classList.contains('maximized')) {
            const prev = win.dataset.prevRect;
            if (prev) {
                const rect = JSON.parse(prev);
                win.style.left = `${rect.left}px`;
                win.style.top = `${rect.top}px`;
                win.style.width = `${rect.width}px`;
                win.style.height = `${rect.height}px`;
            }
            win.classList.remove('maximized');
        } else {
            win.dataset.prevRect = JSON.stringify({ left: parseFloat(win.style.left || '0'), top: parseFloat(win.style.top || '0'), width: parseFloat(win.style.width || '360'), height: parseFloat(win.style.height || '280') });
            win.style.left = '12px';
            win.style.top = '12px';
            win.style.width = 'calc(100vw - 24px)';
            win.style.height = 'calc(100vh - 80px)';
            win.classList.add('maximized');
        }
    });

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;
    titlebar.addEventListener('mousedown', (event) => {
        dragging = true;
        startX = event.clientX;
        startY = event.clientY;
        originX = win.offsetLeft;
        originY = win.offsetTop;
        bringToFront();
    });
    document.addEventListener('mousemove', (event) => {
        if (!dragging) return;
        win.style.left = `${originX + (event.clientX - startX)}px`;
        win.style.top = `${originY + (event.clientY - startY)}px`;
    });
    document.addEventListener('mouseup', () => { dragging = false; });

    return win;
}

window.launchApp = function(appName) {
    if (appName === 'appstore') return openAppStore();
    if (appName === 'theme') return openThemeManager();
    if (appName === 'music' && typeof openMusicPlayer === 'function') return openMusicPlayer();
    if (appName === 'tasks' && typeof openTaskManager === 'function') return openTaskManager();
    if (appName === 'calculator' && typeof openCalculator === 'function') return openCalculator();
    if (appName === 'notes' && typeof openNotepad === 'function') return openNotepad();
    if (appName === 'game' && typeof openGame === 'function') return openGame();
    if (appName === 'gallery' && typeof openGallery === 'function') return openGallery();
    if (appName === 'monitor' && typeof openMonitor === 'function') return openMonitor();
    if (appName === 'clock' && typeof openClock === 'function') return openClock();
    if (appName === 'terminal' && typeof openTerminal === 'function') return openTerminal();
    if (appName === 'settings' && typeof openSettings === 'function') return openSettings();
    window.showNotification('App not found', `${appName} is unavailable.`);
};

function openSettings() {
    const timezoneOptions = [
        ['local', 'Local Time'],
        ['UTC', 'UTC / GMT'],
        ['America/Los_Angeles', 'Los Angeles'],
        ['America/New_York', 'New York'],
        ['Europe/London', 'London'],
        ['Asia/Tokyo', 'Tokyo'],
        ['Australia/Sydney', 'Sydney']
    ];

    const content = `
        <div style="display:grid;gap:14px;font-family:monospace;">
            <section class="settings-section">
                <h3>Theme & Appearance</h3>
                <label>Theme
                    <select id="settings-theme" style="width:100%;padding:10px;border-radius:8px;background:rgba(255,255,255,0.06);color:var(--text);border:1px solid var(--border-color);">
                        <option value="aurora">Classic Neon</option>
                        <option value="nebula">Violet Pulse</option>
                    </select>
                </label>
                <label>Text size
                    <input id="settings-text-size" type="range" min="0.8" max="1.3" step="0.05" value="1" style="width:100%;">
                </label>
                <label>Icon size
                    <input id="settings-icon-size" type="range" min="24" max="48" step="2" value="34" style="width:100%;">
                </label>
            </section>
            <section class="settings-section">
                <h3>Clock & Sound</h3>
                <label>Timezone
                    <select id="settings-timezone" style="width:100%;padding:10px;border-radius:8px;background:rgba(255,255,255,0.06);color:var(--text);border:1px solid var(--border-color);">
                        ${timezoneOptions.map(([value,label]) => `<option value="${value}">${label}</option>`).join('')}
                    </select>
                </label>
                <label>Clock format
                    <select id="settings-clock-format" style="width:100%;padding:10px;border-radius:8px;background:rgba(255,255,255,0.06);color:var(--text);border:1px solid var(--border-color);">
                        <option value="12">12-Hour</option>
                        <option value="24">24-Hour</option>
                    </select>
                </label>
                <label>Volume
                    <input id="settings-volume" type="range" min="0" max="1" step="0.05" value="0.8" style="width:100%;">
                </label>
                <label>Audio Out
                    <select id="settings-audio-out" style="width:100%;padding:10px;border-radius:8px;background:rgba(255,255,255,0.06);color:var(--text);border:1px solid var(--border-color);">
                        <option value="tv">TV speakers</option>
                        <option value="bluetooth">Bluetooth</option>
                    </select>
                </label>
            </section>
            <section class="settings-section">
                <h3>Display</h3>
                <label>Brightness
                    <input id="settings-brightness" type="range" min="0.7" max="1.2" step="0.05" value="1" style="width:100%;">
                </label>
                <label>Screen mode
                    <select id="settings-screen-mode" style="width:100%;padding:10px;border-radius:8px;background:rgba(255,255,255,0.06);color:var(--text);border:1px solid var(--border-color);">
                        <option value="normal">Normal</option>
                        <option value="wide">Wide</option>
                        <option value="compact">Compact</option>
                    </select>
                </label>
            </section>
            <section class="settings-section">
                <h3>System</h3>
                <button id="settings-reset" style="width:100%;padding:10px;border-radius:8px;background:rgba(239,68,68,0.12);border:1px solid var(--danger);color:var(--text);">Restore factory settings</button>
            </section>
            <section class="settings-section">
                <h3>Installed Apps</h3>
                <div id="settings-app-list" style="display:grid;gap:8px;"></div>
            </section>
        </div>
    `;
    createWindow('Settings', content, '520px', '640px');

    setTimeout(() => {
        const themeSelect = document.getElementById('settings-theme');
        const textSize = document.getElementById('settings-text-size');
        const iconSize = document.getElementById('settings-icon-size');
        const timezoneSelect = document.getElementById('settings-timezone');
        const clockFormatSelect = document.getElementById('settings-clock-format');
        const volumeSlider = document.getElementById('settings-volume');
        const audioOut = document.getElementById('settings-audio-out');
        const brightness = document.getElementById('settings-brightness');
        const screenMode = document.getElementById('settings-screen-mode');
        const resetButton = document.getElementById('settings-reset');
        const appList = document.getElementById('settings-app-list');

        if (!themeSelect || !textSize || !iconSize || !timezoneSelect || !clockFormatSelect || !volumeSlider || !audioOut || !brightness || !screenMode || !resetButton || !appList) return;

        const load = () => {
            themeSelect.value = localStorage.getItem('eternia_theme') || 'aurora';
            textSize.value = localStorage.getItem('eternia_text_size') || '1';
            iconSize.value = localStorage.getItem('eternia_icon_size') || '34';
            timezoneSelect.value = localStorage.getItem('eternia_timezone') || 'local';
            clockFormatSelect.value = localStorage.getItem('eternia_clock_format') || '12';
            volumeSlider.value = localStorage.getItem('eternia_volume') || '0.8';
            audioOut.value = localStorage.getItem('eternia_audio_out') || 'tv';
            brightness.value = localStorage.getItem('eternia_brightness') || '1';
            screenMode.value = localStorage.getItem('eternia_screen_mode') || 'normal';
            applyUiSettings(textSize.value, iconSize.value, brightness.value, screenMode.value);
            window.applyTheme(themeSelect.value);
            window.currentTimeZone = timezoneSelect.value;
            window.currentHour12 = clockFormatSelect.value === '12';
            window.updateClockConfig();
            window.updateTaskbarClock();
            window.updateDesktopClockWidget();
            window.updateSystemVolume(parseFloat(volumeSlider.value));
            populateAppList(appList);
        };

        themeSelect.addEventListener('change', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_theme', value);
            window.applyTheme(value);
        });

        textSize.addEventListener('input', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_text_size', value);
            applyUiSettings(value, iconSize.value, brightness.value, screenMode.value);
        });

        iconSize.addEventListener('input', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_icon_size', value);
            applyUiSettings(textSize.value, value, brightness.value, screenMode.value);
        });

        timezoneSelect.addEventListener('change', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_timezone', value);
            window.currentTimeZone = value;
            window.updateClockConfig();
            window.updateTaskbarClock();
            window.updateDesktopClockWidget();
        });

        document.getElementById('settings-clock-format').addEventListener('change', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_clock_format', value);
            window.currentHour12 = value === '12';
            window.updateClockConfig();
            window.updateTaskbarClock();
            window.updateDesktopClockWidget();
        });

        volumeSlider.addEventListener('input', (event) => {
            const value = parseFloat(event.target.value);
            localStorage.setItem('eternia_volume', String(value));
            window.updateSystemVolume(value);
        });

        audioOut.addEventListener('change', (event) => {
            localStorage.setItem('eternia_audio_out', event.target.value);
            window.showNotification('Audio Output', `Output switched to ${event.target.value}.`);
        });

        brightness.addEventListener('input', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_brightness', value);
            applyUiSettings(textSize.value, iconSize.value, value, screenMode.value);
        });

        screenMode.addEventListener('change', (event) => {
            const value = event.target.value;
            localStorage.setItem('eternia_screen_mode', value);
            applyUiSettings(textSize.value, iconSize.value, brightness.value, value);
        });

        resetButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        });

        const populateAppList = (container) => {
            container.innerHTML = desktopApps.map((id) => {
                const app = appCatalog.find((app) => app.id === id);
                return `<div class="settings-app-row"><span>${app ? app.name : id}</span><div><button data-app="${id}" class="settings-app-open">Open</button><button data-app="${id}" class="settings-app-remove">Delete</button></div></div>`;
            }).join('');
            container.querySelectorAll('.settings-app-open').forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    const appId = event.target.dataset.app;
                    window.launchApp(appId);
                });
            });
            container.querySelectorAll('.settings-app-remove').forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    const appId = event.target.dataset.app;
                    if (appId === 'settings') return;
                    const index = desktopApps.indexOf(appId);
                    if (index >= 0) {
                        desktopApps.splice(index, 1);
                        renderDesktopLaunchers();
                        populateAppList(container);
                        window.showNotification('App Removed', `${getAppLabel(appId)} was removed from the desktop.`);
                    }
                });
            });
        };

        load();
    }, 60);
}

function applyUiSettings(textSize, iconSize, brightnessValue, screenMode) {
    document.documentElement.style.setProperty('--desktop-label-size', `${textSize}rem`);
    document.documentElement.style.setProperty('--icon-svg-size', `${iconSize}px`);
    document.body.style.filter = `brightness(${brightnessValue})`;
    const main = document.querySelector('.lunar-main');
    if (!main) return;
    if (screenMode === 'wide') {
        main.style.padding = '20px 40px';
    } else if (screenMode === 'compact') {
        main.style.padding = '12px 12px';
    } else {
        main.style.padding = '24px';
    }
}

window.updateSystemVolume = function(value) {
    window.systemVolume = value;
    const audio = document.querySelector('audio');
    if (audio) audio.volume = value;
};

window.openAppStore = function() {
    const cards = appCatalog.map((app) => {
        const installed = desktopApps.includes(app.id);
        return `
            <div class="app-store-card">
                <header>
                    <div>
                        <div class="app-tag">${app.id}</div>
                        <div style="font-size:1rem;font-weight:700;margin-top:3px;">${app.name}</div>
                    </div>
                    <div>${appIconMarkup(app.id)}</div>
                </header>
                <div style="color:var(--muted); font-size:0.9rem;">${app.desc}</div>
                <button onclick="installApp('${app.id}')">${installed ? 'Installed' : 'Install'}</button>
            </div>`;
    }).join('');
    createWindow('App Store', `<div style="display:grid;gap:12px;">${cards}</div>`, '420px', '460px');
}

window.installApp = function(appId) {
    if (!desktopApps.includes(appId)) {
        desktopApps.push(appId);
        if (!dockApps.includes(appId) && ['music','game','gallery','notes','terminal'].includes(appId)) {
            dockApps.splice(dockApps.length - 1, 0, appId);
        }
        renderDesktopLaunchers();
        renderDock();
        window.showNotification('App Installed', `${getAppLabel(appId)} was added to the desktop.`);
        if (typeof window.launchApp === 'function') window.launchApp(appId);
    } else {
        window.showNotification('Already Installed', `${getAppLabel(appId)} is already on your desktop.`);
    }
};

window.toggleNotificationCenter = function() {
    const nc = document.getElementById('notification-center');
    if (!nc) return;
    nc.style.display = nc.style.display === 'flex' ? 'none' : 'flex';
};

window.showNotification = function(title, message, ttl = 3500) {
    const nc = document.getElementById('notification-center');
    if (!nc) return;
    const card = document.createElement('div');
    card.className = 'notif';
    card.innerHTML = `<div style="font-weight:700;color:var(--accent);">${title}</div><div style="margin-top:6px;color:var(--muted);">${message}</div>`;
    nc.prepend(card);
    setTimeout(() => card.classList.add('show'), 10);
    const remove = () => {
        card.classList.remove('show');
        setTimeout(() => card.remove(), 200);
    };
    const timer = setTimeout(remove, ttl);
    card.addEventListener('click', () => { clearTimeout(timer); remove(); });
};

function loadSavedPreferences() {
    const theme = localStorage.getItem('eternia_theme') || 'aurora';
    const textSize = localStorage.getItem('eternia_text_size') || '1';
    const iconSize = localStorage.getItem('eternia_icon_size') || '34';
    const timezone = localStorage.getItem('eternia_timezone') || 'local';
    const volume = parseFloat(localStorage.getItem('eternia_volume') || '0.8');
    const brightness = localStorage.getItem('eternia_brightness') || '1';
    const screenMode = localStorage.getItem('eternia_screen_mode') || 'normal';

    window.applyTheme(theme);
    applyUiSettings(textSize, iconSize, brightness, screenMode);
    window.currentTimeZone = timezone;
    window.currentHour12 = localStorage.getItem('eternia_clock_format') !== '24';
    window.updateClockConfig();
    window.updateTaskbarClock();
    window.updateDesktopClockWidget();
    window.updateSystemVolume(volume);
}

window.addEventListener('DOMContentLoaded', () => {
    loadSavedPreferences();
    renderDesktopLaunchers();
    renderDock();
    const dock = document.getElementById('taskbar-icons');
    if (dock) {
        dock.addEventListener('dragover', (event) => event.preventDefault());
        dock.addEventListener('drop', (event) => {
            event.preventDefault();
            const appId = event.dataTransfer.getData('text/plain');
            if (!appId) return;
            const fromIndex = dockApps.indexOf(appId);
            const targetIndex = Array.from(dock.children).indexOf(event.target.closest('.dock-item'));
            if (fromIndex >= 0 && targetIndex >= 0) {
                moveDockItem(appId, dockApps[targetIndex]);
            }
        });
    }
    const desktopShell = document.getElementById('desktop-grid');
    if (desktopShell) {
        desktopShell.addEventListener('dragover', (event) => event.preventDefault());
        desktopShell.addEventListener('drop', (event) => {
            event.preventDefault();
            const appId = event.dataTransfer.getData('text/plain');
            if (!appId) return;
            if (dockApps.includes(appId)) {
                dockApps.splice(dockApps.indexOf(appId), 1);
                if (!desktopApps.includes(appId)) desktopApps.push(appId);
                renderDock();
                renderDesktopLaunchers();
            }
        });
    }
    window.showNotification('EterniaOS Ready', 'Cyber UI online. Launch apps from the dock or desktop.');
});
