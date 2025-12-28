import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CustomLink } from './custom-link';

describe('custom-link', () => {
  it('renders with label and href', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="Learn more" href="https://example.com" />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders anchor with correct text and href', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="Learn more" href="https://example.com" />
      ),
    });

    const anchor = page.root.shadowRoot.querySelector('a') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.textContent).toBe('Learn more');
    expect(anchor.href).toContain('https://example.com');
  });

  it('applies default variant class footer-top', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="Default" href="#" />
      ),
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.className).toContain('custom-link');
    expect(anchor.className).toContain('custom-link--footer-top');
  });

  it('applies footer-bottom variant class when specified', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="Bottom" href="#" variant="footer-bottom" />
      ),
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.className).toContain('custom-link--footer-bottom');
  });

  it('updates label and href via attributes', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="Start" href="https://start.example" />
      ),
    });

    let anchor = page.root.shadowRoot.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toBe('Start');
    expect(anchor.href).toContain('https://start.example');

    // Update via host attributes to respect Stencil immutability
    page.root.setAttribute('label', 'Updated');
    page.root.setAttribute('href', 'https://updated.example');
    await page.waitForChanges();

    anchor = page.root.shadowRoot.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toBe('Updated');
    expect(anchor.href).toContain('https://updated.example');
  });

  it('renders with empty label string', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="" href="#" />
      ),
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.textContent).toBe('');
  });

  it('renders special characters in label', async () => {
    const special = 'Save 20% & Get $100!';
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={special} href="#" />
      ),
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.textContent).toBe(special);
  });

  it('has proper shadow DOM structure', async () => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label="Test" href="#" />
      ),
    });

    expect(page.root.shadowRoot).toBeTruthy();
    const a = page.root.shadowRoot.querySelector('a');
    expect(a).toBeTruthy();
  });
});
