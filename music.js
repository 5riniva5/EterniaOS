function openMusicPlayer() {
    const win = document.createElement('div');
    win.className = 'window';
    win.innerHTML = `
        <div class="window-header">
            <span>Grayskull Jukebox - He-Man OST</span>
            <button onclick="this.closest('.window').remove()">×</button>
        </div>
        <div class="window-body" style="padding: 12px; display: flex; flex-direction: column; gap: 10px; background: #1a1a1a; color: #f0f0f0;">
            <div style="font-weight: bold; font-size: 1.1rem; color: #d4af37;">⚔️ Power of Grayskull Jukebox</div>
            <select id="track-select" style="padding: 6px; background: #2a2a2a; color: #fff; border: 1px solid #444; border-radius: 4px;">
                <option value="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3">He-Man Animated Series Theme</option>
                <option value="https://ia800504.us.archive.org/11/items/masters-of-the-universe-1987-soundtrack-bill-conti/01%20-%20Main%20Title%20-%20Masters%20of%20the%20Universe.mp3">1987 Movie Main Title (Bill Conti)</option>
            </select>
            <audio id="heman-audio" controls style="width: 100%; margin-top: 6px;" autoplay>
                <source id="audio-source" src="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
            <div style="font-size: 0.85rem; color: #aaa; text-align: center;">"By the Power of Grayskull... You Have the Power!"</div>
        </div>
    `;
    document.body.appendChild(win);

    const select = win.querySelector('#track-select');
    const audio = win.querySelector('#heman-audio');
    const source = win.querySelector('#audio-source');

    select.addEventListener('change', (e) => {
        source.src = e.target.value;
        audio.load();
        audio.play();
    });
}