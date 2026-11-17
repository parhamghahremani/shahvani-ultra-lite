# Shahvani Ultra Lite — Learnings

## v3.4.6 Learnings (2026-11-04)

### Code Quality Improvements: Constants, JSDoc, and Testability

**Problem:** The codebase had accumulated magic numbers scattered throughout, lacked documentation for complex functions, and had no way to run internal unit tests.

**Solution (v3.4.6):**

1. **CONSTANTS Extraction** — Moved 16 magic numbers to a named CONSTANTS block at the top of the IIFE:
   - `MEDIA_DELAY_MS = 60` — delay for non-instant video locking
   - `VISUAL_BATCH_MS = 160` — debounce for visual scanning batch
   - `UI_UPDATE_MS = 120` — debounce for UI stats updates
   - `AUTO_RELEASE_INTERVAL_MS = 15000` — interval for auto-release of paused media
   - `MAX_BLOCKED_LOG_ENTRIES = 500` — max blocked requests to keep in IndexedDB
   - `MAX_CUSTOM_AD_HOSTS = 200` — max custom ad hosts (unused constant, kept for future)
   - `MAX_ID_LENGTH = 200` — max length for URL/ID truncation (was 200 hardcoded)
   - `PLACEHOLDER_MIN_HEIGHT = 140` / `PLACEHOLDER_MAX_HEIGHT = 320` — placeholder height bounds
   - `ASPECT_RATIO_MIN = 0.4` / `ASPECT_RATIO_MAX = 3.5` / `ASPECT_RATIO_DEFAULT = 16/9` — aspect ratio bounds
   - `GESTURE_WINDOW_MS = 5000` — user gesture tracking window
   - `TOAST_DURATION_MS = 2200` — toast notification duration
   - `MAX_SAFE_INT = 2147483647` — max safe integer for z-index base
   - `Z_INDEX_FAB = 2147483646` / `Z_INDEX_SCRIM = 2147483645` / `Z_INDEX_PANEL = 2147483647` / `Z_INDEX_TOAST = 2147483647` — named z-index layers

2. **JSDoc Documentation** — Added comprehensive JSDoc comments for all complex functions covering:
   - IndexedDB layer (9 functions)
   - Video deferral/activation flow (4 functions: commitVideoDefer, detachVideoSources, restoreVideoSources, activateVideo)
   - MutationObserver handlers (3 functions: scanMedia, handleAttributeChange, onMutations)
   - Helpers (3 functions: sanitize, isUsableURL, hostMatches)
   - Each JSDoc includes @param, @returns, and behavioral description

3. **Internal Test Functions** — Exposed 3 test functions via `window.__SHV_TEST__`:
   - `testSanitize(input)` — test settings sanitization logic
   - `testIsUsableURL(raw)` — test URL validation
   - `testHostMatches(host, list)` — test domain matching logic
   - These can be run in browser console: `window.__SHV_TEST__.testIsUsableURL('https://example.com/video.mp4')`

**Impact:**
- Improved code maintainability and readability
- Easier debugging and testing
- Self-documenting constants make future changes safer
- Test functions enable regression testing without external framework

## v3.4.5 Learnings (2026-11-04)

### Fix: Duplicate Video Under Lock Card & Unnecessary Initial Download

**Problem:** Despite v3.4.4 fixes, a duplicate video still appeared briefly under the lock card and started downloading before disappearing. This caused:
1. Visual flicker (video visible under placeholder for ~100-200ms)
2. Unnecessary bandwidth consumption (video starts downloading)
3. Site slowness (multiple concurrent downloads)
4. Numbering issues due to race conditions between site init and our deferral

**Root Cause:** In v3.4.4, the flow was:
```
1. insertPlaceholder(entry)          // placeholder visible
2. video.setAttribute('src', ...)    // SET src from data-src/data-lazy-src (PREMATURE)
3. video.preload = 'metadata'
4. wait for loadedmetadata
5. video.classList.add('shv-suspended-video')  // HIDE AFTER metadata
6. detachVideoSources(entry)
```

The video was visible and loading between steps 2-5 because `shv-suspended-video` (display:none) was added AFTER metadata loaded.

**Solution (v3.4.5):** Move hiding to IMMEDIATELY after placeholder insertion, BEFORE any src manipulation:
```javascript
// NEW FLOW (v3.4.5):
1. insertPlaceholder(entry)           // placeholder visible
2. video.classList.add('shv-suspended-video')  // HIDE IMMEDIATELY (display:none)
3. video.preload = 'metadata'         // ON EXISTING src only (if any)
4. DO NOT set src from data-src/data-lazy-src — let site do it naturally
5. wait for loadedmetadata (fires when site naturally sets src)
6. detachVideoSources(entry)          // removes src, preserves data-src
7. fetchVideoSize(entry) (deferred)
```

**Key Changes:**
- `shv-suspended-video` added BEFORE any metadata loading
- Removed preemptive `video.setAttribute('src', entry.videoSrc)` from `data-src`/`data-lazy-src`
- Video element is never visible to user, never starts downloading
- Site's native lazy-loading (`data-src` → `src`) runs completely uninterrupted
- Numbering stable because `videoSrc` comes from whichever attribute exists at detection time

### Removed: Keyboard Shortcuts System

**Reason:** Primary target is Android (no physical keyboard). Removed:
- `keyboardShortcuts` setting from DEFAULTS
- `initKeyboardShortcuts()` function (50+ lines)
- `keydown` event listener with Alt+Shift+V/F/E/R/D/L handlers
- UI checkbox in Look tab ("Keyboard Shortcuts" section)
- i18n keys: `secShortcuts`, `shortcuts`, `shortcutsD` (both EN/FA)
- References in `aboutText` (both EN/FA)

**Bundle Size Impact:** ~110KB (-4KB from removed keyboard code)

### Technical Summary

| Issue | v3.4.4 | v3.4.5 |
|-------|--------|--------|
| When is video hidden? | After `loadedmetadata` | **Immediately after placeholder** |
| Who sets `src` from `data-src`? | **We did** (premature) | **Site does** (natural) |
| Duplicate video visible? | Yes (brief) | **No** |
| Initial download triggered? | Yes | **No** |
| Keyboard shortcuts | Present | **Removed** |

