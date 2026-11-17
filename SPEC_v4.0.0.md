# Shahvani Ultra Lite v4.0.0 — Complete Specification

## Executive Summary

Based on extensive research of shahvani.com, the site is **primarily a text/photo forum with external video links**, NOT a video-hosting platform. Videos are accessed via:
- **External URL shorteners** (ouo.io) → redirect to off-site hosts
- **Direct MP4 links** on `up.shahvani.com` (upload center, VIP only)
- **Thumbnail images** acting as visual bait for external links

**Critical Finding**: No embedded `<video>` or `<iframe>` players exist in forum topics. The "double-loading" bug reported in v3.1.0 was based on a misunderstanding — the "ویدیو" text placeholders are simply Persian text descriptions, not dynamic video injection.

## Site Architecture Analysis

### Content Sections
| Section | URL Pattern | Media Type | Video Embeds |
|---------|------------|------------|--------------|
| Homepage | `/` | Navigation, logos (WebP) | None |
| Stories | `/dastans` | Text only | None |
| Photos/Galleries | `/photos` | Direct images (JPG/WebP/GIF) | None |
| Forum Index | `/forum` | Topic links + 2 ad banners | None |
| Forum Topics | `/forum/topic/{slug}` | Text + thumbnails + ouo.io links | **None** (external links only) |
| Video Category | `/talar/26` | Topic listings | None |
| Chat | `chat.shahvani.com` | Text chat | None |
| Upload Center | `up.shahvani.com` | Direct MP4 (VIP) | Direct links only |

### Video Loading Reality
- **NO dynamic video injection** occurs on forum topics
- **NO HTML5 `<video>` elements** in any forum topic
- **NO `<iframe>` video players** embedded
- **NO JavaScript video loaders** detected
- The "ویدیو" text is simply Persian word "video" in post descriptions
- Videos are **always external links** requiring navigation away from shahvani.com

### Ad Structure
- **2 banner ads** on forum pages: `delrobai.com`, `aksexy.com` (iframe-based)
- **No video ads** detected
- **No inline video ads** in topics

## Architecture Requirements for v4.0.0

### Core Philosophy
1. **Always-active, zero-false-positive detection** — Since no embedded videos exist, the script should focus on:
   - Blocking ad iframes (2 known banners)
   - Optimizing images (lazy-load, WebP/AVIF detection)
   - Providing download helpers for external video links
   - Preventing any future video embeds if site changes

2. **Complete video prevention** — User requirement: "Absolutely no video downloads or displays until I click"
   - Block all `<video>` elements (current + future)
   - Block all `<iframe>` with video sources
   - Block autoplay on any media
   - Tap-to-load placeholders for ANY media

3. **Bilingual UI** — English default, Persian toggle
4. **Maximum customization** — Granular controls for every aspect
5. **Minimal resource usage** — <10KB gzipped, <5ms init

### Feature Matrix

#### Media Control (Core)
| Feature | Description | Default | User Control |
|---------|-------------|---------|--------------|
| Video Blocking | Block ALL `<video>` elements, replace with tap-to-load placeholder | ON | Per-element + global toggle |
| Iframe Blocking | Block ALL `<iframe>` elements, tap-to-load | ON | Per-element + global + domain whitelist |
| Ad Iframe Filter | Auto-block known ad domains (delrobai, axsexy) | ON | Domain list editor |
| Autoplay Prevention | Block non-user-initiated playback globally | ON | Toggle |
| Image Lazy-Load | Add `loading=lazy` + `fetchpriority=low` to off-screen images | ON | Profile-based |
| WebP/AVIF Skip | Don't lazy-load already-optimized formats | ON | Toggle |
| Content-Visibility | Ultra profile: `content-visibility: auto` on repeated cards | Ultra only | Profile selector |

#### Download Helpers (New v4.0.0)
| Feature | Description |
|---------|-------------|
| ouo.io Bypass | Detect ouo.io links, show direct destination preview |
| Direct MP4 Detection | Find `up.shahvani.com` MP4 links, offer direct download |
| Video Link Scanner | Scan page for video URLs, list in panel with download buttons |
| Batch Download | Select multiple video links, download as ZIP |

