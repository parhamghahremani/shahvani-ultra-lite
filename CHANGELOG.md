# Changelog — Shahvani Ultra Lite

All notable changes to this project will be documented in this format.

## [3.6.2] - 2026-11-24

### Added
- **Selection totals** in the Download tab: next to the *Selected* counter, the summed duration and size of the selected videos (`Total: 4:45 · 4.5 MB`). If some selected videos are still unknown the line says so (`+1 incomplete`) and updates live as values arrive.
- **Failure is visible**: if a download cannot be started the Download tab shows a red, persistent message with the manager's error code (for example `not_succeeded`, `not_whitelisted`, `HTTP 403`) instead of silently opening a tab.
- **Diagnostics**: the Diagnostics text has a `manager` block (handler, whether `GM_download` / `GM_xmlhttpRequest` exist, `downloadMode`, and the last 25 manager errors). Send it with a bug report.

### Changed
- **"Get size & duration" button removed.** Size and duration are looked up automatically for every row of the Download tab (also while the script is Off), independent of the *Video info* setting. Nothing is downloaded: only `HEAD`, a tiny `Range` request (first 16 KB, plus the 8 KB `moov` tail when needed) or the browser's own metadata reading.
- **One lookup chain for both hosts**: cache (IndexedDB) → `HEAD` → tiny `Range` → duration read by a detached `<video preload="metadata">` (needs no CORS). Another host goes through `GM_xmlhttpRequest`, the same host through `fetch`; each is the fallback of the other. This is what gives `up.shahvani.com` a size.
- **Cache first**: after a reload the rows are filled from IndexedDB before any request is made (zero requests when everything is cached).
- **Failed lookups are retried** automatically: up to 3 tries, 15 s then 30 s apart; then the row stays `-- MB` and no more requests are made.
- **Videos opened on the page** (tap, *Unlock & Load All*) now also ask for their size, so the lock card gets size and duration, not only duration.
- **Downloads of other-host videos** (`up.shahvani.com`):
  1. `GM_download` with the file name from the link and the page as `Referer` (hotlink protection);
  2. if the manager fails: the file is read through `GM_xmlhttpRequest` and saved by Firefox from a blob link (limit 200 MB on Android, 800 MB elsewhere; bigger files skip this step);
  3. if that also fails: red message with both reasons, link copied to the clipboard, and the link opened in a tab.
  Manager downloads run one at a time for batches, so the browser is not flooded.
- `shahvani.com` videos are unchanged: plain `<a download>` straight into Firefox's download queue.

### Fixed
- Range probe through the manager could pull a whole file when the server ignored `Range` (guarded: a body is requested through the manager only after `HEAD` reports `Accept-Ranges: bytes`).
- A failed lookup was never retried.
- Auto probe had no duration fallback, and the size of another host was only tried (as a cross-origin `HEAD`) after a tap.
- When the popup was blocked, the tab fallback gave no feedback; the link is now also copied and a message is shown.
- A race could send requests before the IndexedDB cache was read.
- Lookups that could not be aborted / were not persisted (now cancel on stop and are saved to the cache).

### Known limitations
- **Not tested in real Firefox.** Tested with jsdom (mocked Tampermonkey) and desktop Chromium (card size, thumbnails, phone-size viewports). Whether `GM_*` works under `@sandbox raw` in Firefox is not documented by Tampermonkey; the fallbacks (blob download, link copy + tab) exist for that case.
- The real cause of the 3.6.1 `up.shahvani.com` download failure is unknown (manager settings, hotlink protection, or slow native start). If it still fails, open Diagnostics and send the `manager` block and the red message text.
- Tampermonkey must have *Downloads* enabled and `mp4` in its whitelist for step 1.
- A server that answers neither `HEAD` nor `Range` shows the duration only (size stays `-- MB`).
- Playlist (`.m3u8` / `.mpd`) and blob / MediaSource videos have no direct file.
- Links keep their query token; a time-limited token may expire before a late download.

## [3.6.1] - 2026-11-23

