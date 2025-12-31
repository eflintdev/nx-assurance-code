import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { AppHeader } from './app-header';
import {
  BRAND_NAME_MOCK,
  BRAND_LOGO_ARIA_LABEL_MOCK,
  PHONE_LINK_MOCK,
  MENU_TOGGLE_ARIA_LABEL_MOCK,
  SEARCH_BUTTON_ARIA_LABEL_MOCK,
  LOGIN_LINK_TEXT_MOCK,
  TEST_COMPANY_NAME_MOCK,
  TEST_PHONE_MOCK,
  NAV_LOGO_TYPE_MOCK
} from '@apps-shared/lib/mocks';

describe('app-header', () => {
  it('renders with required props', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    expect(page.root).toBeTruthy();
  });

  it('renders brand logo with correct aria-label', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const brandLogoLink = page.root.shadowRoot.querySelector('.brand-logo') as HTMLAnchorElement;
    expect(brandLogoLink).toBeTruthy();
    expect(brandLogoLink.getAttribute('aria-label')).toBe(BRAND_LOGO_ARIA_LABEL_MOCK);
  });

  it('renders phone number with correct format and tel link', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const phoneLink = page.root.shadowRoot.querySelector('.phone-link') as HTMLAnchorElement;
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.textContent).toBe(TEST_PHONE_MOCK);
    expect(phoneLink.href).toContain(PHONE_LINK_MOCK);
  });

  it('renders menu toggle button with correct aria-label', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const menuButton = page.root.shadowRoot.querySelector('.menu-toggle') as HTMLButtonElement;
    expect(menuButton).toBeTruthy();
    expect(menuButton.getAttribute('aria-label')).toBe(MENU_TOGGLE_ARIA_LABEL_MOCK);
  });

  it('renders search button with correct aria-label', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const searchButton = page.root.shadowRoot.querySelector('.search-btn') as HTMLButtonElement;
    expect(searchButton).toBeTruthy();
    expect(searchButton.getAttribute('aria-label')).toBe(SEARCH_BUTTON_ARIA_LABEL_MOCK);
  });

  it('renders login link with correct text', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const loginLink = page.root.shadowRoot.querySelector('.login-link') as HTMLAnchorElement;
    expect(loginLink).toBeTruthy();
    expect(loginLink.textContent.trim()).toContain(LOGIN_LINK_TEXT_MOCK);
  });

  it('dispatches toggleDrawer event when menu button is clicked', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const eventSpy = jest.fn();
    window.addEventListener('toggleDrawer', eventSpy);

    const menuButton = page.root.shadowRoot.querySelector('.menu-toggle') as HTMLButtonElement;
    menuButton.click();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'toggleDrawer' }));

    window.removeEventListener('toggleDrawer', eventSpy);
  });

  it('dispatches toggleSearchModal event when search button is clicked', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const eventSpy = jest.fn();
    window.addEventListener('toggleSearchModal', eventSpy);

    const searchButton = page.root.shadowRoot.querySelector('.search-btn') as HTMLButtonElement;
    searchButton.click();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'toggleSearchModal' }));

    window.removeEventListener('toggleSearchModal', eventSpy);
  });

  it('renders all required sections: header-left and header-right', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={TEST_COMPANY_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const headerLeft = page.root.shadowRoot.querySelector('.header-left');
    const headerRight = page.root.shadowRoot.querySelector('.header-right');

    expect(headerLeft).toBeTruthy();
    expect(headerRight).toBeTruthy();
  });

  it('renders with different phone number', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={TEST_COMPANY_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const phoneLink = page.root.shadowRoot.querySelector('.phone-link') as HTMLAnchorElement;
    expect(phoneLink.textContent).toBe(TEST_PHONE_MOCK);
    expect(phoneLink.href).toContain(`tel:${TEST_PHONE_MOCK}`);
  });

  it('renders brand-logo component', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const brandLogo = page.root.shadowRoot.querySelector('brand-logo');
    expect(brandLogo).toBeTruthy();
    expect(brandLogo.getAttribute('type')).toBe(NAV_LOGO_TYPE_MOCK);
  });

  it('contains menu toggle icon SVG', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const menuIcon = page.root.shadowRoot.querySelector('.menu-toggle-icon svg');
    expect(menuIcon).toBeTruthy();
  });

  it('contains search icon SVG', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const searchIcon = page.root.shadowRoot.querySelector('.search-icon svg');
    expect(searchIcon).toBeTruthy();
  });

  it('contains login icon SVG', async() => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName={BRAND_NAME_MOCK}
          phone={TEST_PHONE_MOCK}
        />
      )
    });

    const loginIcon = page.root.shadowRoot.querySelector('.login-icon');
    expect(loginIcon).toBeTruthy();
  });
});
