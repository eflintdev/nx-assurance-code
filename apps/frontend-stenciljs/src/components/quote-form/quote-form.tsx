import { Component, h, State, Event, EventEmitter, Listen } from '@stencil/core';

/**
 * Quote Form (assembled using <input-field>)
 * Emits `formSubmit` with the collected data when valid.
 */
@Component({
  tag: 'quote-form',
  styleUrl: 'quote-form.css',
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

  @State() consentParagraphs: string[] = [
    'By clicking the "Submit" button below, I am agreeing to receive calls and texts from InsuraMatch, LLC, and its agents, to market insurance products at the number(s) I provided above, which may be auto-dialed and use artificial or pre-recorded voice messages or SMS text messages. I understand that my agreement to receive these calls and texts is not required to purchase any goods or services and I may revoke my consent at any time. Data rates apply. I have read and agree to the Terms & Conditions and Privacy Policy. I understand Plymouth Rock Assurance is not affiliated with InsuraMatch, LLC. By clicking on the "Submit" button, I am authorizing InsuraMatch, LLC and its agents to contact me.',
    'InsuraMatch, LLC ("InsuraMatch") is a licensed insurance producer in all U.S. States and the District of Columbia. InsuraMatch is domiciled in Delaware and maintains a principal place of business at One Financial Center, Suite 1700, Boston, Massachusetts, 02111. InsuraMatch does business as InsuraMatch Insurance Agency, LLC (License Number: 0L09834) in California and as InsuraMatch Agency (License Number: 1335192) in New York. For more information, see InsuraMatch\'s Terms & Conditions.'
  ];

  @Event() formSubmit!: EventEmitter<{
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    state: string;
  }>;

  private states = [
    { label: 'Select a state', value: '', disabled: true },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New York', value: 'NY' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'New Hampshire', value: 'NH' },
  ];

  private zipPattern = /^\d{5}(?:-\d{4})?$/;
  private phonePattern = /^[0-9+()\-\s]{7,20}$/;

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
    const errs: Record<string, string> = {};
    const v = this.values;

    if (!v.firstName?.toString().trim()) errs.firstName = 'First Name is required';
    if (!v.lastName?.toString().trim()) errs.lastName = 'Last Name is required';
    if (!v.phone?.toString().trim()) errs.phone = 'Preferred Phone is required';
    else if (!this.phonePattern.test(v.phone.toString())) errs.phone = 'Enter a valid phone number';

    if (!v.address?.toString().trim()) errs.address = 'Address is required';
    if (!v.city?.toString().trim()) errs.city = 'City is required';

    if (!v.zip?.toString().trim()) errs.zip = 'Zip is required';
    else if (!this.zipPattern.test(v.zip.toString())) errs.zip = 'Enter a valid ZIP code';

    if (!v.state) errs.state = 'State is required';

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
        <h2 class="qf-title">Motorhome insurance form</h2>
        <p class="qf-intro">
          Fill out this short form to request a motorhome insurance quote!<br />
          <span class="qf-required"><span aria-hidden="true">*</span> Required</span>
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
            placeholder="you@example.com"
            errorText={this.fieldError('email')}
          ></input-field>

          <input-field
            label="Preferred Phone"
            name="phone"
            type="tel"
            required
            pattern={this.phonePattern.source}
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
            pattern={this.zipPattern.source}
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
          {this.consentParagraphs.map((text) => <p>{text}</p>)}
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
