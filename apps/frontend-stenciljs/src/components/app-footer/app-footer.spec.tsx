import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { AppFooter } from './app-footer';
import {
  COMPANY_NAME_MOCK,
  PHONE_MOCK,
  FOOTER_LINKS_MOCK,
  SOCIAL_LINKS_MOCK,
  FOOTER_DISCLAIMER_BRAND_MOCK,
  FOOTER_DISCLAIMER_INSURANCE_MOCK,
  FOOTER_DISCLAIMER_PA_MOCK,
  COPYRIGHT_YEAR_MOCK,
  COPYRIGHT_NOTICE_MOCK,
  PHONE_DISPLAY_MOCK,
  FULL_SLOGAN_TYPE_MOCK
} from '@apps-shared/lib/mocks';

describe('app-footer', () => {
  it('renders company name in footer', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const footerDisclaimer = page.root.shadowRoot.querySelector('.footer-disclaimer');
    expect(footerDisclaimer.textContent).toContain(COMPANY_NAME_MOCK);
  });

  it('renders phone number with correct format', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const phoneLink = page.root.shadowRoot.querySelector('.footer-phone') as HTMLAnchorElement;
    expect(phoneLink.textContent).toBe(PHONE_DISPLAY_MOCK);
    expect(phoneLink.href).toContain(`tel:${PHONE_MOCK}`);
  });

  it('renders all footer links', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const footerTopLinks = page.root.shadowRoot.querySelector('.footer-top-links');
    const customLinks = footerTopLinks.querySelectorAll('custom-link');
    expect(customLinks.length).toBe(FOOTER_LINKS_MOCK.length);
  });

  it('renders all social links', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');
    expect(socialLinkElements.length).toBe(SOCIAL_LINKS_MOCK.length);
  });

  it('renders copyright with correct year and company name', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const copyright = page.root.shadowRoot.querySelector('.footer-copyright');
    expect(copyright.textContent).toContain(COPYRIGHT_YEAR_MOCK);
    expect(copyright.textContent).toContain(COPYRIGHT_NOTICE_MOCK);
  });

  it('renders brand logo component', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const brandLogo = page.root.shadowRoot.querySelector('brand-logo');
    expect(brandLogo).toBeTruthy();
    expect(brandLogo.getAttribute('type')).toBe(FULL_SLOGAN_TYPE_MOCK);
  });

  it('handles empty links array gracefully', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={[]}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const footerTopLinks = page.root.shadowRoot.querySelector('.footer-top-links');
    const customLinks = footerTopLinks.querySelectorAll('custom-link');
    expect(customLinks.length).toBe(0);
  });

  it('handles empty social links array gracefully', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={[]}
        />
      )
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');
    expect(socialLinkElements.length).toBe(0);
  });

  it('renders correct social icons for each platform', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');

    SOCIAL_LINKS_MOCK.forEach((social, index) => {
      const link = socialLinkElements[index] as HTMLAnchorElement;
      expect(link.getAttribute('title')).toBe(social.platform);
      expect(link.getAttribute('aria-label')).toBe(social.platform);
      expect(link.href).toContain(social.url);
    });
  });

  it('renders correct social icon SVGs', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');

    socialLinkElements.forEach((link) => {
      const svg = link.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  it('renders footer disclaimer text', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const disclaimer = page.root.shadowRoot.querySelector('.footer-disclaimer');
    expect(disclaimer.textContent).toContain(FOOTER_DISCLAIMER_BRAND_MOCK);
    expect(disclaimer.textContent).toContain(FOOTER_DISCLAIMER_INSURANCE_MOCK);
    expect(disclaimer.textContent).toContain(FOOTER_DISCLAIMER_PA_MOCK);
  });

  it('renders phone icon SVG', async() => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName={COMPANY_NAME_MOCK}
          phone={PHONE_MOCK}
          links={FOOTER_LINKS_MOCK}
          socialLinks={SOCIAL_LINKS_MOCK}
        />
      )
    });

    const phoneIcon = page.root.shadowRoot.querySelector('.footer-cta-icon');
    const svg = phoneIcon.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
