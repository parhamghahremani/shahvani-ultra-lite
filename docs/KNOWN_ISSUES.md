# Known Issues — Shahvani Ultra Lite

## Current Version: 3.5.4

---

## Unresolved Issues

### KI-001: Poster Image Downloaded by Browser
- **Status**: Won't Fix (Browser behavior)
- **Description**: Browser fetches `poster` attribute during HTML parsing, before userscript can react. Not video data, but counts as network request.
- **Workaround**: Disable `showPoster` setting if strict zero-download required.
- **Since**: v1.0.0

### KI-002: `beforescriptexecute` Firefox-Only
- **Status**: Known Limitation
- **Description**: Ad script blocking via `beforescriptexecute` only works in Firefox. Other browsers fall back to request blocking.
- **Impact**: Ad scripts may execute in Chrome/Edge before being blocked.
- **Since**: v3.2.0

### KI-003: Private Browsing IndexedDB Quota
- **Status**: Browser Limitation
- **Description**: Some browsers limit IndexedDB in private mode (Firefox: works, Chrome: may fail).
- **Workaround**: Settings fall back to localStorage.
- **Since**: v3.3.0

### KI-004: FAB Drag Vertical Axis Only
- **Status**: Design Decision
- **Description**: FAB only draggable vertically; horizontal position controlled by `side` setting (left/right).
- **Reason**: Prevents FAB from overlapping page content; simpler UX.
- **Since**: v3.1.0

### KI-005: Probe Requires `showVideoInfo: true`
- **Status**: By Design
- **Description**: `videoProbe: 'auto'` only works when `showVideoInfo` enabled. No UI to show probe results otherwise.
- **Reason**: Probe fetches size/duration; if badges hidden, no point fetching.
- **Since**: v3.5.4

### KI-006: No HLS/DASH Duration Probe
- **Status**: Deferred
- **Description**: Probe only parses MP4 (ftyp/moov) and EBML (WebM/MKV). HLS (.m3u8) and DASH (.mpd) not supported.
- **Impact**: Duration/size not shown for adaptive streams unless cached.
- **Since**: v3.5.4

---

## Fixed in Current Version

### FIXED: Video Downloads Despite Lock (v3.5.2 → v3.5.3)
- **Root Causes**:
  1. Late startup (waited for readystatechange)
  2. `preloadFirstNForDuration: 3` → `preload=metadata` on first 3 videos
  3. `fetchVideoSize` HEAD/Range for all videos
  4. `src` removal without `load()` call
  5. No browser guards
  6. `hashKey` with `Date.now()` → cache misses
- **Fixed in v3.5.3**: Simultaneous startup, true source removal + `load()`, browser guards, deterministic keys, removed preloadFirstNForDuration and fetchVideoSize from lock path.

### FIXED: Duplicate Video Numbering (v3.4.0 → v3.4.1 → v3.5.3)
- **Root Cause**: `app-forum-topic` renders videos twice (relative then absolute URLs)
- **Fixed**: `videoIndexMap` by `videoSrc` (v3.4.1), delayed numbering after window.load (v3.5.3)

### FIXED: Duration Not Showing Until Play (v3.5.1 → v3.5.2 → v3.5.3)
- **Root Cause**: Layer 3 (loadedmetadata on activation) only; no preload
- **v3.5.2**: `preloadFirstNForDuration` (caused downloads)
- **v3.5.3**: Cache (Layer 0) + probe auto — no forced preload

### FIXED: Unicode URLs Breaking IndexedDB (v3.5.0 → v3.5.1)
- **Root Cause**: `btoa()` fails on non-ASCII (Persian URLs)
- **Fixed**: `hashKey()` FNV-1a deterministic hash

### FIXED: Cache Keys Not Stable Across Sessions (v3.5.2 → v3.5.3)
- **Root Cause**: `hashKey` included `Date.now()`
- **Fixed**: Deterministic FNV-1a, `videoKeyUrl` origin+path

### FIXED: Infinite Mutation Loop (v3.5.2 → v3.5.3)
- **Root Cause**: Writing `preload=none` twice created new mutation records
- **Fixed**: `forceNoPreload()` only writes when value changes

---

## Won't Fix / Accepted Limitations

| Issue | Reason |
|-------|--------|
| Poster image request | Browser parses HTML before userscript runs; not video data |
| `beforescriptexecute` Firefox-only | No cross-browser equivalent; request blocking is fallback |
| HLS/DASH probe | Complex; shahvani.com primarily serves MP4 |
| Private browsing IndexedDB limits | Browser quota; localStorage fallback works |
| FAB horizontal drag | UX decision: side setting controls horizontal |
| No cloud sync | Privacy-first design; no external requests |

---

## Regression Watch List

| Area | Risk | Test |
|------|------|------|
| Video locking | Site changes player structure | TC-01, TC-02 |
| Probe auto mode | MP4 moov at end of large file | TC-04c |
| Numbering stability | app-forum-topic double render | TC-05 |
| Cache persistence | IndexedDB version upgrade | TC-03 |
| Settings migration | localStorage → IndexedDB | TC-10 |
| Mobile touch | Gesture detection | TC-11 |

---

## Reporting New Issues

When reporting:
1. **Version**: Exact version (e.g., 3.5.4)
2. **Browser**: Firefox/Chrome + version, Desktop/Android
3. **Userscript Manager**: Tampermonkey/Violentmonkey + version
4. **Steps**: Minimal reproduction
5. **Network Log**: DevTools → Network (filter media/fetch)
6. **Console**: Any errors
7. **Settings**: Export JSON from Data tab