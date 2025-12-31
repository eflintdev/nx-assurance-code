import { newSpecPage } from '@stencil/core/testing';
import { SearchModal } from './search-modal';

describe('search-modal', () => {
  it('renders closed by default', async() => {
    const page = await newSpecPage({
      components: [SearchModal],
      html: `<search-modal></search-modal>`
    });
    expect(page.root.shadowRoot.querySelector('.modal-backdrop').classList.contains('open')).toBe(false);
  });

  it('opens and closes with handleToggle', async() => {
    const page = await newSpecPage({
      components: [SearchModal],
      html: `<search-modal></search-modal>`
    });
    const instance = page.rootInstance;
    instance.handleToggle();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.modal-backdrop').classList.contains('open')).toBe(true);
    instance.handleToggle();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.modal-backdrop').classList.contains('open')).toBe(false);
  });

  it('closes when backdrop is clicked', async() => {
    const page = await newSpecPage({
      components: [SearchModal],
      html: `<search-modal></search-modal>`
    });
    const instance = page.rootInstance;
    instance.isOpen = true;
    await page.waitForChanges();
    const backdrop: HTMLElement = page.root.shadowRoot.querySelector('.modal-backdrop');
    backdrop.click();
    await page.waitForChanges();
    expect(instance.isOpen).toBe(false);
  });

  it('closes when close button is clicked', async() => {
    const page = await newSpecPage({
      components: [SearchModal],
      html: `<search-modal></search-modal>`
    });
    const instance = page.rootInstance;
    instance.isOpen = true;
    await page.waitForChanges();
    const closeBtn: HTMLElement  = page.root.shadowRoot.querySelector('.close-btn');
    closeBtn.click();
    await page.waitForChanges();
    expect(instance.isOpen).toBe(false);
  });

  it('does not close when modal content is clicked', async() => {
    const page = await newSpecPage({
      components: [SearchModal],
      html: `<search-modal></search-modal>`
    });
    const instance = page.rootInstance;
    instance.isOpen = true;
    await page.waitForChanges();
    const modalContent = page.root.shadowRoot.querySelector('.modal-content');
    const event = new MouseEvent('click', { bubbles: true });
    modalContent.dispatchEvent(event);
    await page.waitForChanges();
    expect(instance.isOpen).toBe(true);
  });
});
