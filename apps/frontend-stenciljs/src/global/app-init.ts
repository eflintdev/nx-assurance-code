import { 
  COMPANY_NAME, 
  FOOTER_PHONE, 
  FOOTER_LINKS, 
  SOCIAL_LINKS,
  BREADCRUMBS,
  CONTENT_PARAGRAPHS,
} from '@apps-shared/lib/constants';

export default async function appInit() {
  const setContentData = () => {
    const contentElement = document.querySelector('site-content');
    if (!contentElement) return;
    contentElement.breadcrumbs = BREADCRUMBS;
    contentElement.paragraphs = CONTENT_PARAGRAPHS;
  };

  const setFooterData = () => {
    const footerElement = document.querySelector('app-footer');
    if (!footerElement) return;
    footerElement.companyName = COMPANY_NAME;
    footerElement.phone = FOOTER_PHONE;
    footerElement.links = FOOTER_LINKS;
    footerElement.socialLinks = SOCIAL_LINKS;
  };

  const initAll = () => {
    setContentData();
    setFooterData();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
}
