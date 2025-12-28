import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { AppHeader } from './app-header';

describe('app-header', () => {
  it('renders with required props', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders brand logo with correct aria-label', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const brandLogoLink = page.root.shadowRoot.querySelector('.brand-logo') as HTMLAnchorElement;
    expect(brandLogoLink).toBeTruthy();
    expect(brandLogoLink.getAttribute('aria-label')).toBe('Plymouth Rock Assurance');
  });

  it('renders phone number with correct format and tel link', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const phoneLink = page.root.shadowRoot.querySelector('.phone-link') as HTMLAnchorElement;
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.textContent).toBe('800-516-9242');
    expect(phoneLink.href).toContain('tel:800-516-9242');
  });

  it('renders menu toggle button with correct aria-label', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const menuButton = page.root.shadowRoot.querySelector('.menu-toggle') as HTMLButtonElement;
    expect(menuButton).toBeTruthy();
    expect(menuButton.getAttribute('aria-label')).toBe('Toggle menu');
  });

  it('renders search button with correct aria-label', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const searchButton = page.root.shadowRoot.querySelector('.search-btn') as HTMLButtonElement;
    expect(searchButton).toBeTruthy();
    expect(searchButton.getAttribute('aria-label')).toBe('Search');
  });

  it('renders login link with correct text', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const loginLink = page.root.shadowRoot.querySelector('.login-link') as HTMLAnchorElement;
    expect(loginLink).toBeTruthy();
    expect(loginLink.textContent.trim()).toContain('Log in');
  });

  it('dispatches toggleDrawer event when menu button is clicked', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const eventSpy = jest.fn();
    window.addEventListener('toggleDrawer', eventSpy);

    const menuButton = page.root.shadowRoot.querySelector('.menu-toggle') as HTMLButtonElement;
    menuButton.click();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'toggleDrawer' }));

    window.removeEventListener('toggleDrawer', eventSpy);
  });

  it('dispatches toggleSearchModal event when search button is clicked', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const eventSpy = jest.fn();
    window.addEventListener('toggleSearchModal', eventSpy);

    const searchButton = page.root.shadowRoot.querySelector('.search-btn') as HTMLButtonElement;
    searchButton.click();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'toggleSearchModal' }));

    window.removeEventListener('toggleSearchModal', eventSpy);
  });

  it('renders all required sections: header-left and header-right', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const headerLeft = page.root.shadowRoot.querySelector('.header-left');
    const headerRight = page.root.shadowRoot.querySelector('.header-right');

    expect(headerLeft).toBeTruthy();
    expect(headerRight).toBeTruthy();
  });

  it('renders with different phone number', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Test Company"
          phone="555-123-4567"
        />
      ),
    });

    const phoneLink = page.root.shadowRoot.querySelector('.phone-link') as HTMLAnchorElement;
    expect(phoneLink.textContent).toBe('555-123-4567');
    expect(phoneLink.href).toContain('tel:555-123-4567');
  });

  it('renders brand-logo component', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const brandLogo = page.root.shadowRoot.querySelector('brand-logo');
    expect(brandLogo).toBeTruthy();
    expect(brandLogo.getAttribute('type')).toBe('nav-logo');
  });

  it('contains menu toggle icon SVG', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const menuIcon = page.root.shadowRoot.querySelector('.menu-toggle-icon svg');
    expect(menuIcon).toBeTruthy();
  });

  it('contains search icon SVG', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const searchIcon = page.root.shadowRoot.querySelector('.search-icon svg');
    expect(searchIcon).toBeTruthy();
  });

  it('contains login icon SVG', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      template: () => (
        <app-header
          brandName="Plymouth Rock Assurance"
          phone="800-516-9242"
        />
      ),
    });

    const loginIcon = page.root.shadowRoot.querySelector('.login-icon');
    expect(loginIcon).toBeTruthy();
  });
});
