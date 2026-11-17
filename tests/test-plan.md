# Test Plan — Shahvani Ultra Lite

## Target URLs
- `https://shahvani.com/` (homepage)
- `https://shahvani.com/story/...` (story pages with video/iframe)
- `https://shahvani.com/category/...` (category listings)
- Mobile: `https://m.shahvani.com/` (if exists)

## Test Matrix

| Platform | Viewport | User Agent | Test Cases |
|----------|----------|------------|------------|
| Desktop Windows | 1920×1080 | Firefox 130+ | TC-01 to TC-15 |
| Android Firefox | 375×812 (Pixel 5) | Firefox Android 130+ | TC-01 to TC-15 |
| Android Firefox | 412×915 (Galaxy S23) | Firefox Android 130+ | TC-01 to TC-15 |

## Test Cases

### TC-01: Initial Load — Media Deferral
**Precondition:** Fresh profile, no localStorage settings
**Action:** Navigate to shahvani.com
**Expected:** 
- Videos replaced with ▶ placeholders (poster visible if exists)
- Iframes replaced with ↗ placeholders
- Panel FAB (⚡ سبک‌ساز) visible bottom-right
- No console errors
**Pass Criteria:** All media deferred, placeholders clickable, panel works

### TC-02: Placeholder Click — Video Activation
**Precondition:** Video placeholder visible
**Action:** Click video placeholder
**Expected:** 
- Placeholder removed, video element restored
- `src` attributes restored, `preload=metadata`
- Video loads, play button works
- Stats update: "ویدئوهای معوق" decreases, "ویدئوهای فعال‌شده" increases
**Pass Criteria:** Video plays, no layout shift

### TC-03: Placeholder Click — Iframe Activation
**Precondition:** Iframe placeholder visible (non-ad)
**Action:** Click iframe placeholder
**Expected:**
- Placeholder removed, iframe `src` restored
- Embedded content loads
- Stats update
**Pass Criteria:** Iframe content visible

### TC-04: Ad Iframe Filtering
**Precondition:** Iframe from known ad host (e.g., googlesyndication.com)
**Action:** Navigate to page with ad iframe
**Expected:**
- Placeholder shows "کادر تبلیغاتی شناخته‌شده فیلتر شده"
- Click shows notice: "فیلتر تبلیغات شناخته‌شده فعال است..."
- Panel toggle "فیلتر تبلیغات شناخته‌شده: روشن/خاموش" works
**Pass Criteria:** Known ads filtered, toggle functional

### TC-05: Profile Switching — Compatible
**Precondition:** Default profile (balanced)
**Action:** Panel → Overview → click "سازگار"
**Expected:**
- `html.shv-lite-effects` class removed
- Images restored to eager loading
- `content-visibility` removed from cards
- Status: "پروفایل فعال: سازگار"
**Pass Criteria:** No visual optimizations, media deferral still works

### TC-06: Profile Switching — Balanced
**Precondition:** Compatible profile
**Action:** Panel → Overview → click "متعادل"
**Expected:**
- `html.shv-lite-effects` added
- Off-screen images get `loading=lazy` + `fetchpriority=low`
- Status: "پروفایل فعال: متعادل"
**Pass Criteria:** Effects reduced, images lazy

### TC-07: Profile Switching — Ultra
**Precondition:** Balanced profile
**Action:** Panel → Overview → click "Ultra"
**Expected:**
- `html.shv-ultra-mode` added
- Repeated cards get `content-visibility: auto`
- Status: "پروفایل فعال: Ultra"
**Pass Criteria:** Card optimization active

### TC-08: Theme Switching
**Precondition:** Default theme (system)
**Action:** Panel → Appearance → click "تیره" / "روشن" / "پیروی از سیستم"
**Expected:**
- FAB and panel `data-theme` attribute updates instantly
- CSS variables (--shv-bg, --shv-accent, etc.) swap
- No panel reload needed
**Pass Criteria:** Instant theme change, persists in localStorage

### TC-09: Compact Mode
**Precondition:** Default panel
**Action:** Panel → Appearance → click "نمای فشرده: خاموش"
**Expected:**
- Panel gets `shv-compact` class
- Descriptions hidden, padding reduced
- Button text: "نمای فشرده: روشن"
**Pass Criteria:** Smaller panel, toggle works