### Added
- **Download from `up.shahvani.com`** (and any other host):
  - `shahvani.com` videos: unchanged, plain `<a download>` → Firefox download manager.
  - `up.shahvani.com` videos: `GM_download` with the file name taken from the link (`qchuoafyxn.mp4`).
  - If the manager refuses (disabled / extension not whitelisted / no permission) the video opens in a new tab and a message shows the manager's error code. Without any manager the same tab fallback is used.
  - Download icon and *Download Selected* are now enabled for every real link; each row says how it will be downloaded.
- **Size & duration for both hosts**: tiny Range probe (first 16 KB, plus the 8 KB `moov` tail when needed) goes through `GM_xmlhttpRequest` for another host (no CORS limit), through `fetch` for the same host, each as fallback of the other. If the server ignores Range the body is never pulled (headers only). If the probe cannot read a file the **duration** is read by the browser itself from a detached `<video preload="metadata">` (needs no CORS).
- **Get size & duration** button in the Download tab (user-started; also runs by itself only when *Video info* is set to Auto). Every video is asked at most once per page.
- **Live rows**: thumbnail, duration and size are written into the row the moment they become known (no menu re-open). The list also picks up videos the page adds later (also while the script is Off).
- **Duration and size are always in the row**: chips show `--:--` / `-- MB` until known.
- **Persistent cache**: thumbnails (small JPEG), durations and sizes are kept in IndexedDB (store `thumbnails`, DB v3, existing data is kept) and restored per video after a reload, without any request.
- **Unlock & Load All Videos** keeps playback held: after it, the site cannot start a video (`play()`, `autoplay`) until your first tap on the page or 30 s; taps on the Ultra Lite panel do not count.

### Changed
- **Lock card size is fixed**: 734 x 413 (16:9) from the stylesheet only; independent of the real video, identical after load and re-release. On a screen narrower than 734 px the card shrinks proportionally (same 734:413 ratio).
- **Thumbnails show the whole picture**: no more centre crop. The stored image keeps the video's real proportions (longest side 240 px); the row shows it with `object-fit: contain` (portrait, 4:3, square, 16:9 all complete). Width adapts to the screen (76-112 px); 16:9 placeholder until a thumbnail exists. Images are not draggable / selectable, so a long-press on Firefox Android does not open the image menu.
- **Download tab** is now second: Overview, **Download**, Video, Frames, ...
- **Release** works on any unlocked video, playing or not: it stops it and puts it back behind its card (ended videos restart from the beginning next time). It also cancels a running *Unlock & Load All*.
- *Unlock & Load All* unlocks only (`preload=auto`, never plays) and is repeatable in any order with Release.
- Direct links to a video / audio / image opened on its own (for example an `up.shahvani.com` link in a tab) are left alone by the script.

### Fixed (found while reviewing 3.6.0)
- Release ignored videos that were not paused.
- Videos opened by *Load All* were never auto-released (no pause time recorded).
- `fullLoad` could stay set after an early return, making a later normal tap preload everything.
- A site script could start playback right after *Load All* unlocked a video.
- *Release* during a running *Load All* left the rest of the run going.
- Lock cards were sized from the video's geometry / cached ratio, so some cards were very tall.
- Thumbnails vanished after a reload and appeared only after closing / reopening the menu.
- Download rows showed duration / size only when the tab was rebuilt.

### Known limitations
- Thumbnails come only from a poster the page already loaded or a frame already decoded (nothing is requested for them). A cross-origin poster/frame without CORS is shown from memory only (cannot be exported), so it is not restored after a reload.
- Size of an `up.shahvani.com` video needs `GM_xmlhttpRequest` or a server that allows CORS; without both only the duration is shown (size stays `-- MB`).
- Playlist (`.m3u8` / `.mpd`) and blob / MediaSource videos have no direct file.
- Links keep their query token; a time-limited token may expire before a late download.
- Tampermonkey's own download settings apply to `up.shahvani.com` downloads (Downloads must be enabled and `mp4` whitelisted); otherwise the tab fallback is used.
- Tested with automated jsdom tests and in desktop Chromium (including phone-size viewports); not in real Firefox.

## [3.6.0] - 2026-11-22

