// Quote Form shared constants
export const FORM_TITLE = 'Motorhome insurance form';
export const FORM_INTRO = 'Fill out this short form to request a motorhome insurance quote!';
export const REQUIRED_LABEL = 'Required';
export const CONSENT_PARAGRAPHS = [
    'By clicking the "Submit" button below, I am agreeing to receive calls and texts from InsuraMatch, LLC, and its agents, to market insurance products at the number(s) I provided above, which may be auto-dialed and use artificial or pre-recorded voice messages or SMS text messages. I understand that my agreement to receive these calls and texts is not required to purchase any goods or services and I may revoke my consent at any time. Data rates apply. I have read and agree to the Terms & Conditions and Privacy Policy. I understand Plymouth Rock Assurance is not affiliated with InsuraMatch, LLC. By clicking on the "Submit" button, I am authorizing InsuraMatch, LLC and its agents to contact me.',
    'InsuraMatch, LLC ("InsuraMatch") is a licensed insurance producer in all U.S. States and the District of Columbia. InsuraMatch is domiciled in Delaware and maintains a principal place of business at One Financial Center, Suite 1700, Boston, Massachusetts, 02111. InsuraMatch does business as InsuraMatch Insurance Agency, LLC (License Number: 0L09834) in California and as InsuraMatch Agency (License Number: 1335192) in New York. For more information, see InsuraMatch\'s Terms & Conditions.'
];
export const STATE_OPTIONS = [
    { label: 'Select a state', value: '', disabled: true },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New York', value: 'NY' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'New Hampshire', value: 'NH' },
];
export const ZIP_PATTERN = '^\\d{5}(?:-\\d{4})?$';
export const PHONE_PATTERN = '^[0-9+()\\-\\s]{7,20}$';
