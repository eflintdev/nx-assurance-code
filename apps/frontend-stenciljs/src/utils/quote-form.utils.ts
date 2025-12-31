export function validateQuoteForm(
  values: Record<string, string|number|boolean>,
  zipRegex?: RegExp,
  phoneRegex?: RegExp
): Record<string, string> {
  const errs: Record<string, string> = {};
  const v = values || {};

  if (!v.firstName?.toString().trim()) errs.firstName = 'First Name is required';
  if (!v.lastName?.toString().trim()) errs.lastName = 'Last Name is required';

  if (!v.email?.toString().trim()) errs.email = 'Email is required';
  else if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.toString())) {
    errs.email = 'Enter a valid email address';
  }

  if (!v.phone?.toString().trim()) errs.phone = 'Preferred Phone is required';
  else if (phoneRegex && !phoneRegex.test(v.phone.toString())) {
    errs.phone = 'Enter a valid phone number';
  }

  if (!v.address?.toString().trim()) errs.address = 'Address is required';
  if (!v.city?.toString().trim()) errs.city = 'City is required';

  if (!v.zip?.toString().trim()) errs.zip = 'Zip is required';
  else if (zipRegex && !zipRegex.test(v.zip.toString())) {
    errs.zip = 'Enter a valid ZIP code';
  }

  if (!v.state) errs.state = 'State is required';

  return errs;
}
