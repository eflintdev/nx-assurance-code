import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { BrandLogo } from './brand-logo';

describe('brand-logo', () => {
  it('renders with nav-logo type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="nav-logo" />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders with full-slogan type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="full-slogan" />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders nav logo SVG when type is nav-logo', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="nav-logo" />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders full slogan logo SVG when type is full-slogan', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="full-slogan" />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders nothing for invalid type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="invalid-type" />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeFalsy();
  });

  it('renders empty Fragment for unrecognized type', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="unknown" />
      ),
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.children.length).toBe(0);
  });

  it('updates logo when type prop changes from nav-logo to full-slogan', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="nav-logo" />
      ),
    });

    let svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();

    // Update via attribute to avoid mutating an immutable @Prop
    page.root.setAttribute('type', 'full-slogan');
    await page.waitForChanges();

    svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('updates logo when type prop changes from full-slogan to nav-logo', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="full-slogan" />
      ),
    });

    let svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();

    // Update via attribute to avoid mutating an immutable @Prop
    page.root.setAttribute('type', 'nav-logo');
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
        <brand-logo type="Nav-Logo" />
      ),
    });

    const svg = page.root.shadowRoot.querySelector('svg');
    expect(svg).toBeFalsy();
  });

  it('renders with Fragment wrapper', async () => {
    const page = await newSpecPage({
      components: [BrandLogo],
      template: () => (
        <brand-logo type="nav-logo" />
      ),
    });

    expect(page.root).toBeTruthy();
    expect(page.root.tagName).toBe('BRAND-LOGO');
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
