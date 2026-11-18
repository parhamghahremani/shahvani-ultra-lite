# Compatibility — Shahvani Ultra Lite

## Browser Support

| Browser | Version | Tampermonkey | Violentmonkey | Notes |
|---------|---------|--------------|---------------|-------|
| Firefox Desktop | 100+ | ✅ | ✅ | Primary target |
| Firefox Android | 100+ | ✅ | ✅ | Primary mobile target |
| Chrome Desktop | 100+ | ✅ | ✅ | Secondary |
| Edge Desktop | 100+ | ✅ | ✅ | Secondary |
| Safari | 15+ | ❌ | ✅ (Userscripts) | Limited testing |

---

## Tampermonkey / Violentmonkey Features

| Feature | Required | Fallback |
|---------|----------|----------|
| `@run-at document-start` | ✅ | — |
| `@grant none` | ✅ | — |
| `GM_xmlhttpRequest` | ❌ | Native `fetch` used |
| `GM_setValue`/`GM_getValue` | ❌ | `localStorage`/`IndexedDB` used |
| `GM_addStyle` | ❌ | `<style>` injection used |
| `unsafeWindow` | ❌ | Not used |

**No Tampermonkey-specific APIs required.** Script works with any userscript manager supporting `@run-at document-start`.

---

## shahvani.com Specifics

### Known Page Structures
- **Video players**: `<video>` with `src` or `<source>` children
- **Lazy-loaded videos**: `data-src` / `data-lazy-src` attributes (handled)
- **app-forum-topic**: Web component that renders videos twice (relative → absolute URLs)
- **SPA navigation**: Hash-based or pushState, MutationObserver handles dynamic content
- **Ad iframes**: Known ad domains filtered by host

### Known Issues / Workarounds

| Issue | Version Fixed | Workaround |
|-------|---------------|------------|
| Video duration not showing until play | v3.5.2 | `preloadFirstNForDuration` (removed in v3.5.3) |
| Duplicate video numbering | v3.4.1 | `videoIndexMap` by `videoSrc` |
| app-forum-topic double render | v3.5.3 | Delayed numbering pass after window.load |
| Videos downloading despite lock | v3.5.3 | `src` removal + native `load()` + browser guards |
| Unicode URLs breaking IndexedDB | v3.5.1 | `hashKey()` FNV-1a instead of `btoa()` |
| Cache keys not stable across sessions | v3.5.3 | Deterministic `hashKey`, `videoKeyUrl` origin+path |

---

## API Compatibility

### Used Web APIs

| API | Min Version | Polyfill |
|-----|-------------|----------|
| `MutationObserver` | Firefox 14 | — |
| `IntersectionObserver` | Firefox 55 | — |
| `IndexedDB` | Firefox 16 | — |
| `fetch` + `ReadableStream` | Firefox 47 / 65 | — |
| `WeakMap`/`WeakSet` | Firefox 6 | — |
| `PerformanceObserver` | Firefox 58 | Removed v3.5.1 |
| `beforescriptexecute` | Firefox only | Graceful degradation |
| `Element.prototype.closest` | Firefox 35 | — |
| `Element.prototype.matches` | Firefox 34 | — |
| `URL` / `URLSearchParams` | Firefox 26 | — |
| `Math.imul` | Firefox 20 | — |
| `DataView` | Firefox 15 | — |

### Stream Cancellation (Probe)
```javascript
// Requires ReadableStream cancel support
const reader = res.body.getReader();
// ... read capped bytes ...
await reader.cancel();  // Firefox 65+, Chrome 43+
```

---

## Mobile Considerations

### Android Firefox + Tampermonkey
- Touch events: `pointerdown`/`touchstart` tracked for gesture window
- `prefers-reduced-motion` respected for animations
- FAB repositioned for thumb reach (bottom-left default)
- Panel: bottom sheet on mobile, drawer on desktop
- Compact mode recommended for small screens

### Known Mobile Issues
- `hover` states don't exist → `:active` used for press feedback
- `window.open` popup blocking less reliable on mobile
- `beforescriptexecute` not available on mobile Firefox

---

## Site Changes Resilience

### Selectors Avoided
- No hardcoded class names for site elements
- No XPath dependencies on DOM structure
- Media detection by tag name only (`video`, `iframe`, `img`)

### Adaptive Detection
- `hasUsableVideoSource()` checks `src`, `data-src`, `data-lazy-src`
- `readSourceInfo()` falls back through multiple attributes
- `videoKeyUrl()` handles both relative and absolute URLs

---

## Version Compatibility Matrix

| Script Version | Firefox Min | Key Features |
|----------------|-------------|--------------|
| 1.0.0 | 60 | Basic deferral |
| 2.0.0 | 60 | Profiles, release |
| 3.0.0 | 65 | Panel, themes, IndexedDB |
| 3.3.0 | 65 | Resume, presets, shortcuts |
| 3.4.0 | 65 | Video metadata, numbering |
| 3.5.1 | 65 | 4-layer cache, hashKey |
| 3.5.3 | 65 | Zero-download, deterministic keys |
| 3.5.4 | 65 | Optional probe, IntersectionObserver |

---

## Testing Checklist Per Release

### Desktop Firefox
- [ ] Clean install (no cache)
- [ ] Return visit (cache hit)
- [ ] Multiple videos on page
- [ ] SPA navigation (hash change)
- [ ] Lazy-loaded videos (`data-src`)
- [ ] Ad iframe filtering
- [ ] Panel all 7 tabs
- [ ] Settings persist
- [ ] Theme switching
- [ ] Emergency mode
- [ ] Release functions
- [ ] `videoProbe` all 3 modes

### Android Firefox
- [ ] Touch to unlock video
- [ ] FAB drag reposition
- [ ] Panel bottom sheet
- [ ] Compact mode
- [ ] Orientation change
- [ ] Background/foreground

### Edge Cases
- [ ] Video with blob: URL (should be skipped)
- [ ] Video with MediaSource (should be skipped)
- [ ] Iframe with srcdoc
- [ ] Nested iframes
- [ ] Very long pages (30+ videos)
- [ ] Rapid scroll (probe queue stress)
- [ ] Private browsing (IndexedDB works)