# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: run-tests.js >> Shahvani Ultra Lite - desktop
- Location: tests\run-tests.js:20:7

# Error details

```
TypeError: page.setUserAgent is not a function
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import * as fs from 'fs';
  3   | import * as path from 'path';
  4   | 
  5   | const scriptPath = path.resolve('src/shahvani-ultra-lite.user.js');
  6   | const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
  7   | 
  8   | const viewports = [
  9   |   { name: 'desktop', width: 1920, height: 1080, isMobile: false },
  10  |   { name: 'pixel5', width: 375, height: 812, isMobile: true },
  11  |   { name: 'galaxyS23', width: 412, height: 915, isMobile: true },
  12  | ];
  13  | 
  14  | const userAgents = {
  15  |   desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0',
  16  |   mobile: 'Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0',
  17  | };
  18  | 
  19  | for (const vp of viewports) {
  20  |   test(`Shahvani Ultra Lite - ${vp.name}`, async ({ page, context }) => {
  21  |     await page.setViewportSize({ width: vp.width, height: vp.height });
> 22  |     await page.setUserAgent(vp.isMobile ? userAgents.mobile : userAgents.desktop);
      |                ^ TypeError: page.setUserAgent is not a function
  23  | 
  24  |     await page.addInitScript(scriptContent);
  25  | 
  26  |     await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  27  |     await page.waitForTimeout(3000);
  28  | 
  29  |     // Check FAB exists
  30  |     const fab = page.locator('#shv-ultralite-fab');
  31  |     await expect(fab).toBeVisible();
  32  | 
  33  |     // Check placeholders exist for videos/iframes
  34  |     const videoPlaceholders = page.locator('.shv-video-placeholder');
  35  |     const framePlaceholders = page.locator('.shv-frame-placeholder');
  36  | 
  37  |     // At least one media element should be deferred
  38  |     const totalPlaceholders = await videoPlaceholders.count() + await framePlaceholders.count();
  39  |     expect(totalPlaceholders).toBeGreaterThan(0);
  40  | 
  41  |     // Check no console errors
  42  |     const errors = [];
  43  |     page.on('console', msg => {
  44  |       if (msg.type() === 'error' && !msg.text().includes('ShahvaniUltraLite')) {
  45  |         errors.push(msg.text());
  46  |       }
  47  |     });
  48  |     await page.waitForTimeout(500);
  49  |     expect(errors).toHaveLength(0);
  50  |   });
  51  | }
  52  | 
  53  | test('Profile switching', async ({ page }) => {
  54  |   await page.setViewportSize({ width: 1920, height: 1080 });
  55  |   await page.addInitScript(scriptContent);
  56  |   await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  57  |   await page.waitForTimeout(2000);
  58  | 
  59  |   // Open panel
  60  |   await page.click('#shv-ultralite-fab');
  61  |   await page.waitForTimeout(500);
  62  | 
  63  |   // Switch to Compatible
  64  |   await page.click('button:has-text("سازگار")');
  65  |   await page.waitForTimeout(300);
  66  | 
  67  |   const rootClass = await page.evaluate(() => document.documentElement.className);
  68  |   expect(rootClass).not.toContain('shv-lite-effects');
  69  | 
  70  |   // Switch to Balanced
  71  |   await page.click('button:has-text("متعادل")');
  72  |   await page.waitForTimeout(300);
  73  | 
  74  |   const rootClass2 = await page.evaluate(() => document.documentElement.className);
  75  |   expect(rootClass2).toContain('shv-lite-effects');
  76  |   expect(rootClass2).not.toContain('shv-ultra-mode');
  77  | 
  78  |   // Switch to Ultra
  79  |   await page.click('button:has-text("Ultra")');
  80  |   await page.waitForTimeout(300);
  81  | 
  82  |   const rootClass3 = await page.evaluate(() => document.documentElement.className);
  83  |   expect(rootClass3).toContain('shv-ultra-mode');
  84  | });
  85  | 
  86  | test('Theme switching', async ({ page }) => {
  87  |   await page.setViewportSize({ width: 1920, height: 1080 });
  88  |   await page.addInitScript(scriptContent);
  89  |   await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  90  |   await page.waitForTimeout(2000);
  91  | 
  92  |   await page.click('#shv-ultralite-fab');
  93  |   await page.waitForTimeout(500);
  94  | 
  95  |   // Go to Appearance tab
  96  |   await page.click('button:has-text("ظاهر")');
  97  |   await page.waitForTimeout(300);
  98  | 
  99  |   // Switch to light
  100 |   await page.click('button:has-text("روشن")');
  101 |   await page.waitForTimeout(300);
  102 | 
  103 |   const fabTheme = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  104 |   expect(fabTheme).toBe('light');
  105 | 
  106 |   // Switch to dark
  107 |   await page.click('button:has-text("تیره")');
  108 |   await page.waitForTimeout(300);
  109 | 
  110 |   const fabTheme2 = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  111 |   expect(fabTheme2).toBe('dark');
  112 | 
  113 |   // Switch to system
  114 |   await page.click('button:has-text("پیروی از سیستم")');
  115 |   await page.waitForTimeout(300);
  116 | 
  117 |   const fabTheme3 = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  118 |   expect(fabTheme3).toBe('system');
  119 | });
  120 | 
  121 | test('Compact mode toggle', async ({ page }) => {
  122 |   await page.setViewportSize({ width: 1920, height: 1080 });
```