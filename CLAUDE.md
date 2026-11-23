# Project Instructions — Shahvani Ultra Lite

**Project Root**: `D:\Desktop\project\scripts\shahvani-ultra-lite`  
**GitHub Repo**: `parhamghahremani/shahvani-ultra-lite` (Public)  
**Current Version**: 3.6.1  
**Primary Language**: Persian (communication) / English (code, docs, metadata)

---

## Project Overview

Tampermonkey userscript for shahvani.com — performance-focused tap-to-load media, configurable UI, and resource management. Implements a 4-layer video metadata detection system with IndexedDB caching, optional Range-based size/duration probe, and strict zero-download locking by default.

---

## Core Architecture

### Video Locking Flow (v3.5.3+)
1. **Simultaneous startup** at `document-start` — MutationObserver on `document` waits for `<html>`
2. **Lock immediately** — `src` + `<source src>` removed, `poster` removed, `preload=none`, native `load()` called
3. **Browser guards** — `load()`/`play()` blocked, `preload` forced `none`, `autoplay` ignored for locked videos
4. **On user click** — restore sources → HEAD for size cache → `preload=metadata` → play

### 4-Layer Metadata Detection
- **Layer 0**: IndexedDB cache (7-day TTL, deterministic FNV-1a keys) — instant
- **Layer 1**: Page metadata — skipped (shahvani.com has no duration in HTML)
- **Layer 2**: Range probe (HEAD + `Range: bytes=0-0`) — async, non-blocking
- **Layer 3**: Video element `loadedmetadata` on user activation — requires gesture

### v3.5.4 Optional Probe (`videoProbe` setting)
- `off` (default): Zero network, cache not read — strict "nothing"
- `cache`: Local IndexedDB only
- `auto`: IntersectionObserver queues Range requests for cards in view (16 KB header + 8 KB moov tail), stream cancelled after cap

---

## Development Rules

1. **Version bump** — Update `@version` in userscript meta-block, `VERSION` constant, `package.json`, `README.md`
2. **Archive** — Copy `src/` to `versions/vX.Y.Z.user.js`
3. **Changelog** — Add entry in `CHANGELOG.md` with Added/Changed/Fixed/Removed/Performance sections
4. **Backups** — Create pre-change backup, release ZIP, git bundle, update `BACKUP_MANIFEST.md`
5. **Syntax check** — `node --check src/shahvani-ultra-lite.user.js`
6. **Git commit** — Single commit per version with tag `vX.Y.Z`
7. **GitHub sync** — Only after manual test + explicit approval; repo stays private

---

## File Structure

```
shahvani-ultra-lite/
├── src/
│   └── shahvani-ultra-lite.user.js   # Current production (edit here)
├── versions/
│   ├── v1.0.0.user.js ... v3.5.4.user.js
├── docs/
│   ├── SPECIFICATION.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── CONFIGURATION_AND_PERMISSIONS.md
│   ├── COMPATIBILITY.md
│   ├── MANUAL_TEST_PLAN.md
│   ├── DEVELOPMENT_LOG.md
│   ├── DECISIONS.md
│   ├── KNOWN_ISSUES.md
│   └── REFERENCES.md
├── backups/
│   ├── imported-original/
│   ├── pre-change/
│   ├── full-snapshots/
│   ├── releases/
│   ├── git-bundles/
│   ├── checksums/
│   └── BACKUP_MANIFEST.md
├── tests/
├── .claude/
│   └── launch.json
├── CHANGELOG.md
├── README.md
├── PROJECT_STATUS.md
├── package.json
├── .gitignore
└── .git/
```

---

## Key Technical Details

### Constants (top of IIFE)
- `MEDIA_DELAY_MS = 60`, `VISUAL_BATCH_MS = 160`, `UI_UPDATE_MS = 120`
- `AUTO_RELEASE_INTERVAL_MS = 15000`, `MAX_BLOCKED_LOG_ENTRIES = 500`
- `PLACEHOLDER_MIN_HEIGHT = 140`, `PLACEHOLDER_MAX_HEIGHT = 320`
- `ASPECT_RATIO_DEFAULT = 16/9`, `GESTURE_WINDOW_MS = 5000`
- **v3.5.4**: `PROBE_HEAD_BYTES = 16384`, `PROBE_TAIL_BYTES = 8192`, `PROBE_CONCURRENCY = 2`, `PROBE_SESSION_MAX = 120`

### IndexedDB Schema (`IDB_VERSION = 2`)
- `settings` — key: `main`
- `resumePositions` — key: `hashKey(videoKeyUrl)`, indexes: `url`, `timestamp`
- `blockedRequests` — auto-increment key, indexes: `timestamp`, `domain`
- `videoMetadata` — key: `videoMeta_` + hash, indexes: `videoSrc`, `timestamp` (7-day TTL)

### Hash Function
```javascript
function hashKey(str) {
  // Deterministic FNV-1a (two passes), no Date.now()
  let h1 = 0x811c9dc5, h2 = 0x01000193 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ c, 0x85ebca6b) ^ (h2 >>> 13);
  }
  return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
}
```

### Video Key URL
```javascript
function videoKeyUrl(raw) {
  try {
    const u = new URL(raw, document.baseURI);
    return /\.(mp4|webm|m4v|mov|ogv|ogg|mkv)$/i.test(u.pathname)
      ? u.origin + u.pathname
      : u.origin + u.pathname + u.search;
  } catch (_) { return String(raw); }
}
```

---

## Testing Protocol

1. **Syntax**: `node --check src/shahvani-ultra-lite.user.js`
2. **Git bundle**: `git bundle verify backups/git-bundles/vX.Y.Z.bundle`
3. **Manual**: Install in Firefox + Tampermonkey, test on shahvani.com
   - Verify zero downloads for locked videos (Network tab)
   - Verify duration/size display from cache on revisit
   - Verify `videoProbe` modes work correctly
   - Verify numbering stability (no duplicates from app-forum-topic)
4. **Playwright research only** — no shared profile, final test always manual

---

## Deployment Checklist

- [ ] Version bumped in 4 places (meta-block, VERSION, package.json, README.md)
- [ ] `versions/vX.Y.Z.user.js` created
- [ ] `CHANGELOG.md` updated
- [ ] Pre-change backup in `backups/pre-change/`
- [ ] Release ZIP in `backups/releases/` with SHA256
- [ ] Git bundle in `backups/git-bundles/` (verified)
- [ ] `BACKUP_MANIFEST.md` updated
- [ ] `PROJECT_STATUS.md` updated
- [ ] Syntax check passes
- [ ] Manual test on shahvani.com passes
- [ ] User approval received
- [ ] `git commit -am "vX.Y.Z: ..." && git tag vX.Y.Z`
- [ ] `gh repo create parhamghahremani/shahvani-ultra-lite --private --source=. --push`