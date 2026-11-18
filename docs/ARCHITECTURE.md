# Architecture — Shahvani Ultra Lite

## High-Level Structure

```
IIFE (Immediately Invoked Function Expression)
├── Constants & Configuration
├── Settings Management (localStorage + IndexedDB)
├── IndexedDB Layer
├── Translations (EN/FA)
├── State Management
├── CSS Generation (static + dynamic)
├── Helper Utilities
├── Image & Card Optimization
├── Placeholder System
├── Video/Audio Engine (v3 from v6)
├── Frame Engine
├── Size/Duration Probe (v3.5.4)
├── Ad/Tracker Blocking
├── MutationObserver Scanner
├── Panel UI (FAB + 7-tab drawer)
└── Event Listeners & Cleanup
```

---

## Module Details

### 1. Constants & Configuration (Lines ~18-50)
All magic numbers extracted to named constants at top of IIFE:
- Timing: `MEDIA_DELAY_MS`, `VISUAL_BATCH_MS`, `UI_UPDATE_MS`, `AUTO_RELEASE_INTERVAL_MS`
- Limits: `MAX_BLOCKED_LOG_ENTRIES`, `MAX_CUSTOM_AD_HOSTS`, `MAX_ID_LENGTH`
- Placeholder: `PLACEHOLDER_MIN/MAX_HEIGHT`, `ASPECT_RATIO_MIN/MAX/DEFAULT`
- **v3.5.4 Probe**: `PROBE_HEAD_BYTES`, `PROBE_TAIL_BYTES`, `PROBE_CONCURRENCY`, `PROBE_SESSION_MAX`, `PROBE_VISIBLE_MARGIN`
- Z-index: `Z_INDEX_FAB`, `Z_INDEX_SCRIM`, `Z_INDEX_PANEL`, `Z_INDEX_TOAST`

### 2. Settings Management
- `DEFAULTS` (frozen object) — all settings with defaults
- `ENUMS` — valid values for enum settings
- `sanitize(input, base)` — validates & coerces input against DEFAULTS
- `loadSettings()` — synchronous from localStorage (for document-start), falls back to IndexedDB
- `saveSettings()` — dual write to localStorage + IndexedDB
- `THEME_PRESETS`, `ACCENTS`, `KNOWN_AD_HOSTS`, `TRACKER_HOSTS` — static data

### 3. IndexedDB Layer
- `idbInit()` — opens/upgrades DB, returns singleton promise
- `idbSaveSettings()`, `idbLoadSettings()` — settings backup
- `idbSaveResumePosition()`, `idbGetResumePosition()` — video resume time
- `idbLogBlockedRequest()`, `idbGetBlockedRequests()` — blocked request log (backend only)
- `checkVideoCache()`, `saveVideoCache()` — video metadata cache (Layer 0)

### 4. State (`state` object)
- `initialized`, `emergency`, `observer`, `cleanedEntries`
- Counters: `blockedScripts`, `blockedRequests`, `popupsBlocked`
- Collections: `mediaEntries` (Set), `pendingVisualRoots`, `pendingCardParents`, `repeatedCards`
- Timers: `visualTimer`, `cleanupTimer`, `uiTimer`, `renumberTimer`
- **v3.5.4**: `probeApplied`, `probeObserver`, `probeQueue`, `probeActive`, `probeCount`, `probeBytes`, `probeControllers`
- UI: `activeTab`, `open`, `ui`, `videoIndex`

### 5. WeakMap/WeakSet Tracking (Memory Safety)
- `videoStates` (WeakMap<HTMLVideoElement, Entry>) — video deferral state
- `frameStates` (WeakMap<HTMLIFrameElement, Entry>) — iframe deferral state
- `imageStates` (WeakMap<HTMLImageElement, OriginalAttrs>) — image optimization state
- `scheduledVideos` (WeakSet) — videos pending deferral
- `unsafeVideos` (WeakSet) — blob/MediaSource videos never touched
- `probeTargets` (WeakMap<HTMLElement, Entry>) — IntersectionObserver targets
- `probeSession` (Map<string, {size,duration}|null>) — per-page probe cache

### 6. CSS Generation
- `buildPageCss()` — static rules (placeholders, effects, ad hiding, content-visibility)
- `addStyle()` — injects at document-start
- `updateDynamicStyle()` — custom ad hosts + accent color

### 7. Video Engine (Core Deferral)
**Entry Structure:**
```javascript
{
  kind: 'video',
  audio: boolean,
  element: HTMLVideoElement,
  loaded: boolean,
  released: boolean,
  placeholder: HTMLElement,
  videoSrc: string,      // best URL for cache key
  directSrc: string,     // what goes on <video src>
  sources: [{node, src}],
  originalPreload: string,
  resumeTime: number,
  pausedAt: number,
  videoIndex: number,
  videoDuration: number,
  videoSize: number,
  metadataLoaded: boolean,
  sizeRequested: boolean,
  cacheState: 0|1|2,     // not looked up | looking up | done
  probeState: '',        // '' | queued | running | done | failed
  probed: boolean,
  inView: boolean,
  aspectRatio: number,
  height: number,
  poster: string
}
```

