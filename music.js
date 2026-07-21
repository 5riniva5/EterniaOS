function openMusicPlayer() {
    const content = `
        <div style="font-weight: bold; font-size: 1.05rem; color: var(--accent); margin-bottom: 8px;">⚔️ Power of Grayskull Jukebox</div>
        
        <!-- Track Selector Dropdown -->
        <select id="track-select" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; margin-bottom: 10px; cursor: pointer;">
            <option value="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3">1. He-Man Animated Series Theme</option>
            <option value="https://ia800504.us.archive.org/11/items/masters-of-the-universe-1987-soundtrack-bill-conti/01%20-%20Main%20Title%20-%20Masters%20of%20the%20Universe.mp3">2. 1987 Movie Main Title (Bill Conti)</option>
            <option value="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3">3. Castle Grayskull Ambient Theme</option>
            <option value="https://ia800504.us.archive.org/11/items/masters-of-the-universe-1987-soundtrack-bill-conti/01%20-%20Main%20Title%20-%20Masters%20of%20the%20Universe.mp3">4. Battle for Eternia Orchestral Mix</option>
            <option value="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3">5. Heroic Victory Fanfare</option>
        </select>
        
        <!-- Audio Element -->
        <audio id="heman-audio" controls style="width: 100%; margin-bottom: 12px;">
            <source id="audio-source" src="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>

        <!-- Volume Control Slider & Display -->
        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: var(--muted); background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
            <span>🔊 Volume</span>
            <input type="range" id="volume-slider" min="0" max="1" step="0.05" value="1.0" style="flex: 1; accent-color: var(--accent); cursor: pointer;">
            <span id="volume-text" style="font-family: monospace; color: var(--accent); min-width: 32px; text-align: right;">100%</span>
        </div>

        <div style="font-size: 0.75rem; color: var(--muted); text-align: center; margin-top: 10px;">"By the Power of Grayskull... You Have the Power!"</div>
    `;
    createWindow('Grayskull Jukebox', content, '420px', '280px');

    // Bind element logic safely after window rendering
    setTimeout(() => {
        const select = document.getElementById('track-select');
        const audio = document.getElementById('heman-audio');
        const source = document.getElementById('audio-source');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeText = document.getElementById('volume-text');

        if (select && audio && source) {
            select.addEventListener('change', (e) => {
                source.src = e.target.value;
                audio.load();
                audio.play().catch(err => console.log("Autoplay blocked:", err));
            });
        }

        if (audio && volumeSlider && volumeText) {
            // Default to max volume so it's clearly heard
            audio.volume = 1.0;
            volumeSlider.addEventListener('input', (e) => {
                const vol = parseFloat(e.target.value);
                audio.volume = vol;
                volumeText.innerText = `${Math.round(vol * 100)}%`;
            });
        }
    }, 100);
}