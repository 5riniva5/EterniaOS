# EterniaOS ⚡ // 2026 He-Man Film Edition

## What’s New

- Added a full `Settings` app for theme, clock, sound, and display preferences
- Added timezone-aware clock synchronization for taskbar and desktop widget
- Added desktop icon drag-and-drop reordering and dock organization
- Added persistent `localStorage` settings for theme, layout, and clock configuration

## Overview

EterniaOS is a browser-based desktop experience built with vanilla HTML, CSS, and JavaScript. It presents a polished futuristic OS shell inspired by a He-Man film aesthetic, with draggable windows, a dock, desktop launchers, and multiple mini-apps.

The latest version includes a new `Settings` application, persistent visual preferences, interactive timezone-aware clock behavior, desktop icon reordering, and a live draggable clock widget.

## Key Features

- Browser desktop shell with draggable windows and a neon cyber theme
- Dock and desktop launchers for quick app access
- `Settings` app for theme, display, clock, audio, and system preferences
- Timezone-aware world clock that updates the taskbar clock and desktop widget
- Persistent settings saved in `localStorage`
- Drag-to-reorder desktop icons and dock organization
- Playable music app, monitor, calculator, gallery, notes, tasks, terminal, and arcade game

## Apps Included

- `Settings` — theme, appearance, clock timezone/format, sound, brightness, screen mode, and installed app management
- `Clock` — live world clock with timezone selection and a draggable desktop clock widget
- `Music` — playable synth-based music player
- `Monitor` — simulated system telemetry dashboard
- `Calculator` — calculator with expanded symbols and scientific math functions
- `Gallery` — visual media browsing app
- `Game` — arcade-style Skeletor defense game
- `Notes` — quick note-taking app
- `Tasks` — task manager app
- `Terminal` — terminal-style interface
- `Devlogs` — project progress and build notes
- `App Store` — install or manage desktop apps from the catalog

## File Breakdown

- `index.html` — main shell markup and taskbar layout
- `style.css` — theme, window styling, loader animation, and UI polish
- `app.js` — desktop launcher rendering, window management, drag/drop behavior, app registration, and settings persistence
- `theme.js` — theme palette management and custom theme application
- `clock.js` — timezone-aware clock rendering, taskbar clock sync, and draggable clock widget
- `music.js` — music player controls and audio playback logic
- `monitor.js` — simulated telemetry and system stats
- `game.js` — browser game logic
- `gallery.js` — gallery app UI and behavior
- `calculator.js` — calculator interface and calculation logic
- `notepad.js` — notes app functionality
- `tasks.js` — task manager UI and list behavior
- `terminal.js` — terminal simulation app

## Running Locally

1. Open the repository folder in a browser, or run a local server.
2. Start a simple HTTP server:

```bash
python3 -m http.server 8000
```

3. Open `http://127.0.0.1:8000/` in your browser.

## Notes

- The taskbar start button opens the `Settings` app.
- Theme and display settings are saved between sessions.
- Clock settings affect both the open clock app and the top-right desktop widget.
- Desktop icons can be reordered by dragging and dropping them.

## Live Demo

Visit: https://5riniva5.github.io/EterniaOS/
