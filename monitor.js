function openSystemMonitor() {
    const content = `
        <div style="display: flex; flex-direction: column; gap: 12px; padding: 4px;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                    <span>CPU Usage</span>
                    <strong id="cpu-stat" style="color: var(--accent);">14%</strong>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div id="cpu-bar" style="width: 14%; height: 100%; background: var(--accent); transition: width 0.5s;"></div>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                    <span>Memory (RAM)</span>
                    <strong id="ram-stat" style="color: var(--accent);">1.2 GB / 4.0 GB</strong>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: 30%; height: 100%; background: #4a90e2;"></div>
                </div>
            </div>
            <div style="font-size: 0.8rem; color: var(--muted); margin-top: 10px; text-align: center;">Running Processes: 8 Active</div>
        </div>
    `;
    createWindow('System Monitor', content, '340px', '220px');

    const cpuInterval = setInterval(() => {
        const cpuStat = document.getElementById('cpu-stat');
        const cpuBar = document.getElementById('cpu-bar');
        if (!cpuStat || !cpuBar) {
            clearInterval(cpuInterval);
            return;
        }
        const randomUsage = Math.floor(Math.random() * 25) + 10;
        cpuStat.textContent = randomUsage + '%';
        cpuBar.style.width = randomUsage + '%';
    }, 2000);
}