#### UI/UX (Complete Rewrite)
| Feature | Specification |
|---------|---------------|
| **Language** | English default, Persian toggle (i18n system) |
| **Theme** | System/Dark/Light/Auto + Custom color picker |
| **Panel Layout** | Draggable, resizable, 5 tabs: Overview, Media, Downloads, Appearance, Advanced |
| **Compact Mode** | Collapsible sections, mini-FAB |
| **Animations** | Framer-motion style: stagger, spring, reduced-motion respect |
| **Keyboard Shortcuts** | `Alt+S` open panel, `Alt+V` toggle video block, `Alt+I` toggle images |
| **Touch Optimized** | 44px tap targets, swipe gestures, haptic feedback |
| **Accessibility** | Full ARIA, focus management, screen reader announcements |

#### Profiles (4 Levels)
| Profile | Video | Iframe | Images | Effects | Cards | Use Case |
|---------|-------|--------|--------|---------|-------|----------|
| **Minimal** | Block | Block | Native | None | None | Maximum compatibility |
| **Balanced** | Block | Block | Lazy | Reduce | None | Daily driver |
| **Performance** | Block | Block | Lazy+Priority | Remove | Content-visibility | Slow devices |
| **Maximum** | Block+Download | Block+Whitelist | Lazy+Priority+WebP | Remove | Content-visibility+Preload | Power users |

#### Advanced Features (v4.0.0 New)
| Feature | Description |
|---------|-------------|
| **Domain Rules Engine** | Per-domain: block/allow/video-quality/redirect rules |
| **Element Picker** | Click any element to create custom rule (video, iframe, image, ad) |
| **Statistics Dashboard** | Real-time: blocked count, bandwidth saved, time saved, DOM mutations |
| **Export/Import Settings** | JSON backup, shareable profiles |
| **Update Notifications** | Check for script updates, changelog preview |
| **Debug Console** | Live mutation log, performance metrics, element inspector |
| **User Scripts** | Inject custom CSS/JS per domain (advanced) |
| **Cloud Sync** | Optional: sync settings via GitHub Gist |

### Technical Architecture

#### State Management
```javascript
// Single source of truth
const state = {
  // Settings (persisted)
  settings: { profile, language, theme, ... },
  
  // Runtime (not persisted)
  media: new Map(),        // element -> MediaEntry
  images: new Map(),       // element -> ImageEntry
  downloads: new Map(),    // url -> DownloadEntry
  rules: new Map(),        // domain -> RuleSet
  
  // UI
  ui: { panel, fab, tabs, ... },
  
  // Performance
  perf: { mutations: 0, scans: 0, blocked: 0, saved: 0 }
}
```

#### MediaEntry (Unified)
```javascript
{
  id: uniqueId,
  element: HTMLVideoElement | HTMLIFrameElement,
  kind: 'video' | 'iframe',
  status: 'blocked' | 'loading' | 'loaded' | 'released' | 'error',
  sources: [{ url, type, quality }],
  placeholder: HTMLElement,
  geometry: { aspectRatio, width, height, poster },
  metadata: { title, domain, isAd, isExternal, directUrl },
  timestamps: { detected, blocked, loaded },
  userAction: false  // true if user clicked to load
}
```

#### MutationObserver Strategy
```javascript
// ALWAYS observe these attributes (never lightweight mode)
const ATTRIBUTE_FILTER = [
  'src', 'data-src', 'data-lazy-src', 'data-original',
  'srcset', 'autoplay', 'preload', 'loading', 'srcdoc'
];

// Observe document.documentElement with:
// { subtree: true, childList: true, attributes: true, attributeFilter: ATTRIBUTE_FILTER }

// Batch processing: 160ms debounce, collapseRoots optimization
```

#### Initialization Order (document-start)
1. Inject CSS immediately (blocking styles for .shv-blocked)
2. Initialize settings from localStorage (v4 key with migration)
3. Create FAB + Panel (hidden initially)
4. Full DOM scan on DOMContentLoaded
5. MutationObserver attach
6. LongTaskObserver (if supported)
7. Keyboard/touch listeners

