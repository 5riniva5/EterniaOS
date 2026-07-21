function openMonitor() {
    const content = `
        <div style="display: flex; flex-direction: column; gap: 12px; font-family: monospace; font-size: 0.85rem; height: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
                <span>CPU Usage</span>
                <span style="color: var(--accent); font-weight: bold;">14.2%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
                <span>Memory Allocation</span>
                <span style="color: var(--accent); font-weight: bold;">1.24 GB / 8.00 GB</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
                <span>Network Status</span>
                <span style="color: #22c55e; font-weight: bold;">Secure / Unblocked</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
                <span>Active Core</span>
                <span style="color: var(--accent); font-weight: bold;">Lunar OS v4.2</span>
            </div>
        </div>
    `;
    createWindow('System Monitor', content, '360px', '240px');
}