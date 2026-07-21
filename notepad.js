function openNotepad() {
    const content = `
        <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
            <!-- Formatting Toolbar -->
            <div style="display: flex; gap: 6px; padding-bottom: 6px; border-bottom: 1px solid var(--border-color);">
                <button onclick="noteFormat('bold')" style="padding: 4px 8px; background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.75rem;">B</button>
                <button onclick="noteFormat('italic')" style="padding: 4px 8px; background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-style: italic; font-size: 0.75rem;">I</button>
                <div style="flex: 1;"></div>
                <button onclick="clearNote()" style="padding: 4px 8px; background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">Clear</button>
                <button onclick="saveNote()" style="padding: 4px 10px; background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">Save</button>
            </div>
            <!-- Textarea Area -->
            <textarea id="notepad-area" placeholder="Type your clean notes here..." style="width: 100%; flex: 1; background: rgba(0,0,0,0.4); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; outline: none; resize: none; font-family: inherit; font-size: 0.9rem; line-height: 1.4;"></textarea>
            <!-- Status Footer -->
            <div id="notepad-status" style="font-size: 0.75rem; color: var(--muted); text-align: right;">Ready</div>
        </div>
    `;
    createWindow('Notepad', content, '380px', '280px');
}

function clearNote() {
    const area = document.getElementById('notepad-area');
    const status = document.getElementById('notepad-status');
    if (area) area.value = '';
    if (status) {
        status.innerText = 'Cleared';
        setTimeout(() => { status.innerText = 'Ready'; }, 1500);
    }
}

function saveNote() {
    const area = document.getElementById('notepad-area');
    const status = document.getElementById('notepad-status');
    if (area && status) {
        const text = area.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'eternia-note.txt';
        anchor.click();
        
        status.innerText = 'Saved to disk!';
        setTimeout(() => { status.innerText = 'Ready'; }, 2000);
    }
}

function noteFormat(type) {
    const area = document.getElementById('notepad-area');
    if (!area) return;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const selectedText = area.value.substring(start, end);
    
    let replacement = selectedText;
    if (type === 'bold') replacement = `**${selectedText}**`;
    if (type === 'italic') replacement = `*${selectedText}*`;
    
    area.value = area.value.substring(0, start) + replacement + area.value.substring(end);
    area.focus();
    area.setSelectionRange(start + 2, end + 2);
}