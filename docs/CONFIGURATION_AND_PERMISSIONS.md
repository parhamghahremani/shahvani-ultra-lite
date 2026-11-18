# Configuration & Permissions — Shahvani Ultra Lite

## Tampermonkey Metadata Block

```javascript
// ==UserScript==
// @name         Shahvani Ultra Lite
// @namespace    local.shahvani.ultralite
// @version      3.5.4
// @description  Tap-to-load media, bilingual EN/FA, performance profiles, IndexedDB storage, theme presets, video resume, video metadata cache, optional light size/duration probe (off by default). Locked videos download nothing unless the probe is set to Auto.
// @author       parham
// @homepageURL  https://github.com/parhamghahremani
// @match        *://shahvani.com/*
// @match        *://*.shahvani.com/*
// @run-at       document-start
// @grant        none
// @icon         data:image/svg+xml;base64,...
// ==/UserScript==
```

---

## @grant none — No Special Permissions

This userscript requests **zero grants**. All functionality uses standard Web APIs:
- `localStorage` / `IndexedDB` — settings & cache persistence
- `MutationObserver` — DOM monitoring
- `IntersectionObserver` — viewport detection for probe
- `fetch` / `XMLHttpRequest` — network requests (HEAD, Range)
- `HTMLMediaElement` — video/audio control
- `CSSStyleSheet` — dynamic style injection
- `PerformanceObserver` — (removed in v3.5.1) long task monitoring

---

## @match Patterns

```
*://shahvani.com/*
*://*.shahvani.com/*
```

Covers:
- `https://shahvani.com/`
- `https://www.shahvani.com/`
- `https://m.shahvani.com/`
- Any subdomain

---

## @run-at document-start

**Critical for zero-download guarantee:**
1. CSS injected before `<html>` parsed → placeholders styled immediately
2. MutationObserver on `document` catches `<html>` creation
3. Initial scan runs before any `<video>`/`<iframe>` can load
4. No race condition with site's own scripts

---

## Settings Schema (v3)

### Core Settings
```javascript
{
  enabled: true,                    // Master toggle
  lockVideo: true,                  // Lock videos until tap
  instantLock: true,                // Lock immediately on appearance
  showPoster: true,                 // Show poster on placeholder
  noAutoplay: true,                 // Block autoplay/preload
  autoPause: true,                  // Pause non-user-initiated playback
  singlePlayback: true,             // One video at a time
  resumePosition: true,             // Resume from last position
  pauseHidden: false,               // Pause when tab hidden
  lockAudio: false,                 // Lock audio players
  autoRelease: false,               // Auto-release idle videos
  autoReleaseMin: 5                 // Minutes before auto-release
}
```

### Frame Settings
```javascript
{
  lockFrames: true,                 // Lock iframes until tap
  lockSameSite: true                // Also lock same-site frames
}
```

### Ad/Tracker Settings
```javascript
{
  hideKnownAds: true,               // Filter known ad iframes
  hideAdsFully: false,              // Hide ad placeholders completely
  blockAdScripts: true,             // Block ad scripts
  blockAdRequests: true,            // Block ad network requests
  blockTrackers: false,             // Block analytics trackers
  cosmeticAds: true,                // CSS hide ad containers
  blockPopups: true,                // Block window.open without gesture
  customAdHosts: []                 // User-added ad domains
}
```

### Page Optimization Settings
```javascript
{
  lazyImages: true,                 // Lazy-load off-screen images
  asyncDecode: true,                // Async image decode
  smartCards: false,                // content-visibility on repeated cards
  calmMotion: true,                 // Reduce CSS animations
  flatEffects: false                // Disable backdrop-filter
}
```

### UI Settings
```javascript
{
  lang: 'en',                       // 'en' | 'fa'
  theme: 'system',                  // 'system' | 'dark' | 'light'
  accent: '#00d4aa',                // Hex color
  scale: 'm',                       // 's' | 'm' | 'l'
  compact: false,                   // Compact panel
  calmMenu: false,                  // Reduce menu animation
  side: 'left',                     // 'left' | 'right' (FAB)
  y: 0.8,                           // FAB vertical position (0-1)
  idle: 0.9                         // FAB idle opacity
}
```

### v3.3.0+ Settings
```javascript
{
  themePreset: 'default',           // 'default' | 'midnight' | 'forest' | 'sunset' | 'monochrome' | 'custom'
  showFabStats: true                // FAB tooltip stats
}
```

### v3.4.0+ Settings
```javascript
{
  showVideoIndex: true,             // Show video number badge
  showVideoInfo: true,              // Show size/duration badges
  invertedNeumorphic: true          // Flat base, raised hover
}
```

### v3.5.4 Settings
```javascript
{
  videoProbe: 'off'                 // 'off' | 'cache' | 'auto'
}
```

---

## Storage

### localStorage (Primary)
- **Key**: `shvUltraLite.settings.v3`
- **Sync**: Synchronous read at document-start
- **Quota**: ~5 MB

### IndexedDB (Backup + Extended)
- **DB**: `shvUltraLiteDB` (v2)
- **Stores**: `settings`, `resumePositions`, `blockedRequests`, `videoMetadata`
- **Quota**: Browser-dependent (hundreds of MB)
- **Private browsing**: Supported

### Migration
- Legacy `shvUltraLite.settings.v2` auto-migrated on first load
- Profile settings (`compatible`/`balanced`/`ultra`) mapped to individual flags

---

## Network Requests Made by Script

| Trigger | Request | Purpose | User Control |
|---------|---------|---------|--------------|
| User clicks locked video | `HEAD` to video URL | Cache file size for next visit | `lockVideo` must be on |
| User clicks locked video | `GET` with `Range: bytes=0-16383` | Read duration from moov (probe auto) | `videoProbe: 'auto'` + in view |
| Moov after mdat (probe auto) | `GET` with `Range: bytes=X-Y` | Read moov at known offset | `videoProbe: 'auto'` + in view |
| Never (default) | None | — | `videoProbe: 'off'` |

**No requests** for:
- Locked videos in `off` mode (default)
- Poster images (browser fetches independently)
- Ad/tracker domains (blocked)
- Analytics

---

## Content Security Policy (CSP) Compatibility

Script uses no `eval`, `Function`, or inline scripts. Works with strict CSP:
- Style injection: `<style>` element (not `style` attribute)
- No `unsafe-inline` needed for script
- No `unsafe-eval` needed

---

## Browser Compatibility

| Feature | Firefox | Chrome | Safari | Edge |
|---------|---------|--------|--------|------|
| `document-start` | ✅ | ✅ | ✅ | ✅ |
| `IndexedDB` | ✅ | ✅ | ✅ | ✅ |
| `MutationObserver` | ✅ | ✅ | ✅ | ✅ |
| `IntersectionObserver` | ✅ | ✅ | ✅ | ✅ |
| `fetch` + `Range` | ✅ | ✅ | ✅ | ✅ |
| `ReadableStream` | ✅ | ✅ | ✅ | ✅ |
| `beforescriptexecute` | ✅ | ❌ | ❌ | ❌ |
| `WeakMap`/`WeakSet` | ✅ | ✅ | ✅ | ✅ |

**Notes:**
- `beforescriptexecute` Firefox-only; script degrades gracefully
- Tampermonkey/Violentmonkey polyfill some APIs
- Primary target: Firefox Desktop + Android

---

## Privacy

- **No external requests** to script author or third parties
- **No analytics**, no tracking, no telemetry
- **All data local**: settings, cache, resume positions, blocked logs
- **No account**, no sync, no cloud
- **Open source**: Full code visible in userscript