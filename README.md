# Shahvani Ultra Lite

Tampermonkey userscript for shahvani.com — performance-focused tap-to-load media, configurable UI, and resource management.

**Author:** parham  
**Homepage:** https://github.com/parhamghahremani  
**Version:** 3.6.6

## Features

| Feature | Description |
|---------|-------------|
| **Tap-to-load media** | Videos and iframes replaced with placeholders; load only on user tap |
| **Zero-download locking** | Video sources removed + native `load()` + browser guards; nothing downloads until click |
| **4-layer metadata detection** | IndexedDB cache → Page metadata → Range probe → Video element `loadedmetadata` |
| **Optional size/duration probe** | `off` (default, zero network) / `cache` (local only) / `auto` (IntersectionObserver + capped Range) |
| **Performance profiles** | Compatible / Balanced / Ultra — escalating optimizations |
| **Tabbed control panel** | Overview, Video, Frames, Page, Look, Data, Download (7 tabs) |
| **Theme Color system** | 8 presets (Teal, Midnight, Forest, Sunset, Monochrome, Ocean, Coral, Rose) — accent + optional surface tint |
| **Download tab** | Live size/duration/thumbnail per row, persistent cache (30 days), selection totals (duration + size), select/copy/download, works while script Off |
| **Unlock & Load All / Release** | Unlock only (no play), 30s gesture guard; Release stops all unlocked videos (playing or paused), cancels Unlock |
| **Saved videos list** | Bookmark icon per row, persistent across reloads, open in new tab, bulk actions (Alt+Shift+B/S) |
| **Live thumbnails for opened videos** | Android-friendly preview (cors/blob/plain stages) auto-caches as real thumbnail |
| **Video resume** | Position saved to IndexedDB on pause/pagehide, restored on next visit |
| **Manual resource release** | One-click release of paused videos + off-screen iframes |
| **Emergency mode** | Instantly pause all HTML videos, block deferred activation |
| **Diagnostics** | Long task monitoring, resource count, cleaned entries tracking, download manager diagnostics (handler, GM_* availability, last 25 errors) |
| **Detached node cleanup** | Memory leak prevention for SPA/AJAX content |
| **Bilingual EN/FA UI** | Full RTL support, accessibility attributes |
| **FAB with drag** | Floating action button, vertical drag, side preference saved |

## Installation

