// quote-form.mock.ts
// Mock data for QuoteForm component unit tests and all .toBe/.contains values

export const QUOTE_FORM_TITLE = 'Get a Quote';
export const QUOTE_FORM_INTRO = 'Please provide your details to get started.';
export const QUOTE_FORM_REQUIRED_LABEL = 'Required';
export const QUOTE_FORM_CONSENT_PARAGRAPHS = ['By submitting, you agree to be contacted.'];
export const QUOTE_FORM_STATES = [
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New York', value: 'NY' },
];
export const QUOTE_FORM_ZIP_PATTERN = '^\\d{5}$';
export const QUOTE_FORM_PHONE_PATTERN = '^[0-9\\-()\\s]+$';
