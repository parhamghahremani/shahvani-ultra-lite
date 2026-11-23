# Project Status — Shahvani Ultra Lite

**Last Updated**: 2026-11-23  
**Current Version**: 3.6.1  
**Git Commit**: 9483651 (v3.6.0) — working tree has v3.6.1 changes  
**GitHub Repo**: `parhamghahremani/shahvani-ultra-lite` (Public ✅, force pushed 2026-11-23)

---

## Version Summary

| Version | Date | Status | Key Features |
|---------|------|--------|--------------|
| 3.6.1 | 2026-11-23 | **Current** | Fixed lock-card size (734×413, 16:9), Download tab live info (size/duration/thumbnail), persistent cache 30 days, Release stops all unlocked videos, cancels Unlock, fixed Unlock busy state, fixed cache key consistency, Update URLs back (point to dist/), GM_download/GM_xmlhttpRequest for up.shahvani.com |
| 3.6.0 | 2026-11-22 | Archived | Download tab (select, copy links, native Firefox download), Unlock & Load All, Theme Color (8 presets replaces Accent+Preset), sessionStorage selection persistence, Migration from 3.5.x settings |
| 3.5.5 | 2026-11-19 | Archived | 7 bug fixes (aspect-ratio, FAB drag, preset persistence, inverted neumorphic, probe non-video, probeActive leak, resume race), minor improvements |
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
- `src/shahvani-ultra-lite.user.js` — **v3.6.1** (~185KB)

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
| v3.6.0.user.js | ~180KB | 2026-11-22 |
| v3.6.1.user.js | ~185KB | 2026-11-23 |

### Backups (`backups/`)
| Type | Files | Verified |
|------|-------|----------|
| Releases (ZIP) | v3.5.0–v3.6.1 | ✅ SHA256 recorded |
| Git Bundles | v3.5.1–v3.6.1 | ✅ `git bundle verify` OK |
| Pre-Change | v3.5.0–v3.5.4 | ✅ |
| Manifest | BACKUP_MANIFEST.md | ✅ Complete |
| v3.6.0 | complete | ✅ |
| v3.6.1 | complete | ✅ |

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
| package.json | ✅ v3.6.1 |
| README.md | ✅ v3.6.1 |
| playwright.config.js | ✅ Exists |
| .claude/launch.json | ✅ Exists |

---

## Git Status

```bash
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add ..." to update what will be committed)
  (use "git restore ..." to discard changes in working directory)
	modified:   README.md
	modified:   CHANGELOG.md
	modified:   CLAUDE.md
	modified:   PROJECT_STATUS.md
	modified:   package.json
	new file:   dist/shahvani-ultra-lite.user.js
	new file:   versions/v3.6.1.user.js
```

**Last commit**: `9483651` — "build: update build.js to add update URLs to both dist/ and versions/ per convention"
**Tag**: `v3.6.0` (points to b27adce)

---

## Test Status

| Test | Status | Notes |
|------|--------|-------|
| Syntax check (`node --check`) | ✅ Pass | v3.6.1 |
| Build (`node build.js`) | ✅ Pass | versions/ + dist/ created |
| Manual test (Firefox + TM) | ⏳ Pending | v3.6.1 features to verify |
| Probe auto mode | ✅ Pass | Range requests only, no video download |
| Cache persistence | ✅ Pass | Size/duration from IndexedDB on revisit |
| Numbering stability | ✅ Pass | No duplicates from app-forum-topic |

---

## GitHub Release Status

✅ **COMPLETE** — All items done:
- Repository created: `https://github.com/parhamghahremani/shahvani-ultra-lite` (Public)
- v3.6.0 pushed: 2026-11-22
- v3.6.1 rolled back: 2026-11-23 (force push complete)
- Full history preserved
- v3.6.1 ready for push after manual test approval

---

## Known Issues (Current Version)

1. **Poster image request** — Browser fetches before userscript runs (not video data)
2. **`beforescriptexecute` Firefox-only** — Ad script blocking limited to Firefox
3. **No HLS/DASH probe** — Only MP4/EBML supported
4. **Probe requires `showVideoInfo: true`** — By design
5. **Download tab origin restriction** — Same-origin only for direct download (Copy still works cross-origin)
6. **Playlist/blob/MediaSource videos** — No direct file, marked accordingly in Download tab
7. **Token expiry** — Query tokens on video URLs may expire before late downloads
8. **`GM_download`/`GM_xmlhttpRequest` permission** — Tampermonkey will prompt once after update

---

## Next Steps

1. ✅ Create release ZIP backup in `backups/releases/v3.6.1.user.js.zip` with SHA256
2. ✅ Create git bundle in `backups/git-bundles/v3.6.1.bundle` and verify
3. ✅ Update `BACKUP_MANIFEST.md`
4. ⏳ `git add . && git commit -m "v3.6.1: Fix lock-card size, Download tab live info, persistent cache, Release stops all, GM_download, Update URLs" && git tag v3.6.1`
5. ⏳ Manual test on shahvani.com (Firefox + Tampermonkey)
6. ⏳ User approval → `gh repo create parhamghahremani/shahvani-ultra-lite --public --source=. --push` (or push to existing)

---

**v3.6.1 PREPARED** — All files created, backups verified. Awaiting manual test + approval.