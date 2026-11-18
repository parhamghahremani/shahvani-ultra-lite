# Development Log — Shahvani Ultra Lite

## 2026-11-18 — v3.5.4 Released

**Author**: parham  
**Type**: Feature + Polish

### Added
- Optional size/duration probe (`videoProbe` setting) with three modes: `off` (default), `cache`, `auto`
- IntersectionObserver integration for probe queue (200px margin)
- Probe concurrency control (2 concurrent, 120 session max)
- Per-page session cache (`probeSession`) to prevent re-probing
- MP4/EBML parsing for duration extraction from Range responses
- Stream cancellation after capped read (video never downloaded)
- New i18n keys: `probeMode`, `probeModeD`, `probeOff`, `probeCache`, `probeAuto`, `probeTraffic`
- UI control in Look tab → Video Metadata (dropdown, enabled when `showVideoInfo` on)

### Changed
- Video deferral flow: `commitVideoDefer` → placeholder → `probeObserve` → cache lookup → probe queue → `detachVideoSources`
- `fetchVideoSize` now only runs after user click (cache for next visit)
- `saveVideoCache` merges values across modes (off-mode never erases earlier)
- `updatePlaceholderInfo` hides badges until content exists
- Bundle size: ~118 KB (+6 KB for probe core)

### Fixed
- Probe never downloads video body (reader.cancel() after cap)
- Infinite mutation loop (`forceNoPreload` only writes on change)
- Probe re-queues correctly on scroll away/back

---

## 2026-11-18 — v3.5.3 Released

**Author**: parham  
**Type**: Major Fix — Zero Download Guarantee

### Added
- Simultaneous startup at `document-start` (MutationObserver on `document`)
- True source removal with native `load()` call
- Browser-level guards for locked/unseen videos
- HEAD/Range only after click on same video
- Deterministic FNV-1a `hashKey()` (replaces Date.now()-based)
- IndexedDB v2 with per-video resume (save on pause + pagehide)
- DOM-order video numbering (fixed `<source>`-only videos showing index 1)
- Missing i18n keys: `emergency`, `reload`, `blockedScripts`, `blockedRequests`, `popupsBlocked`, `resources`, `cleaned`, `detached`

### Removed
- `preloadFirstNForDuration` setting entirely (config, UI, logic)
- HEAD/Range probes from lock path
- `data-src`/`data-lazy-src` handling

### Fixed
- v3.5.2 downloaded videos despite locking (all root causes eliminated)
- Video size/duration from cache on revisit (verified 2.7 MB + 0:12)
- Double-encoded HTML entities
- Infinite mutation loop
- Cache key stability across sessions

---

## 2026-11-17 — v3.5.2 Released

**Author**: parham  
**Type**: Feature — Instant Duration for First N Videos

### Added
- `preloadFirstNForDuration` setting (default: 3)
- UI control in Look tab → Video Metadata
- Cache population on metadata load during preload

### Fixed
- Duration not showing until user plays video
- Double-encoded HTML entities in tooltip
- Cache key Unicode errors

### Changed
- Video deferral: first N videos get `preload="metadata"`
- State: `preloadedForDuration` counter added

---

## 2026-11-17 — v3.5.1 Released

**Author**: parham  
**Type**: Feature — IndexedDB Video Metadata Cache

### Added
- IndexedDB `videoMetadata` store (Layer 0 cache, 7-day TTL)
- `hashKey()` function (Unicode-safe, replaces `btoa()`)
- 4-layer detection: Cache → Page metadata → Range probe → Video element
- Non-blocking preload strategy (`preload="none"` initially)
- Accent/Preset conflict fix
- FAB drag updates both Y and side
- DOM-order video numbering with `videoIndexMap`

### Removed
- Domain profiles feature (store, functions, Domains tab, i18n)
- LongTask Observer
- Blocked requests logging UI (backend retained)

### Fixed
- Unicode IDB keys
- Unnecessary video downloads (`preload="none"`)
- Video metadata persistence
- Release flow saves metadata to cache

---

## 2026-11-17 — v3.5.0 Released

**Author**: parham  
**Type**: Meta — Author metadata, custom icon

### Added
- `@author` = "parham"
- `@homepageURL` = https://github.com/parhamghahremani
- Custom SVG icon (base64)

### Changed
- Meta-block version bumped to 3.5.0
- package.json updated

---

## 2026-11-14 — v3.4.6 Released

**Author**: parham  
**Type**: Refactor — Constants & Documentation

### Added
- CONSTANTS object (16 magic numbers extracted)
- JSDoc for all complex functions
- Internal test functions via `window.__SHV_TEST__`

