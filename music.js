function openMusicPlayer() {
    const content = `
        <div style="font-weight: bold; font-size: 1.05rem; color: var(--accent); margin-bottom: 8px;">⚔️ Power of Grayskull Jukebox</div>
        <div id="music-status" style="font-size: 0.78rem; color: var(--muted); margin-bottom: 8px;">Ready to summon the soundtrack</div>
        <select id="track-select" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.5); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; outline: none; margin-bottom: 10px; cursor: pointer;"></select>

        <div style="display:flex; gap:8px; align-items:center; margin-bottom:10px;">
            <button id="prev-track" style="padding:6px 8px; border-radius:6px; border:1px solid var(--border-color); background:transparent; cursor:pointer;">⏮️</button>
            <button id="play-toggle" style="padding:6px 8px; border-radius:6px; border:1px solid var(--border-color); background:transparent; cursor:pointer;">▶️</button>
            <button id="next-track" style="padding:6px 8px; border-radius:6px; border:1px solid var(--border-color); background:transparent; cursor:pointer;">⏭️</button>
            <button id="mute-toggle" style="margin-left:auto; padding:6px 8px; border-radius:6px; border:1px solid var(--border-color); background:transparent; cursor:pointer;">🔊</button>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: var(--muted); background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
            <span>🔊 Volume</span>
            <input type="range" id="volume-slider" min="0" max="1" step="0.05" value="0.8" style="flex: 1; accent-color: var(--accent); cursor: pointer;">
            <span id="volume-text" style="font-family: monospace; color: var(--accent); min-width: 32px; text-align: right;">80%</span>
        </div>

        <div style="font-size: 0.75rem; color: var(--muted); text-align: center; margin-top: 10px;">"By the Power of Grayskull... You Have the Power!"</div>
    `;

    createWindow('Grayskull Jukebox', content, '420px', '300px');

    setTimeout(() => {
        const select = document.getElementById('track-select');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeText = document.getElementById('volume-text');
        const playToggle = document.getElementById('play-toggle');
        const nextBtn = document.getElementById('next-track');
        const prevBtn = document.getElementById('prev-track');
        const muteBtn = document.getElementById('mute-toggle');
        const statusEl = document.getElementById('music-status');

        if (!select || !volumeSlider || !volumeText || !playToggle || !nextBtn || !prevBtn || !muteBtn || !statusEl) return;

        const heManTracks = [
            { name: 'Castle Grayskull Intro', pattern: [440, 523, 659, 784, 659, 523, 440, 392] },
            { name: 'Battle of Eternia', pattern: [330, 392, 440, 392, 330, 294, 261, 330] },
            { name: 'He-Man Theme Echo', pattern: [523, 659, 784, 659, 523, 440, 392, 330] },
            { name: 'Skeletor Strikes', pattern: [220, 196, 165, 147, 165, 196, 220, 247] },
            { name: 'The Power of Grayskull', pattern: [392, 440, 523, 587, 659, 587, 523, 440] },
            { name: 'Battle Cat Charge', pattern: [261, 329, 392, 440, 392, 329, 261, 220] },
            { name: 'Eternia Skyline', pattern: [440, 523, 587, 659, 587, 523, 440, 392] },
            { name: 'Orbital Fortress', pattern: [293, 329, 392, 440, 392, 329, 293, 261] },
            { name: 'Heroic Victory', pattern: [523, 587, 659, 784, 659, 587, 523, 494] },
            { name: 'Mystic Forest', pattern: [392, 349, 329, 349, 392, 440, 523, 440] },
            { name: 'Thunder of the Castle', pattern: [330, 392, 440, 523, 440, 392, 330, 294] },
            { name: 'King of the Universe', pattern: [440, 494, 587, 659, 587, 494, 440, 392] },
            { name: 'Masters of the Universe', pattern: [392, 440, 523, 587, 659, 587, 523, 440] },
            { name: 'Moonlight on Eternia', pattern: [349, 392, 440, 523, 440, 392, 349, 329] },
            { name: 'The Sword of Power', pattern: [261, 293, 329, 392, 440, 392, 329, 293] },
            { name: 'Frosted Mountains', pattern: [220, 261, 293, 329, 392, 329, 293, 261] },
            { name: 'Shadows of Skeletor', pattern: [196, 220, 247, 220, 196, 165, 147, 165] },
            { name: 'Eternian Dawn', pattern: [329, 392, 440, 523, 440, 392, 329, 293] },
            { name: 'Warrior Parade', pattern: [440, 523, 587, 659, 587, 523, 440, 392] },
            { name: 'Castle Courtyard', pattern: [294, 329, 392, 440, 392, 329, 294, 261] },
            { name: 'The Sorceress Call', pattern: [392, 440, 523, 587, 523, 440, 392, 349] },
            { name: 'Storm over Eternia', pattern: [330, 392, 440, 523, 440, 392, 330, 293] },
            { name: 'Axe of Justice', pattern: [261, 329, 392, 440, 392, 329, 261, 220] },
            { name: 'Crown of Power', pattern: [440, 523, 659, 784, 659, 523, 440, 392] },
            { name: 'The Great Hall', pattern: [392, 440, 523, 587, 523, 440, 392, 349] },
            { name: 'Dawn of the Guardians', pattern: [330, 349, 392, 440, 392, 349, 330, 294] },
            { name: 'Riders of the Sky', pattern: [294, 329, 392, 440, 392, 329, 294, 261] },
            { name: 'The Crystal Chamber', pattern: [523, 587, 659, 784, 659, 587, 523, 494] },
            { name: 'For the Realm', pattern: [392, 440, 523, 587, 659, 587, 523, 440] },
            { name: 'The Dragon Throne', pattern: [330, 392, 440, 523, 440, 392, 330, 294] },
            { name: 'The Last Stand', pattern: [220, 247, 293, 329, 392, 329, 293, 247] },
            { name: 'Heroes of Eternia', pattern: [440, 494, 587, 659, 587, 494, 440, 392] },
            { name: 'Shield of Protection', pattern: [293, 329, 392, 440, 392, 329, 293, 261] }
        ];

        const state = window.__heManPlayer || {
            context: null,
            masterGain: null,
            timer: null,
            currentIndex: 0,
            volume: 0.8,
            isPlaying: false,
            step: 0
        };
        window.__heManPlayer = state;

        const buildOptions = () => {
            select.innerHTML = heManTracks.map((track, index) => `<option value="${index}">${index + 1}. ${track.name}</option>`).join('');
        };

        const ensureContext = () => {
            if (!state.context) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return null;
                state.context = new AudioCtx();
                state.masterGain = state.context.createGain();
                state.masterGain.connect(state.context.destination);
                state.masterGain.gain.value = state.volume;
            }
            return state.context;
        };

        const updateStatus = (message) => {
            statusEl.textContent = message;
        };

        const stopPlayback = () => {
            if (state.timer) {
                clearInterval(state.timer);
                state.timer = null;
            }
            state.isPlaying = false;
            playToggle.textContent = '▶️';
        };

        const playNote = (freq, duration, time) => {
            const ctx = ensureContext();
            if (!ctx || !state.masterGain) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);
            gain.gain.setValueAtTime(0.0001, time);
            gain.gain.exponentialRampToValueAtTime(state.volume * 0.22, time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
            osc.connect(gain);
            gain.connect(state.masterGain);
            osc.start(time);
            osc.stop(time + duration);
        };

        const playTrack = (index) => {
            const ctx = ensureContext();
            if (!ctx) {
                updateStatus('Audio not available in this browser');
                return;
            }
            const track = heManTracks[index];
            if (!track) return;
            stopPlayback();
            state.currentIndex = index;
            select.value = index;
            state.step = 0;
            state.isPlaying = true;
            playToggle.textContent = '⏸️';
            updateStatus(`Playing • ${track.name}`);
            const pattern = track.pattern || [];
            const stepMs = 320;
            const playStep = () => {
                if (!state.isPlaying) return;
                const note = pattern[state.step % pattern.length];
                const nextFreq = typeof note === 'number' ? note : note.freq;
                const duration = typeof note === 'number' ? 0.24 : (note.duration || 0.24);
                const now = state.context.currentTime;
                playNote(nextFreq, duration, now);
                state.step += 1;
            };
            playStep();
            state.timer = setInterval(playStep, stepMs);
            if (typeof window.showNotification === 'function') {
                window.showNotification('Now Playing', track.name);
            }
            try { localStorage.setItem('eternia_lastTrack', String(index)); } catch (err) {}
        };

        const loadSavedState = () => {
            try {
                const savedIndex = parseInt(localStorage.getItem('eternia_lastTrack'), 10);
                if (!Number.isNaN(savedIndex) && heManTracks[savedIndex]) {
                    state.currentIndex = savedIndex;
                    select.value = savedIndex;
                }
                const savedVol = parseFloat(localStorage.getItem('eternia_volume'));
                if (!Number.isNaN(savedVol)) {
                    state.volume = Math.max(0, Math.min(1, savedVol));
                    if (state.masterGain) state.masterGain.gain.value = state.volume;
                }
            } catch (err) {}
            volumeSlider.value = state.volume;
            volumeText.textContent = `${Math.round(state.volume * 100)}%`;
        };

        buildOptions();
        loadSavedState();

        select.addEventListener('change', (event) => {
            playTrack(parseInt(event.target.value, 10));
        });

        playToggle.addEventListener('click', () => {
            if (state.isPlaying) {
                stopPlayback();
                updateStatus('Paused');
            } else {
                playTrack(state.currentIndex);
            }
        });

        nextBtn.addEventListener('click', () => {
            const nextIndex = (state.currentIndex + 1) % heManTracks.length;
            playTrack(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            const prevIndex = (state.currentIndex - 1 + heManTracks.length) % heManTracks.length;
            playTrack(prevIndex);
        });

        volumeSlider.addEventListener('input', (event) => {
            const vol = parseFloat(event.target.value);
            state.volume = vol;
            if (state.masterGain) state.masterGain.gain.value = vol;
            volumeText.textContent = `${Math.round(vol * 100)}%`;
            try { localStorage.setItem('eternia_volume', String(vol)); } catch (err) {}
            if (vol > 0) {
                muteBtn.textContent = '🔊';
            }
        });

        muteBtn.addEventListener('click', () => {
            if (!state.masterGain) return;
            if (state.masterGain.gain.value > 0) {
                state.volume = state.masterGain.gain.value;
                state.masterGain.gain.value = 0;
                volumeSlider.value = 0;
                volumeText.textContent = '0%';
                muteBtn.textContent = '🔈';
            } else {
                state.masterGain.gain.value = state.volume || 0.8;
                volumeSlider.value = state.volume || 0.8;
                volumeText.textContent = `${Math.round((state.volume || 0.8) * 100)}%`;
                muteBtn.textContent = '🔊';
            }
        });

        playTrack(state.currentIndex);
    }, 100);
}