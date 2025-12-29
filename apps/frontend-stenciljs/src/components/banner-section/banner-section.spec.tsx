import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { BannerSection } from './banner-section';
import {
  BANNER_HEADING_MOCK,
  BANNER_HEADING_ALT_MOCK,
  BANNER_HEADING_VARIANTS_MOCK,
  BANNER_SECTION_CLASS,
  BANNER_SECTION_TAG,
  BANNER_CONTAINER_CLASS,
  BANNER_CONTAINER_TAG,
  BANNER_HEADING_NESTED,
  BANNER_HEADING_EMPTY,
  BANNER_HEADING_SPECIAL,
  BANNER_HEADING_SHADOW_DOM,
  BANNER_HEADING_INITIAL,
  BANNER_HEADING_UPDATED,
  BANNER_HEADING_TEST
} from '@apps-shared/lib/mocks';

describe('banner-section', () => {
  it('renders with heading prop', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_MOCK} />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('displays the heading text correctly', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_ALT_MOCK} />
      ),
    });

    const heading = page.root.shadowRoot.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe(BANNER_HEADING_ALT_MOCK);
  });

  it('renders with different heading values', async () => {
    for (const heading of BANNER_HEADING_VARIANTS_MOCK) {
      const page = await newSpecPage({
        components: [BannerSection],
        template: () => (
          <banner-section heading={heading} />
        ),
      });

      const h1 = page.root.shadowRoot.querySelector('h1');
      expect(h1.textContent).toBe(heading);
    }
  });

  it('renders banner-section class on section element', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_TEST} />
      ),
    });

    const bannerSection = page.root.shadowRoot.querySelector(`.${BANNER_SECTION_CLASS}`);
    expect(bannerSection).toBeTruthy();
    expect(bannerSection.tagName).toBe(BANNER_SECTION_TAG);
  });

  it('renders banner-container div inside section', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_TEST} />
      ),
    });

    const container = page.root.shadowRoot.querySelector(`.${BANNER_CONTAINER_CLASS}`);
    expect(container).toBeTruthy();
    expect(container.tagName).toBe(BANNER_CONTAINER_TAG);
  });

  it('renders heading inside banner-container', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_NESTED} />
      ),
    });

    const container = page.root.shadowRoot.querySelector(`.${BANNER_CONTAINER_CLASS}`);
    const heading = container.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe(BANNER_HEADING_NESTED);
  });

  it('renders with empty heading string', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_EMPTY} />
      ),
    });

    const heading = page.root.shadowRoot.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe(BANNER_HEADING_EMPTY);
  });

  it('renders with special characters in heading', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_SPECIAL} />
      ),
    });

    const heading = page.root.shadowRoot.querySelector('h1');
    expect(heading.textContent).toBe(BANNER_HEADING_SPECIAL);
  });

  it('has proper structure with shadow DOM', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_SHADOW_DOM} />
      ),
    });

    expect(page.root.shadowRoot).toBeTruthy();
    const section = page.root.shadowRoot.querySelector('section');
    expect(section).toBeTruthy();
  });

  it('updates heading when prop changes', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={BANNER_HEADING_INITIAL} />
      ),
    });

    let heading = page.root.shadowRoot.querySelector('h1');
    expect(heading.textContent).toBe(BANNER_HEADING_INITIAL);

    // Update via attribute to avoid mutating an immutable @Prop
    page.root.setAttribute('heading', BANNER_HEADING_UPDATED);
    await page.waitForChanges();

    heading = page.root.shadowRoot.querySelector('h1');
    expect(heading.textContent).toBe(BANNER_HEADING_UPDATED);
  });
});
