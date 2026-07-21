function openTerminal() {
    const content = `
        <div style="display: flex; flex-direction: column; height: 100%; background: #020408; font-family: monospace; color: #22c55e; padding: 10px; border-radius: 6px; box-sizing: border-box; overflow: hidden;">
            <div id="term-output" style="flex: 1; overflow-y: auto; font-size: 0.8rem; line-height: 1.5; white-space: pre-wrap; padding-right: 6px; scroll-behavior: smooth;">
ETERNIA-OS [Kernel v4.2.0-HIGH-PERF]
Type 'help' for system directives or 'matrix' for visual overrides.
            </div>
            <div style="display: flex; align-items: center; border-top: 1px solid rgba(34,197,94,0.3); padding-top: 8px; margin-top: 6px;">
                <span id="term-prompt" style="color: #38bdf8; margin-right: 8px; font-weight: bold;">root@eternia:/~$</span>
                <input type="text" id="term-input" onkeydown="window.handleTermInput(event)" style="flex: 1; background: transparent; border: none; color: #f8fafc; font-family: monospace; font-size: 0.8rem; outline: none;" autofocus spellcheck="false" autocomplete="off">
            </div>
        </div>
    `;
    createWindow('Eternia High-Performance Terminal', content, '520px', '340px');
    setTimeout(() => {
        const inp = document.getElementById('term-input');
        if (inp) inp.focus();
    }, 100);
}

// Terminal State Store
window.termState = {
    cwd: '/',
    history: [],
    historyIndex: -1
};

window.handleTermInput = function(e) {
    const inp = document.getElementById('term-input');
    const out = document.getElementById('term-output');
    if (!inp || !out) return;

    if (e.key === 'Enter') {
        const cmd = inp.value.trim();
        if (cmd) {
            window.termState.history.push(cmd);
            window.termState.historyIndex = window.termState.history.length;
        }

        out.innerHTML += `\nroot@eternia:${window.termState.cwd}$ ${cmd}\n`;
        inp.value = '';

        executeCommand(cmd, out);
        out.scrollTop = out.scrollHeight;
    } else if (e.key === 'ArrowUp') {
        if (window.termState.history.length > 0 && window.termState.historyIndex > 0) {
            window.termState.historyIndex--;
            inp.value = window.termState.history[window.termState.historyIndex];
        }
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (window.termState.history.length > 0 && window.termState.historyIndex < window.termState.history.length - 1) {
            window.termState.historyIndex++;
            inp.value = window.termState.history[window.termState.historyIndex];
        } else {
            window.termState.historyIndex = window.termState.history.length;
            inp.value = '';
        }
        e.preventDefault();
    }
};

function executeCommand(rawCmd, outElem) {
    const args = rawCmd.trim().split(' ');
    const cmd = args[0].toLowerCase();
    const param = args[1] || '';

    switch(cmd) {
        case 'help':
            outElem.innerHTML += `SYSTEM COMMANDS:\n  help        - Displays this help menu\n  matrix      - Toggles high-performance matrix neon grid\n  overclock   - Maximizes CPU clock frequency limits\n  clear       - Clears terminal output buffer\n  greyskull   - Invokes the Power of Grayskull\n  ls          - Lists virtual directory nodes\n  uname       - Prints kernel build specs\n  top         - Displays active system performance metrics\n  echo [txt]  - Echoes text back to console\n`;
            break;
        case 'matrix':
            const isDark = document.body.style.background.includes('radial');
            document.body.style.background = isDark ? '#06080c' : 'radial-gradient(circle, #022b14 0%, #06080c 100%)';
            outElem.innerHTML += `[OK] Matrix shader pipeline remapped successfully.\n`;
            break;
        case 'overclock':
            outElem.innerHTML += `[BOOST] Core voltage raised to 1.45V. CPU locked at 5.4 GHz. Cooling fans at maximum RPM.\n`;
            break;
        case 'greyskull':
            outElem.innerHTML += `⚡ BY THE POWER OF GRAYSKULL... THE WEB HAS THE POWER! ⚡\n`;
            break;
        case 'ls':
            outElem.innerHTML += `total 32 blocks\n drwxr-xr-x  2 root root  4096 Jul 21 12:11 apps\n -rw-r--r--  1 root root  1024 Jul 21 12:11 monitor.js\n -rw-r--r--  1 root root  2048 Jul 21 12:11 game.js\n -rw-r--r--  1 root root  1536 Jul 21 12:11 terminal.js\n`;
            break;
        case 'uname':
            outElem.innerHTML += `EterniaOS x86_64-GNU/Linux-WebCore 4.2.0-OP (High-Performance Build)\n`;
            break;
        case 'top':
            outElem.innerHTML += `Tasks: 14 total, 1 running, 13 sleeping. CPU: 4.8% usr, 1.2% sys. Mem: 1.24G / 8.00G.\n`;
            break;
        case 'echo':
            outElem.innerHTML += `${args.slice(1).join(' ')}\n`;
            break;
        case 'clear':
            outElem.innerHTML = `ETERNIA-OS [Kernel v4.2.0-HIGH-PERF]\n`;
            break;
        case '':
            break;
        default:
            outElem.innerHTML += `command not found: ${cmd}. Type 'help' for directives.\n`;
    }
}