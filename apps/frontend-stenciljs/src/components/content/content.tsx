import { Component, h, Prop, Fragment } from '@stencil/core';
import { BreadcrumbItem } from '@apps-shared/lib/types';

/**
 * SiteContent Component
 *
 * Main content area component that displays page content with breadcrumb navigation and structured sections.
 *
 * Features:
 * - Breadcrumb navigation for page hierarchy
 * - Main content paragraphs section
 * - Quote/form slot for flexible content injection
 * - Bottom notes/disclaimer section
 *
 * @component
 * @example
 *   <site-content
 *     breadcrumbs={breadcrumbs}
 *     paragraphs={{ main: ['Paragraph 1', 'Paragraph 2'], bottom: ['Disclaimer'] }}>
 *     <quote-form></quote-form>
 *   </site-content>
 *
 * @prop {BreadcrumbItem[]} breadcrumbs - Array of breadcrumb items with label, href, and current status
 * @prop {Object} paragraphs - Content paragraphs object with main and bottom string arrays
 */
@Component({
  tag: 'site-content',
  styleUrl: 'content.scss',
  shadow: true
})
export class SiteContent {
  /**
   * Breadcrumb items for navigation
   */
  @Prop() breadcrumbs!: BreadcrumbItem[];

  /**
   * Content paragraphs
   */
  @Prop() paragraphs!: { main: string[], bottom: string[] };

  render() {
    return (
      <div class="main">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          {this.breadcrumbs?.length ? this.breadcrumbs.map((item, index) => (
            <Fragment>
              {item.current ? (
                <span>{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
              {index < this.breadcrumbs.length - 1 && (
                <span class="breadcrumbs-separator" aria-hidden="true">&gt;</span>
              )}
            </Fragment>
          )) : ''}
        </nav>
        <section class="content-section">
          <div class="content-body">
            {this.paragraphs?.main?.length ? this.paragraphs.main.map((p) => <p innerHTML={p}></p>) : ''}
          </div>
        </section>
        <section class="quote-section">
          <slot></slot>
        </section>
        <section class="subnotes-section">
          {this.paragraphs?.bottom?.length ? this.paragraphs.bottom.map((p) => <p innerHTML={p}></p>) : ''}
        </section>
      </div>
    );
  }
}
