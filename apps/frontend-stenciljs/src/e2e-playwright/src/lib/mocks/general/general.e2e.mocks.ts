// Home page E2E mocks for Playwright tests

// Banner Section
export const BANNER_HEADING_MOCK = 'New Jersey motorhome insurance coverage';

// Header
export const HEADER_PHONE_MOCK = '844-242-3555';

// Content (site-content)
export const BREADCRUMBS_MOCK = [
	{ label: 'Home', href: '/', current: false },
	{ label: 'Insurance', href: '/', current: false },
	{ label: 'New Jersey Motor Home Insurance Coverage', href: '/insurance/auto', current: true }
];
export const CONTENT_PARAGRAPHS_MOCK = [
	'Think about all of the valuables that are stored within your motorhome',
	'In addition to insuring your RV, we offer other types of insurance in New Jersey'
];

// Quote Form
export const QUOTE_FORM_MOCK = {
	firstName: 'Test',
	lastName: 'User',
	email: 'test@example.com',
	phone: '555-555-5555',
	address: '123 Main St',
	city: 'Boston',
	zip: '02118',
	state: 'MA'
};

// Footer
export const FOOTER_LINKS_MOCK = [
	{ text: 'Home', href: 'https://www.plymouthrock.com/' },
	{ text: 'Contact Us', href: 'https://www.plymouthrock.com/contact' },
	{ text: 'Privacy & Security', href: 'https://www.plymouthrock.com/privacy-policy' },
	{ text: 'Terms & Conditions', href: 'https://www.plymouthrock.com/internet-policy' },
	{ text: 'States Licensed & Disclaimers', href: 'https://www.plymouthrock.com/states-licensed-disclaimers' },
	{ text: 'Site Map', href: 'https://www.plymouthrock.com/sitemap' }
];
