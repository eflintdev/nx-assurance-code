import { expect } from '@playwright/test';
import { test } from '../fixtures/app.fixture';
import {
  BANNER_HEADING_MOCK,
  HEADER_PHONE_MOCK,
  BREADCRUMBS_MOCK,
  CONTENT_PARAGRAPHS_MOCK,
  QUOTE_FORM_MOCK,
  FOOTER_LINKS_MOCK,
} from '../mocks/general/general.e2e.mocks';

const SELECTORS = {
  form: 'quote-form form.qf-form',
  firstName: 'input[name="firstName"]',
  lastName: 'input[name="lastName"]',
  email: 'input[name="email"]',
  phone: 'input[name="phone"]',
  address: 'input[name="address"]',
  city: 'input[name="city"]',
  zip: 'input[name="zip"]',
  state: 'select[name="state"]',
  submit: 'button[type="submit"]',
};

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load the home page', async ({ page }) => {
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display the correct banner heading', async ({ page }) => {
    const banner = page.locator('.banner-section h1');
    await expect(banner).toHaveText(BANNER_HEADING_MOCK);
  });

  test('should display the header and navigation', async ({ page }) => {
    const header = page.locator('app-header');
    await expect(header).toBeVisible();
    await expect(header.locator('.brand-logo')).toBeVisible();
    await expect(header.locator('.phone-link')).toContainText(HEADER_PHONE_MOCK);
  });

  test('should render main content and paragraphs', async ({ page }) => {
    const main = page.locator('site-content');
    await expect(main).toBeVisible();
    for (const paragraph of CONTENT_PARAGRAPHS_MOCK) {
      await expect(main).toContainText(paragraph);
    }
  });

  test('should show breadcrumbs with correct links', async ({ page }) => {
    const breadcrumbs = page.locator('site-content .breadcrumbs a');
    for (let i = 0; i < BREADCRUMBS_MOCK.length - 1; i++) {
      await expect(breadcrumbs.nth(i)).toHaveText(BREADCRUMBS_MOCK[i].label);
      await expect(breadcrumbs.nth(i)).toHaveAttribute('href', BREADCRUMBS_MOCK[i].href);
    }
    // Last breadcrumb is a span (current)
    const currentCrumb = page.locator('site-content .breadcrumbs span').last();
    await expect(currentCrumb).toHaveText(BREADCRUMBS_MOCK[BREADCRUMBS_MOCK.length - 1].label);
  });

  test('should display and validate the quote form', async ({ page }) => {
    const form = page.locator(SELECTORS.form);
    await expect(form).toBeVisible();
    await expect(form.locator(SELECTORS.firstName)).toBeVisible();
    await expect(form.locator(SELECTORS.lastName)).toBeVisible();
    await expect(form.locator(SELECTORS.email)).toBeVisible();
    await expect(form.locator(SELECTORS.phone)).toBeVisible();
    await expect(form.locator(SELECTORS.address)).toBeVisible();
    await expect(form.locator(SELECTORS.city)).toBeVisible();
    await expect(form.locator(SELECTORS.zip)).toBeVisible();
    await expect(form.locator(SELECTORS.state)).toBeVisible();
    await form.locator(SELECTORS.firstName).fill(QUOTE_FORM_MOCK.firstName);
    await expect(form.locator(SELECTORS.firstName)).toHaveValue(QUOTE_FORM_MOCK.firstName);
    await form.locator(SELECTORS.lastName).fill(QUOTE_FORM_MOCK.lastName);
    await expect(form.locator(SELECTORS.lastName)).toHaveValue(QUOTE_FORM_MOCK.lastName);
    await form.locator(SELECTORS.email).fill(QUOTE_FORM_MOCK.email);
    await expect(form.locator(SELECTORS.email)).toHaveValue(QUOTE_FORM_MOCK.email);
    await form.locator(SELECTORS.phone).fill(QUOTE_FORM_MOCK.phone);
    await expect(form.locator(SELECTORS.phone)).toHaveValue(QUOTE_FORM_MOCK.phone);
    await form.locator(SELECTORS.address).fill(QUOTE_FORM_MOCK.address);
    await expect(form.locator(SELECTORS.address)).toHaveValue(QUOTE_FORM_MOCK.address);
    await form.locator(SELECTORS.city).fill(QUOTE_FORM_MOCK.city);
    await expect(form.locator(SELECTORS.city)).toHaveValue(QUOTE_FORM_MOCK.city);
    await form.locator(SELECTORS.zip).fill(QUOTE_FORM_MOCK.zip);
    await expect(form.locator(SELECTORS.zip)).toHaveValue(QUOTE_FORM_MOCK.zip);
    await form.locator(SELECTORS.state).selectOption(QUOTE_FORM_MOCK.state);
    await expect(form.locator(SELECTORS.state)).toHaveValue(QUOTE_FORM_MOCK.state);
    await form.locator(SELECTORS.submit).click();
  });

  test('should display the footer with links', async ({ page }) => {
    const footer = page.locator('app-footer');
    await expect(footer).toBeVisible();
    for (const link of FOOTER_LINKS_MOCK) {
      await expect(footer.locator(`a[href='${link.href}']`)).toHaveText(link.text);
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.locator('button.menu-toggle').click();
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.side-drawer')).toBeVisible();
  });

  test('should have accessible ARIA attributes', async ({ page }) => {
    await expect(page.locator('site-content .breadcrumbs[aria-label="Breadcrumb"]')).toBeVisible();
    await expect(page.locator('app-footer .footer-top-links[aria-label="Footer"]')).toBeVisible();
  });
});
