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

export const SIDE_DRAWER_SECTIONS: SideDrawerSection[] = [
  {
    key: 'insurance',
    label: 'Insurance',
    href: '#insurance',
    listBlocks: [
      {
        title: 'Vehicle Insurance',
        items: [
          { label: 'Personal Auto', href: '#auto' },
          { label: 'Commercial Auto', href: '#commercial-auto' },
          { label: 'Motorcycle', href: '#motorcycle' },
          { label: 'Motorhome', href: '#motorhome' },
        ],
      },
      {
        title: 'Property Insurance',
        items: [
          { label: 'Home', href: '#home' },
          { label: 'Renters', href: '#renters' },
          { label: 'Condo', href: '#condo' },
          { label: 'Flood', href: '#flood' },
        ],
      },
      {
        title: 'More Insurance',
        items: [
          { label: 'Umbrella', href: '#umbrella' },
          { label: 'Term Life', href: '#term-life' },
          { label: 'Pets', href: '#pets' },
          { label: "Teachers' Insurance Plan", href: '#teachers-plan' },
        ],
      },
      {
        title: 'Discounts & Benefits',
        items: [
          { label: 'Get Home Safe', href: '#get-home-safe' },
          { label: 'Ways to Save', href: '#ways-to-save' },
          { label: 'Sports Programs for Fans', href: '#sports-programs' },
          { label: 'Safe Driving Benefits', href: '#safe-driving' },
        ],
      },
    ],
  },
  {
    key: 'claims',
    label: 'Claims',
    href: '#claims',
    listBlocks: [
      {
        title: 'Claims Center',
        items: [
          { label: 'Report a Claim', href: '#report-claim' },
          { label: 'Track a Claim', href: '#track-claim' },
        ],
      },
      {
        title: 'About the Claims Process',
        items: [
          { label: 'Claims Services', href: '#claims-services' },
          { label: 'Auto Claim Process', href: '#auto-claim-process' },
          { label: 'Home Claim Process', href: '#home-claim-process' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { label: 'Claims Forms', href: '#claims-forms' },
          { label: 'FAQs', href: '#faqs' },
          { label: 'Find a Repair Shop', href: '#repair-shop' },
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    href: '#resources',
    listBlocks: [
      {
        title: 'By Product',
        items: [
          { label: 'Auto Insurance', href: '#auto-insurance' },
          { label: 'Home Insurance', href: '#home-insurance' },
        ],
      },
      {
        title: 'By State',
        items: [
          { label: 'Connecticut', href: '#connecticut' },
          { label: 'Massachusetts', href: '#massachusetts' },
          { label: 'New Hampshire', href: '#new-hampshire' },
          { label: 'New Jersey', href: '#new-jersey' },
          { label: 'New York', href: '#new-york' },
          { label: 'Pennsylvania', href: '#pennsylvania' },
        ],
      },
    ],
  },
  {
    key: 'customer-service',
    label: 'Customer Service',
    href: '#customer-service',
    listBlocks: [
      {
        title: 'Account',
        items: [
          { label: 'Setup Autopay', href: '#setup-autopay' },
          { label: 'Get Replacement Insurance ID Cards', href: '#replacement-id-cards' },
          { label: 'Download our Mobile App', href: '#mobile-app' },
        ],
      },
      {
        title: 'Get Help',
        items: [
          { label: 'Contact Us', href: '#contact-us' },
          { label: 'Find an Agent', href: '#find-agent' },
          { label: 'Roadside Assistance', href: '#roadside-assistance' },
        ],
      },
    ],
  },
  {
    key: 'about-plymouth-rock',
    label: 'About Plymouth Rock',
    href: '#about-plymouth-rock',
    listBlocks: [
      {
        title: '',
        items: [
          { label: 'Who We Are', href: '#who-we-are' },
          { label: 'Recent Financials', href: '#recent-financials' },
          { label: 'Leadership Team', href: '#leadership-team' },
          { label: "Chairman's Letters", href: '#chairmans-letters' },
          { label: 'Newsroom', href: '#newsroom' },
        ],
      },
    ],
  },
  {
    key: 'agent',
    label: 'Agent',
    href: '#agent',
    listBlocks: [
      {
        title: '',
        items: [
          { label: 'Become an Agent', href: '#become-an-agent' },
          { label: 'Agent Web', href: '#agent-web' },
        ],
      },
    ],
  },
  {
    key: 'careers',
    label: 'Careers',
    href: '#careers',
    listBlocks: [],
  },
];
