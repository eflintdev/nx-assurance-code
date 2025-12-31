import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CustomLink } from './custom-link';
import {
  CUSTOM_LINK_LABEL,
  CUSTOM_LINK_HREF,
  CUSTOM_LINK_LABEL_DEFAULT,
  CUSTOM_LINK_HREF_DEFAULT,
  CUSTOM_LINK_LABEL_BOTTOM,
  CUSTOM_LINK_HREF_BOTTOM,
  CUSTOM_LINK_VARIANT_FOOTER_BOTTOM,
  CUSTOM_LINK_CLASS,
  CUSTOM_LINK_CLASS_FOOTER_TOP,
  CUSTOM_LINK_CLASS_FOOTER_BOTTOM,
  CUSTOM_LINK_LABEL_START,
  CUSTOM_LINK_HREF_START,
  CUSTOM_LINK_LABEL_UPDATED,
  CUSTOM_LINK_HREF_UPDATED,
  CUSTOM_LINK_LABEL_EMPTY,
  CUSTOM_LINK_LABEL_SPECIAL,
  CUSTOM_LINK_LABEL_TEST
} from '@apps-shared/lib/mocks/custom-link.mock';

describe('custom-link', () => {
  it('renders with label and href', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL} href={CUSTOM_LINK_HREF} />
      )
    });

    expect(page.root).toBeTruthy();
  });

  it('renders anchor with correct text and href', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL} href={CUSTOM_LINK_HREF} />
      )
    });

    const anchor = page.root.shadowRoot.querySelector('a') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.textContent).toBe(CUSTOM_LINK_LABEL);
    expect(anchor.href).toContain(CUSTOM_LINK_HREF);
  });

  it('applies default variant class footer-top', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL_DEFAULT} href={CUSTOM_LINK_HREF_DEFAULT} />
      )
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.className).toContain(CUSTOM_LINK_CLASS);
    expect(anchor.className).toContain(CUSTOM_LINK_CLASS_FOOTER_TOP);
  });

  it('applies footer-bottom variant class when specified', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL_BOTTOM} href={CUSTOM_LINK_HREF_BOTTOM} variant={CUSTOM_LINK_VARIANT_FOOTER_BOTTOM} />
      )
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.className).toContain(CUSTOM_LINK_CLASS_FOOTER_BOTTOM);
  });

  it('updates label and href via attributes', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL_START} href={CUSTOM_LINK_HREF_START} />
      )
    });

    let anchor = page.root.shadowRoot.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toBe(CUSTOM_LINK_LABEL_START);
    expect(anchor.href).toContain(CUSTOM_LINK_HREF_START);

    // Update via host attributes to respect Stencil immutability
    page.root.setAttribute('label', CUSTOM_LINK_LABEL_UPDATED);
    page.root.setAttribute('href', CUSTOM_LINK_HREF_UPDATED);
    await page.waitForChanges();

    anchor = page.root.shadowRoot.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toBe(CUSTOM_LINK_LABEL_UPDATED);
    expect(anchor.href).toContain(CUSTOM_LINK_HREF_UPDATED);
  });

  it('renders with empty label string', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL_EMPTY} href={CUSTOM_LINK_HREF_DEFAULT} />
      )
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.textContent).toBe(CUSTOM_LINK_LABEL_EMPTY);
  });

  it('renders special characters in label', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL_SPECIAL} href={CUSTOM_LINK_HREF_DEFAULT} />
      )
    });

    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor.textContent).toBe(CUSTOM_LINK_LABEL_SPECIAL);
  });

  it('has proper shadow DOM structure', async() => {
    const page = await newSpecPage({
      components: [CustomLink],
      template: () => (
        <custom-link label={CUSTOM_LINK_LABEL_TEST} href={CUSTOM_LINK_HREF_DEFAULT} />
      )
    });

    expect(page.root.shadowRoot).toBeTruthy();
    const a = page.root.shadowRoot.querySelector('a');
    expect(a).toBeTruthy();
  });
});