### Added
- **Download tab** (new, between Video and Frames). Lists every video of the page in DOM order with the same
  numbers as the lock cards, a thumbnail when one is available, duration/size when known, and a checkbox.
  - **Download Selected**: sends the selected videos to Firefox's own download manager (plain `<a download>`
    clicks, 500 ms apart; more than 10 needs a second tap). The selection is not cleared afterwards.
  - **Copy Selected Links**: one link per line, ready for external download managers. Reports how many links
    were copied and how many videos had none. Falls back to `execCommand`, then to a manual-copy box.
  - **Per-video actions**: Download and Copy icons (with tooltips) on every row.
  - **Select all / Deselect all**; counter and tab label (`Download (3)`) update in place.
  - Works while the script is **Off** (the list is read from the DOM, nothing depends on the lock engine).
  - Nothing is requested to build the list: thumbnails are drawn from a poster the page already loaded or from a
    frame the opened video already decoded; locked videos are never opened to read their links.
  - The selection survives DOM changes and reloads of the tab (`sessionStorage`, up to 300 items).
- **Unlock & Load All Videos** (Overview > Quick Actions, under Release): activates every locked video one after
  the other and starts buffering (`preload=auto`). Not a download to disk. Needs a second tap, with a stronger
  warning above 20 videos. Release is unchanged.

### Changed
- **Theme Color** replaces *Accent Color* and *Preset* (one control, 8 swatches: accent + optional surface tint).
- The old "Theme" (System / Dark / Light) row is now called **Mode**.
- `confirmButton` accepts a dynamic label and can run at once when nothing needs confirming.
- `copyText` has an `execCommand` fallback.

### Removed
- Accent Color and Preset settings (`accent`, `themePreset`), `ACCENTS`, `THEME_PRESETS`, `applyThemePreset()`.

### Migration
- Settings saved by 3.5.x are converted on load: a non-custom preset maps to the same-named Theme Color;
  a custom accent maps to the nearest swatch. Everything else is kept. Import of old exports is migrated too.
- A custom accent that equals a preset colour now also gets that preset's surface tint.

### Known limitations
- Direct download works only for links on the page's own origin (`shahvani.com` page -> `shahvani.com` video).
  Another origin (e.g. `www.` vs apex) disables the Download icon; Copy still works.
- Playlist (`.m3u8` / `.mpd`) and blob / MediaSource videos have no direct file and are marked accordingly.
- Links keep their query token; a time-limited token may expire before a late download.
- Thumbnails exist only for videos whose poster has loaded (or that were opened); others show a placeholder.

## [3.5.5] - 2026-11-19

### Fixed
- **Aspect-ratio & min-height not applied** — inline styles now use `setProperty(..., 'important')` in `makePlaceholder` and when reading ratio from cache, overriding the stylesheet `!important` rules. Unloaded `<video>` (300×150) is ignored for aspect-ratio calculation to prevent 2:1 cards.
- **FAB vertical drag (`y` → `fabY`)** — old `y` setting was set but never used in CSS. Replaced with `fabY` (0=top, 1=bottom, default 1). Position calculated as `bottom: calc(16px + (1 - var(--fab-y, 1)) * (100% - 86px))`. Drag updates only position/side via `applyFabPosition()`, no full theme re-apply on every `pointermove`. Migration: old `y` ignored, button returns to bottom once.
- **Theme preset persistence** — `applyThemePreset` set accent but `applyUITheme`/`applyPageTheme`/`updateDynamicStyle` rewrote it on every `applyAll`. New `effectiveAccent()` returns the real color; non-default/custom presets now color card surfaces too (via `color-mix`). Color dots and preset clicks use single `setOpt`. `aria-pressed` on color dots from `effectiveAccent()`.
- **Inverted neumorphic option** — base style was inverted; classic raised neumorphic was missing. Added `:not(.shv-inverted-neumorphic)` rules for classic look (raised base, more raised on hover, pressed on touch).
- **Probe size for non-video files** — `.m3u8`/`.mpd` or error pages with HTTP 200 showed response length as "video size". `probeRange` now returns `content-type`; unknown container + not `video/*` → size 0, not displayed.
- **`probeActive` counter leak** — chain `.then(ok, err).then(() => probeActive--)` could skip decrement if first handler threw. Moved `applyProbeResult` into `try/catch` with decrement in `.finally`.
- **Resume race condition** — if browser cache caused `loadedmetadata` before IndexedDB read, resume was silently ignored. New `seekWhenReady` checks `readyState >= 1` first for immediate seek; otherwise waits for `loadedmetadata`. If user already sought (`currentTime > 1`), no jump.

