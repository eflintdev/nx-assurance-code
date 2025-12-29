import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SiteContent } from './content';
import {
  CONTENT_BREADCRUMBS,
  CONTENT_PARAGRAPHS,
  CONTENT_SINGLE_BREADCRUMB,
  CONTENT_SINGLE_PARAGRAPH,
  CONTENT_EMPTY_BREADCRUMBS,
  CONTENT_EMPTY_PARAGRAPHS,
  CONTENT_BREADCRUMB_ARIA_LABEL,
  CONTENT_BREADCRUMB_SEPARATOR_CLASS,
  CONTENT_BREADCRUMB_NAV_CLASS,
  CONTENT_BREADCRUMB_LINKS_LENGTH,
  CONTENT_BREADCRUMB_SPAN_TEXT,
  CONTENT_SECTION_CLASS,
  CONTENT_SECTION_TAG,
  CONTENT_BODY_CLASS,
  CONTENT_MAIN_CLASS,
  CONTENT_MAIN_TAG,
  CONTENT_QUOTE_SECTION_CLASS,
  CONTENT_UPDATED_BREADCRUMBS,
  CONTENT_UPDATED_PARAGRAPHS
} from '@apps-shared/lib/mocks/content.mock';

describe('site-content', () => {

  it('renders with breadcrumbs and paragraphs props', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
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
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe(CONTENT_BREADCRUMB_ARIA_LABEL);
  });

  it('renders all breadcrumb items', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(CONTENT_BREADCRUMB_LINKS_LENGTH); // Home and Insurance are links
  });

  it('renders current breadcrumb as span not link', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const spans = nav.querySelectorAll('span');
    const currentBreadcrumb = Array.from(spans).find(
      (span) => span.textContent === CONTENT_BREADCRUMB_SPAN_TEXT
    );
    expect(currentBreadcrumb).toBeTruthy();
  });

  it('renders breadcrumb separators', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const separators = nav.querySelectorAll(`.${CONTENT_BREADCRUMB_SEPARATOR_CLASS}`);
    expect(separators.length).toBe(CONTENT_BREADCRUMBS.length - 1);
  });

  it('renders all content paragraphs', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector(`.${CONTENT_BODY_CLASS}`);
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(CONTENT_PARAGRAPHS.length);
  });

  it('renders correct paragraph text', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector(`.${CONTENT_BODY_CLASS}`);
    const paragraphs = contentBody.querySelectorAll('p');

    CONTENT_PARAGRAPHS.forEach((text, index) => {
      expect(paragraphs[index].textContent).toBe(text);
    });
  });

  it('renders content-section for paragraphs', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const contentSection = page.root.shadowRoot.querySelector(`.${CONTENT_SECTION_CLASS}`);
    expect(contentSection).toBeTruthy();
    expect(contentSection.tagName).toBe(CONTENT_SECTION_TAG);
  });

  it('renders quote-section with slot', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const quoteSection = page.root.shadowRoot.querySelector(`.${CONTENT_QUOTE_SECTION_CLASS}`);
    expect(quoteSection).toBeTruthy();
    const slot = quoteSection.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('handles empty breadcrumbs array', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_EMPTY_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(0);
  });

  it('handles empty paragraphs array', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_EMPTY_PARAGRAPHS}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector(`.${CONTENT_BODY_CLASS}`);
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('renders main container div', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const main = page.root.shadowRoot.querySelector(`.${CONTENT_MAIN_CLASS}`);
    expect(main).toBeTruthy();
    expect(main.tagName).toBe(CONTENT_MAIN_TAG);
  });

  it('breadcrumb links have correct href attributes', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const links = nav.querySelectorAll('a');
    expect(links[0].getAttribute('href')).toBe(CONTENT_BREADCRUMBS[0].href);
    expect(links[1].getAttribute('href')).toBe(CONTENT_BREADCRUMBS[1].href);
  });

  it('renders with single breadcrumb item', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_SINGLE_BREADCRUMB}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const separators = nav.querySelectorAll(`.${CONTENT_BREADCRUMB_SEPARATOR_CLASS}`);
    expect(separators.length).toBe(0);
  });

  it('renders with single paragraph', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_SINGLE_PARAGRAPH}
        />
      ),
    });

    const contentBody = page.root.shadowRoot.querySelector(`.${CONTENT_BODY_CLASS}`);
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].textContent).toBe(CONTENT_SINGLE_PARAGRAPH[0]);
  });

  it('has proper shadow DOM structure', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    expect(page.root.shadowRoot).toBeTruthy();
    const main = page.root.shadowRoot.querySelector(`.${CONTENT_MAIN_CLASS}`);
    expect(main).toBeTruthy();
  });

  it('updates content when breadcrumbs prop changes', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    // Update via host element property to respect Stencil immutability
    page.root.breadcrumbs = CONTENT_UPDATED_BREADCRUMBS;
    await page.waitForChanges();

    const nav = page.root.shadowRoot.querySelector(`nav.${CONTENT_BREADCRUMB_NAV_CLASS}`);
    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(0);
  });

  it('updates content when paragraphs prop changes', async () => {
    const page = await newSpecPage({
      components: [SiteContent],
      template: () => (
        <site-content
          breadcrumbs={CONTENT_BREADCRUMBS}
          paragraphs={CONTENT_PARAGRAPHS}
        />
      ),
    });

    // Update via host element property to respect Stencil immutability
    page.root.paragraphs = CONTENT_UPDATED_PARAGRAPHS;
    await page.waitForChanges();

    const contentBody = page.root.shadowRoot.querySelector(`.${CONTENT_BODY_CLASS}`);
    const paragraphs = contentBody.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].textContent).toBe(CONTENT_UPDATED_PARAGRAPHS[0]);
  });
});
