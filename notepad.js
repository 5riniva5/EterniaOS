function openNotepad() {
    const content = `
        <textarea placeholder="Type your notes here..." style="width: 100%; flex: 1; background: rgba(0,0,0,0.3); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; padding: 10px; resize: none; font-family: inherit; height: 100%;"></textarea>
    `;
    createWindow('Notepad', content, '360px', '300px');
}