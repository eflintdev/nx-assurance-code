// content.mock.ts
// Mock data for SiteContent component unit tests and all .toBe/.contains values

import { BreadcrumbItem } from '../types/index';

export const CONTENT_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Home', href: '/', current: false },
  { label: 'Insurance', href: '/insurance', current: false }
];

export const CONTENT_BREADCRUMBS_LAST_ITEM: BreadcrumbItem = { label: 'Auto Insurance', href: '/insurance/auto', current: true };


export const CONTENT_PARAGRAPHS: string[] = [
  'Welcome to our insurance services.',
  'We provide comprehensive coverage options.',
  'Get your quote today and save on premiums.',
];

export const CONTENT_SINGLE_BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/', current: true },
];

export const CONTENT_SINGLE_PARAGRAPH: string[] = ['Single paragraph text'];

export const CONTENT_EMPTY_BREADCRUMBS: BreadcrumbItem[] = [];
export const CONTENT_EMPTY_PARAGRAPHS: string[] = [];

export const CONTENT_BREADCRUMB_ARIA_LABEL = 'Breadcrumb';
export const CONTENT_BREADCRUMB_SEPARATOR_CLASS = 'breadcrumbs-separator';
export const CONTENT_BREADCRUMB_NAV_CLASS = 'breadcrumbs';
export const CONTENT_BREADCRUMB_LINKS_LENGTH = 2;
export const CONTENT_BREADCRUMB_SPAN_TEXT = 'Auto Insurance';
export const CONTENT_SECTION_CLASS = 'content-section';
export const CONTENT_SECTION_TAG = 'SECTION';
export const CONTENT_BODY_CLASS = 'content-body';
export const CONTENT_MAIN_CLASS = 'main';
export const CONTENT_MAIN_TAG = 'DIV';
export const CONTENT_QUOTE_SECTION_CLASS = 'quote-section';
export const CONTENT_UPDATED_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'New', href: '/new', current: true },
];
export const CONTENT_UPDATED_PARAGRAPHS: string[] = ['Updated paragraph'];
