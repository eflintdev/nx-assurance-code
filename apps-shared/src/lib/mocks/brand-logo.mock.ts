// brand-logo.mock.ts
// Mock data for BrandLogo component unit tests and all .toBe/.contains values

export const BRAND_LOGO_TYPE_NAV = 'nav-logo';
export const BRAND_LOGO_TYPE_FULL_SLOGAN = 'full-slogan';
export const BRAND_LOGO_TYPE_INVALID = 'invalid-type';
export const BRAND_LOGO_TYPE_UNKNOWN = 'unknown';
export const BRAND_LOGO_TYPE_CASE_SENSITIVE = 'Nav-Logo';
export const BRAND_LOGO_TYPE_EMPTY = '';

export const BRAND_LOGO_TAG = 'BRAND-LOGO';
export const BRAND_LOGO_SVG_NAMESPACE = 'http://www.w3.org/2000/svg'; // typical SVG xmlns

// Used for .toBe() and .contains() checks
export const BRAND_LOGO_EXPECT_SVG = true;
export const BRAND_LOGO_EXPECT_NO_SVG = false;
export const BRAND_LOGO_EXPECT_FRAGMENT_CHILDREN_LENGTH = 0;

// Add more as needed for future test assertions
