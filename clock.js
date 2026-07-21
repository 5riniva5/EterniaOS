function openChronometer() {
    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; text-align: center;">
            <div id="chrono-time" style="font-size: 2rem; font-weight: bold; color: var(--accent); font-family: monospace;">00:00:00</div>
            <div id="chrono-date" style="font-size: 0.9rem; color: var(--muted);"></div>
        </div>
    `;
    createWindow('Chronometer', content, '300px', '200px');

    const updateClock = () => {
        const timeEl = document.getElementById('chrono-time');
        const dateEl = document.getElementById('chrono-date');
        if (!timeEl || !dateEl) return;

        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString();
        dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    updateClock();
    setInterval(updateClock, 1000);
}