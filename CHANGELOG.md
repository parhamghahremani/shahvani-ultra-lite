# Changelog — Shahvani Ultra Lite

All notable changes to this project will be documented in this format.

## [3.4.6] - 2026-11-04

### Added
- **CONSTANTS object** — extracted 16 magic numbers to named constants at top of IIFE: MEDIA_DELAY_MS, VISUAL_BATCH_MS, UI_UPDATE_MS, AUTO_RELEASE_INTERVAL_MS, MAX_BLOCKED_LOG_ENTRIES, MAX_CUSTOM_AD_HOSTS, MAX_ID_LENGTH, PLACEHOLDER_MIN_HEIGHT, PLACEHOLDER_MAX_HEIGHT, ASPECT_RATIO_MIN, ASPECT_RATIO_MAX, ASPECT_RATIO_DEFAULT, GESTURE_WINDOW_MS, TOAST_DURATION_MS, MAX_SAFE_INT, Z_INDEX_FAB, Z_INDEX_SCRIM, Z_INDEX_PANEL, Z_INDEX_TOAST
- **JSDoc comments** — added comprehensive JSDoc documentation for all complex functions: idbInit, idbSaveSettings, idbLoadSettings, idbSaveResumePosition, idbGetResumePosition, idbLogBlockedRequest, idbGetBlockedRequests, idbSaveDomainProfile, idbGetDomainProfile, idbGetAllDomainProfiles, commitVideoDefer, detachVideoSources, restoreVideoSources, activateVideo, scanMedia, handleAttributeChange, onMutations, sanitize, isUsableURL, hostMatches
- **Internal test functions** — exposed `testSanitize`, `testIsUsableURL`, `testHostMatches` via `window.__SHV_TEST__` for unit testing

### Changed
- **Magic number standardization** — replaced all hardcoded magic numbers with named constants throughout the codebase
- **Z-index constants** — named z-index values in CSS template (Z_INDEX_FAB, Z_INDEX_SCRIM, Z_INDEX_PANEL, Z_INDEX_TOAST)
- **URL slice limits** — standardized use of MAX_ID_LENGTH constant for string truncation

### Technical
- **Code maintainability** — improved readability and maintainability through constants and documentation
- **Bundle size**: ~110KB (same as v3.4.5)

## [3.4.5] - 2026-11-04

### Removed
- **Keyboard shortcuts system** — removed entirely (Alt+Shift+V/F/E/R/D/L) as primary target is Android (no keyboard). Removed `keyboardShortcuts` setting, `initKeyboardShortcuts()`, keydown event listener, UI toggle in Look tab, and all related i18n keys (EN/FA).

### Fixed
- **Duplicate video under lock card** — moved `shv-suspended-video` class addition to immediately after `insertPlaceholder()`, before any metadata loading. This prevents the brief moment where the video is visible and starts downloading under the lock placeholder.
- **Preemptive src setting from data-src/data-lazy-src** — removed logic that set `src` attribute from lazy-load attributes. Site's native lazy-loading now runs uninterrupted; we only intercept when `src` actually appears naturally.
- **Unnecessary video downloads** — video is hidden (`display: none`) before any source manipulation, eliminating the initial download that caused site slowness.

### Changed
- **Metadata flow**: Insert placeholder → add shv-suspended-video immediately → preload=metadata → wait for loadedmetadata → detach sources → deferred size fetch
- **Lazy-load respect**: Site's native lazy-loading (data-src → src) runs completely uninterrupted; we only defer when `src` actually appears
- **Video numbering stability**: By not preemptively setting `src`, `videoSrc` remains stable, ensuring consistent numbering via `videoIndexMap`

### Technical
- **Removed**: `keyboardShortcuts` from DEFAULTS, `initKeyboardShortcuts()` function, keydown event listener, UI section in Look tab, i18n keys: `secShortcuts`, `shortcuts`, `shortcutsD` (both EN/FA)
- **Bundle size**: ~110KB (-4KB from removed keyboard code)

## [3.4.4] - 2026-11-04

### Fixed
- **Site performance degradation** — removed all `video.load()` calls (caused unnecessary reloads, broke lazy-loading)
- **Video numbering conflicts** — stopped preemptively setting `src` from `data-src`/`data-lazy-src`; let site's own JS initialize videos naturally
- **Lock/release cycle interference** — `detachVideoSources()` now only removes `src` attribute, preserves `data-src`/`data-lazy-src` for site re-initialization
- **MutationObserver over-triggering** — `handleAttributeChange()` now ignores `data-src`/`data-lazy-src` changes; only defers on `src`/`autoplay`

