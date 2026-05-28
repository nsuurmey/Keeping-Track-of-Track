# Keeping Track of Track

A static web app for tracking the rolling schedule of a junior track meet in real time. No backend, no database — runs entirely on GitHub Pages.

## How it works

- The **spectator view** (`index.html`) auto-refreshes and shows what's running now, what's up next, and what's coming up.
- The **operator panel** (`operator.html`) is used by a single meet volunteer to advance the schedule as events finish.
- State is stored in the operator's browser `localStorage`. No server required.

## Setup for a new meet

1. Edit **`events.js`** — the only file you need to change:
   - Update `meetName`
   - Set `operatorPin` (4 digits — just a tap guard, not secure)
   - Replace the `EVENTS` array with your meet's event order

2. Deploy to GitHub Pages:
   - Push to the `main` branch (or your configured Pages branch)
   - Enable GitHub Pages in repo Settings → Pages → source: root

3. Share the spectator URL (e.g. `https://yourname.github.io/repo-name/`) with athletes and parents.

4. Open `operator.html` on the volunteer's phone, enter the PIN, and tap **Start Meet** when the first event begins.

## Local development

ES modules require a server — you can't open `index.html` directly via `file://` in Chrome/Firefox.

Start a local server with either:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

## File overview

| File | Purpose |
|---|---|
| `events.js` | Meet config and ordered event list — **edit this for each meet** |
| `app.js` | All state logic (pure functions, `localStorage` read/write) |
| `index.html` | Spectator view — public, no interaction needed |
| `operator.html` | Operator panel — PIN-protected |
| `style.css` | All styles |

## Operator controls

| Button | What it does |
|---|---|
| **Start Meet** | Marks event 1 as running |
| **✓ Mark Complete** | Advances: current → done, next → running |
| **← Undo** | Reverses the last advance (one level only) |
| **⏭ Skip** | Marks current event as Scratched and advances |
| **Reset Meet** | Clears all state (requires confirmation) |

## Notes

- **State is local** to the operator's browser. If the operator switches phones mid-meet, they'll need to fast-forward manually by tapping Mark Complete until they reach the correct event.
- **Scratched events** remain visible in the spectator list with a strikethrough and "Scratched" badge.
- The refresh interval for the spectator view defaults to 15 seconds (`refreshIntervalSeconds` in `events.js`). If the operator and a spectator are on the same device, the spectator tab updates instantly.
