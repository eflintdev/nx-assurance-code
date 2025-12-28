import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CustomList } from './custom-list';

describe('custom-list', () => {
  const mockBlocks: Array<{
    title: string;
    items: Array<{ label: string; href: string; icon?: string }>;
  }> = [
    {
      title: 'Resources',
      items: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Support', href: '/support', icon: '☎' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About', href: '/about' },
      ],
    },
    {
      title: '',
      items: [
        { label: 'No Title Item', href: '/no-title' },
      ],
    },
  ];

  it('renders with listBlocks prop', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders correct number of list blocks', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    const blocks = page.root.shadowRoot.querySelectorAll('.list-block');
    expect(blocks.length).toBe(mockBlocks.length);
  });

  it('renders titles when provided', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    const titles = page.root.shadowRoot.querySelectorAll('.list-block-title');
    // Only blocks with non-empty title should render h3
    const expectedTitles = mockBlocks.filter(b => !!b.title).length;
    expect(titles.length).toBe(expectedTitles);
  });

  it('renders correct number of list items', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    const items = page.root.shadowRoot.querySelectorAll('.list-item');
    const expectedItems = mockBlocks.reduce((sum, b) => sum + (b.items?.length || 0), 0);
    expect(items.length).toBe(expectedItems);
  });

  it('renders anchors with correct label and href', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    const links = Array.from(page.root.shadowRoot.querySelectorAll('.list-link')) as HTMLAnchorElement[];
    expect(links.length).toBe(mockBlocks.reduce((sum, b) => sum + b.items.length, 0));
    const labels = Array.from(page.root.shadowRoot.querySelectorAll('.list-label')).map(n => n.textContent);

    // Validate labels and hrefs exist
    mockBlocks.forEach(block => {
      block.items.forEach(item => {
        expect(labels).toContain(item.label);
      });
    });

    links.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  it('renders icon span when icon is provided', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    const icons = page.root.shadowRoot.querySelectorAll('.list-icon');
    expect(icons.length).toBe(1);
    expect(icons[0].textContent).toBe('☎');
  });

  it('handles empty listBlocks array', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={[]} />
      ),
    });

    const blocks = page.root.shadowRoot.querySelectorAll('.list-block');
    expect(blocks.length).toBe(0);
  });

  it('updates when listBlocks prop changes via host property', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    let items = page.root.shadowRoot.querySelectorAll('.list-item');
    expect(items.length).toBe(mockBlocks.reduce((sum, b) => sum + (b.items?.length || 0), 0));

    const newBlocks: Array<{ title: string; items: Array<{ label: string; href: string }> }> = [
      { title: 'New', items: [{ label: 'Contact', href: '/contact' }] },
    ];

    // Update via host element property to avoid immutability warnings
    (page.root as HTMLElement & { listBlocks?: typeof newBlocks }).listBlocks = newBlocks;
    await page.waitForChanges();

    items = page.root.shadowRoot.querySelectorAll('.list-item');
    expect(items.length).toBe(1);
    const title = page.root.shadowRoot.querySelector('.list-block-title');
    expect(title.textContent).toBe('New');
  });

  it('has proper shadow DOM structure', async () => {
    const page = await newSpecPage({
      components: [CustomList],
      template: () => (
        <custom-list listBlocks={mockBlocks} />
      ),
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });
});
