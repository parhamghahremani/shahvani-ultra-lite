# Decisions — Shahvani Ultra Lite

## Architecture Decisions

| ID | Decision | Date | Rationale |
|----|----------|------|-----------|
| AD-001 | IIFE + strict mode, no globals | 2026-11-03 | CSP compatibility, no pollution, Tampermonkey-safe |
| AD-002 | `@grant none` — no TM APIs | 2026-11-03 | Works with any userscript manager, no permission prompts |
| AD-003 | `@run-at document-start` + immediate style injection | 2026-11-03 | Placeholders visible before media loads; zero-download guarantee |
| AD-004 | Dual localStorage + IndexedDB | 2026-11-04 | localStorage: sync read at document-start; IndexedDB: large quota, private browsing, backup |
| AD-005 | WeakMap/WeakSet for DOM tracking | 2026-11-03 | No memory leaks from detached nodes; auto-cleanup |
| AD-006 | Deterministic FNV-1a `hashKey` (no Date.now) | 2026-11-17 | Stable cache keys across sessions; Unicode-safe |
| AD-007 | `videoKeyUrl` = origin + path (stable) | 2026-11-17 | Cache survives query/hash changes; same video = same key |
| AD-008 | Native `load()` after src removal | 2026-11-18 | HTML spec: only way to abort in-flight load |
| AD-009 | Browser guards (`load`/`play` blocking) | 2026-11-18 | Defense in depth: site JS can't bypass lock |
| AD-010 | IntersectionObserver for probe | 2026-11-18 | Only probe what user might see; saves bandwidth |
| AD-011 | Stream cancellation after capped read | 2026-11-18 | Probe reads header/moov only; video body never downloaded |

---

## Feature Decisions

| ID | Decision | Date | Rationale |
|----|----------|------|-----------|
| FD-001 | Three probe modes: off/cache/auto | 2026-11-18 | User control: strict zero (off), cache-only, or smart auto |
| FD-002 | Default `videoProbe: 'off'` | 2026-11-18 | Zero-download by default; opt-in for metadata |
| FD-003 | `preloadFirstNForDuration` removed | 2026-11-18 | Caused downloads; probe auto is better UX |
| FD-004 | No domain profiles | 2026-11-17 | Low usage, complex; replaced by per-setting overrides |
| FD-005 | No keyboard shortcuts | 2026-11-04 | Primary target Android (no keyboard) |
| FD-006 | No LongTask Observer | 2026-11-17 | Noise, limited actionable data |
| FD-007 | Blocked requests logging backend only | 2026-11-17 | UI removed; backend retained for potential future |
| FD-008 | Inverted neumorphic (flat base, raised hover) | 2026-11-04 | Modern, tactile, performs better than classic |
| FD-009 | 7-tab panel (merged from v6) | 2026-11-04 | Comprehensive control without bloat |
| FD-010 | Bilingual EN/FA with RTL | 2026-11-03 | Primary user base Persian; English for code/docs |

---

## Technical Trade-offs

| Trade-off | Chosen | Rejected | Reason |
|-----------|--------|----------|--------|
| Cache key | Deterministic FNV-1a | `btoa()` / `crypto.subtle` | `btoa` fails on Unicode; crypto async, overkill |
| Probe concurrency | 2 | 1 or 4+ | 2 balances speed vs. server load; mobile-friendly |
| Probe session cap | 120 (~3 MB) | Unlimited | Hard cap prevents runaway; ~3 MB acceptable |
| IndexedDB version | 2 (add videoMetadata) | 1 (migrate) | Clean upgrade; old DBs auto-upgrade |
| Video numbering | DOM-order per unique URL | Load-order | Stable across SPA navigation; handles double-render |
| Settings sync | localStorage primary | IndexedDB primary | localStorage sync at document-start critical |
| CSS injection | `<style>` element | `GM_addStyle` / `style` attr | Works with `@grant none`; no CSP issues |

---

## Rejected Alternatives

| Alternative | Why Rejected |
|-------------|--------------|
| Service Worker for caching | Overkill, scope issues, userscript sandbox |
| WebWorker for MP4 parsing | Can't access DOM/response; main thread fine for 16 KB |
| WebAssembly for parsing | Bundle size, complexity; JS fast enough |
| `preload="metadata"` on all videos | Causes downloads; violates zero-download |
| `preload="auto"` on click | Slow; `metadata` sufficient for duration |
| Polling for video size | Wasteful; IntersectionObserver event-driven |
| Separate userscript for mobile | Single codebase with responsive UI sufficient |
| External config file | Extra fetch, complexity; settings in localStorage |
| TypeScript build step | Adds complexity; pure JS works, no deps |

---

## Future Considerations

| Idea | Status | Notes |
|------|--------|-------|
| HLS/DASH probe support | Deferred | Complex; most shahvani videos are MP4 |
| Background sync for settings | Deferred | localStorage + IndexedDB sufficient |
| Cloud sync (optional) | Rejected | Privacy-first; no external requests |
| WebExtension port | Maybe | Would lose `@run-at document-start` simplicity |
| Wasm MP4 parser | Maybe | If probe becomes bottleneck |