### Desktop Firefox
1. Install [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Click [Install Script](src/shahvani-ultra-lite.user.js) (raw file URL)
3. Tampermonkey will prompt to install

### Android Firefox
1. Install Firefox + Tampermonkey
2. Open raw script URL → Tampermonkey opens → Tap "Install"

## Configuration

Settings persist in `localStorage` (`shvUltraLite.settings.v3`) and IndexedDB (`shvUltraLiteDB.settings`):

```javascript
{
  profile: 'balanced',           // 'compatible' | 'balanced' | 'ultra'
  theme: 'system',               // 'system' | 'dark' | 'light'
  themeColor: 'default',         // 'default' | 'midnight' | 'forest' | 'sunset' | 'monochrome' | 'ocean' | 'coral' | 'rose'
  compact: false,                // compact panel mode
  showVideoInfo: true,           // show size/duration badges
  videoProbe: 'off',             // 'off' | 'cache' | 'auto'
  side: 'right',                 // FAB side: 'left' | 'right'
  fabY: 1,                       // FAB vertical position: 0=top...1=bottom (default: bottom)
  lang: 'fa',                    // 'en' | 'fa'
  lazyImages: true,              // lazy-load off-screen images
  showPlaceholders: true,        // show placeholders instead of hiding
  shortcuts: true,               // keyboard shortcuts (Alt+Shift+key)
  blockPopups: true              // block popups (window.open/alert/confirm/prompt)
}
```

Access via panel (FAB button ⚡ bottom-right) or edit directly in DevTools console.

## Profiles

| Profile | Effects | Images | Cards |
|---------|---------|--------|-------|
| **Compatible** | None | Eager (default) | No optimization |
| **Balanced** | Animation/transition duration → 0.001ms | Lazy + fetchpriority=low (off-screen) | No |
| **Ultra** | Same as Balanced | Same | `content-visibility: auto` on repeated cards |

## Panel Controls (8 Tabs)

### Overview Tab
- **Profile buttons** — switch performance profile
- **Status grid** — pending/active videos & iframes
- **Detail stats** — network resources, long tasks, cleaned entries, filtered ads
- **Emergency mode** — red button, pauses all videos, blocks tap-to-load
- **Unlock & Load All / Release** — Unlock only (no play), 8s gesture guard; Release stops all unlocked videos (playing or paused), cancels Unlock

### Media Tab
- **Load visible players** — activate placeholders currently on-screen
- **Load all pending** — activate all deferred media (with confirmation)
- **Pause all videos** — immediate pause of all HTML5 videos
- **Release inactive** — detach sources from paused videos + off-screen iframes

### Look Tab
- **Mode** — System / Dark / Light
- **Theme Color** — 8 presets: Teal, Midnight, Forest, Sunset, Monochrome, Ocean, Coral, Rose (accent + optional surface tint)
- **Compact mode** — smaller panel, hides descriptions
- **Video info badges** — toggle size/duration display
- **Video probe mode** — Off / Cache only / Auto (when showVideoInfo on)
- **FAB side** — Left / Right
- **Language** — English / Persian
- **Show poster** — Toggle poster in placeholder

### Data Tab
- **Resume positions** — view/clear saved video positions
- **Video metadata cache** — view/clear cached size/duration
- **Export/Import settings** — JSON backup/restore
- **Clear all data** — nuclear option

### Download Tab
- **Video list** — all videos on page in DOM order with same numbers as lock cards
- **Live info** — duration, size, and thumbnail land in the row the moment they are known
- **Persistent cache** — size, duration, poster, and small JPEG thumbnail cached per video (30 days)
- **Selection totals** — summed duration and size of selected videos shown next to counter (`Total: 4:45 · 4.5 MB`); incomplete items marked live
- **Selection** — checkboxes, Select all / Deselect all, counter updates live
- **Download Selected** — sends to Firefox download manager (shahvani.com) or Tampermonkey blob (up.shahvani.com) (500ms gap, >10 needs second tap); up.shahvani.com: blob → copy+tab; large files: GM_download as last resort
- **Failure visible** — if a download cannot start, red persistent message with manager error code (e.g., `not_succeeded`, `not_whitelisted`, `HTTP 403`)
- **Copy Selected Links** — one per line, fallback to manual copy box
- **Per-row actions** — Download / Copy icons with tooltips
- **Saved videos** — bookmark icon per row, opens saved list (Alt+Shift+B), bulk download/copy/unsave (Alt+Shift+S)
- **Works while script is Off** — reads from DOM, no lock engine needed
- **Auto size/duration lookup** — for every row, automatic HEAD → tiny Range → browser metadata (no button needed); cache-first on reload
- **Live thumbnails for opened videos** — Android-friendly preview (cors→blob→plain stages, max 2 active/40 kept) auto-caches as real thumbnail

### Frames Tab
- **Popup blocking** — toggle window.open/alert/confirm/prompt blocking
- **Resource cleaning** — toggle detached node cleanup

### Settings Tab
- **Version info** — current version, build date
- **Check for updates** — link to GitHub releases
- **Debug info** — internal state dump (includes `manager` block: handler, GM_* availability, downloadMode, last 25 errors)

## How It Works

1. **`@run-at document-start`** — injects CSS immediately, adds `shv-ultralite` class to `<html>`
2. **Simultaneous startup** — MutationObserver on `document` waits for `<html>`, then locks all videos instantly
3. **Video locking** — captures geometry (aspectRatio, poster), replaces with placeholder button, removes `src`/`<source src>`/`autoplay`/`poster`, sets `preload=none`, calls native `load()`
4. **Browser guards** — intercepts `load()`/`play()` on locked videos, forces `preload=none`, ignores `autoplay`
5. **Iframe deferral** — captures src/srcdoc, replaces with placeholder, sets `loading=lazy`
6. **Image optimization** — off-screen images get `loading=lazy` + `fetchpriority=low`
7. **MutationObserver** — watches for new media (`childList`) and attribute changes (`src`, `srcdoc`, `autoplay`)
8. **Play interception** — blocks non-user-initiated playback via `play` event capture
9. **On user click** — restores sources → HEAD for size cache (if probe enabled) → `preload=metadata` → play
10. **Optional probe** — `videoProbe: 'auto'` queues Range requests via IntersectionObserver, reads 16 KB header + 8 KB moov tail, cancels stream before video body downloads
11. **Auto size/duration lookup** — for every row in Download tab (and on video activation), automatic HEAD → tiny Range → browser metadata; cache-first on reload; retries up to 3 times; `up.shahvani.com` via `GM_xmlhttpRequest` (no CORS)
12. **Panel UI** — FAB creates floating panel with stats and controls

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| **3.6.6** | 2026-11-27 | Stability release: fixed playback seek bugs, saved videos sync across tabs, background activity stopped when panel closed, live preview reliability (cors→blob→plain, max 40, auto-releases), Unlock & Load All uses `preload=metadata` (no auto buffer), removed Ads tab & download method setting, removed seek-decode & Make Thumbnails button, purged black thumbnails, 45 dead translations removed, zero lint errors |
| **3.6.5** | 2026-11-25 | Fixed auto-download & data waste (removed elementDuration probe, no auto thumbnails, thumbnails only after user opens video), fixed Android black/delayed thumbnails (luminance check, sync decode, seek-to-decode), fixed Android missing thumbnails (tainted frames cached, frame rebuild enabled, mozPaintedFrames wait), **live preview for opened videos on Android** (max 2, on-screen only, auto-caches as real thumbnail), removed autoThumbs setting, diagnostics for thumbs |
| **3.6.4** | 2026-11-24 | Saved videos list (bookmark icon, Alt+Shift+B/S), sturdier thumbnails on Android (auto capture, crossOrigin fallback), fixed Android Firefox downloads (auto-detect Tampermonkey support, 20s timeout, fallback chain), download method setting (auto/browser/Tampermonkey), IndexedDB v4 with savedThumbs store, diagnostics for thumbs/downloads |
| **3.6.3** | 2026-11-24 | 11 keyboard shortcuts (Alt+Shift+keys), persistent cross-origin thumbnails (IndexedDB), per-page selection scope, direct download queue (no confirmation), parallel GM_download (Android 2/ Desktop 3), retry failed, circuit breaker, up.shahvani.com probe 24s total, @connect * for redirects |
| **3.6.2** | 2026-11-24 | Selection totals (duration + size) in Download tab, download failure visible with error codes, Diagnostics manager block, auto size/duration lookup for all rows (no button), cache-first with retry logic, up.shahvani.com downloads via GM_download/blob/fallback, Range probe guarded by Accept-Ranges |
| **3.6.1** | 2026-11-23 | Fixed lock-card size (734×413, 16:9), Download tab live info (size/duration/thumbnail), persistent cache 30 days, Release stops all unlocked videos, cancels Unlock, fixed Unlock busy state, fixed cache key consistency, Update URLs back (point to dist/) |
| **3.6.0** | 2026-11-22 | Download tab (select, copy links, native Firefox download), Unlock & Load All, Theme Color (8 presets replaces Accent+Preset), sessionStorage selection persistence, Migration from 3.5.x settings |
| **3.5.5** | 2026-11-19 | 7 bug fixes: aspect-ratio/min-height with !important, FAB vertical drag (fabY), theme preset persistence, inverted neumorphic option fixed, probe size for non-video files, probeActive counter leak, resume race condition; minor fixes: resume cleanup on finish, resume setting respect, fetch URL object fix, PiP exception, opacity slider debounce, MAX_CUSTOM_AD_HOSTS constant, Persian typo fix |
| **3.5.4** | 2026-11-18 | Optional probe (off/cache/auto), IntersectionObserver, MP4/EBML parsing, stream cancellation |
| **3.5.3** | 2026-11-18 | Zero-download guarantee, deterministic keys, browser guards, IndexedDB v2 resume |
| **3.5.2** | 2026-11-17 | preloadFirstNForDuration (removed in v3.5.3) |
| **3.5.1** | 2026-11-17 | IndexedDB videoMetadata cache, 4-layer detection, hashKey, domain profiles removed |
| **3.5.0** | 2026-11-17 | Author metadata, custom icon |
| **3.4.6** | 2026-11-14 | Constants, JSDoc, test functions |
| **3.4.5** | 2026-11-04 | Removed keyboard shortcuts, fixed duplicate video |
| **3.4.4** | 2026-11-04 | Removed video.load(), fixed numbering, lazy-load respect |
| **3.4.3** | 2026-11-04 | Duration fix, Range fallback, data-src support |
| **3.4.2** | 2026-11-04 | Duration immediate, metadata on release, dual badges |
| **3.4.1** | 2026-11-04 | videoIndexMap, metadata display, Persian translations |
| **3.4.0** | 2026-11-04 | Video numbering, metadata badges, inverted neumorphic |
| **3.3.0** | 2026-11-04 | IndexedDB, resume, profiles, shortcuts, themes |
| **3.2.0** | 2026-11-04 | v6 engine + v3 UI merge |
| **3.1.0** | 2026-11-04 | Neumorphic UI, i18n, FAB |
| **3.0.0** | 2026-11-03 | Tabbed panel, themes, compact mode, emergency mode, diagnostics, srcdoc support, detached cleanup |
| **2.0.0** | 2026-11-03 | Profiles, manual release, batch load, repeated cards, settings persistence |
| **1.0.0** | 2026-11-03 | Initial: tap-to-load video/iframe, ad filtering, FAB panel |

See [CHANGELOG.md](CHANGELOG.md) for details.

## Workspace Structure

```
shahvani-ultra-lite/
├── src/
│   └── shahvani-ultra-lite.user.js   # Current production (edit here)
├── versions/
│   ├── v1.0.0.user.js ... v3.5.4.user.js
├── docs/
│   ├── SPECIFICATION.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── CONFIGURATION_AND_PERMISSIONS.md
│   ├── COMPATIBILITY.md
│   ├── MANUAL_TEST_PLAN.md
│   ├── DEVELOPMENT_LOG.md
│   ├── DECISIONS.md
│   ├── KNOWN_ISSUES.md
│   └── REFERENCES.md
├── backups/
│   ├── imported-original/
│   ├── pre-change/
│   ├── full-snapshots/
│   ├── releases/
│   ├── git-bundles/
│   ├── checksums/
│   └── BACKUP_MANIFEST.md
├── tests/
├── .claude/
│   └── launch.json
├── CHANGELOG.md
├── README.md
├── PROJECT_STATUS.md
├── package.json
├── .gitignore
└── .git/
```

## Development

### Versioning Workflow
1. Edit `src/shahvani-ultra-lite.user.js`
2. Bump `@version` in metadata block + `VERSION` constant + `package.json` + `README.md`
3. Copy to `versions/vX.Y.Z.user.js`
4. Update `CHANGELOG.md`
5. Create backups (pre-change, ZIP, git bundle, update manifest)
5. `node --check src/shahvani-ultra-lite.user.js`
6. Manual test on shahvani.com (Firefox + Tampermonkey)
7. `git commit -am "vX.Y.Z: ..." && git tag vX.Y.Z`
8. User approval → `gh repo create parhamghahremani/shahvani-ultra-lite --private --source=. --push`

## Known Ad Hosts (Filtered)

```
doubleclick.net, googlesyndication.com, googleadservices.com,
adnxs.com, taboola.com, outbrain.com, popads.net,
propellerads.com, exoclick.com, juicyads.com, trafficjunky.net
```

Only these known hosts are filtered. Unknown iframes are never deleted.

## License

MIT — Educational/personal use. Respect site Terms of Service and local laws.