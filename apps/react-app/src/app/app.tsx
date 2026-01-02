import './app.module.scss';
import { AppHeader, AppFooter, BannerSection, SiteContent, QuoteForm, SideDrawer, SearchModal } from '../app/components/custom/components';
import {
  BRAND_NAME,
  HEADER_PHONE,
  COMPANY_NAME,
  FOOTER_PHONE,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  SIDE_DRAWER_SECTIONS,
  FORM_TITLE,
  FORM_INTRO,
  REQUIRED_LABEL,
  CONSENT_PARAGRAPHS,
  STATE_OPTIONS,
  ZIP_PATTERN,
  PHONE_PATTERN,
  BREADCRUMBS,
  CONTENT_PARAGRAPHS_DATA,
  BANNER_HEADING
} from '@apps-shared/lib/constants';

/**
 * App Component
 *
 * Root component for the React application that orchestrates the main page layout and component composition.
 *
 * Features:
 * - Full-page layout with header, banner, sidebar, modals, content, and footer
 * - Integrates all major page sections using custom Stencil web components
 * - Centralizes data management using shared constants
 * - Handles navigation, search, and form submission flows
 *
 * @component
 * @example
 *   <App />
 */
export function App() {
  return (
    <>
      <AppHeader brandName={BRAND_NAME} phone={HEADER_PHONE} />
      <BannerSection heading={BANNER_HEADING} />
      <SideDrawer sections={SIDE_DRAWER_SECTIONS} />
      <SearchModal />
      <SiteContent breadcrumbs={BREADCRUMBS} paragraphs={CONTENT_PARAGRAPHS_DATA}>
        <QuoteForm
          formTitle={FORM_TITLE}
          intro={FORM_INTRO}
          requiredLabel={REQUIRED_LABEL}
          consentParagraphs={CONSENT_PARAGRAPHS}
          states={STATE_OPTIONS}
          zipPattern={ZIP_PATTERN}
          phonePattern={PHONE_PATTERN}
        />
      </SiteContent>
      <AppFooter companyName={COMPANY_NAME} phone={FOOTER_PHONE} links={FOOTER_LINKS} socialLinks={SOCIAL_LINKS} />
    </>
  );
}

export default App;
