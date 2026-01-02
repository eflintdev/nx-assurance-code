import { Component, h, Prop, Event, EventEmitter, State, Element, Watch } from '@stencil/core';

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
  shadow: true
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

  /**
   * Watches for changes on the options data for the selection list in the form
   * @param newValue new value
   * @param _oldValue old value
   */
  @Watch('options', { immediate: true })
  watchStates(newValue: string, _oldValue: string) {
    if (newValue) {
      this.renderControl();
    }
  }

  /**
   * Lifecycle method called after component is loaded.
   */
  componentWillLoad() {
    // Generate a stable id if not provided
    if (!this.fieldId) {
      const base = this.name || 'field';
      this._uid = `${base}-${Math.random().toString(36).slice(2, 8)}`;
    }
  }

  /**
   * Returns the field ID, falling back to a generated unique ID if not provided.
   * @returns {string} The field's unique identifier.
   */
  private getId() {
    return this.fieldId || this._uid;
  }

  /**
   * Handles input/change events for the field, updates value and emits valueChange.
   * @param ev Input event from the field
   */
  private onInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const newValue: string | number | undefined = this.type === 'number' && this.field === 'input' ?
      (target as HTMLInputElement).valueAsNumber :
      target.value;
    this.value = newValue;
    const valid = (target as HTMLInputElement).checkValidity ? (target as HTMLInputElement).checkValidity() : true;
    this.valueChange.emit({ value: this.value, id: this.getId(), name: this.name, valid });
  };

  /**
   * Handles focus event for the field and emits fieldFocus.
   */
  private onFocus = () => {
    this.fieldFocus.emit({ id: this.getId(), name: this.name });
  };

  /**
   * Handles blur event for the field, checks validity, and emits fieldBlur.
   * @param ev Blur event from the field
   */
  private onBlur = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const valid = (target as HTMLInputElement).checkValidity ? (target as HTMLInputElement).checkValidity() : true;
    this.fieldBlur.emit({ id: this.getId(), name: this.name, valid });
  };

  /**
   * Renders the appropriate form control (input, select, or textarea) based on props.
   * Applies common attributes, event handlers, and accessibility features.
   * @returns JSX element for the form control
   */
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
      'aria-describedby': this.helpText || this.errorText ? `${this.getId()}-desc` : undefined
    };

    // For providing selection field option attributes
    const inputAttributes = {
      pattern: this.pattern,
      min: this.min,
      max: this.max,
      step: this.step,
      minLength: this.minlength,
      maxLength: this.maxlength,
      value: this.value
    };

    // Setup the selection field's options
    if (this.field === 'select') {
      return (
        <select {...common} {...inputAttributes}>
          { this.options && this.options?.length > 0 ? this.options.map((opt) => (
            <option value={opt.value} disabled={!!opt.disabled}>
              {opt.label}
            </option>
          )) : ''}
        </select>
      );
    }
    // Setup text area fields
    if (this.field === 'textarea') {
      return (
        <textarea {...common} {...inputAttributes} />
      );
    }

    // Default to input
    return (
      <input type={this.type} {...common} {...inputAttributes} />
    );
  }

  render() {
    const id = this.getId();
    const hasAsterisk = !!this.required;
    const describedBy = this.helpText || this.errorText ? `${id}-desc` : undefined;

    return (
      <div class={(`if-root ${this.rootClass || ''}`.trim()) + (`${this.errorText ? ' has-error' : ''}`)}>
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
