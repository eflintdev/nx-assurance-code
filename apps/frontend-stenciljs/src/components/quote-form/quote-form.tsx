import { Component, h, State, Event, EventEmitter, Listen, Prop } from '@stencil/core';
import { validateQuoteForm } from '../../utils/quote-form.utils';

/**
 * Quote Form (assembled using <input-field>)
 * Emits `formSubmit` with the collected data when valid.
 */
@Component({
  tag: 'quote-form',
  styleUrl: 'quote-form.scss',
  shadow: true,
})
export class QuoteForm {
  @State() values: Record<string, any> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    state: '',
  };

  @State() errors: Record<string, string> = {};
  @State() submitting = false;

  // Externalized content props (provided via app-init constants)
  @Prop() formTitle: string;
  @Prop() intro: string;
  @Prop() requiredLabel: string;
  @Prop() consentParagraphs: string[];
  @Prop() states: { label: string; value: string; disabled?: boolean }[];
  @Prop() zipPattern: string;
  @Prop() phonePattern: string;

  @Event() formSubmit!: EventEmitter<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    state: string;
  }>;

  private zipRegex!: RegExp;
  private phoneRegex!: RegExp;

  componentWillLoad() {
    if (this.zipPattern) {
      try { this.zipRegex = new RegExp(this.zipPattern); } catch {}
    }
    if (this.phonePattern) {
      try { this.phoneRegex = new RegExp(this.phonePattern); } catch {}
    }
  }

  @Listen('valueChange')
  onChildValueChange(ev: CustomEvent<{ value: any; id?: string; name?: string; valid: boolean }>) {
    const name = ev.detail.name;
    if (!name) return;
    this.values = { ...this.values, [name]: ev.detail.value };
    if (this.errors[name]) {
      const newErrors = { ...this.errors };
      delete newErrors[name];
      this.errors = newErrors;
    }
  }

  private validate(): boolean {
    const errs = validateQuoteForm(this.values, this.zipRegex, this.phoneRegex);
    this.errors = errs;
    return Object.keys(errs).length === 0;
  }

  private onSubmit = (e: Event) => {
    e.preventDefault();
    if (!this.validate()) return;
    this.submitting = true;
    try {
      const payload = { ...this.values } as any;
      this.formSubmit.emit(payload);
    } finally {
      this.submitting = false;
    }
  };

  private fieldError(name: string): string | undefined {
    return this.errors[name];
  }

  render() {
    return (
      <form class="qf-form" onSubmit={this.onSubmit} noValidate>
        <h2 class="qf-title">{this.formTitle}</h2>
        <p class="qf-intro">
          {this.intro}<br />
          <span class="qf-required"><span aria-hidden="true">*</span> {this.requiredLabel}</span>
        </p>

        <div class="qf-grid">
          <input-field
            label="First Name"
            name="firstName"
            required
            placeholder="First Name"
            errorText={this.fieldError('firstName')}
          ></input-field>

          <input-field
            label="Last Name"
            name="lastName"
            required
            placeholder="Last Name"
            errorText={this.fieldError('lastName')}
          ></input-field>

          <input-field
            label="Email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            errorText={this.fieldError('email')}
          ></input-field>

          <input-field
            label="Preferred Phone"
            name="phone"
            type="tel"
            required
            pattern={this.phonePattern}
            placeholder="(555) 555-5555"
            errorText={this.fieldError('phone')}
          ></input-field>

          <input-field
            label="Address"
            name="address"
            required
            placeholder="Street Address"
            errorText={this.fieldError('address')}
          ></input-field>

          <input-field
            label="City"
            name="city"
            required
            placeholder="City"
            errorText={this.fieldError('city')}
          ></input-field>

          <input-field
            label="Zip"
            name="zip"
            required
            pattern={this.zipPattern}
            placeholder="12345"
            errorText={this.fieldError('zip')}
          ></input-field>

          <input-field
            label="State"
            name="state"
            field="select"
            required
            errorText={this.fieldError('state')}
            options={this.states as any}
          ></input-field>
        </div>

        <div class="qf-consent">
          {this.consentParagraphs?.length > 0 ? this.consentParagraphs.map((text) => <p>{text}</p>) : '' }
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
