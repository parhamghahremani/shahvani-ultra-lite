# Project Status — Shahvani Ultra Lite

**Last Updated**: 2026-11-25  
**Current Version**: 3.6.5  
**Git Commit**: e740f13 (v3.6.1) — working tree has v3.6.5 changes  
**GitHub Repo**: `parhamghahremani/shahvani-ultra-lite` (Public ✅, pushed 2026-11-23)

---

## Version Summary

| Version | Date | Status | Key Features |
|---------|------|--------|--------------|
| 3.6.5 | 2026-11-25 | **Current** | Fixed auto-download/data waste (removed elementDuration probe, no auto thumbs, thumbs only after user opens video), fixed Android black/delayed thumbnails (luminance check, sync decode, seek-to-decode), fixed Android missing thumbnails (tainted frames cached, frame rebuild enabled, mozPaintedFrames wait), **live preview for opened videos on Android** (max 2, on-screen only, auto-caches as real thumbnail), removed autoThumbs setting, diagnostics for thumbs |
| 3.6.4 | 2026-11-24 | Archived | Saved videos list (bookmark icon, Alt+Shift+B/S), sturdier thumbnails on Android (auto capture, crossOrigin fallback), fixed Android Firefox downloads (auto-detect TM support, 20s timeout, fallback chain), download method setting (auto/browser/TM), IndexedDB v4 with savedThumbs store, diagnostics for thumbs/downloads |
| 3.6.3 | 2026-11-24 | Archived | 11 keyboard shortcuts (Alt+Shift+keys), persistent cross-origin thumbnails (IndexedDB), per-page selection scope, direct download queue (no confirmation), parallel GM_download (Android 2/ Desktop 3), retry failed, circuit breaker, up.shahvani.com probe 24s total, @connect * for redirects |
| 3.6.2 | 2026-11-24 | Archived | Selection totals in Download tab, download failure visible with error codes, Diagnostics manager block, auto size/duration lookup for all rows (no button), cache-first with retry logic (3 tries), up.shahvani.com downloads via GM_download/blob/fallback, Range probe guarded by Accept-Ranges |
| 3.6.1 | 2026-11-23 | Archived | Fixed lock-card size (734×413, 16:9), Download tab live info (size/duration/thumbnail), persistent cache 30 days, Release stops all unlocked videos, cancels Unlock, fixed Unlock busy state, fixed cache key consistency, Update URLs back (point to dist/), GM_download/GM_xmlhttpRequest for up.shahvani.com |
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
- `src/shahvani-ultra-lite.user.js` — **v3.6.5** (~315KB)

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
| v3.6.2.user.js | ~190KB | 2026-11-24 |
| v3.6.3.user.js | ~268KB | 2026-11-24 |
| v3.6.4.user.js | ~302KB | 2026-11-24 |
| v3.6.5.user.js | ~315KB | 2026-11-25 |

### Backups (`backups/`)
| Type | Files | Verified |
|------|-------|----------|
| Releases (ZIP) | v3.5.0–v3.6.5 | ✅ SHA256 recorded |
| Git Bundles | v3.5.1–v3.6.5 | ✅ `git bundle verify` OK |
| Pre-Change | v3.5.0–v3.5.4 | ✅ |
| Manifest | BACKUP_MANIFEST.md | ✅ Complete |
| v3.6.0 | complete | ✅ |
| v3.6.1 | complete | ✅ |
| v3.6.2 | complete | ✅ |
| v3.6.3 | complete | ✅ |
| v3.6.4 | complete | ✅ |
| v3.6.5 | complete | ✅ SHA256: 68EC344618267235A1A436A44A484053E35F796A1D816E13525CF8E38AA02D3F |

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
| package.json | ✅ v3.6.5 |
| README.md | ✅ v3.6.5 |
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
	new file:   versions/v3.6.2.user.js
```

**Last commit**: `b387b52` — "v3.6.5: Fixed auto-download/data waste, Android thumbnails (luminance/sync/seek), live preview for opened videos on Android (max 2, auto-caches), removed autoThumbs/elementDuration, thumbs only after user opens video"
**Tag**: `v3.6.5` (points to b387b52, force updated)

---

## Test Status

| Test | Status | Notes |
|------|--------|-------|
| Syntax check (`node --check`) | ✅ Pass | v3.6.5 |
| Build (`node build.js`) | ✅ Pass | versions/ + dist/ created |
| Manual test (Firefox + TM) | ⏳ Pending | v3.6.5 features to verify |
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
- **v3.6.1 pushed to GitHub: 2026-11-23**
- v3.6.2 pushed to GitHub: 2026-11-24
- **v3.6.3 pushed to GitHub: 2026-11-24**
- **v3.6.4 pushed to GitHub: 2026-11-24**
- **v3.6.5 pushed to GitHub: 2026-11-25** (force updated with live preview fix)

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
9. **`GM_*` under `@sandbox raw` in Firefox** — Not documented by Tampermonkey; fallbacks exist
10. **up.shahvani.com Tampermonkey silence** — Root cause unconfirmed; likely permission prompt or redirect to other domain
11. **Android Firefox GM_download** — Auto-detected; falls back to browser links if unsupported (20s timeout)
12. **Frame thumbnail rebuild** — Only works for MP4 with moov at start of file; crossOrigin fallback for up.shahvani.com
13. **Saved videos list tested on jsdom** — Not verified on real site/Android yet
14. **Duration for up.shahvani.com** — Only available after user opens video or TM reaches domain
15. **Thumbnails for up.shahvani.com** — Only created after user opens video

---

## Next Steps

1. ✅ Run `node --check src/shahvani-ultra-lite.user.js` (syntax check)
2. ✅ Run `node build.js` (create dist/ and versions/v3.6.5.user.js)
3. ✅ Create release ZIP backup in `backups/releases/v3.6.5.user.js.zip` with SHA256
4. ✅ Create git bundle in `backups/git-bundles/v3.6.5.bundle` and verify
5. ✅ Update `BACKUP_MANIFEST.md` and `PROJECT_STATUS.md`
6. ✅ `git add . && git commit -m "v3.6.5: Fixed auto-download/data waste, Android thumbnails (luminance/sync/seek), live preview for opened videos on Android (max 2, auto-caches), removed autoThumbs/elementDuration, thumbs only after user opens video" && git tag v3.6.5`
7. ⏳ Manual test on shahvani.com (Firefox + Tampermonkey)
8. ✅ Push to GitHub (force updated v3.6.5 tag with live preview fix)

---

**v3.6.5 UPDATED** — All local steps complete. Awaiting manual test on Firefox + Tampermonkey, then GitHub push with approval.