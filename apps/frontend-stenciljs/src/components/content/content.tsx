/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';
import { BreadcrumbItem } from '@apps-shared';

/**
 * Site Content wrapper, extracted from index.html <main>.
 * Note: Custom element tags require a hyphen by spec. The tag used is
 * `site-content` while the component folder is named `content` per request.
 */
@Component({
  tag: 'site-content',
  styleUrl: 'content.scss',
  shadow: true,
})
export class SiteContent {
  /**
   * Breadcrumb items for navigation
   */
  @Prop() breadcrumbs!: BreadcrumbItem[];

  /**
   * Content paragraphs
   */
  @Prop() paragraphs!: string[];

  render() {
    return (
      <div class="main">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          {this.breadcrumbs.map((item, index) => (
            <>
              {item.current ? (
                <span>{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
              {index < this.breadcrumbs.length - 1 && (
                <span class="breadcrumbs-separator">&gt;</span>
              )}
            </>
          ))}
        </nav>
        <section class="content-section">
          <div class="content-body">
            {this.paragraphs.map((p) => <p>{p}</p>)}
          </div>
        </section>
        <section class="quote-section">
          <quote-form></quote-form>
        </section>
      </div>
    );
  }
}