### TC-10: Emergency Mode
**Precondition:** Videos playing or deferred
**Action:** Panel → Overview → click "حالت اضطراری: خاموش"
**Expected:**
- All HTML videos paused immediately
- Placeholder text changes: "حالت اضطراری روشن است..."
- Clicking placeholders shows notice, no activation
- Button text: "حالت اضطراری: روشن" (red)
**Pass Criteria:** Complete playback block, reversible

### TC-11: Load Visible Players
**Precondition:** Multiple placeholders, some on-screen
**Action:** Panel → Media → click "بارگذاری پلیرهای قابل‌مشاهده"
**Expected:**
- Only on-screen placeholders activate (no play)
- Stats update
- Status: "پلیرهای قابل‌مشاهده بارگذاری شدند..."
**Pass Criteria:** Selective activation, no auto-play

### TC-12: Load All Pending Players
**Precondition:** Multiple deferred placeholders
**Action:** Panel → Media → click "بارگذاری همهٔ پلیرهای معوق" → confirm
**Expected:**
- All non-ad placeholders activate
- Status: "درخواست بارگذاری برای N پلیر ارسال شد..."
**Pass Criteria:** Batch activation with confirmation

### TC-13: Pause All Videos
**Precondition:** Multiple videos playing
**Action:** Panel → Media → click "⏸ مکث همهٔ ویدئوها"
**Expected:**
- All HTML5 videos paused
- Status shows count paused
- Iframe videos unaffected (not controllable)
**Pass Criteria:** HTML videos paused, count accurate

### TC-14: Release Inactive Media
**Precondition:** Paused videos + off-screen iframes
**Action:** Panel → Media → click "آزادسازی دستی منابع غیرفعال" → confirm
**Expected:**
- Paused videos: sources detached, placeholders restored, resumeTime saved
- Off-screen iframes: src removed, placeholders restored
- Stats update: pending increases, active decreases
- Status: "آزادسازی انجام شد..."
**Pass Criteria:** Resources freed, resume position preserved for videos

### TC-15: Settings Persistence
**Precondition:** Changed profile, theme, compact, ad filter
**Action:** Reload page (F5)
**Expected:**
- All settings restored from localStorage
- Panel reflects current settings
- No flash of wrong theme
**Pass Criteria:** Full persistence across reloads

### TC-16: SPA/AJAX Content (MutationObserver)
**Precondition:** On story page, scroll to trigger infinite scroll
**Action:** Scroll down, new content loads via AJAX
**Expected:**
- New videos/iframes automatically deferred
- New images optimized per profile
- No console errors
**Pass Criteria:** Dynamic content handled

### TC-17: Detached Node Cleanup
**Precondition:** Page removes elements (e.g., modal close, tab switch)
**Action:** Trigger DOM removal of tracked media
**Expected:**
- `cleanedEntries` counter increments
- WeakMap entries cleaned
- Placeholders removed
- No memory leak
**Pass Criteria:** Cleanup works, stats accurate

### TC-18: srcdoc Iframe Handling
**Precondition:** Iframe with `srcdoc` attribute (embedded HTML)
**Action:** Navigate to page with srcdoc iframe
**Expected:**
- Placeholder created with title-aware label
- Click restores `srcdoc` + original `src`
- No content loss
**Pass Criteria:** srcdoc preserved and restored

### TC-19: Blob/MediaSource Video Protection
**Precondition:** Video using `blob:` URL or `srcObject` (MSE)
**Action:** Navigate to page with such video
**Expected:**
- Video NOT deferred (marked unsafe)
- Plays normally
- No placeholder created
**Pass Criteria:** Advanced players unaffected

### TC-20: Performance Benchmarks
**Metric Targets:**
| Metric | Target |
|--------|--------|
| Initial scan time | < 15ms |
| Placeholder click → video play | < 200ms |
| Profile switch UI update | < 50ms |
| Theme switch | < 30ms |
| Memory overhead | < 100KB |
| Long task detection | Works where supported |