### Changed
- **Metadata flow**: Insert placeholder → preload=metadata (NO video.load()) → wait for loadedmetadata → add shv-suspended-video → detach src only → deferred size fetch
- **Lazy-load respect**: Site's native lazy-loading (data-src → src) runs uninterrupted; we only intercept when `src` actually appears
- **Release flow**: `releaseVideoEntry()` preserves `videoSrc` in entry, removes only `src` attribute, leaving `data-src`/`data-lazy-src` intact

### Technical
- **Removed**: All `try { video.load(); } catch (_) {}` calls (3 locations)
- **Bundle size**: ~114KB (same)

## [3.4.3] - 2026-11-04

### Fixed
- **Slow duration detection** — moved `shv-suspended-video` class addition AFTER `loadedmetadata` fires (display:none was blocking metadata loading)
- **Video size never displaying** — added fallback GET with Range: bytes=0-0 when HEAD returns no Content-Length; added support for data-src/data-lazy-src attributes
- **Lazy-loaded videos not detected** — `hasUsableVideoSource()` now checks data-src/data-lazy-src attributes; MutationObserver handles these attributes for dynamic loading

### Changed
- **Metadata flow**: Insert placeholder → preload=metadata → loadedmetadata → add shv-suspended-video → detach sources → fetch size
- **Lazy-load support**: Video src now read from src, data-src, or data-lazy-src; attribute changes on these trigger deferral
- **Size detection**: HEAD → if no Content-Length → GET with Range: bytes=0-0 → parse Content-Range or Content-Length

### Technical
- **State**: Added `metadataLoaded` flag tracking
- **AttributeFilter**: Already includes `['src', 'srcdoc', 'autoplay', 'data-src', 'data-lazy-src']` for dynamic detection
- **Bundle size**: ~114KB (+1KB for v3.4.3 fixes)

## [3.4.2] - 2026-11-04

### Fixed
- **Delayed duration detection** — metadata now available immediately via `loadedmetadata` before source detachment; placeholder updates synchronously
- **Metadata lost on release** — `videoDuration` and `videoSize` preserved and displayed on re-inserted placeholder via `updatePlaceholderInfo()` call in `releaseVideoEntry()`
- **Video size not displaying** — dual-badge system: size badge (bottom-left, `.shv-video-size`) and duration badge (bottom-right, `.shv-video-info`) created independently

### Changed
- **Placeholder metadata flow**: `preload="metadata"` → `loadedmetadata` → update duration/size → detach sources → fetch file size (HEAD)
- **Release flow**: snapshot sources → insert placeholder → update metadata display → detach sources (preserves metadata on re-insert)

### Technical
- **State**: added `metadataLoaded: boolean` flag to entry for tracking metadata readiness
- **CSS**: `.shv-video-size` (bottom-left) and `.shv-video-info` (bottom-right) badges independent
- **Bundle size**: ~113KB (+1KB for v3.4.2 fixes)

## [3.4.1] - 2026-11-04

### Fixed
- **Duplicate video numbering** — site loads videos twice; added `videoIndexMap` to assign consistent index per `videoSrc`
- **Video metadata not displaying** — reordered `commitVideoDefer`: wait for `loadedmetadata` before detaching sources; added dynamic badge creation for `showVideoInfo` toggle
- **Incomplete Persian translations** — added 8 missing keys for Overview tab (master, masterOn, masterOff, secQuick, pauseAll, releaseBtn, releaseConfirm, filteredAds)

### Changed
- **Video deferral flow**: `preload="metadata"` → `loadedmetadata` → detach sources → fetch size (ensures metadata loads)
- **Placeholder badges**: now created/removed dynamically when toggles change (no full rebuild needed)
- **Panel settings**: `showVideoIndex`, `showVideoInfo`, `invertedNeumorphic` update placeholders live

### Technical
- **State**: added `videoIndexMap: Map<videoSrc, index>` for stable numbering across duplicate loads
- **Bundle size**: ~112KB (+2KB for v3.4.1 fixes)

