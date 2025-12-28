import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { AppFooter } from './app-footer';
import { FooterLink, SocialLink } from '@apps-shared';

describe('app-footer', () => {
  const mockFooterLinks: FooterLink[] = [
    { label: 'Home', href: '#' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Privacy & Security', href: '#privacy' },
  ];

  const mockSocialLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://facebook.com' },
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'Instagram', url: 'https://instagram.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  it('renders with required props', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    expect(page.root).toBeTruthy();
  });

  it('renders company name in footer', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const footerDisclaimer = page.root.shadowRoot.querySelector('.footer-disclaimer');
    expect(footerDisclaimer.textContent).toContain('Plymouth Rock Assurance');
  });

  it('renders phone number with correct format', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const phoneLink = page.root.shadowRoot.querySelector('.footer-phone') as HTMLAnchorElement;
    expect(phoneLink.textContent).toBe('800-516-9242');
    expect(phoneLink.href).toContain('tel:800-516-9242');
  });

  it('renders all footer links', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const footerTopLinks = page.root.shadowRoot.querySelector('.footer-top-links');
    const customLinks = footerTopLinks.querySelectorAll('custom-link');
    expect(customLinks.length).toBe(mockFooterLinks.length);
  });

  it('renders all social links', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');
    expect(socialLinkElements.length).toBe(mockSocialLinks.length);
  });

  it('renders copyright with correct year and company name', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const copyright = page.root.shadowRoot.querySelector('.footer-copyright');
    expect(copyright.textContent).toContain('© 2025 Plymouth Rock Assurance');
    expect(copyright.textContent).toContain('All Rights Reserved');
  });

  it('renders brand logo component', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const brandLogo = page.root.shadowRoot.querySelector('brand-logo');
    expect(brandLogo).toBeTruthy();
    expect(brandLogo.getAttribute('type')).toBe('full-slogan');
  });

  it('handles empty links array gracefully', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={[]}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const footerTopLinks = page.root.shadowRoot.querySelector('.footer-top-links');
    const customLinks = footerTopLinks.querySelectorAll('custom-link');
    expect(customLinks.length).toBe(0);
  });

  it('handles empty social links array gracefully', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={[]}
        />
      ),
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');
    expect(socialLinkElements.length).toBe(0);
  });

  it('renders correct social icons for each platform', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');

    mockSocialLinks.forEach((social, index) => {
      const link = socialLinkElements[index] as HTMLAnchorElement;
      expect(link.getAttribute('title')).toBe(social.platform);
      expect(link.getAttribute('aria-label')).toBe(social.platform);
      expect(link.href).toContain(social.url);
    });
  });

  it('renders correct social icon SVGs', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const socialLinksContainer = page.root.shadowRoot.querySelector('.social-links');
    const socialLinkElements = socialLinksContainer.querySelectorAll('.social-link');

    socialLinkElements.forEach((link) => {
      const svg = link.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  it('renders footer disclaimer text', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const disclaimer = page.root.shadowRoot.querySelector('.footer-disclaimer');
    expect(disclaimer.textContent).toContain('brand names and service marks');
    expect(disclaimer.textContent).toContain('property and casualty insurance');
    expect(disclaimer.textContent).toContain('PA Residents');
  });

  it('renders phone icon SVG', async () => {
    const page = await newSpecPage({
      components: [AppFooter],
      template: () => (
        <app-footer
          companyName="Plymouth Rock Assurance"
          phone="800-516-9242"
          links={mockFooterLinks}
          socialLinks={mockSocialLinks}
        />
      ),
    });

    const phoneIcon = page.root.shadowRoot.querySelector('.footer-cta-icon');
    const svg = phoneIcon.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
