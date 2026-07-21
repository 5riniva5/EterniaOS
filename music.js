function openMusicPlayer() {
    const content = `
        <div style="font-weight: bold; font-size: 1.05rem; color: var(--accent);">⚔️ Power of Grayskull Jukebox</div>
        <select id="track-select" style="padding: 8px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid var(--border-color); border-radius: 6px; outline: none;">
            <option value="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3">He-Man Animated Series Theme</option>
            <option value="https://ia800504.us.archive.org/11/items/masters-of-the-universe-1987-soundtrack-bill-conti/01%20-%20Main%20Title%20-%20Masters%20of%20the%20Universe.mp3">1987 Movie Main Title (Bill Conti)</option>
        </select>
        <audio id="heman-audio" controls style="width: 100%; margin-top: 6px;">
            <source id="audio-source" src="https://ia800903.us.archive.org/27/items/he-man-and-the-masters-of-the-universe-theme-song/He-Man%20and%20the%20Masters%20of%20the%20Universe%20Theme%20Song.mp3" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>
        <div style="font-size: 0.8rem; color: var(--muted); text-align: center; margin-top: auto;">"By the Power of Grayskull... You Have the Power!"</div>
    `;
    createWindow('Grayskull Jukebox', content, '400px', '220px');

    setTimeout(() => {
        const select = document.getElementById('track-select');
        const audio = document.getElementById('heman-audio');
        const source = document.getElementById('audio-source');
        if (select && audio && source) {
            select.addEventListener('change', (e) => {
                source.src = e.target.value;
                audio.load();
                audio.play();
            });
            audio.play().catch(() => {
                // Handles browser autoplay policies gracefully if user hasn't interacted yet
            });
        }
    }, 100);
}