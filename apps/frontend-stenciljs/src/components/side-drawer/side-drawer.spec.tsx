import { newSpecPage } from '@stencil/core/testing';
import { SideDrawer } from './side-drawer';
import { SIDE_DRAWER_SECTIONS } from '@apps-shared/lib/constants';

describe('side-drawer', () => {
  it('renders closed by default', async () => {
    const page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer></side-drawer>`
    });
    expect(page.root.shadowRoot.querySelector('.side-drawer').classList.contains('open')).toBe(false);
    expect(page.root.shadowRoot.querySelector('.drawer-backdrop').classList.contains('open')).toBe(false);
  });

  it('opens and closes with handleToggle', async () => {
    const page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer></side-drawer>`
    });
    const instance = page.rootInstance;
    instance.handleToggle();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.side-drawer').classList.contains('open')).toBe(true);
    instance.handleToggle();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.side-drawer').classList.contains('open')).toBe(false);
  });

  it('closes when backdrop is clicked', async () => {
    const page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer></side-drawer>`
    });
    const instance = page.rootInstance;
    instance.isOpen = true;
    await page.waitForChanges();
    const backdrop: HTMLElement = page.root.shadowRoot.querySelector('.drawer-backdrop');
    backdrop.click();
    await page.waitForChanges();
    expect(instance.isOpen).toBe(false);
  });

  it('closes when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer></side-drawer>`
    });
    const instance = page.rootInstance;
    instance.isOpen = true;
    await page.waitForChanges();
    const closeBtn: HTMLButtonElement = page.root.shadowRoot.querySelector('.close-btn');
    closeBtn.click();
    await page.waitForChanges();
    expect(instance.isOpen).toBe(false);
  });

  it('toggles accordion sections', async () => {
    const page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer></side-drawer>`
    });
    const instance = page.rootInstance;
    const [sectionKey] = SIDE_DRAWER_SECTIONS;
    instance.toggleAccordion(sectionKey.key);
    await page.waitForChanges();
    expect(instance.expandedSections[sectionKey.key]).toBe(true);
    instance.toggleAccordion(sectionKey.key);
    await page.waitForChanges();
    expect(instance.expandedSections[sectionKey.key]).toBe(false);
  });
});
