function openTaskManager() {
    const today = new Date().toISOString().split('T')[0];
    const content = `
        <div style="display: flex; flex-direction: column; gap: 12px; flex: 1; height: 100%; overflow-y: auto;">
            <!-- Mini Calendar View -->
            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px;">
                <div style="font-weight: bold; font-size: 0.85rem; color: var(--accent); margin-bottom: 6px; display: flex; justify-content: space-between;">
                    <span>📅 Schedule Planner</span>
                    <span style="color: var(--muted);">${today}</span>
                </div>
                <input type="date" id="cal-date" value="${today}" style="width: 100%; padding: 6px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.8rem; margin-bottom: 6px;">
                <input type="text" id="cal-event-input" placeholder="Add event for this date..." style="width: 100%; padding: 6px 10px; background: rgba(0,0,0,0.4); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.8rem; margin-bottom: 6px;">
                <button onclick="addCalendarEvent()" style="width: 100%; padding: 6px; background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 0.8rem;">Add to Calendar</button>
                <ul id="event-list" style="list-style: none; margin-top: 8px; display: flex; flex-direction: column; gap: 4px; max-height: 80px; overflow-y: auto;">
                    <li style="font-size: 0.75rem; color: var(--muted);">No scheduled events.</li>
                </ul>
            </div>

            <!-- Quest / Task Manager Section -->
            <div style="display: flex; flex-direction: column; flex: 1;">
                <div style="font-weight: bold; font-size: 0.85rem; color: var(--accent); margin-bottom: 6px;">📋 Active Quests</div>
                <div style="display: flex; gap: 6px; margin-bottom: 8px;">
                    <input type="text" id="task-input" placeholder="New quest..." style="flex: 1; padding: 6px 10px; background: rgba(0,0,0,0.4); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; font-size: 0.85rem;">
                    <button onclick="addTask()" style="padding: 6px 12px; background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-weight: bold;">+</button>
                </div>
                <ul id="task-list" style="list-style: none; display: flex; flex-direction: column; gap: 6px; flex: 1; overflow-y: auto;">
                    <li style="padding: 6px 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.85rem;">⚡ Defeat Skeletor</li>
                </ul>
            </div>
        </div>
    `;
    createWindow('Quest Log & Calendar', content, '360px', '420px');
}

function addTask() {
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');
    if (input && list && input.value.trim() !== '') {
        const li = document.createElement('li');
        li.style.cssText = 'padding: 6px 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;';
        li.innerHTML = `<span>${input.value.trim()}</span><button onclick="this.parentElement.remove()" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:0.8rem;">✕</button>`;
        list.appendChild(li);
        input.value = '';
    }
}

function addCalendarEvent() {
    const dateInput = document.getElementById('cal-date');
    const eventInput = document.getElementById('cal-event-input');
    const eventList = document.getElementById('event-list');
    
    if (dateInput && eventInput && eventList && eventInput.value.trim() !== '') {
        if (eventList.innerHTML.includes('No scheduled events.')) {
            eventList.innerHTML = '';
        }
        const li = document.createElement('li');
        li.style.cssText = 'font-size: 0.75rem; background: rgba(56,189,248,0.05); border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center;';
        li.innerHTML = `<span><b>[${dateInput.value}]</b> ${eventInput.value.trim()}</span><button onclick="this.parentElement.remove()" style="background:none; border:none; color:#ef4444; cursor:pointer;">✕</button>`;
        eventList.appendChild(li);
        eventInput.value = '';
    }
}