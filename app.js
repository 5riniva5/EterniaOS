const bootScreen = document.getElementById('bootScreen');
const clockEl = document.getElementById('clock');
const windowContainer = document.getElementById('windowContainer');
const powerButton = document.getElementById('powerButton');
const powerDrop = document.getElementById('power-drop');
const dockButtons = document.querySelectorAll('.dock-item');
let topZ = 120;

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  clockEl.textContent = `${hours}:${mins} • ${date}`;
}

function hideBootScreen() {
  bootScreen.classList.add('hidden');
  setTimeout(() => (bootScreen.style.display = 'none'), 900);
}

function focusWindow(win) {
  const windows = document.querySelectorAll('.window');
  windows.forEach((el) => (el.style.zIndex = 90));
  win.style.zIndex = ++topZ;
}

function createWindow(options) {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.top = `${options.top || 120}px`;
  win.style.left = `${options.left || 120}px`;
  win.innerHTML = `
    <div class="window-header">
      <div class="window-controls">
        <div class="window-control control-close" title="Close"></div>
        <div class="window-control control-minimize" title="Minimize"></div>
        <div class="window-control control-maximize" title="Maximize"></div>
      </div>
      <div class="window-title">${options.title}</div>
      <div style="width: 46px;"></div>
    </div>
    <div class="window-body">
      ${options.tabs ? `<div class="tabs">${options.tabs
        .map(
          (tab, idx) => `<button class="tab${idx === 0 ? ' active' : ''}" data-tab="${tab.id}">${tab.label}</button>`
        )
        .join('')}</div>` : ''}
      <div class="tab-content">${options.content}</div>
    </div>
  `;

  windowContainer.appendChild(win);
  focusWindow(win);
  initWindowActions(win, options);
  if (options.tabs) {
    setupTabs(win, options.tabs);
  }
  return win;
}

function initWindowActions(win, options) {
  const header = win.querySelector('.window-header');
  const closeBtn = win.querySelector('.control-close');
  const minimizeBtn = win.querySelector('.control-minimize');
  const maximizeBtn = win.querySelector('.control-maximize');
  let dragOffset = { x: 0, y: 0 };
  let isDragging = false;

  header.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.window-control')) return;
    isDragging = true;
    focusWindow(win);
    dragOffset.x = e.clientX - win.offsetLeft;
    dragOffset.y = e.clientY - win.offsetTop;
    win.setPointerCapture(e.pointerId);
  });

  header.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    win.style.left = `${Math.max(16, Math.min(window.innerWidth - win.offsetWidth - 16, e.clientX - dragOffset.x))}px`;
    win.style.top = `${Math.max(70, Math.min(window.innerHeight - 120, e.clientY - dragOffset.y))}px`;
  });

  header.addEventListener('pointerup', () => {
    isDragging = false;
  });

  header.addEventListener('pointerleave', () => {
    isDragging = false;
  });

  win.addEventListener('mousedown', () => focusWindow(win));

  closeBtn.addEventListener('click', () => win.remove());
  minimizeBtn.addEventListener('click', () => (win.style.display = 'none'));
  maximizeBtn.addEventListener('click', () => win.classList.toggle('maximized'));

  if (options.onInit) options.onInit(win);
}

function setupTabs(win, tabs) {
  const tabButtons = win.querySelectorAll('.tab');
  const contentArea = win.querySelector('.tab-content');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const tab = tabs.find((t) => t.id === button.dataset.tab);
      if (tab) contentArea.innerHTML = tab.html;
    });
  });
}

