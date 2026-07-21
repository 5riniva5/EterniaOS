function openTaskManager() {
    const content = `
        <div style="display: flex; gap: 6px; margin-bottom: 10px;">
            <input type="text" id="task-input" placeholder="Add a new quest..." style="flex: 1; padding: 6px; background: rgba(0,0,0,0.4); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; outline: none;" />
            <button onclick="addTask()" style="padding: 6px 12px; background: var(--accent); color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Add</button>
        </div>
        <ul id="task-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto;">
        </ul>
    `;
    createWindow('Quest Log', content, '360px', '280px');
}

function addTask() {
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');
    
    if (!input || !list || !input.value.trim()) return;

    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '6px 8px';
    li.style.background = 'rgba(255,255,255,0.05)';
    li.style.border = '1px solid var(--border-color)';
    li.style.borderRadius = '4px';
    li.style.fontSize = '0.9rem';

    li.innerHTML = `
        <span style="word-break: break-all; flex: 1; margin-right: 8px;">${input.value}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: #ff8080; cursor: pointer; font-weight: bold;">✕</button>
    `;

    list.appendChild(li);
    input.value = '';
}