## [3.4.0] - 2026-11-04

### Added
- **Sequential video numbering** — displays video order (1, 2, 3...) on each placeholder (top-left badge), assigned during DOM-order scan
- **Video metadata display** — shows file size and duration on placeholder (bottom-right badge) when available via `preload="metadata"` and HEAD request
- **Inverted neumorphic effect** — flat base (no shadows), raised on hover/touch; toggle in Look tab

### Changed
- **Placeholder CSS**: rewritten for inverted neumorphic (flat base → raised hover/touch)
- **Video deferral**: now loads metadata (`preload="metadata"`) and fetches file size in background
- **Panel**: new "Video Metadata" section in Look tab with toggles for index, info, inverted effect

### Technical
- **Metadata extraction**: `loadedmetadata` event for duration/dimensions; `GM_xmlhttpRequest` HEAD request (Tampermonkey) or `fetch` for file size
- **Video index tracking**: `state.videoIndex` incremented in `commitVideoDefer` during DOM-order scan
- **Bundle size**: ~110KB (+5KB for v3.4.0 features)

## [3.3.0] - 2026-11-04

### Added
- **IndexedDB storage layer** — settings, video resume positions, blocked request logs, domain profiles (survives quota clear, works in private browsing)
- **Video resume position persistence** — saves `currentTime` per video+page to IndexedDB, restores on re-visit
- **Per-domain profile overrides** — custom settings per domain (e.g., different profile for shahvani.com vs m.shahvani.com), managed in new Domains tab
- **Keyboard shortcuts system** — Alt+Shift+V (video lock), Alt+Shift+F (frame lock), Alt+Shift+E (emergency), Alt+Shift+R (release), Alt+Shift+D (ads), disabled while typing
- **Theme presets** — Default, Midnight, Forest, Sunset, Monochrome with one-click apply
- **Blocked requests logging** — records blocked scripts/requests with timestamp/domain/type, viewable in Data tab
- **FAB stats tooltip** — detailed breakdown on hover/long-press (enabled via Look tab)

### Changed
- **Settings storage**: dual write to localStorage + IndexedDB, async load from IndexedDB first
- **Panel tabs**: added Domains tab (8 tabs total)
- **I18N keys**: +20 new keys for v3.3.0 features (domain profiles, shortcuts, themes, blocked log)

### Technical
- **IndexedDB schema**: 4 object stores (settings, resumePositions, blockedRequests, domainProfiles) with indexes
- **Bundle size**: ~105KB (IndexedDB layer + new UI + i18n)
- **Resume position logic**: async load on video activation, save on release/pause

## [3.2.0] - 2026-11-04

### Added
- **v6.0.0 media engine merged** — comprehensive settings: video/audio lock, playback controls, memory management, frame handling, ad/script/request blocking, popup shield, custom ad domains
- **v3.1.0 neumorphic UI preserved** — slide-over drawer (bottom sheet on mobile), animated placeholders with poster/gradient/pulsing play, FAB with drag-to-reposition
- **7-tab panel** — Overview, Video, Frames, Ads, Page, Look, Data with collapsible sections
- **Bilingual i18n** — English (default) + Persian RTL, 85+ keys per language covering all settings
- **Enhanced diagnostics** — blocked scripts/requests/popups counters, long task observer, resource counting
- **Floating action button** — bottom-left default (configurable), lightning icon, draggable, badge count

### Changed
- **Panel layout**: v6 bottom sheet with horizontal tabs replaces v3 right-edge drawer
- **FAB position**: configurable left/right (default left per user request), vertical drag reposition
- **Settings storage**: unified v3 key with v6 comprehensive defaults, legacy v2 migration
- **AttributeFilter extended**: `['src', 'srcdoc', 'autoplay', 'data-src', 'data-lazy-src']` for dynamic video detection

### Technical
- **Zero external dependencies** — pure DOM, IIFE, strict mode
- **MutationObserver** with debounced batch scanning (160ms visual, 120ms UI)
- **WeakMap/WeakSet** tracking for memory leak prevention
- **Blob/MediaSource video detection** — unsafe videos marked and never detached
- **srcdoc iframe support** — preserve and restore embedded content
- **Reduced motion support** via `prefers-reduced-motion` media query
- **Bundle size**: ~95KB (v6 engine + v3 UI + i18n)

## [3.1.0] - 2026-11-04

