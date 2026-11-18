# Manual Test Plan — Shahvani Ultra Lite

## Pre-Test Setup

1. **Clean Firefox Profile** (or new container tab)
2. **Install Tampermonkey** (latest stable)
3. **Install userscript** from `src/shahvani-ultra-lite.user.js`
4. **Open DevTools** → Network tab (filter: "media", "fetch/xhr")
5. **Navigate to** `https://shahvani.com`

---

## Test Cases

### TC-01: Initial Load — Zero Downloads (Default `videoProbe: 'off'`)

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load shahvani.com | Page loads, no video media requests in Network tab |
| 2 | Check placeholders | All videos replaced with placeholders, numbered sequentially |
| 3 | Verify Network tab | Zero requests to video URLs (`.mp4`, `.webm`, etc.) |
| 4 | Check console | No errors |

**Pass Criteria**: No video bytes downloaded before user interaction.

---

### TC-02: Tap to Load Video

| Step | Action | Expected |
|------|--------|----------|
| 1 | Tap first video placeholder | Video loads, plays, shows duration |
| 2 | Check Network tab | HEAD request to video URL, then video segments |
| 3 | Tap second placeholder | Second video loads, first pauses (`singlePlayback`) |
| 4 | Verify duration badge | Shows duration (e.g., "2:34") |

**Pass Criteria**: Video plays on tap, only tapped video downloads.

---

### TC-03: Cache Persistence (Return Visit)

| Step | Action | Expected |
|------|--------|----------|
| 1 | After TC-02, reload page | Placeholders show size/duration from cache instantly |
| 2 | Check Network tab | Zero video requests on load |
| 3 | Tap cached video | Plays from resume position (`resumePosition`) |

**Pass Criteria**: Size/duration displayed without network; resume works.

---

### TC-04: Video Probe Modes

#### TC-04a: `videoProbe: 'off'` (Default)
- Same as TC-01 — zero requests ever for locked videos

#### TC-04b: `videoProbe: 'cache'`
| Step | Action | Expected |
|------|--------|----------|
| 1 | Set `videoProbe: 'cache'` in panel (Look → Video Metadata) | Setting saved |
| 2 | Reload page | Cached videos show size/duration; unknown show nothing |
| 3 | Check Network tab | Zero requests |

#### TC-04c: `videoProbe: 'auto'`
| Step | Action | Expected |
|------|--------|----------|
| 1 | Set `videoProbe: 'auto'` + `showVideoInfo: true` | Setting saved |
| 2 | Reload page | Cards in view: 1-2 Range requests (16 KB + 8 KB) |
| 3 | Check Network tab | Requests with `Range:` header, 206 Partial Content |
| 4 | Scroll away and back | No duplicate requests (session cache) |
| 5 | Verify video never downloads | No video segment requests until tap |

**Pass Criteria**: Only tiny Range requests for in-view cards; video body never downloaded.

---

### TC-05: Video Numbering Stability

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load page with multiple videos | Numbers 1, 2, 3... in DOM order |
| 2 | Reload page | Same numbers for same videos |
| 3 | Check for duplicates | No two placeholders with same number |

**Pass Criteria**: Stable DOM-order numbering, no duplicates from app-forum-topic double render.

---

### TC-06: Panel UI — All Tabs

| Tab | Test | Expected |
|-----|------|----------|
| Overview | Profile buttons | Switch profile, stats update |
| Overview | Emergency button | Toggles, pauses all videos |
| Video | `lockVideo` toggle | Immediate effect on new videos |
| Video | `instantLock` toggle | No delay on new videos |
| Video | `showVideoIndex`/`showVideoInfo` | Badges appear/disappear live |
| Video | `videoProbe` dropdown | 3 modes, auto requires showVideoInfo |
| Frames | `lockFrames` toggle | Iframes get placeholders |
| Frames | `lockSameSite` toggle | Same-site frames locked/unlocked |
| Ads | `hideKnownAds` toggle | Ad iframes filtered |
| Ads | Custom hosts | Added domains filtered |
| Page | `lazyImages`/`calmMotion` | Images/animations affected |
| Look | Theme presets | 5 presets + custom work |
| Look | Accent color | Custom color applied |
| Look | FAB side/position | Draggable, persists |
| Data | Export/Import | JSON round-trip works |
| Data | Reset | Returns to defaults |

---

### TC-07: Emergency Mode

| Step | Action | Expected |
|------|--------|----------|
| 1 | Tap Emergency button (Overview) | Red state, "Emergency lock on" toast |
| 2 | Try tap video placeholder | Blocked, "Emergency lock is on" toast |
| 3 | Tap Emergency again | Off, "Emergency lock off" toast |
| 4 | Tap placeholder | Now works normally |

---

### TC-08: Release Functions

| Function | Test | Expected |
|----------|------|----------|
| Pause All | Tap "Pause All" | All playing videos pause |
| Release | Tap "Release" → confirm | Paused/off-screen videos get placeholders |
| Auto-Release | Enable, wait >5 min | Off-screen paused videos released |

---

### TC-09: Ad/Tracker Blocking

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load page with ad iframes | Known ad iframes replaced/hidden |
| 2 | Disable `hideKnownAds` | Ad iframes load normally |
| 3 | Add custom ad host | That domain's iframes filtered |
| 4 | Check Network tab | No requests to blocked ad domains |

---

### TC-10: Settings Persistence

| Step | Action | Expected |
|------|--------|----------|
| 1 | Change multiple settings | All saved |
| 2 | Reload page | All settings restored |
| 3 | Open in private window | Settings work (IndexedDB) |
| 4 | Export → edit JSON → Import | Round-trip works |

---

### TC-11: Mobile (Android Firefox)

| Step | Action | Expected |
|------|--------|----------|
| 1 | Install Tampermonkey + script | Works |
| 2 | Tap video placeholder | Loads & plays |
| 3 | Drag FAB | Repositions, side switches |
| 4 | Open panel | Bottom sheet slides up |
| 5 | Toggle compact mode | Smaller panel |
| 6 | Rotate screen | Layout adapts |

---

### TC-12: Edge Cases

| Case | Test | Expected |
|------|------|----------|
| Blob video | `<video src="blob:...">` | Skipped (unsafe), plays normally |
| MediaSource | MSE player | Skipped, plays normally |
| srcdoc iframe | `<iframe srcdoc="...">` | Deferred, restores on activate |
| Nested iframe | iframe in iframe | Each handled independently |
| 30+ videos | Long page | All numbered, probe queue respects limits |
| Rapid scroll | Scroll fast through page | No probe duplicates, no crashes |
| Private browsing | Open in private window | IndexedDB works, settings persist |

---

## Automated Verification (Playwright — Research Only)

```javascript
// test-results should show:
// - 0 video requests for locked videos (off mode)
// - Correct placeholder count
// - No console errors
// - Settings persist across reloads
```

Run: `npx playwright test` (requires local test server)

---

## Sign-Off

| Test | Pass/Fail | Notes |
|------|-----------|-------|
| TC-01: Zero Downloads |  |  |
| TC-02: Tap to Load |  |  |
| TC-03: Cache Persistence |  |  |
| TC-04: Probe Modes |  |  |
| TC-05: Numbering |  |  |
| TC-06: Panel Tabs |  |  |
| TC-07: Emergency |  |  |
| TC-08: Release |  |  |
| TC-09: Ad Blocking |  |  |
| TC-10: Persistence |  |  |
| TC-11: Mobile |  |  |
| TC-12: Edge Cases |  |  |

**Overall**: PASS / FAIL

**Tested by**: ___________ **Date**: ___________ **Version**: 3.5.4