**Flow:**
1. `commitVideoDefer(video)` — creates entry, inserts placeholder, detaches sources
2. `detachVideoSources(entry)` — hides video, removes src/<source>, calls native `load()`
3. `activateVideo(entry, userGesture)` — restores sources, fetches size, preload=metadata, plays
4. `releaseVideoEntry(entry)` — restores placeholder, saves metadata to cache

### 8. Frame Engine
- Similar entry structure for iframes
- `lockSameSite` setting controls same-origin frames
- `activateFrame()` — restores src/srcdoc
- `releaseFrameEntry()` — restores placeholder

### 9. Size/Duration Probe (v3.5.4)
**MP4 Parsing:**
- `sniffContainer()` — detects MP4 (ftyp) / EBML (WebM/MKV)
- `scanMp4(buf, base)` — walks top-level boxes, finds moov/mvhd, returns duration + next box offset
- `mvhdDuration()` — parses mvhd (v0 32-bit, v1 64-bit)
- `scanEbml()` — minimal EBML parser for TimecodeScale + Duration

**Range Requests:**
- `probeRange(url, start, length, signal)` — GET with Range header, reads capped bytes
- `readCapped(res, cap)` — streams body, cancels reader after cap
- `probeVideo(url)` — 1-2 requests: header (16 KB) → moov tail (8 KB if needed)

**Queue Management:**
- `probeObserve(entry)` — IntersectionObserver with 200px margin
- `probeConsider(entry)` — queues if auto mode, in view, cache checked, unknown
- `probePump()` — respects concurrency (2) and session cap (120)

### 10. MutationObserver Scanner
- `scanMedia(root)` — finds video/iframe/img, calls deferral functions
- `onMutations(records)` — debounced batch processing (160ms visual, 120ms UI)
- `handleAttributeChange(mutation)` — reacts to src/srcdoc/autoplay/preload changes
- Observer config: `childList: true, subtree: true, attributes: true, attributeFilter: [...]`

### 11. Panel UI
- **FAB**: Draggable, side (left/right) + vertical position, stats badge
- **Drawer**: 7 tabs (home, video, frames, ads, page, look, data)
- **Sections**: Collapsible, dynamic rebuilding on settings change
- **i18n**: `t(key, vars)` with EN/FA, RTL support
- **Theme**: CSS variables, 5 presets + custom, system/dark/light

### 12. Ad/Tracker Blocking
- `beforescriptexecute` — blocks scripts from known ad domains
- `fetch`/`XHR`/`beacon` patching — refuses requests to ad/tracker domains
- `window.open` patching — blocks popups without recent gesture
- Cosmetic: CSS rules injected for known ad containers

---

## Data Flow Diagram

```
document-start
    │
    ├─► addStyle() ──────────────────► CSS injected
    │
    ├─► loadSettings() ─────────────► settings (sync from localStorage)
    │
    ├─► idbInit() ──────────────────► IndexedDB ready (async)
    │
    ├─► MutationObserver on document
    │       │
    │       └─► <html> exists ──► scanMedia(document)
    │                     │
    │                     ├─► commitVideoDefer() ──► placeholder + detach
    │                     ├─► commitFrameDefer() ──► placeholder
    │                     ├─► optimizeImage() ──► lazy/async
    │                     └─► optimizeRepeatedCards() ──► content-visibility
    │
    └─► FAB created, panel ready (hidden)

User Interaction
    │
    ├─► Tap placeholder ──► activateVideo/Frame()
    │       │
    │       ├─► restore sources
    │       ├─► fetchVideoSize() (HEAD, cache for next visit)
    │       ├─► preload=metadata ──► loadedmetadata ──► saveVideoCache()
    │       └─► play()
    │
    ├─► FAB click ──► toggle panel
    │
    ├─► Settings change ──► saveSettings() ──► rebuild UI sections
    │
    └─► Emergency/Release ──► pause/release all

Page Lifecycle
    │
    ├─► SPA navigation ──► MutationObserver detects changes
    │
    ├─► Tab hidden ──► pauseHidden videos
    │
    ├─► pagehide ──► saveVideoCache() + save resume positions
    │
    └─► Auto-release timer ──► release fully off-screen videos
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| IIFE + strict mode | No global pollution, CSP-friendly |
| `@grant none` | Works without any Tampermonkey permissions |
| `document-start` + style injection | Placeholders visible before any media loads |
| `WeakMap`/`WeakSet` | No memory leaks from detached DOM nodes |
| Dual localStorage + IndexedDB | Fast sync read + large quota + private browsing |
| Deterministic `hashKey` (FNV-1a) | Stable cache keys across sessions |
| `videoKeyUrl` (origin+path) | Cache survives query/hash changes |
| Native `load()` after src removal | HTML spec: only way to abort in-flight load |
| `IntersectionObserver` for probe | Only probe what user might see |
| Stream cancellation after cap | Probe never downloads full video |
| Per-page `probeSession` cache | Avoid re-probing same video on scroll |