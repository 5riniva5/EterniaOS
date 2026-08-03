function createDesktopClockWidget() {
    const existing = document.getElementById('desktop-clock-widget');
    if (existing) return existing;

    const widget = document.createElement('div');
    widget.id = 'desktop-clock-widget';
    widget.innerHTML = `
        <div id="desktop-clock-time" style="font-size: 1.15rem; font-weight: 700; color: var(--accent); letter-spacing: 0.04em;"></div>
        <div id="desktop-clock-date" style="font-size: 0.72rem; color: var(--muted); margin-top: 3px;"></div>
    `;
    widget.style.position = 'fixed';
    widget.style.right = '20px';
    widget.style.top = '20px';
    widget.style.zIndex = '18000';
    widget.style.padding = '12px 14px';
    widget.style.borderRadius = '16px';
    widget.style.background = 'rgba(7,16,31,0.82)';
    widget.style.border = '1px solid var(--border-color)';
    widget.style.backdropFilter = 'blur(14px)';
    widget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.35)';
    widget.style.cursor = 'move';
    widget.style.userSelect = 'none';
    document.body.appendChild(widget);

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    widget.addEventListener('mousedown', (event) => {
        dragging = true;
        offsetX = event.clientX - widget.offsetLeft;
        offsetY = event.clientY - widget.offsetTop;
    });

    document.addEventListener('mousemove', (event) => {
        if (!dragging) return;
        widget.style.left = `${event.clientX - offsetX}px`;
        widget.style.top = `${event.clientY - offsetY}px`;
        widget.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
    });

    return widget;
}

function openClock() {
    const timezoneOptions = [
        ['local', 'Local Time'],
        ['UTC', 'UTC / GMT'],
        ['America/Los_Angeles', 'Los Angeles (PST/PDT)'],
        ['America/Denver', 'Denver (MST/MDT)'],
        ['America/Chicago', 'Chicago (CST/CDT)'],
        ['America/New_York', 'New York (EST/EDT)'],
        ['America/Sao_Paulo', 'São Paulo'],
        ['Europe/London', 'London (GMT/BST)'],
        ['Europe/Paris', 'Paris (CET/CEST)'],
        ['Europe/Berlin', 'Berlin'],
        ['Africa/Cairo', 'Cairo'],
        ['Africa/Johannesburg', 'Johannesburg'],
        ['Asia/Dubai', 'Dubai'],
        ['Asia/Kolkata', 'Mumbai / Kolkata'],
        ['Asia/Singapore', 'Singapore'],
        ['Asia/Tokyo', 'Tokyo (JST)'],
        ['Asia/Seoul', 'Seoul'],
        ['Australia/Sydney', 'Sydney'],
        ['Pacific/Auckland', 'Auckland']
    ];

    const content = `
        <div style="display: flex; flex-direction: column; gap: 12px; height: 100%; font-family: monospace; align-items: center; justify-content: center; text-align: center;">
            <div style="display: flex; gap: 8px; width: 100%;">
                <select id="clock-tz" onchange="window.updateClockConfig()" style="flex: 1; padding: 6px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.75rem; cursor: pointer;">
                    ${timezoneOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}
                </select>
                <select id="clock-format" onchange="window.updateClockConfig()" style="padding: 6px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.75rem; cursor: pointer;">
                    <option value="12">12-Hour</option>
                    <option value="24">24-Hour</option>
                </select>
            </div>

            <div id="clock-display" style="font-size: 2.2rem; font-weight: bold; color: var(--accent); text-shadow: 0 0 15px var(--accent-glow); letter-spacing: 2px; padding: 10px 0;">
                00:00:00
            </div>

            <div id="clock-date" style="font-size: 0.85rem; color: var(--muted);">
                Loading date...
            </div>
        </div>
    `;
    createWindow('World Clock', content, '420px', '240px');
    createDesktopClockWidget();
    setTimeout(() => {
        const tzSelect = document.getElementById('clock-tz');
        const fmtSelect = document.getElementById('clock-format');
        if (tzSelect) tzSelect.value = window.currentTimeZone || localStorage.getItem('eternia_timezone') || 'local';
        if (fmtSelect) fmtSelect.value = window.currentHour12 === false ? '24' : '12';
        window.renderClockTick();
    }, 50);
}

window.updateClockConfig = function() {
    if (typeof window.renderClockTick === 'function') {
        window.renderClockTick();
    }
};

window.getClockDisplay = function(date, timeZone, hour12) {
    const tz = timeZone || 'local';
    const optionsTime = {
        timeZone: tz === 'local' ? undefined : tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: hour12
    };
    return new Intl.DateTimeFormat([], optionsTime).format(date);
};

window.getClockDate = function(date, timeZone) {
    const tz = timeZone || 'local';
    const optionsDate = {
        timeZone: tz === 'local' ? undefined : tz,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat([], optionsDate).format(date);
};

window.updateTaskbarClock = function(timeZone, hour12) {
    const taskbarClock = document.getElementById('taskbar-clock');
    if (!taskbarClock) return;
    const now = new Date();
    const tz = timeZone || window.currentTimeZone || 'local';
    const format24 = hour12 === undefined ? (window.currentHour12 !== false) : hour12;
    taskbarClock.textContent = `${window.getClockDisplay(now, tz, format24)} ${tz === 'local' ? '' : `• ${tz}`}`.trim();
};

window.updateDesktopClockWidget = function(timeZone, hour12) {
    const widget = document.getElementById('desktop-clock-widget');
    if (!widget) return;
    const now = new Date();
    const tz = timeZone || window.currentTimeZone || 'local';
    const format24 = hour12 === undefined ? (window.currentHour12 !== false) : hour12;
    const timeEl = document.getElementById('desktop-clock-time');
    const dateEl = document.getElementById('desktop-clock-date');
    if (timeEl) timeEl.textContent = window.getClockDisplay(now, tz, format24);
    if (dateEl) dateEl.textContent = window.getClockDate(now, tz);
};

window.renderClockTick = function() {
    const display = document.getElementById('clock-display');
    const dateDisplay = document.getElementById('clock-date');
    const tzSelect = document.getElementById('clock-tz');
    const fmtSelect = document.getElementById('clock-format');

    if (!display || !dateDisplay) return;

    const now = new Date();
    const tz = tzSelect ? tzSelect.value : 'local';
    const hour12 = fmtSelect ? fmtSelect.value === '12' : true;

    window.currentTimeZone = tz;
    window.currentHour12 = hour12;

    try {
        display.innerText = window.getClockDisplay(now, tz, hour12);
        dateDisplay.innerText = window.getClockDate(now, tz);
    } catch {
        display.innerText = now.toLocaleTimeString();
        dateDisplay.innerText = now.toDateString();
    }

    window.updateTaskbarClock(tz, hour12);
    window.updateDesktopClockWidget(tz, hour12);
};

if (!window.clockIntervalInitialized) {
    window.clockIntervalInitialized = true;
    setInterval(() => {
        if (document.getElementById('clock-display')) {
            window.renderClockTick();
        } else {
            window.updateTaskbarClock();
            window.updateDesktopClockWidget();
        }
    }, 1000);
}