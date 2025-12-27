import { 
  COMPANY_NAME, 
  FOOTER_PHONE, 
  FOOTER_LINKS, 
  SOCIAL_LINKS,
  BREADCRUMBS,
  CONTENT_PARAGRAPHS,
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
} from '@apps-shared/lib/constants';

export default async function appInit() {
  const setContentData = () => {
    const contentElement = document.querySelector('site-content');
    if (!contentElement) return;
    contentElement.breadcrumbs = BREADCRUMBS;
    contentElement.paragraphs = CONTENT_PARAGRAPHS;
  };

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

  const setFooterData = () => {
    const footerElement = document.querySelector('app-footer');
    if (!footerElement) return;
    footerElement.companyName = COMPANY_NAME;
    footerElement.phone = FOOTER_PHONE;
    footerElement.links = FOOTER_LINKS;
    footerElement.socialLinks = SOCIAL_LINKS;
  };

  const setHeaderData = () => {
    const headerElement = document.querySelector('app-header');
    if (!headerElement) return;
    headerElement.brandName = BRAND_NAME;
    headerElement.phone = HEADER_PHONE;
  };

  const setSideDrawerData = () => {
    const sideDrawerElement = document.querySelector('side-drawer');
    if (!sideDrawerElement) return;
    sideDrawerElement.sections = SIDE_DRAWER_SECTIONS;
  };

  const initAll = () => {
    setContentData();
    setQuoteFormData();
    setFooterData();
    setHeaderData();
    setSideDrawerData();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
}