### Changed
- Magic number standardization
- Z-index constants in CSS
- URL slice limits use MAX_ID_LENGTH

---

## 2026-11-04 — v3.4.5 Released

**Author**: parham  
**Type**: Fix — Duplicate Video, Lazy-Load Respect

### Removed
- Keyboard shortcuts system (Alt+Shift+V/F/E/R/D/L)

### Fixed
- Duplicate video under lock card
- Preemptive src from data-src/data-lazy-src
- Unnecessary video downloads (hide before source manipulation)

---

## 2026-11-04 — v3.4.4 Released

**Author**: parham  
**Type**: Fix — Performance, Numbering, Lazy-Load

### Fixed
- Site performance degradation (removed all `video.load()`)
- Video numbering conflicts (stopped preemptive src)
- Lock/release cycle interference (preserve data-src)
- MutationObserver over-triggering (ignore data-src changes)

---

## 2026-11-04 — v3.4.3 Released

**Author**: parham  
**Type**: Fix — Duration, Size, Lazy-Load

### Fixed
- Slow duration detection (shv-suspended-video after loadedmetadata)
- Video size never displaying (Range fallback)
- Lazy-loaded videos not detected (data-src/data-lazy-src support)

---

## 2026-11-04 — v3.4.2 Released

**Author**: parham  
**Type**: Fix — Duration, Release, Size Display

### Fixed
- Delayed duration detection
- Metadata lost on release
- Video size not displaying (dual-badge system)

---

## 2026-11-04 — v3.4.1 Released

**Author**: parham  
**Type**: Fix — Numbering, Metadata Display, Persian Translations

### Fixed
- Duplicate video numbering (`videoIndexMap`)
- Video metadata not displaying (reordered commitVideoDefer)
- Incomplete Persian translations (8 keys for Overview)

---

## 2026-11-04 — v3.4.0 Released

**Author**: parham  
**Type**: Feature — Video Numbering, Metadata, Inverted Neumorphic

### Added
- Sequential video numbering (top-left badge)
- Video metadata display (size + duration badges)
- Inverted neumorphic effect (flat base, raised hover)

---

## 2026-11-04 — v3.3.0 Released

**Author**: parham  
**Type**: Major — IndexedDB, Resume, Profiles, Shortcuts, Themes

### Added
- IndexedDB storage layer (4 stores)
- Video resume position persistence
- Per-domain profile overrides (Domains tab)
- Keyboard shortcuts system
- Theme presets (5)
- Blocked requests logging
- FAB stats tooltip

---

## 2026-11-04 — v3.2.0 Released

**Author**: parham  
**Type**: Major — v6 Engine + v3 UI Merge

### Added
- v6.0.0 media engine merged
- v3.1.0 neumorphic UI preserved
- 7-tab panel
- Bilingual i18n (EN/FA)
- Enhanced diagnostics
- FAB with drag-to-reposition

---

## 2026-11-04 — v3.1.0 Released

**Author**: parham  
**Type**: Major — Neumorphic UI, i18n, FAB

### Added
- Neumorphic UI redesign
- Bilingual i18n system (EN/FA)
- FAB + slide-over drawer
- Animated neumorphic placeholders
- Language selector
- Enhanced theme CSS variables

---

## 2026-11-03 — v3.0.0 Released

**Author**: parham  
**Type**: Major — Tabbed UI, Themes, Diagnostics, Emergency

### Added
- Tabbed UI panel (3 tabs)
- Theme system (System/Dark/Light)
- Compact mode
- Performance diagnostics (LongTask, resources)
- Emergency mode
- srcdoc iframe support
- Detached node cleanup
- Debounced UI updates
- Persian RTL-first UI

---

## 2026-11-03 — v2.0.0 Released

**Author**: parham  
**Type**: Feature — Profiles, Release, Batch Load, Cards

### Added
- Performance profiles (Compatible/Balanced/Ultra)
- Manual resource release
- Batch loading controls
- Repeated card optimization (content-visibility)
- Image lazy-loading (fetchpriority=low)
- Known ad host filtering
- Settings persistence (localStorage v2)

---

## 2026-11-03 — v1.0.0 Released

**Author**: parham  
**Type**: Initial Release

### Added
- Tap-to-load video/iframe deferral
- Video placeholder with poster
- Iframe placeholder with title
- Known ad host list
- CSS animation suppression
- FAB panel with stats
- User gesture tracking
- MutationObserver for dynamic content
- Play event interception
- Zero grants, pure DOM manipulation