---

## v3.4.4 Learnings (2026-11-04)

### Fix: Site Performance Degradation & Lock/Release Interference

**Problem 1: `video.load()` Calls Caused Unnecessary Reloads**
- Three locations called `try { video.load(); } catch (_) {}`:
  1. `commitVideoDefer()` after setting `preload='metadata'`
  2. `detachVideoSources()` after removing src
  3. `restoreVideoSources()` / `activateVideo()` after restoring src
- Each `video.load()` forces browser to reset and restart video loading pipeline
- On shahvani.com with lazy-loaded videos, this broke the site's native `data-src` → `src` initialization flow

**Problem 2: Preemptively Setting `src` from `data-src` Broke Site Logic**
- v3.4.3 code: `if (!video.getAttribute('src')) video.setAttribute('src', entry.videoSrc)`
- This triggered site's own video initialization BEFORE our placeholder was ready
- Caused race conditions: site tries to play, we try to lock, both interfere
- Video numbering got messed up because site's initialization created duplicate entries

**Problem 3: Removing `data-src`/`data-lazy-src` Prevented Site Re-initialization**
- `detachVideoSources()` was removing ALL source attributes
- When user clicked "release" then "play again", site couldn't re-initialize video (lazy attributes gone)
- `restoreVideoSources()` only restored `src`, not the lazy attributes

**Problem 4: MutationObserver Over-Triggering on Lazy Attributes**
- `attributeFilter` included `data-src`, `data-lazy-src`
- `handleAttributeChange()` called `deferVideo()` on EVERY lazy attribute change
- Site's lazy-loading JS sets these attributes dynamically → constant re-deferral

---

### Solution: Respect Site's Native Lazy-Loading Flow

**New Flow (v3.4.4):**

```javascript
// 1. DETECTION (scanMedia / MutationObserver):
//    hasUsableVideoSource() checks src, data-src, data-lazy-src for DETECTION ONLY
//    Does NOT set src attribute!

// 2. DEFERRAL (commitVideoDefer):
//    - Insert placeholder immediately (user sees "tap to load")
//    - Set preload='metadata' on EXISTING src (if any)
//    - DO NOT call video.load()
//    - DO NOT copy data-src → src
//    - Wait for loadedmetadata (fires when site naturally sets src)

// 3. METADATA LOADING (onMeta handler):
//    - Entry gets videoDuration, aspectRatio from video element
//    - Add shv-suspended-video (display:none) NOW
//    - detachVideoSources(): removes ONLY src attribute
//    - PRESERVE data-src/data-lazy-src for site re-initialization
//    - Deferred fetchVideoSize()

// 4. RELEASE (releaseVideoEntry):
//    - snapshotVideoSources() captures current src
//    - Insert placeholder
//    - detachVideoSources() removes src, keeps lazy attributes
//    - Entry preserves videoDuration, videoSize, videoSrc

// 5. RESTORE (restoreVideoSources / activateVideo):
//    - Set src from entry.videoSrc
//    - DO NOT call video.load()
//    - Site's own JS sees src is set, initializes player naturally
```

---

### Key Principles

| Principle | v3.4.3 (Broken) | v3.4.4 (Fixed) |
|-----------|-----------------|----------------|
| **Who sets `src`?** | We set it from data-src | Site's own JS sets it |
| **When do we hide video?** | After setting src | After `loadedmetadata` fires |
| **`video.load()` calls** | 3 locations | **0** (removed all) |
| **`data-src` preservation** | Removed on detach | **Preserved always** |
| **MutationObserver on lazy attrs** | Triggered deferVideo | **Ignored** |

---

### Why This Works for Shahvani.com

Shahvani's pattern:
1. Initial HTML: `<video data-src="https://.../video.mp4" ...>` (NO src)
2. Site JS (on scroll/interaction): `video.src = video.dataset.src`
3. Browser loads video, fires `loadedmetadata`
4. Our `onMeta` handler catches it → gets duration → hides video → shows placeholder

**Our script now:**
- Detects video via `data-src` in `hasUsableVideoSource()` ✓
- Inserts placeholder immediately ✓
- Waits for site to naturally set `src` ✓
- Catches `loadedmetadata` when it fires ✓
- Never interferes with site's initialization flow ✓

---

### Performance Impact

- **No forced reloads** → site loads at native speed
- **No MutationObserver spam** → only `src`/`autoplay` trigger deferral
- **Deferred size fetch** → `setTimeout(fetchVideoSize, 0)` doesn't block main thread
- **Placeholder shows instantly** → user perception unchanged

**Bundle Size:** ~114KB (unchanged)

## v3.4.3 Learnings (2026-11-04)

### Fix: Slow Duration Detection — display:none Blocks Metadata Loading

**Problem:** Video duration was detected very slowly or not at all because the video element received `display: none !important` via `.shv-suspended-video` class BEFORE `loadedmetadata` could fire.

**Root Cause:** Browsers do not load video metadata (duration, dimensions) for elements with `display: none`. The original flow was:
```
1. video.classList.add('shv-suspended-video')  ← display:none!
2. video.preload = 'metadata'
3. video.load()
4. Wait for loadedmetadata  ← NEVER FIRES because display:none
```

**Solution:** Reordered flow to defer hiding the video until AFTER metadata loads:
```javascript
// NEW FLOW (v3.4.3):
1. insertPlaceholder(entry)  // placeholder visible immediately
2. video.preload = 'metadata'
3. video.load()
4. WAIT for loadedmetadata  ← FIRES because video is VISIBLE
5. entry.videoDuration = video.duration
6. entry.metadataLoaded = true
7. video.classList.add('shv-suspended-video')  ← NOW hide
8. detachVideoSources(entry)
9. fetchVideoSize(entry)
```

