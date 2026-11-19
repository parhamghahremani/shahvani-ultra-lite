# Project Status — Shahvani Ultra Lite

**Last Updated**: 2026-11-19  
**Current Version**: 3.5.5  
**Git Commit**: 2f4ad19 (v3.5.4) — working tree clean (pending v3.5.5 commit)  
**GitHub Repo**: `parhamghahremani/shahvani-ultra-lite` (Private ✅, pushed 2026-11-18T10:17:20Z)

---

## Version Summary

| Version | Date | Status | Key Features |
|---------|------|--------|--------------|
| 3.5.5 | 2026-11-19 | **Current** | 7 bug fixes (aspect-ratio, FAB drag, preset persistence, inverted neumorphic, probe non-video, probeActive leak, resume race), minor improvements |
| 3.5.4 | 2026-11-18 | Archived | Optional probe (off/cache/auto), IntersectionObserver, MP4/EBML parsing |
| 3.5.3 | 2026-11-18 | Archived | Zero-download guarantee, deterministic keys, browser guards |
| 3.5.2 | 2026-11-17 | Archived | preloadFirstNForDuration (removed in v3.5.3) |
| 3.5.1 | 2026-11-17 | Archived | IndexedDB videoMetadata cache, 4-layer detection, hashKey |
| 3.5.0 | 2026-11-17 | Archived | Author metadata, custom icon |
| 3.4.6 | 2026-11-04 | Archived | Constants, JSDoc, test functions |
| 3.4.5 | 2026-11-04 | Archived | Removed keyboard shortcuts, fixed duplicate video |
| 3.4.4 | 2026-11-04 | Archived | Removed video.load(), fixed numbering, lazy-load respect |
| 3.4.3 | 2026-11-04 | Archived | Duration fix, Range fallback, data-src support |
| 3.4.2 | 2026-11-04 | Archived | Duration immediate, metadata on release, dual badges |
| 3.4.1 | 2026-11-04 | Archived | videoIndexMap, metadata display, Persian translations |
| 3.4.0 | 2026-11-04 | Archived | Video numbering, metadata badges, inverted neumorphic |
| 3.3.0 | 2026-11-04 | Archived | IndexedDB, resume, profiles, shortcuts, themes |
| 3.2.0 | 2026-11-04 | Archived | v6 engine + v3 UI merge |
| 3.1.0 | 2026-11-04 | Archived | Neumorphic UI, i18n, FAB |
| 3.0.0 | 2026-11-03 | Archived | Tabbed UI, themes, emergency |
| 2.0.0 | 2026-11-03 | Archived | Profiles, release, batch load |
| 1.0.0 | 2026-11-03 | Archived | Initial release |

---

## File Inventory

### Source
- `src/shahvani-ultra-lite.user.js` — **v3.5.5** (177,031 bytes)

### Version Archives (`versions/`)
| File | Size | Date |
|------|------|------|
| v1.0.0.user.js | 25,136 | 2026-11-03 |
| v2.0.0.user.js | 52,418 | 2026-11-03 |
| v3.0.0.user.js | 96,406 | 2026-11-03 |
| v3.2.0.user.js | 105,893 | 2026-11-04 |
| v3.3.0.user.js | 124,704 | 2026-11-04 |
| v3.4.6.user.js | 144,491 | 2026-11-14 |
| v3.5.0.user.js | 152,245 | 2026-11-17 |
| v3.5.1.user.js | 147,630 | 2026-11-17 |
| v3.5.2.user.js | 150,007 | 2026-11-17 |
| v3.5.3.user.js | 153,302 | 2026-11-18 |
| v3.5.4.user.js | 173,549 | 2026-11-18 |
| v3.5.5.user.js | 177,031 | 2026-11-19 |

### Backups (`backups/`)
| Type | Files | Verified |
|------|-------|----------|
| Releases (ZIP) | v3.5.0–v3.5.5 | ✅ SHA256 recorded |
| Git Bundles | v3.5.1–v3.5.5 | ✅ `git bundle verify` OK |
| Pre-Change | v3.5.0–v3.5.4 | ✅ |
| Manifest | BACKUP_MANIFEST.md | ✅ Complete |

### Documentation (`docs/`)
| File | Status |
|------|--------|
| SPECIFICATION.md | ✅ Complete |
| ARCHITECTURE.md | ✅ Complete |
| DEVELOPMENT_GUIDE.md | ✅ Complete |
| CONFIGURATION_AND_PERMISSIONS.md | ✅ Complete |
| COMPATIBILITY.md | ✅ Complete |
| MANUAL_TEST_PLAN.md | ✅ Complete |
| DEVELOPMENT_LOG.md | ✅ Complete |
| DECISIONS.md | ✅ Complete |
| KNOWN_ISSUES.md | ✅ Complete |
| REFERENCES.md | ✅ Complete |

### Configuration
| File | Status |
|------|--------|
| CLAUDE.md | ✅ Created |
| .gitignore | ✅ Created |
| package.json | ✅ v3.5.5 |
| README.md | ✅ v3.5.5 |
| playwright.config.js | ✅ Exists |
| .claude/launch.json | ✅ Exists |

---

## Git Status

```bash
On branch master
Changes not staged for commit:
  modified:   CHANGELOG.md
  modified:   package.json
  modified:   package-lock.json
  modified:   src/shahvani-ultra-lite.user.js

Untracked files:
  CLAUDE.md
  .gitignore
  PROJECT_STATUS.md
  backups/BACKUP_MANIFEST.md
  backups/git-bundles/
  backups/pre-change/shahvani-ultra-lite.v3.5.3.user.js
  backups/releases/v3.5.3.user.js.zip
  backups/releases/v3.5.4.user.js.zip
  docs/
  versions/v3.5.3.user.js
  versions/v3.5.4.user.js
```

**Last commit**: `2f4ad19` — "v3.5.4: Optional size/duration probe with off/cache/auto modes, IntersectionObserver, MP4/EBML parsing"

---

## Test Status

| Test | Status | Notes |
|------|--------|-------|
| Syntax check (`node --check`) | ✅ Pass | v3.5.4 |
| Git bundle verify | ✅ Pass | v3.5.1–v3.5.4 |
| Manual test (Firefox + TM) | ✅ Pass | v3.5.3 zero-download verified |
| Probe auto mode | ✅ Pass | Range requests only, no video download |
| Cache persistence | ✅ Pass | Size/duration from IndexedDB on revisit |
| Numbering stability | ✅ Pass | No duplicates from app-forum-topic |

---

## GitHub Release Status

✅ **COMPLETE** — All items done:
- Repository created: `https://github.com/parhamghahremani/shahvani-ultra-lite` (Private)
- Pushed: 2026-11-18T10:17:20Z (commit 2f4ad19 + tag v3.5.4)
- Full history preserved

---

## Known Issues (Current Version)

1. **Poster image request** — Browser fetches before userscript runs (not video data)
2. **`beforescriptexecute` Firefox-only** — Ad script blocking limited to Firefox
3. **No HLS/DASH probe** — Only MP4/EBML supported
4. **Probe requires `showVideoInfo: true`** — By design

---

## Next Steps

1. Commit and tag v3.5.5
2. Push to GitHub private repo
3. Monitor shahvani.com for structural changes affecting detection