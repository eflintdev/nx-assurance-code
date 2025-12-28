import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SiteContent } from './content';
import { BreadcrumbItem } from '@apps-shared';

describe('site-content', () => {
  const mockBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', current: false },
    { label: 'Insurance', href: '/insurance', current: false },
    { label: 'Auto Insurance', href: '/insurance/auto', current: true },
  ];

  const mockParagraphs: string[] = [
    'Welcome to our insurance services.',
    'We provide comprehensive coverage options.',
    'Get your quote today and save on premiums.',
  ];

  it('renders with breadcrumbs and paragraphs props', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders breadcrumb navigation with aria-label', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('renders all breadcrumb items', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(2); // Home and Insurance are links
  });

  it('renders current breadcrumb as span not link', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const spans = nav.querySelectorAll('span');
    const currentBreadcrumb = Array.from(spans).find(
      (span) => span.textContent === 'Auto Insurance'
    );
    expect(currentBreadcrumb).toBeTruthy();
  });

  it('renders breadcrumb separators', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const separators = nav.querySelectorAll('.breadcrumbs-separator');
    expect(separators.length).toBe(mockBreadcrumbs.length - 1);
  });

  it('renders all content paragraphs', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector('.content-body');
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(mockParagraphs.length);
  });

  it('renders correct paragraph text', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector('.content-body');
    const paragraphs = contentBody.querySelectorAll('p');

    mockParagraphs.forEach((text, index) => {
      expect(paragraphs[index].textContent).toBe(text);
    });
  });

  it('renders content-section for paragraphs', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const contentSection = page.root.shadowRoot.querySelector('.content-section');
    expect(contentSection).toBeTruthy();
    expect(contentSection.tagName).toBe('SECTION');
  });

  it('renders quote-section with slot', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const quoteSection = page.root.shadowRoot.querySelector('.quote-section');
    expect(quoteSection).toBeTruthy();
    const slot = quoteSection.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('handles empty breadcrumbs array', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={[]}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(0);
  });

  it('handles empty paragraphs array', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={[]}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector('.content-body');
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('renders main container div', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const main = page.root.shadowRoot.querySelector('.main');
    expect(main).toBeTruthy();
    expect(main.tagName).toBe('DIV');
  });

  it('breadcrumb links have correct href attributes', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const links = nav.querySelectorAll('a');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/insurance');
  });

  it('renders with single breadcrumb item', async () => {
    const singleBreadcrumb = [{ label: 'Home', href: '/', current: true }];
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={singleBreadcrumb}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const separators = nav.querySelectorAll('.breadcrumbs-separator');
    expect(separators.length).toBe(0);
  });

  it('renders with single paragraph', async () => {
    const singleParagraph = ['Single paragraph text'];
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={singleParagraph}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector('.content-body');
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].textContent).toBe('Single paragraph text');
  });

  it('has proper shadow DOM structure', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    expect(page.root.shadowRoot).toBeTruthy();
    const main = page.root.shadowRoot.querySelector('.main');
    expect(main).toBeTruthy();
  });

  it('updates content when breadcrumbs prop changes', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const newBreadcrumbs: BreadcrumbItem[] = [
      { label: 'New', href: '/new', current: true },
    ];

    // Update via host element property to respect Stencil immutability
    page.root.breadcrumbs = newBreadcrumbs;
    await page.waitForChanges();

    const nav = page.root.shadowRoot.querySelector('nav.breadcrumbs');
    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(0);
  });

  it('updates content when paragraphs prop changes', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={mockBreadcrumbs}
          paragraphs={mockParagraphs}
        />
      ),
    });

    const newParagraphs = ['Updated paragraph'];

    // Update via host element property to respect Stencil immutability
    page.root.paragraphs = newParagraphs;
    await page.waitForChanges();

    const contentBody = page.root.shadowRoot.querySelector('.content-body');
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].textContent).toBe('Updated paragraph');
  });
});