#### CSS Architecture (CSS Variables + Layers)
```css
@layer shv-base, shv-theme, shv-components, shv-animations, shv-utilities;

:root {
  --shv-bg: #0f172a;
  --shv-surface: #1e293b;
  --shv-border: #334155;
  --shv-text: #f1f5f9;
  --shv-muted: #94a3b8;
  --shv-accent: #22d3ee;
  --shv-accent-weak: #0891b2;
  --shv-danger: #f87171;
  --shv-success: #4ade80;
  --shv-radius: 12px;
  --shv-shadow: 0 8px 32px #0008;
  --shv-transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --shv-z-fab: 2147483640;
  --shv-z-panel: 2147483647;
}
```

### Settings Schema (localStorage: `shvUltraLite.v4`)

```json
{
  "version": 4,
  "profile": "balanced",
  "language": "en",
  "theme": "system",
  "compact": false,
  "animations": true,
  "video": {
    "blockAll": true,
    "blockAutoplay": true,
    "showPlaceholders": true,
    "placeholderStyle": "minimal",
    "whitelist": [],
    "blacklist": []
  },
  "iframe": {
    "blockAll": true,
    "blockAutoplay": true,
    "showPlaceholders": true,
    "adFilter": true,
    "adDomains": ["delrobai.com", "aksexy.com", ...],
    "whitelist": [],
    "blacklist": []
  },
  "images": {
    "lazyLoad": true,
    "fetchPriority": true,
    "skipOptimized": true,
    "showPlaceholders": false,
    "webpAvifSkip": true
  },
  "downloads": {
    "enabled": true,
    "bypassOuio": true,
    "detectDirectMp4": true,
    "showInPanel": true,
    "batchDownload": false
  },
  "advanced": {
    "contentVisibility": "auto",
    "mutationLogging": false,
    "performanceMonitoring": true,
    "customCss": "",
    "customJs": "",
    "domainRules": {}
  },
  "ui": {
    "panelPosition": "bottom-right",
    "panelSize": "medium",
    "showStats": true,
    "showShortcuts": true,
    "hapticFeedback": true
  }
}
```

### Internationalization System

```javascript
const i18n = {
  en: {
    appName: "Shahvani Ultra Lite",
    version: "Version",
    tabs: { overview: "Overview", media: "Media", downloads: "Downloads", appearance: "Appearance", advanced: "Advanced" },
    profiles: { minimal: "Minimal", balanced: "Balanced", performance: "Performance", maximum: "Maximum" },
    actions: { blockVideo: "Block Videos", blockIframe: "Block Iframes", lazyImages: "Lazy Images", ... },
    stats: { blocked: "Blocked", saved: "Bandwidth Saved", time: "Time Saved" },
    placeholders: { video: "Tap to load video", iframe: "Tap to load embed", released: "Released — tap to reload", adBlocked: "Ad blocked — tap to load", emergency: "Emergency mode active" }
  },
  fa: { ... }  // Full Persian translation
}
```

### Performance Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial scan | < 5ms | `performance.mark()` |
| Bundle size | < 15KB gzipped | webpack/bundle analyzer |
| Memory (steady) | < 100KB | DevTools heap snapshot |
| Mutation processing | < 1ms/batch | LongTaskObserver |
| UI open animation | < 300ms | frame timing |
| Settings load | < 1ms | localStorage timing |
| Zero main-thread blocking | 0 long tasks | PerformanceObserver |

### File Structure

```
shahvani-ultra-lite/
├── src/
│   ├── shahvani-ultra-lite.user.js    # Main entry (ESM, bundled)
│   ├── core/
│   │   ├── settings.js                # Settings management + migration
│   │   ├── state.js                   # Central state store
│   │   ├── observer.js                # MutationObserver + batching
│   │   ├── media.js                   # Video/iframe handling
│   │   ├── images.js                  # Image optimization
│   │   ├── downloads.js               # Download helpers
│   │   └── rules.js                   # Domain rules engine
│   ├── ui/
│   │   ├── panel.js                   # Main panel controller
│   │   ├── tabs/                      # Tab components
│   │   ├── components/                # Reusable UI components
│   │   ├── themes.js                  # Theme system
│   │   └── i18n.js                    # Internationalization
│   ├── utils/
│   │   ├── dom.js                     # DOM helpers
│   │   ├── perf.js                    # Performance monitoring
│   │   ├── storage.js                 # localStorage wrapper
│   │   └── url.js                     # URL parsing
│   └── styles/
│       └── main.css                   # Source CSS (postcss)
├── versions/
│   ├── v1.0.0.user.js
│   ├── v2.0.0.user.js
│   ├── v3.0.0.user.js
│   ├── v3.1.0.user.js
│   ├── v3.2.0.user.js
│   └── v4.0.0.user.js
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── fixtures/
├── dist/                              # Build output
├── CHANGELOG.md
├── LEARNED.md
├── SPEC_v4.0.0.md                    # This file
├── package.json
├── rollup.config.js                   # Bundler
└── playwright.config.js
```

