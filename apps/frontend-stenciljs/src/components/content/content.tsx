import { Component, h, State } from '@stencil/core';

/**
 * Site Content wrapper, extracted from index.html <main>.
 * Note: Custom element tags require a hyphen by spec. The tag used is
 * `site-content` while the component folder is named `content` per request.
 */
@Component({
  tag: 'site-content',
  styleUrl: 'content.css',
  shadow: true,
})
export class SiteContent {
  @State() paragraphs: string[] = [];

  componentWillLoad() {
    // Seed with the same paragraphs previously injected via DOMContentLoaded
    this.paragraphs = [
      'Think about all of the valuables that are stored within your motorhome. It is an unfortunate fact that these items can be compromised in the event of theft, vandalism, or even a power outage. Plymouth Rock Assurance can protect your stored possessions with motorhome insurance in New Jersey.',
      'In addition to insuring your RV, we offer other types of insurance in New Jersey through our agent relationships and partnerships.  You can protect the important assets in your life with insurance for your automobile, home, motorcycle, collector car, boat, and more.'
    ];
  }

  render() {
    return (
      <div class="main">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#">Home</a>
          <span class="breadcrumbs-separator">&gt;</span>
          <a href="#">Insurance</a>
          <span class="breadcrumbs-separator">&gt;</span>
          <span>New Jersey Motor Home Insurance Coverage</span>
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
