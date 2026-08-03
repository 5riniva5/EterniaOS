function openGallery() {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
            title: 'Castle Grayskull',
            caption: 'The fortress of power'
        },
        {
            src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
            title: 'Snake Mountain',
            caption: 'The lair of Skeletor'
        },
        {
            src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            title: 'Eternia Landscape',
            caption: 'A radiant fantasy world'
        },
        {
            src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
            title: 'Hero Portrait',
            caption: 'He-Man standing tall'
        }
    ];

    const content = `
        <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
                <span style="font-size: 0.8rem; color: var(--muted);">Eternia Gallery</span>
                <input type="file" id="gallery-file-input" accept="image/*" multiple style="display: none;" onchange="window.handleImageUpload(event)">
                <button onclick="document.getElementById('gallery-file-input').click()" style="padding: 4px 10px; background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">Upload Image</button>
            </div>

            <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; flex: 1; overflow-y: auto; padding-right: 4px;">
                ${images.map((img) => `
                    <div class="gallery-card" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; overflow:hidden;">
                        <img src="${img.src}" style="width:100%; height:120px; object-fit:cover; cursor:pointer;" class="gallery-img" alt="${img.title}">
                        <div style="padding:8px; font-size:0.8rem; color:var(--text); text-align:center;">${img.caption}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    createWindow('Eternia Image Matrix', content, '420px', '340px');
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

// Open clicked images in a fullscreen viewer
window.openImageViewer = function(src, title) {
    const content = `<div style="display:flex;align-items:center;justify-content:center;height:100%;"><img src="${src}" style="max-width:100%; max-height:100%; border-radius:8px; box-shadow:0 8px 40px rgba(0,0,0,0.7);"></div>`;
    createWindow(title || 'Image Viewer', content, '720px', '520px');
};

// Attach click handlers after gallery window renders
setTimeout(() => {
    document.addEventListener('click', (e) => {
        const el = e.target;
        if (el && el.classList && el.classList.contains('gallery-img')) {
            const src = el.src || el.getAttribute('src');
            const title = el.alt || 'Image';
            window.openImageViewer(src, title);
        }
    });
}, 200);