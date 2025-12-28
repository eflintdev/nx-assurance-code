import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { InputField } from './input-field';

describe('input-field', () => {
  it('renders input with label and required asterisk', async () => {
    const page = await newSpecPage({
      components: [InputField],
      template: () => (
        <input-field label="First Name" fieldId="first-name" name="firstName" required placeholder="First Name" />
      ),
    });

    expect(page.root).toBeTruthy();
    const label = page.root.shadowRoot.querySelector('label') as HTMLLabelElement;
    expect(label).toBeTruthy();
    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.id).toBe('first-name');
    const asterisk = label.querySelector('.if-req');
    expect(asterisk).toBeTruthy();

    expect(input.required).toBe(true);
    expect(input.getAttribute('placeholder')).toBe('First Name');
  });

  it('emits valueChange on input', async () => {
    const page = await newSpecPage({
      components: [InputField],
      template: () => (
        <input-field label="Email" name="email" type="email" fieldId="email" />
      ),
    });

    const el = page.root as HTMLElement;
    const spy = jest.fn();
    el.addEventListener('valueChange', spy);

    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    const evt = spy.mock.calls[0][0] as CustomEvent<{
      value: string | number | undefined;
      id?: string;
      name?: string;
      valid: boolean;
    }>;
    expect(evt.detail.value).toBe('test@example.com');
    expect(evt.detail.name).toBe('email');
    expect(evt.detail.id).toBe('email');
    expect(typeof evt.detail.valid).toBe('boolean');
  });

  it('renders select field with options', async () => {
    const options: Array<{ label: string; value: string; disabled?: boolean }> = [
      { label: 'New Jersey', value: 'NJ' },
      { label: 'New York', value: 'NY', disabled: true },
    ];
    const page = await newSpecPage({
      components: [InputField],
      template: () => (
        <input-field label="State" name="state" field="select" options={options} />
      ),
    });

    const select = page.root.shadowRoot.querySelector('select') as HTMLSelectElement;
    expect(select).toBeTruthy();
    const opts = select.querySelectorAll('option');
    expect(opts.length).toBe(2);
    expect(opts[0].textContent).toBe('New Jersey');
    expect(opts[1].hasAttribute('disabled')).toBe(true);
  });

  it('renders textarea field', async () => {
    const page = await newSpecPage({
      components: [InputField],
      template: () => (
        <input-field label="Notes" name="notes" field="textarea" placeholder="Type here" />
      ),
    });

    const textarea = page.root.shadowRoot.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute('placeholder')).toBe('Type here');
  });

  it('shows error text and sets aria-invalid', async () => {
    const page = await newSpecPage({
      components: [InputField],
      template: () => (
        <input-field label="Email" name="email" type="email" errorText="Email is required" />
      ),
    });

    const desc = page.root.shadowRoot.querySelector('.if-desc');
    expect(desc).toBeTruthy();
    expect(desc.className).toContain('is-error');
    const control = page.root.shadowRoot.querySelector('.if-control') as HTMLElement;
    expect(control.getAttribute('aria-invalid')).toBe('true');
  });

  it('updates placeholder via attribute without mutating props directly', async () => {
    const page = await newSpecPage({
      components: [InputField],
      template: () => (
        <input-field label="City" name="city" placeholder="City" />
      ),
    });

    let control = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(control.placeholder).toBe('City');

    page.root.setAttribute('placeholder', 'Town');
    await page.waitForChanges();

    control = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(control.placeholder).toBe('Town');
  });
});
