import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { BannerSection } from './banner-section';

describe('banner-section', () => {
  it('renders with heading prop', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading="Get Your Quote Today" />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('displays the heading text correctly', async () => {
    const testHeading = 'Protect Your Home and Valuables';
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={testHeading} />
      ),
    });

    const heading = page.root.shadowRoot.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe(testHeading);
  });

  it('renders with different heading values', async () => {
    const headings = [
      'Get Your Quote Today',
      'Welcome to Plymouth Rock Assurance',
      'Fast and Affordable Coverage',
    ];

    for (const heading of headings) {
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
        <banner-section heading="Test Heading" />
      ),
    });

    const bannerSection = page.root.shadowRoot.querySelector('.banner-section');
    expect(bannerSection).toBeTruthy();
    expect(bannerSection.tagName).toBe('SECTION');
  });

  it('renders banner-container div inside section', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading="Test Heading" />
      ),
    });

    const container = page.root.shadowRoot.querySelector('.banner-container');
    expect(container).toBeTruthy();
    expect(container.tagName).toBe('DIV');
  });

  it('renders heading inside banner-container', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading="Nested Test" />
      ),
    });

    const container = page.root.shadowRoot.querySelector('.banner-container');
    const heading = container.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe('Nested Test');
  });

  it('renders with empty heading string', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading="" />
      ),
    });

    const heading = page.root.shadowRoot.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe('');
  });

  it('renders with special characters in heading', async () => {
    const specialHeading = 'Save 20% & Get $100 Off Today!';
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading={specialHeading} />
      ),
    });

    const heading = page.root.shadowRoot.querySelector('h1');
    expect(heading.textContent).toBe(specialHeading);
  });

  it('has proper structure with shadow DOM', async () => {
    const page = await newSpecPage({
      components: [BannerSection],
      template: () => (
        <banner-section heading="Shadow DOM Test" />
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
        <banner-section heading="Initial Heading" />
      ),
    });

    let heading = page.root.shadowRoot.querySelector('h1');
    expect(heading.textContent).toBe('Initial Heading');

    // Update via attribute to avoid mutating an immutable @Prop
    page.root.setAttribute('heading', 'Updated Heading');
    await page.waitForChanges();

    heading = page.root.shadowRoot.querySelector('h1');
    expect(heading.textContent).toBe('Updated Heading');
  });
});
