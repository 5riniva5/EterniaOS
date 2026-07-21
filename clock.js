function openClock() {
    const content = `
        <div style="display: flex; flex-direction: column; gap: 12px; height: 100%; font-family: monospace; align-items: center; justify-content: center; text-align: center;">
            <!-- Timezone & Format Controls -->
            <div style="display: flex; gap: 8px; width: 100%;">
                <select id="clock-tz" onchange="window.updateClockConfig()" style="flex: 1; padding: 6px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.75rem; cursor: pointer;">
                    <option value="local">Local Time</option>
                    <option value="UTC">UTC / GMT</option>
                    <option value="America/New_York">New York (EST/EDT)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
                <select id="clock-format" onchange="window.updateClockConfig()" style="padding: 6px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.75rem; cursor: pointer;">
                    <option value="12">12-Hour</option>
                    <option value="24">24-Hour</option>
                </select>
            </div>

            <!-- Digital Clock Readout -->
            <div id="clock-display" style="font-size: 2.2rem; font-weight: bold; color: var(--accent); text-shadow: 0 0 15px var(--accent-glow); letter-spacing: 2px; padding: 10px 0;">
                00:00:00
            </div>

            <!-- Date & Status Footer -->
            <div id="clock-date" style="font-size: 0.85rem; color: var(--muted);">
                Loading date...
            </div>
        </div>
    `;
    createWindow('World Clock', content, '360px', '220px');
}

window.updateClockConfig = function() {
    // Triggers an immediate refresh when timezone or format options change
    if (typeof window.renderClockTick === 'function') {
        window.renderClockTick();
    }
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

    try {
        const optionsTime = {
            timeZone: tz === 'local' ? undefined : tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: hour12
        };

        const optionsDate = {
            timeZone: tz === 'local' ? undefined : tz,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        display.innerText = new Intl.DateTimeFormat([], optionsTime).format(now);
        dateDisplay.innerText = new Intl.DateTimeFormat([], optionsDate).format(now);
    } catch {
        display.innerText = now.toLocaleTimeString();
        dateDisplay.innerText = now.toDateString();
    }
};

// Start global ticker interval
if (!window.clockIntervalInitialized) {
    window.clockIntervalInitialized = true;
    setInterval(() => {
        if (document.getElementById('clock-display')) {
            window.renderClockTick();
        }
        // Also update system taskbar clock if present
        const topClock = document.getElementById('system-clock');
        if (topClock) {
            topClock.innerText = new Date().toLocaleTimeString();
        }
    }, 1000);
}