### Added
- **Neumorphic UI redesign** — tactile, warm soft UI with dual-layer shadows (dark/light themes)
- **Bilingual i18n system** — English (default) + Persian (RTL), full panel translation including status messages
- **FAB + Slide-over drawer panel** — 400px full-height drawer with smooth cubic-bezier animation, backdrop overlay
- **Animated neumorphic video placeholders** — card-style with poster image, gradient overlay, pulsing play icon animation
- **Language selector** in Appearance tab (English / فارسی)
- **Enhanced theme CSS variables** — `--shv-shadow-dark`, `--shv-shadow-light`, `--shv-surface-3` for layered depth
- **Reduced motion support** — respects `prefers-reduced-motion` for all animations/transitions

### Changed
- **Panel layout**: from bottom FAB+panel to right-edge slide-over drawer (full viewport height)
- **Tab structure preserved**: Overview / Media / Appearance (3 tabs)
- **Placeholder styling**: neumorphic card with hover/active/focus states, animated play button
- **Theme defaults**: teal accent (#00d4aa dark / #00a88a light) with warm neutral surfaces
- **Settings storage**: added `lang` field (persisted, default 'en'), backward compatible with v3

### Technical
- **I18N helper**: `t(key)` function with fallback to English
- **UI rebuild on language change**: `rebuildUI()` reconstructs all text without recreation
- **AttributeFilter extended**: `['src', 'srcdoc', 'autoplay', 'data-src', 'data-lazy-src']` for dynamic video detection
- **Bundle size**: ~89KB (neumorphic CSS + i18n adds ~3KB over v3.0.0)

## [3.0.0] - 2026-11-03

### Added
- **Tabbed UI panel** with three sections: Overview (پروفایل عملکرد + وضعیت صفحه), Media (بارگذاری رسانه‌ها + کنترل پخش و منابع), Appearance (رنگ‌بندی پنل + تنظیمات)
- **Theme system** with System/Dark/Light modes, auto-detection via `prefers-color-scheme`, real-time CSS variable switching
- **Compact mode** toggle for smaller panel footprint on mobile
- **Performance diagnostics**: Long Task Observer (PerformanceObserver API), resource counting, RAM estimation note
- **Emergency mode** — instantly pauses all HTML videos, blocks activation of deferred players until disabled
- **srcdoc iframe support** — handles iframes with embedded HTML content, preserves srcdoc on defer/activate
- **Detached node cleanup** — MutationObserver tracks removed DOM trees, cleans up tracked media entries, prevents memory leaks
- **Debounced UI updates** (120ms) for smooth panel stats
- **Persian RTL-first UI** with accessibility attributes (aria-pressed, aria-label, role=status)

### Changed
- **Settings storage upgraded** to v3 key (`shvUltraLite.settings.v3`) with legacy v2 migration
- **Visual scanning batch** now batches by parent collapse (160ms) for efficiency
- **Profile system refined**: Compatible (minimal), Balanced (lazy images + effects reduction), Ultra (content-visibility + repeated card optimization)
- **Placeholder text** now contextual: shows "released" state, ad-filter notice, emergency notice
- **CSS variables** for theming (--shv-bg, --shv-surface, --shv-accent, etc.)

### Fixed
- **Blob/MediaSource video detection** — unsafe videos marked and never detached
- **srcdoc iframe handling** — preserve and restore embedded content correctly
- **Memory leak prevention** — WeakMap/WeakSet for video/frame states, cleanup on DOM removal

### Technical
- Zero external dependencies
- `@run-at document-start` with immediate style injection
- MutationObserver with attributeFilter: ['src', 'srcdoc', 'autoplay']

---

## [2.0.0] - 2026-11-03

### Added
- **Performance profiles**: Compatible / Balanced / Ultra (persisted in localStorage)
- **Manual resource release** — one-click release of paused videos + off-screen iframes with confirmation dialog
- **Batch loading controls** — "Load visible players" / "Load all pending players"
- **Repeated card optimization** using `content-visibility: auto` (Ultra profile)
- **Image lazy-loading** with fetchpriority=low for off-screen images (Balanced/Ultra)
- **Known ad host filtering** — removable toggle in panel
- **Settings persistence** via localStorage (v2 key)
- **Profile descriptions** in Persian in panel

### Changed
- **CSS refactored** with `all: initial !important` for placeholder isolation
- **Video deferral** now captures geometry (aspectRatio, height, poster) before hiding
- **Panel UI** with sections, separators, stat display

---

## [1.0.0] - 2026-11-03

### Added
- **Initial release**: Tap-to-load video/iframe deferral for shahvani.com
- **Video placeholder** with poster image, aspect-ratio preservation
- **Iframe placeholder** with title-aware label
- **Known ad host list** (doubleclick, googlesyndication, taboola, outbrain, etc.)
- **CSS animation/transition suppression** via `html.shv-lite-effects`
- **FAB panel** with stats display (deferred/loaded/removed counts)
- **User gesture tracking** (pointerdown/touchstart/keydown) for autoplay prevention
- **MutationObserver** for dynamic content (SPA navigation, lazy-loaded players)
- **Play event interception** — blocks non-user-initiated playback
- **Zero grants**, pure DOM manipulation

---

## [3.5.1] - 2026-11-17

### Added
- **IndexedDB video metadata cache (Layer 0)** — new `videoMetadata` object store with 7-day TTL for persistent size/duration/aspectRatio caching across sessions
- **Hash-based IDB keys** — `hashKey()` function replaces `btoa()` for Unicode-safe keys (handles Persian/non-ASCII URLs)
- **4-layer size/duration detection**:
  - Layer 0: IndexedDB cache (instant, persistent)
  - Layer 1: Page metadata (skipped - shahvani.com has no duration in HTML)
  - Layer 2: Range probe (HEAD + `Range: bytes=0-0` for size, async, non-blocking)
  - Layer 3: Video element fallback (duration on user activation via `loadedmetadata`)
- **Non-blocking preload strategy** — `preload="none"` on initial deferral; `preload="metadata"` only on user activation (Layer 3)

### Changed
- **Video deferral flow**: Insert placeholder → `preload="none"` → Range probe (async) → on activate: `preload="metadata"` → `loadedmetadata` → save to cache
- **Accent/Preset conflict fixed**: Picking custom accent color now switches preset to `custom`; picking a preset updates accent to preset color
- **FAB drag behavior**: Drag updates both `y` position and `side` (left/right) simultaneously
- **DOM-order video numbering** — `videoIndexMap` assigns stable index per unique `videoSrc`, handles site loading videos twice

### Removed
- **Domain profiles feature** — removed `domainProfiles` object store, `idbSaveDomainProfile`, `idbGetDomainProfile`, `idbGetAllDomainProfiles`, `applyDomainProfile()`, Domains tab, all related i18n keys
- **LongTask Observer** — removed `setupLongTaskObserver()`, `longTaskObserver`, `longTaskSupported`, `longTaskCount` from state, `longTasks` from stats
- **Blocked requests logging UI** — removed `logBlockedRequests` setting, checkbox in Page tab, log display in Data tab (backend `idbLogBlockedRequest`/`idbGetBlockedRequests` retained)

### Fixed
- **Unicode IDB keys** — `hashKey()` handles Persian/non-ASCII video URLs without `btoa` errors
- **Unnecessary video downloads** — `preload="none"` prevents metadata preloading on initial page load
- **Video metadata persistence** — size/duration now cached to IndexedDB and survives browser restarts
- **Release flow** — `releaseVideoEntry()` saves metadata to cache before detaching sources

### Performance
- **Layer 0 cache hits** — instant placeholder metadata for previously seen videos
- **Non-blocking Range probes** — size detection runs async without blocking UI or video activation
- **Bundle size**: ~112KB (+2KB for cache layer and hash function)

---

## [3.5.0] - 2026-11-14

### Added
- **Author metadata** — `@author` set to "parham", `@homepageURL` to https://github.com/parhamghahremani
- **Custom SVG icon** — `@icon` with base64-encoded SVG (teal rounded square with white play/block symbols)

### Changed
- **Meta-block updated** — version bumped to 3.5.0, description simplified
- **Package.json updated** — version, author, homepage fields

### Technical
- **Version backup** — v3.4.6 preserved in versions/v3.4.6.user.js
- **Bundle size**: unchanged (~110KB)

---

## Template for Future Versions

## [X.Y.Z] - YYYY-MM-DD

### Added
-

### Changed
-

### Fixed
-

### Removed
-

### Performance
-