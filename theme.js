function openThemeManager() {
    const content = `
        <div style="display:grid;gap:12px;">
            <div class="app-store-card">
                <header>
                    <div>
                        <div class="app-tag">AURORA</div>
                        <div style="font-size:1rem;font-weight:700;margin-top:3px;">Classic Neon</div>
                    </div>
                    <div>☁️</div>
                </header>
                <div style="color:var(--muted); font-size:0.9rem;">The earlier dark shell with lime accents and blue glow.</div>
                <button onclick="applyTheme('aurora')">Apply</button>
            </div>
            <div class="app-store-card">
                <header>
                    <div>
                        <div class="app-tag">NEBULA</div>
                        <div style="font-size:1rem;font-weight:700;margin-top:3px;">Violet Pulse</div>
                    </div>
                    <div>🌌</div>
                </header>
                <div style="color:var(--muted); font-size:0.9rem;">Magenta and indigo tones for a richer sci-fi layout.</div>
                <button onclick="applyTheme('nebula')">Apply</button>
            </div>
        </div>
    `;
    createWindow('Themes', content, '420px', '320px');
}

function applyTheme(name) {
    const root = document.documentElement;
    const themes = {
        aurora: {
            '--bg': '#06080c',
            '--panel-bg': '#0b0f19',
            '--text': '#f8fafc',
            '--muted': '#94a3b8',
            '--accent': '#ddff88',
            '--accent-2': '#7dd3fc',
            '--accent-glow': 'rgba(56, 189, 248, 0.4)',
            '--border-color': 'rgba(56, 189, 248, 0.2)',
            '--danger': '#ef4444',
            '--success': '#34d399'
        },
        nebula: {
            '--bg': '#10051f',
            '--panel-bg': 'rgba(28, 10, 42, 0.92)',
            '--text': '#f8f5ff',
            '--muted': '#c7b5db',
            '--accent': '#c084fc',
            '--accent-2': '#f0abfc',
            '--accent-glow': 'rgba(192, 132, 252, 0.28)',
            '--border-color': 'rgba(192, 132, 252, 0.26)',
            '--danger': '#fb7185',
            '--success': '#34d399'
        }
    };
    const selected = themes[name] || themes.aurora;
    Object.entries(selected).forEach(([key, value]) => root.style.setProperty(key, value));
    window.showNotification('Theme Applied', `${name.charAt(0).toUpperCase() + name.slice(1)} palette is now active.`);
}

window.applyTheme = applyTheme;
window.openThemeManager = openThemeManager;

window.addEventListener('DOMContentLoaded', () => applyTheme('aurora'));
