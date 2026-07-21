function openGallery() {
    const content = `
        <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
            <!-- Upload Toolbar -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
                <span style="font-size: 0.8rem; color: var(--muted);">Add to Matrix:</span>
                <input type="file" id="gallery-file-input" accept="image/*" multiple style="display: none;" onchange="window.handleImageUpload(event)">
                <button onclick="document.getElementById('gallery-file-input').click()" style="padding: 4px 10px; background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">Upload Image</button>
            </div>

            <!-- Image Grid Container -->
            <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; flex: 1; overflow-y: auto; padding-right: 4px;">
                <div class="gallery-card" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; text-align: center; color: var(--muted); display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 6px;">
                    <span style="font-size: 1.5rem;">🏰</span>
                    <span style="font-size: 0.8rem;">Castle Grayskull</span>
                </div>
                <div class="gallery-card" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; text-align: center; color: var(--muted); display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 6px;">
                    <span style="font-size: 1.5rem;">🌋</span>
                    <span style="font-size: 0.8rem;">Snake Mountain</span>
                </div>
            </div>
        </div>
    `;
    createWindow('Eternia Image Matrix', content, '400px', '320px');
}

window.handleImageUpload = function(event) {
    const files = event.target.files;
    const grid = document.getElementById('gallery-grid');
    if (!files || !grid) return;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const card = document.createElement('div');
            card.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; position: relative; height: 110px;';
            card.innerHTML = `
                <img src="${e.target.result}" style="width: 100%; height: 80px; object-fit: cover;" alt="User Upload">
                <div style="font-size: 0.7rem; color: var(--text); padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;">${file.name}</div>
            `;
            grid.appendChild(card);
        };

        reader.readAsDataURL(file);
    }
};