### Changed
- **Settings migration**: `y` key removed, `fabY` added (0-1, default 1). `IDB_VERSION` unchanged (still 2). Storage key `shvUltraLite.settings.v3` unchanged.
- **Minor improvements**:
  - Resume record deleted after watched to end (<3s from end or `ended` event). New `idbDeleteResumePosition`.
  - Resume setting respected: when off, in-memory resume after release also skipped.
  - `fetch` with URL object — `.href` now read alongside `.url` to avoid ad blocker rejection.
  - Picture-in-Picture exception — `pauseHidden` doesn't pause `document.pictureInPictureElement` (Firefox PiP uses different API, no effect there).
  - Opacity slider saves only on `change` (release), not every `input`.
  - Constant `MAX_CUSTOM_AD_HOSTS` used in `sanitize` (was `MAX_ID_LENGTH`; both 200, behavior unchanged).
  - Persian typo: "نوماورفیک" → "نومورفیک".
  - Removed "performance profiles" from description (not in UI).
- **Bundle size**: ~118KB (same as v3.5.4)

### Tests
- `node --check`: syntax OK.
- jsdom smoke test (28 checks): `fabY` default/migration, left/right FAB classes, drag+clamp, position save, preset color persistence, `!important` aspect-ratio, classic CSS class present, no orientation lock remnants.
- **Not done**: real Firefox (Android + Windows) test — layout, touch behavior, resume/probe on real video require manual device test.

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

## [3.5.3] - 2026-11-18

### Added
- **Zero-download video locking** — complete prevention of any video data transfer before explicit user click. Verified 0 requests / 0 bytes for locked videos across all test scenarios (5 videos with `src`, 3 with `<source>`, lazy-loaded `data-src`, site JS `preload=auto`/`load()`/`play()`, SPA rendering, dynamic JS additions, 30 videos in large page).
- **Simultaneous startup at `document-start`** — MutationObserver on `document` waits for `<html>` before any scanning; observer created before initial scan; nothing waits for IndexedDB initialization.
- **True source removal with native `load()`** — locked videos have `src` and `<source src>` removed, `poster` removed, `preload=none`, and native `load()` called to abort in-flight loads per HTML spec.
- **Browser-level guards for locked/unseen videos** — `load()` and `play()` blocked, `preload` forced to `none`, `autoplay` ignored, videos created via `createElement` start with `preload=none`. Blob/MediaSource videos left untouched.
- **HEAD/Range only after click on same video** — size probe runs only when user clicks a locked video; no network requests during locking.
- **Deterministic FNV-1a `hashKey()`** — replaces `Date.now()`-based key; stable across sessions, enables true cache hits.
- **IndexedDB v2 with per-video resume** — `IDB_VERSION=2`, new `videoMetadata` store, cache save on pause and `pagehide`, per-video (not per-page) resume.
- **DOM-order video numbering** — stable index assigned per unique video in DOM order; fixed `<source>`-only videos all showing index 1.

### Fixed
- **v3.5.2 downloaded videos despite locking** — root causes eliminated: early startup, `preloadFirstNForDuration` removed, `fetchVideoSize` removed from lock path, `src` removal + `load()` call, browser guards, IDB v2 with deterministic keys.
- **Video size/duration from cache on revisit** — instant display from IndexedDB without any network request (verified 2.7 MB size + 0:12 duration from cache on second visit).
- **Double-encoded HTML entities** — `html.unescape()` called twice for index/alt text.
- **Infinite mutation loop** — writing `preload=none` twice no longer creates new mutation records.
- **Missing i18n keys** — added `emergency`, `reload`, `blockedScripts`, `blockedRequests`, `popupsBlocked`, `resources`, `cleaned`, `detached`; fixed typo "است اسکریپت" → "اسکریپت است".

### Removed
- **`preloadFirstNForDuration` setting entirely** — configuration, UI control in Look tab, menu row, and all related logic (the menu row had no handler).
- **HEAD/Range probes from lock path** — `fetchVideoSize` no longer runs during locking.
- **`data-src`/`data-lazy-src` handling** — removed as noise attributes.

