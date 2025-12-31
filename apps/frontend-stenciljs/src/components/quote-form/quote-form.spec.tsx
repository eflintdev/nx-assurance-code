import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { QuoteForm } from './quote-form';
import { InputField } from '../input-field/input-field';

describe('quote-form', () => {
  const props = {
    formTitle: 'Get a Quote',
    intro: 'Please provide your details to get started.',
    requiredLabel: 'Required',
    consentParagraphs: ['By submitting, you agree to be contacted.'],
    states: [
      { label: 'New Jersey', value: 'NJ' },
      { label: 'New York', value: 'NY' }
    ],
    zipPattern: '^\\d{5}$',
    phonePattern: '^[0-9\\-()\\s]+$'
  };

  it('renders title, intro, consent, fields and submit button', async() => {
    const page = await newSpecPage({
      components: [QuoteForm, InputField],
      template: () => (
        <quote-form {...props} />
      )
    });

    const title = page.root.shadowRoot.querySelector('.qf-title');
    expect(title.textContent).toBe(props.formTitle);

    const intro = page.root.shadowRoot.querySelector('.qf-intro');
    expect(intro.textContent).toContain(props.requiredLabel);

    const consent = page.root.shadowRoot.querySelector('.qf-consent');
    expect(consent.querySelectorAll('p').length).toBe(1);

    const fields = page.root.shadowRoot.querySelectorAll('input-field');
    expect(fields.length).toBe(8);

    const submit = page.root.shadowRoot.querySelector('.qf-submit') as HTMLButtonElement;
    expect(submit).toBeTruthy();
    expect(submit.textContent.trim()).toBe('Submit');
  });

  it('populates state select options', async() => {
    const page = await newSpecPage({
      components: [QuoteForm, InputField],
      template: () => (
        <quote-form {...props} />
      )
    });

    const fields = Array.from(page.root.shadowRoot.querySelectorAll('input-field')) as HTMLElement[];
    const stateField = fields.find((f) => !!f.shadowRoot && !!f.shadowRoot.querySelector('select'));
    expect(stateField).toBeTruthy();
    const select = stateField?.shadowRoot?.querySelector('select') as HTMLSelectElement;
    const options = select.querySelectorAll('option');
    expect(options.length).toBe(props.states.length);
  });

  it('emits formSubmit when valid data provided', async() => {
    const page = await newSpecPage({
      components: [QuoteForm, InputField],
      template: () => (
        <quote-form {...props} />
      )
    });

    const spy = jest.fn();
    page.root.addEventListener('formSubmit', spy);

    type ControlEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    type InputFieldEl = HTMLElement & { name?: string; shadowRoot: ShadowRoot };
    const setInput = async(name: string, value: string) => {
      const fields = Array.from(page.root.shadowRoot.querySelectorAll('input-field')) as InputFieldEl[];
      const field = fields.find((f) => f.name === name);
      expect(field).toBeTruthy();
      const control = field?.shadowRoot?.querySelector('.if-control') as ControlEl;
      control.value = value;
      control.dispatchEvent(new Event('input', { bubbles: true }));
      await page.waitForChanges();
    };

    await setInput('firstName', 'John');
    await setInput('lastName', 'Doe');
    await setInput('email', 'john@example.com');
    await setInput('phone', '(555) 555-5555');
    await setInput('address', '1 Main St');
    await setInput('city', 'Boston');
    await setInput('zip', '02101');
    await setInput('state', 'NJ');

    const form = page.root.shadowRoot.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    const evt = spy.mock.calls[0][0] as CustomEvent<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      zip: string;
      state: string;
    }>;
    expect(evt.detail.firstName).toBe('John');
    expect(evt.detail.state).toBe('NJ');
  });

  it('does not emit formSubmit when invalid', async() => {
    const page = await newSpecPage({
      components: [QuoteForm, InputField],
      template: () => (
        <quote-form {...props} />
      )
    });

    const spy = jest.fn();
    page.root.addEventListener('formSubmit', spy);

    // Only fill some fields, leaving required ones blank
    type ControlEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    type InputFieldEl = HTMLElement & { name?: string; shadowRoot: ShadowRoot };
    const setInput = async(name: string, value: string) => {
      const fields = Array.from(page.root.shadowRoot.querySelectorAll('input-field')) as InputFieldEl[];
      const field = fields.find((f) => f.name === name);
      expect(field).toBeTruthy();
      const control = field?.shadowRoot?.querySelector('.if-control') as ControlEl;
      control.value = value;
      control.dispatchEvent(new Event('input', { bubbles: true }));
      await page.waitForChanges();
    };

    await setInput('firstName', 'John');
    await setInput('lastName', ''); // invalid

    const form = page.root.shadowRoot.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});