### Build Pipeline (Rollup)

```javascript
// rollup.config.js
export default {
  input: 'src/shahvani-ultra-lite.user.js',
  output: {
    file: 'dist/shahvani-ultra-lite.user.js',
    format: 'iife',
    banner: userscriptHeader,
    compact: true
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({ compress: { passes: 3 }, mangle: true }),
    cssnano({ preset: 'advanced' })
  ]
}
```

### Testing Matrix

| Viewport | Browser | Test Cases |
|----------|---------|------------|
| Desktop 1920×1080 | Firefox | All features |
| Desktop 1366×768 | Firefox | Responsive UI |
| Mobile 375×812 | Firefox Android | Touch, FAB, panel |
| Mobile 412×915 | Firefox Android | Large phone |
| Tablet 768×1024 | Firefox Android | Split view |

### Migration from v3.x

- Settings key: `shvUltraLite.settings.v3` → `shvUltraLite.v4`
- Auto-migrate: profile, theme, compact, hideKnownAds
- New defaults for: language, animations, downloads, advanced

---

## Implementation Priority

### Phase 1: Core Engine (Week 1)
- [ ] Settings system with migration
- [ ] Central state store
- [ ] MutationObserver with batching
- [ ] Video/iframe blocking + placeholders
- [ ] Image lazy-loading
- [ ] Basic FAB + Panel (Overview tab only)

### Phase 2: UI System (Week 2)
- [ ] 5-tab panel with i18n (EN/FA)
- [ ] Theme system (CSS variables)
- [ ] Profile selector (4 levels)
- [ ] Settings persistence
- [ ] Animations + reduced-motion

### Phase 3: Advanced Features (Week 3)
- [ ] Download helpers (ouo.io, direct MP4)
- [ ] Domain rules engine
- [ ] Element picker
- [ ] Statistics dashboard
- [ ] Export/import settings

### Phase 4: Polish (Week 4)
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Documentation
- [ ] Build pipeline

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Site adds embedded videos | Medium | High | Observer catches dynamically; placeholder system ready |
| localStorage quota exceeded | Low | Medium | Try/catch, fallback to memory-only |
| Firefox Android CSS var bug | Low | Low | Fallback inline styles |
| MutationObserver overhead | Low | Medium | Batching, collapseRoots, attributeFilter |
| User breaks site with rules | Medium | Low | Validation, preview mode, reset button |

---

## Success Criteria

1. **Zero videos play without explicit user click** — Verified on all page types
2. **< 5ms initial scan** — Measured on forum topic with 50+ images
3. **< 15KB gzipped** — Bundle analyzer
4. **100% feature parity + new features** — Checklist
5. **Bilingual UI works flawlessly** — Manual test EN/FA
6. **All 4 profiles functional** — Automated test matrix
7. **Download helpers work** — Test ouo.io + direct MP4
8. **Settings persist across reloads** — Integration test

---

## Notes for Implementation

1. **Use WeakMap/WeakRef** for DOM references to prevent leaks
2. **AttributeFilter is critical** — Never reduce it (v3.1.0 mistake)
3. **Debounce everything** — 160ms visual, 120ms UI, 0ms cleanup
4. **CSS @layer** for style isolation — Prevents site style conflicts
5. **Optional chaining + nullish coalescing** — Modern JS, smaller bundle
6. **No external deps** — Pure vanilla ES2022
7. **Source maps in dev** — Rollup config for debugging
8. **Version in userscript header** — Auto-updaters need it

---

*Generated: 2026-11-03*
*Based on live site analysis of shahvani.com, forum topics, photos, stories, and chat sections*