**Key Insight:** The placeholder is shown immediately (step 1), so user sees the "tap to load" card. The actual video element stays visible just long enough to load metadata (milliseconds), then gets hidden. User perception is unchanged but metadata now loads reliably.

### Fix: Video Size Never Displaying

**Problem:** `fetchVideoSize()` using HEAD request never returned Content-Length for shahvani.com videos.

**Root Causes:**
1. Server doesn't return Content-Length on HEAD requests
2. CORS blocked fetch() fallback
3. No fallback strategy when HEAD fails

**Solution:** Multi-tier size detection:
```javascript
// TIER 1: HEAD request (fastest)
GM_xmlhttpRequest({ method: 'HEAD', ... })

// TIER 2: GET with Range: bytes=0-0 (returns Content-Range header with total size)
GM_xmlhttpRequest({ 
  method: 'GET', 
  headers: { 'Range': 'bytes=0-0' },
  // Parse: Content-Range: bytes 0-0/12345678 → total = 12345678
})

// TIER 3: Standard fetch with CORS (if available)
fetch(url, { method: 'HEAD', mode: 'cors' })
```

**Why Range works:** Servers that support byte-range requests return `Content-Range: bytes 0-0/TOTAL` even for a 1-byte request, revealing the full file size without downloading content.

### Fix: Lazy-Loaded Videos Not Detected (shahvani.com Pattern)

**Problem:** Shahvani.com uses lazy-loading with `data-src` and `data-lazy-src` attributes. Videos initially have NO `src` attribute — it's added dynamically via JavaScript after page load.

**Detection Flow:**
1. Initial scan: `<video data-src="https://...">` — no `src`, so `hasUsableVideoSource()` returns false
2. Site JS runs: sets `video.src = video.dataset.src`
3. MutationObserver fires `attributeFilter: ['data-src', 'data-lazy-src']` (already configured!)
4. `handleAttributeChange()` now checks these attributes and calls `deferVideo()`

**Code Changes:**
```javascript
// hasUsableVideoSource() - v3.4.3
function hasUsableVideoSource(video) {
  if (isUsableURL(video.getAttribute('src'))) return true;
  if (isUsableURL(video.getAttribute('data-src'))) return true;     // NEW
  if (isUsableURL(video.getAttribute('data-lazy-src'))) return true; // NEW
  return Array.from(video.querySelectorAll('source')).some(source => isUsableURL(source.getAttribute('src')));
}

// commitVideoDefer() - v3.4.3: Get src from any attribute
let src = video.getAttribute('src');
if (!isUsableURL(src)) src = video.getAttribute('data-src');
if (!isUsableURL(src)) src = video.getAttribute('data-lazy-src');

// handleAttributeChange() - v3.4.3: Watch lazy attributes
if (attributeName === 'src' || attributeName === 'data-src' || attributeName === 'data-lazy-src') 
  deferVideo(target);
```

**Key Insight:** The `attributeFilter` already included `data-src` and `data-lazy-src` from earlier versions, but `handleAttributeChange()` wasn't using them for video deferral. Now it does.

### Technical Summary

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| Slow duration | `display:none` before `loadedmetadata` | Defer `.shv-suspended-video` until after metadata |
| No video size | HEAD returns no Content-Length | Multi-tier: HEAD → Range GET → fetch |
| Lazy videos missed | Only checked `src` attribute | Check `src`, `data-src`, `data-lazy-src` |

**Bundle Size:** ~114KB (+1KB for v3.4.3 fixes)

## v3.4.2 Learnings (2026-11-04)

### Fix: Delayed Duration Detection & Metadata Preservation on Release