### TC-21: No Console Errors
**Check:** Firefox DevTools Console after each test
**Pass Criteria:** Zero errors, only `[ShahvaniUltraLite]` info logs if debug enabled

## Automation Script (Playwright)

```javascript
// tests/run-tests.js
import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1920, height: 1080, isMobile: false },
  { name: 'pixel5', width: 375, height: 812, isMobile: true },
  { name: 'galaxyS23', width: 412, height: 915, isMobile: true },
];

const userAgents = {
  desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0',
  mobile: 'Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0',
};

for (const vp of viewports) {
  test(`Shahvani Ultra Lite - ${vp.name}`, async ({ page, context }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.setUserAgent(vp.isMobile ? userAgents.mobile : userAgents.desktop);

    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check FAB exists
    const fab = page.locator('#shv-ultralite-fab');
    await expect(fab).toBeVisible();

    // Check placeholders exist for videos/iframes
    const videoPlaceholders = page.locator('.shv-video-placeholder');
    const framePlaceholders = page.locator('.shv-frame-placeholder');
    
    // At least one media element should be deferred
    const totalPlaceholders = await videoPlaceholders.count() + await framePlaceholders.count();
    expect(totalPlaceholders).toBeGreaterThan(0);

    // Check no console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('ShahvaniUltraLite')) {
        errors.push(msg.text());
      }
    });
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });
}

async function readScriptFile() {
  const fs = await import('fs');
  const path = await import('path');
  const scriptPath = path.resolve('src/shahvani-ultra-lite.user.js');
  return fs.readFileSync(scriptPath, 'utf-8');
}

test('Profile switching', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const scriptContent = await readScriptFile();
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Open panel
  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(300);

  // Switch to Compatible
  await page.click('button:has-text("سازگار")');
  await page.waitForTimeout(200);
  
  const rootClass = await page.evaluate(() => document.documentElement.className);
  expect(rootClass).not.toContain('shv-lite-effects');

  // Switch to Ultra
  await page.click('button:has-text("Ultra")');
  await page.waitForTimeout(200);
  
  const rootClass2 = await page.evaluate(() => document.documentElement.className);
  expect(rootClass2).toContain('shv-ultra-mode');
});

test('Theme switching', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const scriptContent = await readScriptFile();
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(300);

  // Go to Appearance tab
  await page.click('button:has-text("ظاهر")');
  await page.waitForTimeout(200);

  // Switch to light
  await page.click('button:has-text("روشن")');
  await page.waitForTimeout(200);

  const fabTheme = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  expect(fabTheme).toBe('light');

  // Switch to dark
  await page.click('button:has-text("تیره")');
  await page.waitForTimeout(200);

  const fabTheme2 = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  expect(fabTheme2).toBe('dark');
});

test('Emergency mode', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const scriptContent = await readScriptFile();
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(300);

  // Enable emergency
  await page.click('button.shv-primary:has-text("حالت اضطراری")');
  await page.waitForTimeout(200);

  const emergencyBtn = page.locator('button.shv-primary:has-text("حالت اضطراری: روشن")');
  await expect(emergencyBtn).toBeVisible();

  // Try to click a placeholder - should show notice
  const placeholder = page.locator('.shv-video-placeholder').first();
  if (await placeholder.count() > 0) {
    await placeholder.click();
    await page.waitForTimeout(200);
    // Should not activate
  }
});
```

## Manual Verification Checklist
- [ ] Tampermonkey shows script enabled on shahvani.com
- [ ] Script version matches `versions/v3.0.0.user.js`
- [ ] Android: One-tap import from raw GitHub URL works
- [ ] Panel opens/closes smoothly, tabs switch
- [ ] All 3 profiles work distinctly
- [ ] Theme switch instant, no flicker
- [ ] Compact mode toggles correctly
- [ ] Emergency mode blocks all activation
- [ ] Ad filter toggles known ad iframes
- [ ] Load visible / load all / pause all / release work
- [ ] Settings persist after reload
- [ ] No interference with site functionality (comments, login, search)
- [ ] Works with uBlock Origin / other extensions
- [ ] RTL layout correct, Persian text renders properly