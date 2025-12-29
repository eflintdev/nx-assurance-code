export interface ContentSection {
  paragraphs: string[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface HeaderLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SideDrawerItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SideDrawerListBlock {
  title: string;
  items: SideDrawerItem[];
}

export interface SideDrawerSection {
  key: string;
  label: string;
  href?: string;
  icon?: string;
  listBlocks: SideDrawerListBlock[];
}