**Problem 1: Duration appeared late (after source detach)**
- Original flow: `preload=metadata` → `video.load()` → `detachVideoSources()` → `loadedmetadata` (sometimes didn't fire because `src` removed)
- Browser needs valid `src` to fetch metadata; removing it before `loadedmetadata` breaks duration detection

**Problem 2: Metadata lost when releasing video**
- `releaseVideoEntry()` called `detachVideoSources()` which clears metadata readiness
- Re-inserted placeholder showed empty badges because `entry.videoDuration` / `entry.videoSize` not used for display

**Solution: Reordered flow + metadata preservation**
```javascript
// commitVideoDefer (v3.4.1 → v3.4.2):
1. preload = 'metadata' + remove autoplay
2. add 'loadedmetadata' listener
3. video.load()
4. IN listener (onMeta):
   - entry.videoDuration = video.duration
   - entry.aspectRatio = video.videoWidth / video.videoHeight
   - entry.metadataLoaded = true  ← NEW FLAG
   - updatePlaceholderInfo(entry)  ← IMMEDIATE UPDATE
   - detachVideoSources(entry)     ← AFTER metadata loaded
   - fetchVideoSize(entry)         ← async HEAD request

// releaseVideoEntry (v3.4.2):
1. snapshotVideoSources(entry)    ← preserves current videoSrc
2. entry.loaded = false; entry.released = true
3. insertPlaceholder(entry)       ← creates fresh placeholder
4. updatePlaceholderInfo(entry)   ← NEW: displays PRESERVED metadata immediately
5. detachVideoSources(entry)      ← clears src for memory
```

**Key Insight:** Metadata (`videoDuration`, `videoSize`, `aspectRatio`, `videoIndex`) stored on `entry` object survives release cycle. Placeholder recreation reads from entry, not from video element.

### Dual Badge System: Size (Bottom-Left) + Duration (Bottom-Right)

**CSS Structure (in buildPageCss):**
```css
/* Size badge - bottom left */
.shv-video-size {
  position: absolute;
  left: 8px; bottom: 8px;
  font-size: 11px; font-weight: 600;
  color: var(--shv-muted);
  background: var(--shv-surface-2);
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0.9;
}

/* Duration badge - bottom right */
.shv-video-info {
  position: absolute;
  right: 8px; bottom: 8px;
  font-size: 11px; font-weight: 600;
  color: var(--shv-accent);
  background: var(--shv-surface-2);
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0.9;
}
```

**JavaScript Updates:**
- `makePlaceholder()`: Creates BOTH badges independently (`.shv-video-size` + `.shv-video-info`)
- `updatePlaceholderInfo()`: Updates each badge independently based on available data
- `refreshVideoInfoBadge()`: Creates missing badges dynamically on toggle

**Benefits:**
- Size appears as soon as HEAD request completes (async, non-blocking)
- Duration appears immediately after `loadedmetadata` (synchronous)
- Independent visibility: if size unknown but duration known → shows duration only
- Clean separation of concerns

### Technical Details

**State Additions:**
```javascript
const entry = {
  // ...
  videoDuration: 0,
  videoSize: 0,
  metadataLoaded: false,  // v3.4.2: tracks if loadedmetadata has fired
  // ...
};
```

**Bundle Size:** ~113KB (+1KB for v3.4.2 fixes)

## v3.4.1 Learnings (2026-11-04)

### Fix: Duplicate Video Numbering (Site Loads Videos Twice)

**Problem:** Shahvani.com loads each video element twice (likely SPA navigation + lazy-load). Original `state.videoIndex++` incremented on every `commitVideoDefer` call, causing numbering like 1,2,3 → 4,5,6 on second load.

**Solution:** `videoIndexMap: Map<videoSrc, index>` — stable index per unique video URL.
```javascript
const src = video.getAttribute('src');
let videoIndex = state.videoIndexMap.get(src);
if (!videoIndex) {
  videoIndex = ++state.videoIndex;
  state.videoIndexMap.set(src, videoIndex);
}
entry.videoIndex = videoIndex;
```

**Key Insight:** The map persists across duplicate loads within the same page session. Only new `videoSrc` values get new indices.

### Fix: Video Metadata Not Displaying

**Root Causes Identified:**
1. **Premature source detach:** `detachVideoSources()` called immediately after `video.load()`, before `loadedmetadata` fires. Browser needs `src` to fetch metadata.
2. **CORS on HEAD request:** `fetch(..., {method:'HEAD', mode:'cors'})` fails without server `Access-Control-Allow-Origin`. `GM_xmlhttpRequest` (Tampermonkey) bypasses this.
3. **`display:none` blocks metadata:** `.shv-suspended-video { display:none!important }` — some browsers don't load metadata for hidden elements.

**Fix: Reordered `commitVideoDefer` flow:**
```
1. preload = 'metadata' + remove autoplay
2. add 'loadedmetadata' listener
3. video.load()
4. IN listener: read duration/dimensions → update aspectRatio
5. THEN detachVideoSources(entry)  ← moved here!
6. fetchVideoSize(entry)
```

**Dynamic Badge Creation:** `updatePlaceholderInfo()` now creates `.shv-video-info` element on-the-fly if setting enabled but badge missing. `refreshVideoInfoBadge()` called from `refreshPlaceholder()` and `setOpt()` for live toggle response.

### Fix: Incomplete Persian Translations

**Missing 8 keys in `T.fa` for Overview tab:** `master`, `masterOn`, `masterOff`, `secQuick`, `pauseAll`, `releaseBtn`, `releaseConfirm`, `filteredAds`.

**Lesson:** Always verify both `T.en` and `T.fa` have matching keys when adding UI strings. Grep for `t('key')` usages to find all references.

## v3.4.0 Learnings (2026-11-04)

### Sequential Video Numbering (DOM Order)

**Implementation:**
```javascript
// State counter incremented during commitVideoDefer (DOM scan order)
const state = { videoIndex: 0, ... };

function commitVideoDefer(video) {
  state.videoIndex++;
  const entry = { ..., videoIndex: state.videoIndex, ... };
}
```

**Key Insights:**
- `querySelectorAll('video')` returns elements in **document order** (top-to-bottom)
- `scanMedia` processes root + `querySelectorAll` → `forEach(deferVideo)` → `commitVideoDefer` maintains DOM order
- Counter resets on each full scan (page reload/SPA navigation), which is correct behavior
- Index displayed via `.shv-video-index` badge (top-left) in `makePlaceholder()`

### Video Metadata Display (Size & Duration)

**Two-Phase Metadata Loading:**
1. **Duration/Dimensions**: `preload="metadata"` + `loadedmetadata` event
   - Browser fetches only moov atom / header (~bytes to KB)
   - `video.duration`, `video.videoWidth`, `video.videoHeight` available
   - Updates `entry.aspectRatio` for correct placeholder aspect ratio

2. **File Size**: HEAD request for `Content-Length`
   - **Tampermonkey**: `GM_xmlhttpRequest({ method: 'HEAD', ... })` — **bypasses CORS**
   - **Standard**: `fetch(url, { method: 'HEAD', mode: 'cors' })` — requires server CORS headers
   - Falls back gracefully if request fails
   - Displayed in `.shv-video-info` badge (bottom-right): "10 MB · 2:07"

**Design Decisions:**
- Metadata loads **after** placeholder is shown (async, non-blocking)
- `fetchVideoSize()` called from `loadedmetadata` handler
- `updatePlaceholderInfo(entry)` updates badge when data arrives
- Size formatting: KB (<1MB) → "512 KB", MB (≥1MB) → "10.5 MB"
- Duration formatting: `M:SS` (e.g., "2:07")

### Inverted Neumorphic Effect

**CSS Pattern (Flat Base → Raised Hover):**
```css
/* Base: flat, no shadows */
.shv-media-placeholder.shv-inverted-neumorphic {
  box-shadow: none !important;
  border: 1px solid var(--shv-border) !important;
}

/* Hover: raised neumorphic */
.shv-media-placeholder.shv-inverted-neumorphic:hover {
  box-shadow:
    6px 6px 12px var(--shv-shadow-dark),
    -6px -6px 12px var(--shv-shadow-light) !important;
  transform: translateY(-2px) !important;
  border-color: var(--shv-accent) !important;
}

/* Active: pressed in */
.shv-media-placeholder.shv-inverted-neumorphic:active {
  box-shadow:
    inset 4px 4px 8px var(--shv-shadow-dark),
    inset -4px -4px 8px var(--shv-shadow-light) !important;
  transform: translateY(0) !important;
}
```

**Implementation Notes:**
- Controlled by `settings.invertedNeumorphic` (default: true)
- Applied via class `shv-inverted-neumorphic` in `makePlaceholder()`
- Toggles in Look → "Video Metadata" section
- Classic neumorphic (raised base) still available when disabled

## v3.3.0 Learnings (2026-11-04)

### IndexedDB as Primary Storage (with localStorage Fallback)

**Architecture:**
```javascript
// 4 Object Stores:
settings          // key: 'main' — full settings object
resumePositions   // keyPath: 'id' (videoSrc|pageUrl hash) — { videoSrc, url, currentTime, duration, timestamp }
blockedRequests   // keyPath: 'id', autoIncrement — { url, type, domain, timestamp }
domainProfiles    // key: domain — { settingKey: value, ... }
```

**Key Patterns:**
1. **Dual-write strategy**: `saveSettings()` writes to both localStorage (sync, fast) and IndexedDB (async, larger quota)
2. **Async-first load**: `start()` initiates `idbLoadSettings()` before UI creation; synchronous localStorage fallback for immediate paint
3. **Private browsing support**: IndexedDB works in private mode where localStorage may throw or be quota-limited
4. **Auto-cleanup**: `blockedRequests` capped at 500 entries via cursor delete on overflow

### Video Resume Position Persistence

```javascript
// On release (pause + off-screen):
function releaseVideoEntry(entry) {
  entry.resumeTime = video.currentTime;
  idbSaveResumePosition(entry.videoSrc, location.href, entry.resumeTime, video.duration);
}

// On activate (before play):
idbGetResumePosition(videoSrc, pageUrl).then(saved => {
  if (saved?.currentTime > 0) {
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(saved.currentTime, video.duration - 0.5);
    }, { once: true });
  }
});
```

**Design Decisions:**
- Key = `btoa(videoSrc + '|' + pageUrl).slice(0, 200)` — unique per video+page combination
- Only saves when `currentTime > 0` and video is paused (not ended)
- Restores only if `resumePosition: true` setting enabled
- Uses `loadedmetadata` event for accurate duration-aware seek

### Per-Domain Profile Overrides

```javascript
// Domain profile stored in IndexedDB with domain as key
// Applied on startup via applyDomainProfile():
idbGetDomainProfile(location.hostname).then(profile => {
  if (profile) {
    for (const key of Object.keys(profile)) {
      if (key in DEFAULTS) settings[key] = profile[key]; // domain wins
    }
    applyAll();
  }
});
```

**UI:** New "Domains" tab with textarea for JSON input:
```
example.com
{ "lockVideo": false, "calmMotion": true }
```

**Lesson:** Profile merging is shallow (top-level keys only). Nested objects not supported in DEFAULTS anyway.

### Keyboard Shortcuts — Guard Against Input Focus

```javascript
window.addEventListener('keydown', event => {
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return;
  // ... handle Alt+Shift+V/F/E/R/D
}, true); // capture phase for priority
```

**Lesson:** Must check `isContentEditable` and input types. Capture phase ensures our handler runs before page handlers.

### Theme Presets — CSS Variable Injection

```javascript
const THEME_PRESETS = {
  default: { accent: '#00d4aa', darkBg: '#1e1e2e', lightBg: '#f0f2f5' },
  midnight: { accent: '#818cf8', darkBg: '#0f172a', lightBg: '#e0e7ff' },
  // ...
};

function applyThemePreset() {
  const preset = THEME_PRESETS[settings.themePreset];
  document.documentElement.style.setProperty('--shv-accent', preset.accent);
  // Also update panel if open
  if (state.ui) state.ui.root.style.setProperty('--ac', preset.accent);
}
```

**Lesson:** Presets only change accent + base bg. Full theme (shadows, surfaces) still driven by `resolvedTheme()` (dark/light/system). This keeps preset count manageable (5) while allowing 2×5=10 visual combinations.

### Blocked Requests Logging — Structured & Queryable

```javascript
// Logged at block point (script/request):
idbLogBlockedRequest(url, 'script'|'request', domain);

// Schema: { id (auto), url, type, domain, timestamp }
// Indexed by timestamp (desc) + domain
```

**UI:** Data tab shows scrollable log with Refresh/Clear buttons. Format: `[timestamp] TYPE | domain | url`.

**Lesson:** Only logs when `settings.logBlockedRequests = true` (default false) to avoid IndexedDB write overhead. Capped at 500 entries with auto-eviction.

---

## v3.2.0 Learnings (2026-11-04)

### Merging Two Distinct Codebases

**Strategy Used:**
1. **Engine from v6.0.0** — comprehensive settings, ad/script/request blocking, popup shield, full playback controls, diagnostics
2. **UI from v3.1.0** — neumorphic CSS variables, animated placeholders, slide-over drawer pattern
3. **Panel structure from v6.0.0** — 7 tabs with collapsible sections, bottom sheet on mobile
4. **FAB from v6.0.0** — draggable, configurable side (left default), lightning badge

**Key Integration Points:**

| Component | Source | Notes |
|-----------|--------|-------|
| Settings schema | v6 | 65+ options, sanitize(), enums, legacy migration |
| i18n keys | Merged | v3 base + v6 comprehensive (85 keys/lang) |
| CSS variables | v3 neumorphic | `--shv-*` for placeholders, `--ac/--bg` for panel |
| Media engine | v6 | Always-active MutationObserver, 60ms delay, WeakMap tracking |
| Placeholders | v3 | Card-style, poster+gradient, pulsing play icon |
| Panel | v6 | Shadow DOM, 7 tabs, collapsible sections |
| FAB | v6 | Draggable, bottom-left default, badge count |

### CSS Variable Architecture (Dual System)

```css
/* Page/Placeholders (v3 neumorphic) */
--shv-bg: #1e1e2e;
--shv-surface: #252536;
--shv-surface-2: #2d2d44;
--shv-surface-3: #353550;
--shv-text: #e8e8f0;
--shv-muted: #9aa0b0;
--shv-border: #3d3d5c;
--shv-accent: #00d4aa;
--shv-accent-text: #0a1a18;
--shv-shadow-dark: #14141e;
--shv-shadow-light: #2c2c44;

/* Panel/FAB (v6 flat with neumorphic accents) */
--ac: #00d4aa;
--on: #0a1a18;
--bg: #1e1e2e;
--bg2: #252536;
--fg: #e8e8f0;
--mut: #9aa0b0;
--bd: rgba(148,163,184,.22);
--card: rgba(255,255,255,.05);
```

**Lesson:** Keep separate variable namespaces. Page styles use `--shv-*`, panel uses flat names. Both map to same semantic colors.

### AttributeFilter Critical for Shahvani

```javascript
attributeFilter: ['src', 'srcdoc', 'autoplay', 'data-src', 'data-lazy-src']
```

Shahvani's forum topics load "ویدیو" text placeholders first, then inject `<video>`/`<iframe>` via JS. The `data-src`/`data-lazy-src` attributes appear **before** `src` — without them in filter, mutations fire but handler doesn't catch the initial lazy attributes.

### WeakMap/WeakSet Pattern Validated

```javascript
const videoStates = new WeakMap();
const frameStates = new WeakMap();
const imageStates = new WeakMap();
const unsafeVideos = new WeakSet();
const scheduledVideos = new WeakSet();
```

- **WeakMap**: Element → entry (auto-cleanup on GC when element removed)
- **WeakSet**: Elements to skip (blob videos, scheduled deferrals)
- **Explicit cleanup** still needed for `removedNodes` in MutationObserver

### I18N Fallback Chain

```javascript
function t(key, vars) {
  let s = (T[settings.lang] && T[settings.lang][key]) || T.en[key] || key;
  if (vars) for (const k of Object.keys(vars)) s = s.split('{' + k + '}').join(String(vars[k]));
  return s;
}
```

Design decisions:
- English default (`lang: 'en'`)
- Persian RTL via `direction: rtl` on panel/placeholder containers
- Live language switch via `rebuildUI()` — no panel recreation
- All 85+ keys translated including status messages, placeholders, button labels, section titles
- Fallback: `T[lang][key]` → `T.en[key]` → `key` (never undefined)

### Performance Profile (v3.2.0)

| Metric | Value |
|--------|-------|
| Bundle size | ~95KB |
| Initial scan | ~15ms |
| CSS variables | 24 (14 page + 10 panel) |
| I18N keys | ~85 per language |
| MutationObserver attrs | 5 |
| UI debounce | 120ms |
| Visual batch | 160ms |
| Memory overhead | ~200KB (WeakMap + Set) |

### Reusable Patterns Confirmed

**`collapseRoots(roots)` — Deduplicate MutationObserver Targets**
```javascript
function collapseRoots(roots) {
  const list = Array.from(roots).filter(r => r instanceof Element && r.isConnected);
  return list.filter(r => !list.some(other => other !== r && other.contains(r)));
}
```

**`detachVideoSources(entry)` / `restoreVideoSources(entry)` — Safe Video Detach/Restore**
```javascript
function detachVideoSources(entry) {
  const video = entry.element;
  if (video.getAttribute('src') !== null) {
    entry.videoSrc = video.getAttribute('src');
    video.removeAttribute('src');
  }
  for (const item of entry.sources) {
    if (item.node && item.node.hasAttribute('src')) {
      item.src = item.node.getAttribute('src');
      item.node.removeAttribute('src');
    }
  }
  video.removeAttribute('autoplay');
  video.preload = 'none';
  try { video.load(); } catch (_) {}
}
```

**Debounced Batch Scanner**
```javascript
const pendingRoots = new Set();
let visualTimer = 0;

function queueVisualScan(root) {
  if (!(root instanceof Element)) return;
  pendingRoots.add(root);
  if (visualTimer) return;
  visualTimer = setTimeout(() => {
    visualTimer = 0;
    const roots = collapseRoots(pendingRoots);
    pendingRoots.clear();
    roots.forEach(scanVisuals);
  }, 160);
}
```

---

## Selectors / Patterns That Worked

| Pattern | Context | Version |
|---------|---------|---------|
| `video` elements with `src` or `<source>` children | Native HTML5 video players | v1.0.0+ |
| `iframe` with `src`, `data-src`, `data-lazy-src`, or `srcdoc` | Embedded players, ads, comments | v1.0.0+ |
| `img` with `loading="lazy"` + `fetchpriority="low"` | Off-screen image deferral | v2.0.0+ |
| Repeated card detection via `cardSignature()` (tagName + sorted class list) | List/feed containers with 10+ children | v2.0.0+ |

## Selectors / Patterns That Failed

| Pattern | Reason |
|---------|--------|
| Removing `iframe` entirely for ads | Breaks page layout, some "ads" are actually content |
| Stripping all `autoplay` globally | Some players need it for user-initiated playback |
| Aggressive `content-visibility` on all cards | Breaks scroll anchoring, layout shift |

## SPA Navigation Patterns

- Shahvani uses **traditional navigation** (full page loads), not SPA
- However, infinite scroll / AJAX content loading occurs → `MutationObserver` with `childList` + `attributes` catches new media
- `window.addEventListener('load', ...)` re-scans for layout-settled images

## Gotchas

1. **Blob/MediaSource videos** — Dynamic blob URLs (`blob:...`) cannot be restored once detached. Mark as `unsafeVideos` and skip deferral.

2. **srcdoc iframes** — Some embedded players use `srcdoc` with inline HTML. Must preserve `srcdoc` attribute separately from `src`.

3. **`srcObject` on video** — Indicates MediaSource/MSE stream. Never detach.

4. **User gesture tracking** — `navigator.userActivation.isActive` (where supported) + manual timestamp tracking for autoplay prevention.

5. **Memory leaks from detached DOM** — MutationObserver `removedNodes` must clean up WeakMap entries, placeholder elements, and tracked state.

6. **PerformanceObserver 'longtask'** — Not supported in all Firefox versions; wrap in try/catch, fallback to 'unsupported'.

7. **localStorage quota** — Settings are tiny (~500 bytes), but wrap `setItem` in try/catch for private browsing.

8. **CSS variable theming** — Use `--shv-*` custom properties on `#shv-ultralite-fab` and `#shv-ultralite-panel` for instant theme switch without style recreation.

9. **Shahvani double-load pattern** — Forum topics show "ویدیو" ×6 placeholders as text initially, then JavaScript injects actual `<video>`/`<iframe>` elements. **Always-active scanning with full attributeFilter is required** — on-demand detection fails because the initial scan sees no video elements.

## Reusable Patterns for Global Knowledge Base

### `cardSignature(el)` — Detect Repeated List Items
```javascript
function cardSignature(el) {
    const classes = typeof el.className === 'string'
        ? el.className.trim().split(/\s+/).filter(Boolean).sort().slice(0, 5).join('.')
        : '';
    return el.tagName + '|' + classes;
}
```
Usage: Count signatures among siblings; if one signature ≥72% of children and count ≥7 → mark as `shv-repeated-card` for `content-visibility: auto`.

### `isKnownAdURL(raw)` — Conservative Ad Host Filter
```javascript
const KNOWN_AD_HOSTS = [
    'doubleclick.net', 'googlesyndication.com', 'googleadservices.com',
    'adnxs.com', 'taboola.com', 'outbrain.com', 'popads.net',
    'propellerads.com', 'exoclick.com', 'juicyads.com', 'trafficjunky.net'
];

function isKnownAdURL(raw) {
    try {
        const url = new URL(raw, document.baseURI);
        const host = url.hostname.toLowerCase();
        return KNOWN_AD_HOSTS.some(d => host === d || host.endsWith('.' + d));
    } catch { return false; }
}
```
Principle: Only filter **known** ad hosts. Never delete unknown iframes.

### `collapseRoots(roots)` — Deduplicate MutationObserver Targets
```javascript
function collapseRoots(roots) {
    const list = Array.from(roots).filter(r => r instanceof Element && r.isConnected);
    return list.filter(r => !list.some(other => other !== r && other.contains(r)));
}
```
Prevents scanning same subtree multiple times per mutation batch.

### `detachVideoSources(entry)` / `restoreVideoSources(entry)` — Safe Video Detach/Restore
```javascript
function detachVideoSources(entry) {
    const video = entry.element;
    if (video.getAttribute('src') !== null) {
        entry.videoSrc = video.getAttribute('src');
        video.removeAttribute('src');
    }
    for (const item of entry.sources) {
        if (item.node && item.node.hasAttribute('src')) {
            item.src = item.node.getAttribute('src');
            item.node.removeAttribute('src');
        }
    }
    video.removeAttribute('autoplay');
    video.preload = 'none';
    try { video.load(); } catch (_) {}
}

function restoreVideoSources(entry) {
    const video = entry.element;
    if (video.getAttribute('src') === null && entry.videoSrc !== null)
        video.setAttribute('src', entry.videoSrc);
    for (const item of entry.sources) {
        if (item.node && item.node.isConnected && item.src !== null && item.node.getAttribute('src') === null)
            item.node.setAttribute('src', item.src);
    }
    video.removeAttribute('autoplay');
    video.preload = 'metadata';
}
```
Key: Only restore attributes **this script removed** (null checks). Never overwrite site-updated URLs.

### Debounced Batch Scanner
```javascript
const pendingRoots = new Set();
let visualTimer = 0;

function queueVisualScan(root) {
    if (!(root instanceof Element)) return;
    pendingRoots.add(root);
    if (visualTimer) return;
    visualTimer = setTimeout(() => {
        visualTimer = 0;
        const roots = collapseRoots(pendingRoots);
        pendingRoots.clear();
        roots.forEach(scanVisuals);
    }, 160);
}
```

## Firefox Android Quirks Confirmed

- `localStorage` persists across app restarts ✅
- `PerformanceObserver('longtask')` **not supported** in Firefox Android (returns false) ❌
- `navigator.userActivation` **supported** ✅
- `content-visibility: auto` **supported** ✅
- Touch events work for placeholder clicks ✅
- Panel FAB fixed position works but needs `touch-action: manipulation` ✅

## Performance Notes (v3.0.0)

| Metric | Target |
|--------|--------|
| Initial scan (DOMContentLoaded) | < 15ms |
| Visual batch (160ms debounce) | Batched by parent |
| UI update debounce | 120ms |
| MutationObserver attributeFilter | `['src', 'srcdoc', 'autoplay']` only |
| Memory overhead | < 100KB (WeakMap + Set) |

## Next Version Ideas

- [ ] **Web Worker** for heavy card signature computation (off main thread)
- [ ] **IndexedDB** for settings + stats persistence (survives quota clear)
- [ ] **Network throttling simulation** for testing slow connections
- [ ] **Export/import settings** via panel button
- [ ] **Per-domain profile overrides** (e.g., different profile for shahvani.com vs m.shahvani.com)
- [ ] **Video resume position** persistence across page reloads (localStorage + session restore)

---

## v3.1.0 Learnings (2026-11-04)

### Neumorphic UI Implementation

**CSS Variable Architecture:**
```css
/* Dark theme (default) */
--shv-bg: #1e1e2e;
--shv-surface: #252536;
--shv-surface-2: #2d2d44;
--shv-surface-3: #353550;
--shv-text: #e8e8f0;
--shv-muted: #9aa0b0;
--shv-border: #3d3d5c;
--shv-accent: #00d4aa;
--shv-accent-text: #0a1a18;
--shv-shadow-dark: #14141e;
--shv-shadow-light: #2c2c44;

/* Light theme */
--shv-bg: #f0f2f5;
--shv-surface: #f8f9fc;
--shv-surface-2: #eef1f5;
--shv-surface-3: #e4e8ee;
--shv-text: #1a1d24;
--shv-muted: #6b7280;
--shv-border: #d1d5db;
--shv-accent: #00a88a;
--shv-accent-text: #ffffff;
--shv-shadow-dark: #c8ccd4;
--shv-shadow-light: #ffffff;
```

**Key Neumorphic Patterns:**
1. **Dual shadows**: `box-shadow: 6px 6px 12px var(--shv-shadow-dark), -6px -6px 12px var(--shv-shadow-light)` creates raised effect
2. **Hover state**: Reduced shadow depth (`4px 4px 8px`) + `translateY(-2px)` for lift
3. **Active state**: Inset shadows (`inset 4px 4px 8px...`) for pressed feel
4. **Focus visible**: 3px accent outline with 3px offset for accessibility
5. **Animation**: `transition: box-shadow 0.2s ease, transform 0.15s ease` on all interactive elements

**Slide-over Drawer Panel:**
- Fixed position: `right: -420px` (hidden) → `right: 0` (open via `.shv-open` class)
- Full viewport height: `height: 100vh`, `top: 0`, `bottom: 0`
- Backdrop overlay: `#shv-ultralite-backdrop` with fade animation
- Transition: `right 0.35s cubic-bezier(0.16, 1, 0.3, 1)` for natural easing
- Inner flex layout: topbar (fixed) + tabs (fixed) + pane (flex:1, overflow-y:auto) + status (fixed bottom)

**Animated Video Placeholder:**
- Pulsing play icon: `@keyframes shv-play-pulse` (scale 1→1.1, opacity 0.9→1)
- Poster image with gradient overlay (`::before`): `linear-gradient(135deg, surface 0%, transparent 50%, surface 100%)`
- Neumorphic card base with hover/active/focus states matching panel buttons
- Aspect-ratio preservation via CSS `aspect-ratio: 16/9`

### Bilingual i18n System

```javascript
const I18N = {
  en: { key: 'English text', ... },
  fa: { key: 'متن فارسی', ... }
};

function t(key) {
  const lang = settings.lang;
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}
```

**Design Decisions:**
- English default (`lang: 'en'`) per user requirement
- Persian RTL handled by `direction: rtl` on panel/placeholder containers
- Language selector in Appearance tab with instant `rebuildUI()` — no panel recreation needed
- All status messages, placeholders, button labels, section titles translated
- `resetConfirm` includes current language in confirmation dialog
- Fallback chain: `I18N[lang][key]` → `I18N.en[key]` → `key` (never undefined)

### Performance Notes (v3.1.0)

| Metric | Value |
|--------|-------|
| Bundle size | ~89KB |
| Initial scan | ~15ms |
| CSS variables | 14 (7 base + 7 shadow/accent) |
| I18N keys | ~55 per language |
| Animation overhead | <1ms (GPU-accelerated transforms) |
| Reduced motion | All transitions/animations disabled via media query |

### Reusable Patterns Added

**`rebuildUI()` — Live Language Switch Without Recreation:**
```javascript
function rebuildUI() {
  if (!state.ui) return;
  // Update all textContent on existing DOM nodes
  state.ui.tabButtons.overview.textContent = t('tabOverview');
  state.ui.profileButtons.compatible.textContent = t('profileCompatible');
  // ... all buttons, labels, descriptions
  applyTheme();
  applyCompactMode();
  updatePanelNow();
}
```
Called on language change — preserves panel state (open/closed, active tab, scroll position).

**Neumorphic Shadow System:**
```css
/* Raised */
box-shadow: 6px 6px 12px var(--shv-shadow-dark), -6px -6px 12px var(--shv-shadow-light);

/* Hover lift */
box-shadow: 4px 4px 8px var(--shv-shadow-dark), -4px -4px 8px var(--shv-shadow-light);
transform: translateY(-2px);

/* Pressed */
box-shadow: inset 4px 4px 8px var(--shv-shadow-dark), inset -4px -4px 8px var(--shv-shadow-light);
transform: translateY(0);
```
Applicable to any element needing tactile depth.

---

## v3.0.0 Learnings (2026-11-03)

### Site Structure Confirmed
| Area | Video/Iframe Embeds | Media Type |
|------|---------------------|------------|
| Homepage | None | Logo (WebP) |
| /dastans (stories) | None | Text-only table |
| /photos (galleries) | None | Direct images (JPG/WebP) |
| /forum index | None | Topic links + 2 ad banners |
| Forum topics | **6+ "ویدیو" placeholders** | Dynamic `<video>`/`<iframe>` loaded via JS post-load |
| Avatar images | None | `/media/avatars/` (JPG) |
| External ads | 2 iframe banners | `delrobai.com`, `aksexy.com` |

**Key insight**: Shahvani is **primarily text/photo-based**. Video content exists in forum discussions but loads dynamically via JavaScript after initial HTML render. The "مرورگر شما ویدیو را پلی نمی‌کند" text appears as placeholder but no actual video elements in static HTML.

### Optimization Patterns Implemented

#### Separate Media Tracking (4 WeakMaps)
```javascript
const videoStates = new WeakMap();
const frameStates = new WeakMap();
const imageStates = new WeakMap();
const unsafeVideos = new WeakSet();
```

#### MediaEntry Structure (Video)
```javascript
{
  element,
  loaded: false,
  released: false,
  placeholder: null,
  src: null,
  originalSrc: null,
  poster: null,
  title: '',
  isKnownAd: false,
  aspectRatio: 16/9,
  height: 112,
  sources: [],  // for video <source> elements
  resumeTime: 0
}
```

#### Always-Active Detection with MEDIA_DELAY_MS
```javascript
// Full attributeFilter always active
attributeFilter: ['src', 'data-src', 'data-lazy-src', 'autoplay']

// 60ms delay before deferral allows site to fully initialize video element
const MEDIA_DELAY_MS = 60;
```

### Performance Profile (v3.0.0)
| Metric | Value |
|--------|-------|
| Initial scan | ~15ms |
| Bundle size | 96KB |
| WeakMap entries | 4 |
| MutationObserver attrs | 3 |
| UI debounce | 120ms |
| Memory overhead | ~200KB |
| Video resume position | ✅ |
| Dynamic video detection | ✅ |