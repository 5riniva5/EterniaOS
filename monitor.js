function getMonitorNetworkStatus() {
    if (!navigator.onLine) {
        return { status: 'Offline', detail: 'No connection' };
    }

    const connection = navigator.connection || {};
    const effectiveType = connection.effectiveType || '4g';
    const downlink = connection.downlink ? `${connection.downlink.toFixed(0)} Mbps` : 'varied';
    return { status: 'Connected', detail: `${effectiveType.toUpperCase()} • ${downlink}` };
}

function getMonitorMemoryStats(cpuLoad) {
    const totalBase = navigator.deviceMemory || 8;
    let used = Math.max(0.6, Math.min(totalBase - 0.2, totalBase * (0.3 + (cpuLoad / 100) * 0.45)));

    if (window.performance && performance.memory) {
        used = performance.memory.usedJSHeapSize / (1024 * 1024 * 1024);
        const total = performance.memory.jsHeapSizeLimit / (1024 * 1024 * 1024);
        return { used, total, percent: Math.min(100, (used / total) * 100) };
    }

    return { used, total: totalBase, percent: Math.min(100, (used / totalBase) * 100) };
}

function formatMonitorUptime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

function openMonitor() {
    const startedAt = Date.now();
    let cpuLoad = 24;

    const content = `
        <div id="monitor-root" style="display: flex; flex-direction: column; gap: 10px; font-family: monospace; font-size: 0.84rem; height: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border-color);">
                <div>
                    <div style="color: var(--muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.16em;">CPU Load</div>
                    <div id="monitor-cpu" style="color: var(--accent); font-weight: bold; font-size: 1rem;">--</div>
                </div>
                <div style="width: 118px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.1); overflow: hidden;">
                    <div id="monitor-cpu-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, var(--accent), #60a5fa);"></div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border-color);">
                <div>
                    <div style="color: var(--muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.16em;">Memory</div>
                    <div id="monitor-memory" style="color: var(--accent); font-weight: bold; font-size: 1rem;">--</div>
                </div>
                <div style="width: 118px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.1); overflow: hidden;">
                    <div id="monitor-memory-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #22c55e, #34d399);"></div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span>Network</span>
                <span id="monitor-network" style="color: #22c55e; font-weight: bold;">--</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span>Uptime</span>
                <span id="monitor-uptime" style="color: var(--accent); font-weight: bold;">--</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span>Runtime</span>
                <span id="monitor-runtime" style="color: var(--muted); font-weight: bold;">--</span>
            </div>
        </div>
    `;

    const win = createWindow('System Monitor', content, '420px', '300px');
    const root = win.querySelector('#monitor-root');

    if (!root) return win;

    const cpuEl = root.querySelector('#monitor-cpu');
    const cpuBar = root.querySelector('#monitor-cpu-bar');
    const memoryEl = root.querySelector('#monitor-memory');
    const memoryBar = root.querySelector('#monitor-memory-bar');
    const networkEl = root.querySelector('#monitor-network');
    const uptimeEl = root.querySelector('#monitor-uptime');
    const runtimeEl = root.querySelector('#monitor-runtime');

    function updateMonitor() {
        cpuLoad = Math.max(8, Math.min(92, cpuLoad + (Math.random() - 0.5) * 16));
        const memoryStats = getMonitorMemoryStats(cpuLoad);
        const network = getMonitorNetworkStatus();

        cpuEl.textContent = `${cpuLoad.toFixed(1)}%`;
        cpuBar.style.width = `${cpuLoad}%`;
        memoryEl.textContent = `${memoryStats.used.toFixed(2)} GB / ${memoryStats.total.toFixed(2)} GB`;
        memoryBar.style.width = `${memoryStats.percent.toFixed(0)}%`;
        networkEl.textContent = network.status;
        networkEl.style.color = network.status === 'Offline' ? 'var(--danger)' : '#22c55e';
        uptimeEl.textContent = formatMonitorUptime(Date.now() - startedAt);

        const browserName = navigator.userAgentData?.brands?.[0]?.brand || 'Browser';
        const coreCount = navigator.hardwareConcurrency || 4;
        runtimeEl.textContent = `${browserName} • ${coreCount} cores • ${network.detail}`;
    }

    updateMonitor();
    const timer = setInterval(updateMonitor, 1000);
    win._monitorTimer = timer;

    const originalClose = win.querySelector('.close-btn');
    if (originalClose) {
        originalClose.addEventListener('click', () => clearInterval(timer), { once: true });
    }

    return win;
}