// custom-list.mock.ts
// Mock data for CustomList component unit tests and all .toBe/.contains values

export const CUSTOM_LIST_BLOCKS = [
  {
    title: 'Resources',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Support', href: '/support', icon: '\u260e' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: '',
    items: [
      { label: 'No Title Item', href: '/no-title' },
    ],
  },
];

export const CUSTOM_LIST_NEW_BLOCKS = [
  { title: 'New', items: [{ label: 'Contact', href: '/contact' }] },
];

export const CUSTOM_LIST_BLOCK_CLASS = 'list-block';
export const CUSTOM_LIST_BLOCK_TITLE_CLASS = 'list-block-title';
export const CUSTOM_LIST_ITEM_CLASS = 'list-item';
export const CUSTOM_LIST_LINK_CLASS = 'list-link';
export const CUSTOM_LIST_LABEL_CLASS = 'list-label';
export const CUSTOM_LIST_ICON_CLASS = 'list-icon';
