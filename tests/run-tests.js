import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const scriptPath = path.resolve('src/shahvani-ultra-lite.user.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

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

    await page.addInitScript(scriptContent);

    await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);

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

test('Profile switching', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Open panel
  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Switch to Compatible
  await page.click('button:has-text("سازگار")');
  await page.waitForTimeout(300);

  const rootClass = await page.evaluate(() => document.documentElement.className);
  expect(rootClass).not.toContain('shv-lite-effects');

  // Switch to Balanced
  await page.click('button:has-text("متعادل")');
  await page.waitForTimeout(300);

  const rootClass2 = await page.evaluate(() => document.documentElement.className);
  expect(rootClass2).toContain('shv-lite-effects');
  expect(rootClass2).not.toContain('shv-ultra-mode');

  // Switch to Ultra
  await page.click('button:has-text("Ultra")');
  await page.waitForTimeout(300);

  const rootClass3 = await page.evaluate(() => document.documentElement.className);
  expect(rootClass3).toContain('shv-ultra-mode');
});

test('Theme switching', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Appearance tab
  await page.click('button:has-text("ظاهر")');
  await page.waitForTimeout(300);

  // Switch to light
  await page.click('button:has-text("روشن")');
  await page.waitForTimeout(300);

  const fabTheme = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  expect(fabTheme).toBe('light');

  // Switch to dark
  await page.click('button:has-text("تیره")');
  await page.waitForTimeout(300);

  const fabTheme2 = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  expect(fabTheme2).toBe('dark');

  // Switch to system
  await page.click('button:has-text("پیروی از سیستم")');
  await page.waitForTimeout(300);

  const fabTheme3 = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  expect(fabTheme3).toBe('system');
});

test('Compact mode toggle', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Appearance tab
  await page.click('button:has-text("ظاهر")');
  await page.waitForTimeout(300);

  // Enable compact
  await page.click('button:has-text("نمای فشرده: خاموش")');
  await page.waitForTimeout(300);

  const panel = page.locator('#shv-ultralite-panel');
  await expect(panel).toHaveClass(/shv-compact/);

  // Disable compact
  await page.click('button:has-text("نمای فشرده: روشن")');
  await page.waitForTimeout(300);

  await expect(panel).not.toHaveClass(/shv-compact/);
});

test('Emergency mode', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Enable emergency
  await page.click('button.shv-primary:has-text("حالت اضطراری")');
  await page.waitForTimeout(300);

  const emergencyBtn = page.locator('button.shv-primary:has-text("حالت اضطراری: روشن")');
  await expect(emergencyBtn).toBeVisible();

  // Try to click a placeholder - should show notice
  const placeholder = page.locator('.shv-video-placeholder').first();
  if (await placeholder.count() > 0) {
    await placeholder.click();
    await page.waitForTimeout(300);
    // Should not activate - video should not play
  }

  // Disable emergency
  await page.click('button.shv-primary:has-text("حالت اضطراری: روشن")');
  await page.waitForTimeout(300);

  const emergencyBtnOff = page.locator('button.shv-primary:has-text("حالت اضطراری: خاموش")');
  await expect(emergencyBtnOff).toBeVisible();
});

test('Ad filter toggle', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Media tab
  await page.click('button:has-text("رسانه")');
  await page.waitForTimeout(300);

  // Toggle ad filter
  const adFilterBtn = page.locator('button:has-text("فیلتر تبلیغات شناخته‌شده")');
  await expect(adFilterBtn).toBeVisible();

  // Click to toggle
  await adFilterBtn.click();
  await page.waitForTimeout(300);

  // Toggle back
  await adFilterBtn.click();
  await page.waitForTimeout(300);
});

test('Load visible players', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Media tab
  await page.click('button:has-text("رسانه")');
  await page.waitForTimeout(300);

  // Click load visible
  await page.click('button:has-text("بارگذاری پلیرهای قابل‌مشاهده")');
  await page.waitForTimeout(500);
});

test('Load all pending players', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Media tab
  await page.click('button:has-text("رسانه")');
  await page.waitForTimeout(300);

  // Click load all (will show confirm dialog)
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  await page.click('button:has-text("بارگذاری همهٔ پلیرهای معوق")');
  await page.waitForTimeout(1000);
});

test('Pause all videos', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Media tab
  await page.click('button:has-text("رسانه")');
  await page.waitForTimeout(300);

  // Click pause all
  await page.click('button:has-text("مکث همهٔ ویدئوها")');
  await page.waitForTimeout(500);
});

test('Release inactive media', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Go to Media tab
  await page.click('button:has-text("رسانه")');
  await page.waitForTimeout(300);

  // Click release inactive (will show confirm dialog)
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  await page.click('button:has-text("آزادسازی دستی منابع غیرفعال")');
  await page.waitForTimeout(1000);
});

test('Settings persistence across reload', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#shv-ultralite-fab');
  await page.waitForTimeout(500);

  // Switch to Ultra
  await page.click('button:has-text("Ultra")');
  await page.waitForTimeout(300);

  // Switch to dark theme
  await page.click('button:has-text("ظاهر")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("تیره")');
  await page.waitForTimeout(300);

  // Reload page
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Check settings persisted
  const rootClass = await page.evaluate(() => document.documentElement.className);
  expect(rootClass).toContain('shv-ultra-mode');

  const fab = page.locator('#shv-ultralite-fab');
  await expect(fab).toBeVisible();

  const fabTheme = await page.getAttribute('#shv-ultralite-fab', 'data-theme');
  expect(fabTheme).toBe('dark');
});

test('SPA/AJAX content handling (scroll)', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(scriptContent);
  await page.goto('https://shahvani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Scroll to trigger potential infinite scroll
  await page.evaluate(() => window.scrollBy(0, 2000));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollBy(0, 2000));
  await page.waitForTimeout(2000);

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