import {
  COMPANY_NAME,
  FOOTER_PHONE,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  BREADCRUMBS,
  CONTENT_PARAGRAPHS_DATA,
  BRAND_NAME,
  HEADER_PHONE,
  FORM_TITLE,
  FORM_INTRO,
  REQUIRED_LABEL,
  CONSENT_PARAGRAPHS,
  STATE_OPTIONS,
  ZIP_PATTERN,
  PHONE_PATTERN,
  SIDE_DRAWER_SECTIONS,
  BANNER_HEADING
} from '@apps-shared/lib/constants';

/**
 * Initializes application-wide component data by setting properties on custom elements.
 *
 * This function is executed when the DOM is ready and populates all major components
 * with constants and configuration data from the shared library. It handles both cases
 * where the DOM might already be loaded or still loading.
 *
 * @remarks
 * The function queries the DOM for custom elements and distributes shared constants to:
 * - `site-content` - breadcrumbs and paragraphs
 * - `quote-form` - form configuration and validation patterns
 * - `app-footer` - company information and social links
 * - `app-header` - brand name and contact phone
 * - `side-drawer` - navigation sections
 * - `banner-section` - banner heading text
 *
 * @example
 * ```typescript
 * import appInit from './app-init';
 * appInit();
 * ```
 *
 * @returns {Promise<void>}
 */
export default async function appInit() {
  /**
   * Sets breadcrumb and paragraph content on the site-content component.
   *
   * Queries the DOM for the `site-content` custom element and assigns the
   * breadcrumbs navigation structure and main content paragraphs from shared constants.
   * Safely returns if the element is not found in the DOM.
   *
   * @internal
   * @returns {void}
   */
  const setContentData = () => {
    const contentElement = document.querySelector('site-content');
    if (!contentElement) return;
    contentElement.breadcrumbs = BREADCRUMBS;
    contentElement.paragraphs = CONTENT_PARAGRAPHS_DATA;
  };

  /**
   * Configures the quote form component with form metadata and validation rules.
   *
   * Populates the `quote-form` custom element with:
   * - Form title and introductory text
   * - Required field indicator label
   * - Consent disclosure paragraphs
   * - State options for the state selection field
   * - Regular expression patterns for ZIP and phone validation
   *
   * Safely returns if the element is not found in the DOM.
   *
   * @internal
   * @returns {void}
   */
  const setQuoteFormData = () => {
    const quoteFormElement = document.querySelector('quote-form');
    if (!quoteFormElement) return;
    quoteFormElement.formTitle = FORM_TITLE;
    quoteFormElement.intro = FORM_INTRO;
    quoteFormElement.requiredLabel = REQUIRED_LABEL;
    quoteFormElement.consentParagraphs = CONSENT_PARAGRAPHS;
    quoteFormElement.states = STATE_OPTIONS;
    quoteFormElement.zipPattern = ZIP_PATTERN;
    quoteFormElement.phonePattern = PHONE_PATTERN;
  };

  /**
   * Populates the footer component with company information and links.
   *
   * Queries the DOM for the `app-footer` custom element and assigns:
   * - Company name for branding and legal disclaimers
   * - Phone number for customer support
   * - Navigation links for the footer menu
   * - Social media links with platform URLs
   *
   * Safely returns if the element is not found in the DOM.
   *
   * @internal
   * @returns {void}
   */
  const setFooterData = () => {
    const footerElement = document.querySelector('app-footer');
    if (!footerElement) return;
    footerElement.companyName = COMPANY_NAME;
    footerElement.phone = FOOTER_PHONE;
    footerElement.links = FOOTER_LINKS;
    footerElement.socialLinks = SOCIAL_LINKS;
  };

  /**
   * Initializes the header component with brand and contact information.
   *
   * Queries the DOM for the `app-header` custom element and assigns:
   * - Brand name for the logo and navigation branding
   * - Phone number for quick contact access in the header
   *
   * Safely returns if the element is not found in the DOM.
   *
   * @internal
   * @returns {void}
   */
  const setHeaderData = () => {
    const headerElement = document.querySelector('app-header');
    if (!headerElement) return;
    headerElement.brandName = BRAND_NAME;
    headerElement.phone = HEADER_PHONE;
  };

  /**
   * Configures the side drawer navigation component.
   *
   * Queries the DOM for the `side-drawer` custom element and assigns the
   * navigation sections that populate the mobile/expandable side menu.
   *
   * Safely returns if the element is not found in the DOM.
   *
   * @internal
   * @returns {void}
   */
  const setSideDrawerData = () => {
    const sideDrawerElement = document.querySelector('side-drawer');
    if (!sideDrawerElement) return;
    sideDrawerElement.sections = SIDE_DRAWER_SECTIONS;
  };

  /**
   * Sets the banner section heading text.
   *
   * Queries the DOM for the `banner-section` custom element and assigns the
   * main heading text that displays in the promotional banner area.
   *
   * Safely returns if the element is not found in the DOM.
   *
   * @internal
   * @returns {void}
   */
  const setBannerData = () => {
    const bannerElement = document.querySelector('banner-section');
    if (!bannerElement) return;
    bannerElement.heading = BANNER_HEADING;
  };

  /**
   * Executes all component initialization functions in sequence.
   *
   * Called when the DOM is ready to ensure all custom elements are properly
   * configured with data from shared constants.
   *
   * @internal
   * @returns {void}
   */
  const initAll = () => {
    setContentData();
    setQuoteFormData();
    setFooterData();
    setHeaderData();
    setSideDrawerData();
    setBannerData();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
}
