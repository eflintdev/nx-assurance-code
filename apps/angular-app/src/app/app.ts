import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomComponentsModule } from './custom-components.module';
import {
  BRAND_NAME,
  HEADER_PHONE,
  HEADER_LINKS,
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
  CONTENT_PARAGRAPHS,
  BANNER_HEADING
} from '../../../../apps-shared/src/lib/constants/index';
// } from '@apps-shared/lib/constants';

@Component({
  standalone: true,
  imports: [/*NxWelcome,*/ RouterModule, CustomComponentsModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected title = 'angular-app';

  protected bannerHeading = BANNER_HEADING;
  protected brandName = BRAND_NAME;
  protected headerPhone = HEADER_PHONE;
  protected headerLinks = HEADER_LINKS;
  protected companyName = COMPANY_NAME;
  protected footerPhone = FOOTER_PHONE;
  protected footerLinks = FOOTER_LINKS;
  protected socialLinks = SOCIAL_LINKS;
  protected sideDrawerSections = SIDE_DRAWER_SECTIONS;
  protected formTitle = FORM_TITLE;
  protected formIntro = FORM_INTRO;
  protected requiredLabel = REQUIRED_LABEL;
  protected consentParagraphs = CONSENT_PARAGRAPHS;
  protected stateOptions = STATE_OPTIONS;
  protected zipPattern = ZIP_PATTERN;
  protected phonePattern = PHONE_PATTERN;
  protected breadcrumbs = BREADCRUMBS;
  protected contentParagraphs = CONTENT_PARAGRAPHS;
}
