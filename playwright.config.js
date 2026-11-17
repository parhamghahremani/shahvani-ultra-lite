import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['run-tests.js'],
  timeout: 90000,
  expect: { timeout: 15000 },
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'firefox-desktop', use: { browserName: 'firefox', viewport: { width: 1920, height: 1080 } } },
    { name: 'firefox-pixel5', use: { browserName: 'firefox', viewport: { width: 375, height: 812 }, isMobile: true } },
    { name: 'firefox-galaxy-s23', use: { browserName: 'firefox', viewport: { width: 412, height: 915 }, isMobile: true } },
  ],
  reporter: 'list',
});