### Changed
- **Video deferral flow**: Simultaneous observer + scan → lock with `src`/`<source>` removal + `load()` → on click: restore sources → HEAD for size cache → `preload=metadata` → play.
- **State**: Added `preloadedForDuration` counter removed; `videoIndexMap` now stable DOM-order.
- **Bundle size**: ~112KB (similar, code restructuring offset additions)

---

## [3.5.4] - 2026-11-18

### Added
- **Optional size/duration probe (`videoProbe` setting)** — three modes:
  - `off` (default): zero network requests for locked videos, cache not read — strict "nothing" rule
  - `cache`: reads local IndexedDB cache only, no network
  - `auto`: for cards in view with no cache, issues up to two tiny Range requests (first 16 KB header, then ~8 KB at moov box if behind mdat) to read size and duration; the video body stream is cancelled once the cap is read — the video itself is never downloaded
- **Probe concurrency control** — `PROBE_CONCURRENCY=2`, session cap `PROBE_SESSION_MAX=120` (~3 MB worst case), per-page session cache (`probeSession`) to avoid re-probing same video
- **IntersectionObserver integration** — probe only queues for cards in view (200px margin); scrolled-away cards drop from queue
- **New i18n keys** — `probeMode`, `probeModeD`, `probeOff`, `probeCache`, `probeAuto`, `probeTraffic` (EN/FA)
- **UI control in Look tab → Video Metadata** — dropdown with Off / Cache only / Auto, enabled when `showVideoInfo` is on

### Changed
- **Video deferral flow**: `commitVideoDefer` → placeholder insert → `probeObserve` (auto mode) → cache lookup (cache/auto) → probe queue when in view → `detachVideoSources` with native `load()` call. Locked videos in `off` mode (default) do **nothing** at all: no preload=metadata, no HEAD, no Range, no cache read.
- **`fetchVideoSize`** — now only runs after user clicks a locked video (to cache size for next visit); never during locking.
- **`saveVideoCache` merge logic** — values learned in any mode merge with existing cache; a value learned in `off` mode never erases one learned earlier.
- **`updatePlaceholderInfo`** — badges hidden until they have content; no empty pills shown.
- **Settings** — new `videoProbe` enum (`off` | `cache` | `auto`), default `off`. Requires `showVideoInfo` enabled.
- **Bundle size**: ~118KB (+6KB for probe core, IntersectionObserver, EBML/MP4 parsing)

### Fixed
- **v3.5.3 cache key stability** — confirmed `hashKey` (FNV-1a) is deterministic; `IDB_VERSION=2` retained.
- **Probe never downloads the video** — body stream cancelled via `reader.cancel()` after reading the capped bytes (16 KB header, 8 KB tail).
- **Infinite mutation loop** — `forceNoPreload` only writes when value changes.
- **Probe re-queues on scroll** — card scrolled away and back re-enters view and is considered again.

---

## [3.5.3] - 2026-11-18

### Added
- **Instant duration display for first N videos** — new `preloadFirstNForDuration` setting (default: 3) uses `preload="metadata"` on first N deferred videos to get duration immediately via `loadedmetadata` event without full download.
- **`preloadFirstNForDuration` UI control** — number input in Look tab → Video Metadata section (range: 0-20).
- **Cache population on metadata load** — when `loadedmetadata` fires during preload, duration/aspectRatio saved to IndexedDB cache for instant display on subsequent visits.

### Fixed
- **Duration not showing until user plays video** — Layer 3 (`loadedmetadata` on user activation) now supplemented by preload for first N videos, eliminating need for manual play to see duration.
- **Double-encoded HTML entities in tooltip** — `html.unescape()` called twice for index/alt text.
- **Cache key Unicode errors** — confirmed `hashKey()` handles all video URLs correctly.

### Changed
- **Video deferral flow**: First N videos get `preload="metadata"` instead of `preload="none"`; rest remain `preload="none"`.
- **State**: Added `preloadedForDuration` counter to track preloaded videos per session.
- **Bundle size**: ~112KB (+1KB for preload logic and UI control)

---

## [3.5.1] - 2026-11-17

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