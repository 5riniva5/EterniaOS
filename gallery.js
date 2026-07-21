function openArtGallery() {
    const content = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 10px; text-align: center;">
            <div style="font-weight: bold; color: var(--accent);">Castle Grayskull Archives</div>
            <div style="flex: 1; width: 100%; background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); border-radius: 6px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 6px;">
                <p style="color: var(--muted); font-size: 0.9rem;">⚔️ [Wallpaper Viewer Ready]</p>
            </div>
            <div style="font-size: 0.75rem; color: var(--muted);">"By the Power of Grayskull!"</div>
        </div>
    `;
    createWindow('Art Gallery', content, '380px', '280px');
}