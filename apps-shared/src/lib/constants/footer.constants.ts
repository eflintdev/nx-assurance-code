import { FooterLink, SocialLink } from "../types";

export const COMPANY_NAME = 'Plymouth Rock Assurance';

export const FOOTER_PHONE = '800-516-9242';

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'Home', href: 'https://www.plymouthrock.com/' },
  { label: 'Contact Us', href: 'https://www.plymouthrock.com/contact' },
  { label: 'Privacy & Security', href: 'https://www.plymouthrock.com/privacy-policy' },
  { label: 'Terms & Conditions', href: 'https://www.plymouthrock.com/internet-policy' },
  { label: 'States Licensed & Disclaimers', href: 'https://www.plymouthrock.com/states-licensed-disclaimers' },
  { label: 'Site Map', href: 'https://www.plymouthrock.com/sitemap' }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: 'https://www.facebook.com/PlymouthRockAssurance' },
  { platform: 'Twitter', url: 'https://x.com/plymouthrock' },
  { platform: 'Instagram', url: 'https://www.instagram.com/plymouthrockassurance/' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/plymouth-rock-assurance' }
];
