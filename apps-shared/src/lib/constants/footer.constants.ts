export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export const COMPANY_NAME = 'Plymouth Rock Assurance';

export const FOOTER_PHONE = '800-516-9242';

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Privacy & Security', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'States Licensed & Disclaimers', href: '#' },
  { label: 'Site Map', href: '#' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: '#' },
  { platform: 'Twitter', url: '#' },
  { platform: 'Instagram', url: '#' },
  { platform: 'LinkedIn', url: '#' },
];
