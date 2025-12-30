import { devices, expect } from '@playwright/test';
import { matchers, createConfig } from '@stencil/playwright';

const baseURL = process.env['BASE_URL'] || 'http://localhost:3333';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

export default createConfig({
  testDir: './src/e2e-playwright/src',
  testMatch: '**/*.spec.ts',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  // { name: 'webkit', use: { ...devices['Desktop Safari'] } }, // uncomment for Safari e2e tests
],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
  },
});