function launchApp(app) {
  if (app === 'devlogs') {
    createWindow({
      title: 'Devlogs',
      tabs: [
        {
          id: 'log1',
          label: 'Blueprint',
          html: `<h3>Blueprint of Eternia</h3><p>The OS begins as a macOS-inspired desktop, fused with a cosmic Eternian palette. All structural elements are crafted to feel simultaneously sleek and enchanted.</p><p>The loading screen is a cinematic boot ritual, placing the Sword of Power at center stage before revealing the desktop.</p>`
        },
        {
          id: 'log2',
          label: 'Engineering',
          html: `<h3>Engineering Notes</h3><p>A lightweight window manager was created in vanilla JavaScript. Windows are draggable, resizable through maximize/minimize styling, and can stack above one another.</p><p>Tabbed content within the Devlogs app provides a clean narrative structure without relying on external UI frameworks.</p>`
        },
        {
          id: 'log3',
          label: 'Launch',
          html: `<h3>Launch Notes</h3><p>The dock animations, neon-blue glow, and lightning overlay were added as final polish. The OS opens immediately with no login barrier so testing begins instantly.</p><p>Additional enhancements can include extra Eternia apps, richer lore commands, and deeper wallpaper customization.</p>`
        }
      ],
      top: 110,
      left: 110
    });
  } else if (app === 'notepad') {
    createWindow({
      title: 'Eternia Notepad',
      content: `<textarea placeholder="Write your Eternian notes..."></textarea>`,
      top: 150,
      left: 190
    });
  } else if (app === 'terminal') {
    createWindow({
      title: 'Lore Terminal',
      content: `<div class="terminal-screen" id="terminalOutput">Welcome adventurer. Type <span class="inline-code">help</span> to begin.<br><span class="prompt">EterniaOS:~$</span> <span class="terminal-welcome">Awaiting command...</span></div><div class="terminal-input-wrap"><input class="terminal-input" id="terminalInput" placeholder="Type a command" autofocus /><button class="terminal-button" id="terminalSubmit">Run</button></div>`,
      top: 180,
      left: 260,
      onInit: (win) => setupTerminal(win)
    });
  } else if (app === 'theme') {
    triggerPowerPulse();
  }
}

function setupTerminal(win) {
  const output = win.querySelector('#terminalOutput');
  const input = win.querySelector('#terminalInput');
  const button = win.querySelector('#terminalSubmit');

  function appendLine(text) {
    const line = document.createElement('div');
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function processCommand(command) {
    const normalized = command.trim().toLowerCase();
    if (!normalized) return;
    appendLine(`<span class="prompt">EterniaOS:~$</span> ${command}`);
    const responses = {
      help: `Available commands: <span class="inline-code">help</span>, <span class="inline-code">heman</span>, <span class="inline-code">skeletor</span>, <span class="inline-code">power</span>.`,
      heman: `<strong>He-Man</strong> says: "I have the power!" The castle is the source of all Eternian magic.`,
      skeletor: `<strong>Skeletor</strong> snarls: "I will conquer Grayskull!" Beware his dark plots.`,
      power: `The Sword of Power hums. Lightning crackles through the interface as Grayskull awakens.`
    };

    if (responses[normalized]) {
      appendLine(responses[normalized]);
      if (normalized === 'power') triggerPowerPulse();
    } else {
      appendLine(`Command not found: ${command}. Type <span class="inline-code">help</span> for guidance.`);
    }
  }

  function runInput() {
    const value = input.value;
    if (!value.trim()) return;
    processCommand(value);
    input.value = '';
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runInput();
  });
  button.addEventListener('click', runInput);
}

function triggerPowerPulse() {
  document.body.classList.add('powered', 'shake');
  powerDrop.classList.add('active');
  setTimeout(() => document.body.classList.remove('powered'), 900);
  setTimeout(() => document.body.classList.remove('shake'), 700);
  setTimeout(() => powerDrop.classList.remove('active'), 850);
}

function init() {
  dockButtons.forEach((button) => {
    button.addEventListener('click', () => launchApp(button.dataset.app));
  });
  powerButton.addEventListener('click', triggerPowerPulse);
  updateClock();
  setInterval(updateClock, 1000);
  window.addEventListener('load', () => setTimeout(hideBootScreen, 2400));
}

init();
