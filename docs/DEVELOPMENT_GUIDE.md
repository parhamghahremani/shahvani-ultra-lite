# Development Guide — Shahvani Ultra Lite

## Prerequisites

- Node.js 18+ (for Playwright, package scripts)
- Firefox (desktop) with Tampermonkey or Violentmonkey
- Android Firefox + Tampermonkey for mobile testing
- Git for version control

---

## Project Setup

```bash
cd D:\Desktop\project\scripts\shahvani-ultra-lite
npm install
```

---

## Development Workflow

### 1. Making Changes

Edit the source file:
```
src/shahvani-ultra-lite.user.js
```

Key sections to know:
- **Lines 1-50**: Constants, version, IDB version
- **Lines 77-131**: DEFAULTS, ENUMS, THEME_PRESETS, KNOWN_AD_HOSTS
- **Lines 175-205**: `sanitize()` — validation logic
- **Lines 260-301**: `idbInit()` — IndexedDB schema
- **Lines 470-892**: Translations (EN/FA) — keep both in sync
- **Lines 904-934**: `state` object
- **Lines 1579-1634**: `commitVideoDefer()` — core video locking
- **Lines 1657-1980**: Probe core (MP4/EBML parsing, Range requests)
- **Lines 1913-1978**: Cache lookup + probe queue

### 2. Version Bump (Required for every release)

Update **all four** locations:

1. **Meta-block** (line ~4): `@version 3.5.X`
2. **VERSION constant** (line ~18): `const VERSION = '3.5.X';`
3. **package.json**: `"version": "3.5.X"`
4. **README.md**: Update version badge and changelog link

### 3. Archive Version

```bash
cp src/shahvani-ultra-lite.user.js versions/v3.5.X.user.js
```

### 4. Update CHANGELOG.md

Add new section at top (after header):
```markdown
## [3.5.X] - YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Removed
- ...

### Performance
- ...
```

### 5. Create Backups

```bash
# Pre-change backup
cp src/shahvani-ultra-lite.user.js backups/pre-change/shahvani-ultra-lite.v3.5.X.user.js

# Release ZIP
powershell -Command "Compress-Archive -Path 'src\shahvani-ultra-lite.user.js' -DestinationPath 'backups\releases\v3.5.X.user.js.zip' -Force"

# Get SHA256
powershell -Command "Get-FileHash -Algorithm SHA256 'backups\releases\v3.5.X.user.js.zip'"

# Git bundle
git bundle create backups/git-bundles/v3.5.X.bundle --all
git bundle verify backups/git-bundles/v3.5.X.bundle
```

### 6. Update BACKUP_MANIFEST.md

Add entries to all four tables (Releases, Git Bundles, Pre-Change, Version Files) and update verification commands.

### 7. Syntax Check

```bash
node --check src/shahvani-ultra-lite.user.js
```

### 8. Manual Testing (Required before GitHub sync)

1. Open Firefox + Tampermonkey
2. Install from `src/shahvani-ultra-lite.user.js` (file:// or local server)
3. Navigate to `https://shahvani.com`
4. Verify:
   - [ ] Zero video downloads for locked videos (Network tab → filter "media")
   - [ ] Placeholders appear with correct numbering
   - [ ] Tap placeholder → video loads and plays
   - [ ] Duration/size show from cache on revisit
   - [ ] `videoProbe` modes work (off/cache/auto)
   - [ ] Panel opens, all tabs functional
   - [ ] Settings persist across reloads
   - [ ] Emergency mode pauses all videos
   - [ ] Release functions work
   - [ ] No console errors

### 9. Git Commit & Tag

```bash
git add -A
git commit -m "v3.5.X: Brief description of changes"
git tag v3.5.X
```

### 10. GitHub Sync (Only after manual test + approval)

```bash
gh repo create parhamghahremani/shahvani-ultra-lite --private --source=. --push
# Or if repo exists:
git push origin master --tags
```

---

## Testing with Playwright (Research Only)

```bash
# Start test server
npx http-server -p 8080 -c-1

# Run tests
npx playwright test
```

**Note**: Playwright does NOT share user's Firefox profile, cookies, or Tampermonkey. Use only for DOM inspection, network analysis, and automated scenario testing. Final validation always manual in real Firefox + Tampermonkey.

---

## Code Style Rules

- **Strict mode** — `'use strict';` at top of IIFE
- **IIFE** — No global variables
- **Constants** — All magic numbers at top, UPPER_SNAKE_CASE
- **JSDoc** — All complex functions documented
- **Naming** — camelCase for variables/functions, UPPER_SNAKE_CASE for constants
- **Comments** — Persian for user-facing, English for code logic
- **No external dependencies** — Pure DOM APIs only
- **Memory safety** — WeakMap/WeakSet for DOM node tracking

---

## Common Tasks

### Add New Setting

1. Add to `DEFAULTS` (with default value)
2. Add to `ENUMS` if enum type
3. Add i18n keys in both EN/FA (tab, label, description)
4. Add UI control in `buildUI()` / `buildSection*()`
5. Handle in `sanitize()`
6. Update `saveSettings()`/`loadSettings()` if special handling needed

### Add New Ad Host

Add to `KNOWN_AD_HOSTS` array. CSS rules auto-generated in `buildPageCss()`.

### Modify Placeholder Appearance

Edit `buildPageCss()` for static styles, `makePlaceholder()` for dynamic elements.

### Debug Video Indexing

Use `window.__SHV_TEST__` (exposed in v3.4.6+):
```javascript
// In console on shahvani.com with script installed
__SHV_TEST__.testSanitize()
__SHV_TEST__.testIsUsableURL()
__SHV_TEST__.testHostMatches()
```

---

## Debugging Tips

1. **Console logs**: Search for `console.log` / `console.debug` in source
2. **Network tab**: Filter by "media" to see video requests
3. **IndexedDB**: DevTools → Application → IndexedDB → shvUltraLiteDB
4. **localStorage**: DevTools → Application → Local Storage → shvUltraLite.settings.v3
5. **MutationObserver**: `getEventListeners(document)` in console

---

## Release Checklist

- [ ] Version bumped in 4 places
- [ ] `versions/vX.Y.Z.user.js` created
- [ ] `CHANGELOG.md` updated
- [ ] Pre-change backup created
- [ ] Release ZIP created + SHA256 recorded
- [ ] Git bundle created + verified
- [ ] `BACKUP_MANIFEST.md` updated
- [ ] `PROJECT_STATUS.md` updated
- [ ] `node --check` passes
- [ ] Manual test on shahvani.com passes
- [ ] User approval received
- [ ] Git commit + tag
- [ ] GitHub push (private repo)