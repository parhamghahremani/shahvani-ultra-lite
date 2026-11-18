# Specification — Shahvani Ultra Lite

## Purpose

Tampermonkey userscript for shahvani.com that implements tap-to-load media deferral, performance profiles, resource management, and a configurable control panel — all with zero external dependencies.

---

## Functional Requirements

### Media Deferral (Core)
- **Videos** (`<video>`, `<audio>` with controls): Replace with placeholder; load only on user tap
- **Iframes**: Replace with placeholder; load only on user tap (same-site optional)
- **Images**: Off-screen images get `loading=lazy` + `fetchpriority=low`; async decode

### Locking Behavior
- Lock activates at `document-start` via MutationObserver
- Locked video: `src`/`<source src>` removed, `poster` removed, `preload=none`, native `load()` called
- Browser guards: `load()`/`play()` blocked, `preload` forced `none`, `autoplay` ignored
- Blob/MediaSource videos: never touched (unsafe)
- Zero network requests for locked videos in default mode (`videoProbe: 'off'`)

### Activation (User Tap)
1. Restore original `src` and `<source>` elements
2. `fetchVideoSize()` — HEAD request to cache size for next visit (same video only)
3. `preload="metadata"` → `loadedmetadata` → save to IndexedDB cache
4. `play()` — user gesture satisfies autoplay policy

### Video Metadata Display
- **Index badge** (top-left): Sequential DOM-order number per unique video URL
- **Size badge** (bottom-left): File size from cache or probe
- **Duration badge** (bottom-right): Duration from cache or probe
- Cache key: `origin + path` (stable across query/hash changes)

---

## Performance Profiles

| Profile | CSS Effects | Images | Repeated Cards |
|---------|-------------|--------|----------------|
| Compatible | None | Eager | No |
| Balanced | Animations → 0.001ms | Lazy + low priority | No |
| Ultra | Same as Balanced | Same | `content-visibility: auto` |

---

## Ad/Tracker Filtering

- **Known ad hosts**: 30+ domains (doubleclick, googlesyndication, taboola, etc.)
- **Custom ad hosts**: User-added, persisted
- **Cosmetic hiding**: CSS `display: none` for ad containers
- **Script blocking**: `beforescriptexecute` for known ad domains
- **Request blocking**: `fetch`/`XHR`/`beacon` to ad/tracker domains
- **Popup blocking**: `window.open` refused without recent gesture

---

## Settings Persistence

- **Primary**: `localStorage` (`shvUltraLite.settings.v3`) — synchronous for document-start
- **Backup**: IndexedDB (`shvUltraLiteDB`, v2) — larger quota, private browsing
- **Migration**: Legacy v2 keys auto-migrated on first load

---

## IndexedDB Schema (v2)

| Store | Key | Indexes | Purpose |
|-------|-----|---------|---------|
| `settings` | `main` | — | Settings backup |
| `resumePositions` | `hashKey(videoKeyUrl)` | `url`, `timestamp` | Video resume time |
| `blockedRequests` | auto-inc | `timestamp`, `domain` | Blocked request log |
| `videoMetadata` | `videoMeta_` + hash | `videoSrc`, `timestamp` | Size/duration/aspectRatio cache (7-day TTL) |

---

## Size/Duration Probe (v3.5.4, `videoProbe` setting)

| Mode | Network | Cache Read | Behavior |
|------|---------|------------|----------|
| `off` | ❌ | ❌ | Strict zero-download |
| `cache` | ❌ | ✅ | Show cached only |
| `auto` | ✅ (Range) | ✅ | Cards in view: 2 requests max (16 KB header, 8 KB moov tail) |

**Probe limits**: Concurrency 2, session max 120 (~3 MB), per-page session cache prevents re-probe.

---

## UI Panel

- **FAB** (floating action button): Draggable, bottom-left/right, stats badge
- **Tabs** (7): Overview, Video, Frames, Ads, Page, Look, Data
- **Bilingual**: English (default) + Persian (RTL)
- **Themes**: System/Dark/Light + 5 presets + custom accent
- **Compact mode**: Smaller panel, hidden descriptions

---

## Non-Functional Requirements

- **Zero external dependencies** — pure DOM, IIFE, strict mode
- **Bundle size**: ~118 KB (v3.5.4)
- **Memory**: WeakMap/WeakSet for video/frame/image states; cleanup on DOM removal
- **Compatibility**: Firefox (desktop/Android) + Tampermonkey/Violentmonkey
- **Run-at**: `document-start` with immediate style injection
- **Permissions**: `@grant none`

---

## Version History

See [CHANGELOG.md](../CHANGELOG.md)