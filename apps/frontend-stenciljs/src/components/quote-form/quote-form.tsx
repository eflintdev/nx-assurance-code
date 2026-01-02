import { Component, h, State, Event, EventEmitter, Listen, Prop } from '@stencil/core';
import { validateQuoteForm } from '../../utils/quote-form.utils';
import { QuoteFormType, StateOptionType  } from '../../types/types.ts';
import { getAlertIcon } from '../../utils/header.utils.tsx';

/**
 * QuoteForm Component
 *
 * @component
 * @example
 *   // Basic usage with minimal props
 *   <quote-form></quote-form>
 *
 *   // With custom content and patterns
 *   <quote-form
 *     formTitle="Get a Quote"
 *     intro="Please fill out this form to receive a quote"
 *     phonePattern="^\(\d{3}\) \d{3}-\d{4}$"
 *     zipPattern="^\d{5}$"
 *     states={stateOptions}
 *     onFormSubmit={handleSubmit}
 *   ></quote-form>
 *
 * @prop {string} formTitle - Title displayed at the top of the form
 * @prop {string} intro - Introduction text below the title
 * @prop {string} requiredLabel - Label for required field indicator (e.g., "Required")
 * @prop {string[]} consentParagraphs - Array of HTML strings for consent text
 * @prop {StateOptionType[]} states - Array of state options for the state select field
 * @prop {string} zipPattern - Regex pattern string for zip code validation
 * @prop {string} phonePattern - Regex pattern string for phone number validation
 *
 * @state {QuoteFormType} values - Current form field values (firstName, lastName, email, phone, address, city, zip, state)
 * @state {Record<string, string>} errors - Error messages mapped by field name
 * @state {boolean} submitting - Whether the form is currently submitting
 *
 * @event {CustomEvent<QuoteFormType>} formSubmit - Emitted when form is successfully validated and submitted
 */
@Component({
  tag: 'quote-form',
  styleUrl: 'quote-form.scss',
  shadow: true
})
export class QuoteForm {
  @State() values: QuoteFormType = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    state: ''
  };

  @State() errors: Record<string, string> = {};
  @State() submitting = false;

  // Externalized content props (provided via app-init constants)
  @Prop() formTitle: string;
  @Prop() intro: string;
  @Prop() requiredLabel: string;
  @Prop() consentParagraphs: string[];
  @Prop() states: StateOptionType[];
  @Prop() zipPattern: string;
  @Prop() phonePattern: string;

  @Event() formSubmit!: EventEmitter<QuoteFormType>;

  private zipRegex!: RegExp;
  private phoneRegex!: RegExp;

  /**
   * Lifecycle method called after component is loaded.
   */
  componentWillLoad() {
    if (this.zipPattern) {
      try { this.zipRegex = new RegExp(this.zipPattern); } catch {
        // Add additional code - ignore invalid regex patterns
      }
    }
    if (this.phonePattern) {
      try { this.phoneRegex = new RegExp(this.phonePattern); } catch {
        // Add additional code - ignore invalid regex patterns
      }
    }
  }

  /**
   * Handles valueChange events from child input-field components.
   * Updates form values and clears errors for the changed field.
   * @param ev CustomEvent containing value, id, name, and validity
   */
  @Listen('valueChange')
  onChildValueChange(ev: CustomEvent<{ value: string | number | boolean; id?: string; name?: string; valid: boolean }>) {
    const name = ev.detail.name;
    if (!name) return;
    this.values = { ...this.values, [name]: ev.detail.value };
    if (this.errors[name]) {
      const newErrors = { ...this.errors };
      delete newErrors[name];
      this.errors = newErrors;
    }
  }

  /**
   * Validates the form values using external validation logic.
   * Updates error state and returns true if valid, false otherwise.
   * @returns {boolean} Whether the form is valid
   */
  private validate(): boolean {
    const errs = validateQuoteForm(this.values, this.zipRegex, this.phoneRegex);
    this.errors = errs;
    return Object.keys(errs).length === 0;
  }

  /**
   * Handles form submission, validates, and emits formSubmit if valid.
   * @param e Form submit event
   */
  private onSubmit = (e: Event) => {
    e.preventDefault();
    if (!this.validate()) return;
    this.submitting = true;
    try {
      const payload = { ...this.values } as QuoteFormType;
      this.formSubmit.emit(payload);
    } finally {
      this.submitting = false;
    }
  };

  /**
   * Returns the error message for a given field name, if any.
   * @param name Field name
   * @returns Error message string or undefined
   */
  private fieldError(name: string): string | undefined {
    return this.errors[name];
  }

  render() {
    const errors = Object.keys(this.errors).length > 0 ? ' form-errors' : '';
    return (
      <form class={`qf-form ${errors}`} onSubmit={this.onSubmit} noValidate>
        <h2 class="qf-title">{this.formTitle}</h2>
        <p class="qf-intro">
          {this.intro}<br />
          <span class="qf-required"><span aria-hidden="true">*</span> {this.requiredLabel}</span>
        </p>
        { Object.keys(this.errors).length > 0 ?
        <div class="qf-validation__message qf-validation__message--alert">
          {getAlertIcon()}There was a problem with your submission. Please review the fields below.
        </div> :
         ''}
        <div class="qf-grid">
          <input-field
            class={errors}
            label="First Name"
            name="firstName"
            required
            placeholder="First Name"
            errorText={this.fieldError('firstName')}
          ></input-field>

          <input-field
            class={errors}
            label="Last Name"
            name="lastName"
            required
            placeholder="Last Name"
            errorText={this.fieldError('lastName')}
          ></input-field>

          <input-field
            class={errors}
            label="Email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            errorText={this.fieldError('email')}
          ></input-field>

          <input-field
            class={errors}
            label="Preferred Phone"
            name="phone"
            type="tel"
            required
            pattern={this.phonePattern}
            placeholder="(555) 555-5555"
            errorText={this.fieldError('phone')}
          ></input-field>

          <input-field
            class={errors}
            label="Address"
            name="address"
            required
            placeholder="Street Address"
            errorText={this.fieldError('address')}
          ></input-field>

          <input-field
            class={errors}
            label="City"
            name="city"
            required
            placeholder="City"
            errorText={this.fieldError('city')}
          ></input-field>

          <input-field
            class={errors}
            label="Zip"
            name="zip"
            required
            pattern={this.zipPattern}
            placeholder="12345"
            errorText={this.fieldError('zip')}
          ></input-field>

          <input-field
            class={errors}
            label="State"
            name="state"
            field="select"
            required
            errorText={this.fieldError('state')}
            options={this.states}
          ></input-field>
        </div>

        <div class="qf-consent">
          {this.consentParagraphs?.length > 0 ? this.consentParagraphs.map((text) => <p innerHTML={text}></p>) : '' }
        </div>

        <div class="qf-actions">
          <button class="qf-submit" type="submit" disabled={this.submitting}>
            {this.submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </form>
    );
  }
}
