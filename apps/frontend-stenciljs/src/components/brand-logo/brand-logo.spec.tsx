import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { BrandLogo } from './brand-logo';
import {
  BRAND_LOGO_TYPE_NAV,
  BRAND_LOGO_TYPE_FULL_SLOGAN,
  BRAND_LOGO_TYPE_INVALID,
  BRAND_LOGO_TYPE_UNKNOWN,
  BRAND_LOGO_TYPE_CASE_SENSITIVE,
  BRAND_LOGO_TAG,
  BRAND_LOGO_EXPECT_FRAGMENT_CHILDREN_LENGTH
} from '@apps-shared/lib/mocks';

describe('brand-logo', () => {
  it('renders with nav-logo type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_NAV} />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders with full-slogan type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_FULL_SLOGAN} />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders nav logo SVG when type is nav-logo', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_NAV} />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders full slogan logo SVG when type is full-slogan', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_FULL_SLOGAN} />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders nothing for invalid type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_INVALID} />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeFalsy();
  });

  it('renders empty Fragment for unrecognized type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_UNKNOWN} />
      ),
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.children.length).toBe(BRAND_LOGO_EXPECT_FRAGMENT_CHILDREN_LENGTH);
  });

  it('updates logo when type prop changes from nav-logo to full-slogan', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_NAV} />
      ),
    });

    let svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();

    // Update via attribute to avoid mutating an immutable @Prop
    page.root.setAttribute('type', BRAND_LOGO_TYPE_FULL_SLOGAN);
    await page.waitForChanges();

    svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('updates logo when type prop changes from full-slogan to nav-logo', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_FULL_SLOGAN} />
      ),
    });

    let svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();

    // Update via attribute to avoid mutating an immutable @Prop
    page.root.setAttribute('type', BRAND_LOGO_TYPE_NAV);
    await page.waitForChanges();

    svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders without type prop', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('handles case-sensitive type matching', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_CASE_SENSITIVE} />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeFalsy();
  });

  it('renders with Fragment wrapper', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type={BRAND_LOGO_TYPE_NAV} />
      ),
    });

    expect(page.root).toBeTruthy();
    expect(page.root.tagName).toBe(BRAND_LOGO_TAG);
  });

  it('nav-logo contains SVG with proper structure', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="nav-logo" />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('xmlns')).toBeTruthy();
  });

  it('full-slogan contains SVG with proper structure', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="full-slogan" />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('xmlns')).toBeTruthy();
  });
});
