import { Component, h, Prop, Event, EventEmitter, State, Element } from '@stencil/core';

/**
 * A reusable input field component supporting input/select/textarea.
 *
 * Props overview:
 * - label: Visible label text
 * - field: 'input' | 'select' | 'textarea' (default 'input')
 * - type: Input type for <input> (text, email, tel, number, etc.)
 * - fieldId, name, className, inputClass, labelClass
 * - value, placeholder, required, disabled, readonly, autocomplete
 * - pattern, min, max, step, minlength, maxlength
 * - options: For selects, array of { label, value, disabled? }
 * - helpText, errorText
 *
 * Events:
 * - valueChange: { value, id, name, valid }
 * - fieldFocus, fieldBlur
 */
@Component({
  tag: 'input-field',
  styleUrl: 'input-field.scss',
  shadow: true,
})
export class InputField {
  @Element() hostEl!: HTMLElement;

  // Presentation
  @Prop() label!: string;
  @Prop() labelClass?: string;
  @Prop() rootClass?: string;
  @Prop() inputClass?: string;

  // Structure
  @Prop() field: 'input' | 'select' | 'textarea' = 'input';
  @Prop() type = 'text';
  @Prop() fieldId?: string;
  @Prop() name?: string;

  // Value & behavior
  @Prop({ mutable: true, reflect: false }) value?: string | number;
  @Prop() placeholder?: string;
  @Prop() required?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() readonly?: boolean = false;
  @Prop() autocomplete?: string;

  // Validation/constraints
  @Prop() pattern?: string;
  @Prop() min?: string | number;
  @Prop() max?: string | number;
  @Prop() step?: string | number;
  @Prop() minlength?: number;
  @Prop() maxlength?: number;

  // Select support
  @Prop() options?: Array<{ label: string; value: string; disabled?: boolean }>;

  // Messaging
  @Prop() helpText?: string;
  @Prop() errorText?: string;

  // Events
  @Event() valueChange!: EventEmitter<{ value: string | number | undefined; id?: string; name?: string; valid: boolean }>;
  @Event() fieldFocus!: EventEmitter<{ id?: string; name?: string }>;
  @Event() fieldBlur!: EventEmitter<{ id?: string; name?: string; valid: boolean }>;

  @State() _uid = '';

  componentWillLoad() {
    // Generate a stable id if not provided
    if (!this.fieldId) {
      const base = this.name || 'field';
      this._uid = `${base}-${Math.random().toString(36).slice(2, 8)}`;
    }
  }

  private getId() {
    return this.fieldId || this._uid;
  }

  private onInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const newValue: string | number | undefined = this.type === 'number' && this.field === 'input'
      ? (target as HTMLInputElement).valueAsNumber
      : target.value;
    this.value = newValue as any;
    const valid = (target as HTMLInputElement).checkValidity ? (target as HTMLInputElement).checkValidity() : true;
    this.valueChange.emit({ value: this.value, id: this.getId(), name: this.name, valid });
  };

  private onFocus = () => {
    this.fieldFocus.emit({ id: this.getId(), name: this.name });
  };

  private onBlur = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const valid = (target as HTMLInputElement).checkValidity ? (target as HTMLInputElement).checkValidity() : true;
    this.fieldBlur.emit({ id: this.getId(), name: this.name, valid });
  };

  private renderControl() {
    const common = {
      id: this.getId(),
      name: this.name,
      class: `if-control ${this.inputClass || ''}`.trim(),
      required: this.required,
      disabled: this.disabled,
      readOnly: this.readonly,
      placeholder: this.placeholder,
      autoComplete: this.autocomplete,
      onInput: this.onInput,
      onChange: this.onInput,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      'aria-invalid': this.errorText ? 'true' : 'false',
      'aria-describedby': this.helpText || this.errorText ? `${this.getId()}-desc` : undefined,
    } as any;

    const constraints = {
      pattern: this.pattern,
      min: this.min as any,
      max: this.max as any,
      step: this.step as any,
      minLength: this.minlength,
      maxLength: this.maxlength,
      value: this.value as any,
    } as any;

    if (this.field === 'select') {
      return (
        <select {...common} {...constraints}>
          {(this.options || []).map(opt => (
            <option value={opt.value} disabled={!!opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (this.field === 'textarea') {
      return (
        <textarea {...common} {...constraints} />
      );
    }

    // default to input
    return (
      <input type={this.type} {...common} {...constraints} />
    );
  }

  render() {
    const id = this.getId();
    const hasAsterisk = !!this.required;
    const describedBy = this.helpText || this.errorText ? `${id}-desc` : undefined;

    return (
      <div class={`if-root ${this.rootClass || ''}`.trim()}>
        {this.label && (
          <label htmlFor={id} class={`if-label ${this.labelClass || ''}`.trim()}>
            {this.label}
            {hasAsterisk ? <span class="if-req" aria-hidden="true">*</span> : null}
          </label>
        )}
        {this.renderControl()}
        {(this.helpText || this.errorText) && (
          <div id={describedBy} class={`if-desc ${this.errorText ? 'is-error' : ''}`.trim()}>
            {this.errorText || this.helpText}
          </div>
        )}
      </div>
    );
  }
}

/**
 * Example usage:
 *
 * <input-field
 *   label="First Name"
 *   name="firstName"
 *   id="first-name"
 *   required
 *   placeholder="Enter your first name"
 *   onValueChange={(ev) => console.log('value', ev.detail.value)}
 * ></input-field>
 *
 * <input-field
 *   label="Email"
 *   name="email"
 *   type="email"
 *   required
 *   placeholder="you@example.com"
 * ></input-field>
 *
 * <input-field
 *   label="State"
 *   field="select"
 *   name="state"
 *   options='[{"label":"New Jersey","value":"NJ"},{"label":"New York","value":"NY"}]'
 * ></input-field>
 */
