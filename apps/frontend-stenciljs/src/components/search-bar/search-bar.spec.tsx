import { newSpecPage } from '@stencil/core/testing';
import { SearchBar } from './search-bar';
import { QuoteForm } from '../quote-form/quote-form';

describe('search-bar', () => {
  it('renders input and button', async () => {
    const page = await newSpecPage({
      components: [SearchBar],
      html: `<search-bar></search-bar>`
    });
    const input = page.root.shadowRoot.querySelector('.search-input');
    const button = page.root.shadowRoot.querySelector('.search-submit-btn');
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('updates searchValue on input', async () => {
    const page = await newSpecPage({
      components: [SearchBar],
      html: `<search-bar></search-bar>`
    });
    const input: HTMLInputElement = page.root.shadowRoot.querySelector('.search-input');
    input.value = 'test search';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(page.rootInstance.searchValue).toBe('test search');
  });
});
