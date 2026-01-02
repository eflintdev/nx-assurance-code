import { Component, Fragment, Prop, h } from '@stencil/core';
import { getBannerMobileWedgeOverlay } from '../../utils/header.utils';

@Component({
  tag: 'banner-section',
  styleUrl: 'banner-section.scss',
  shadow: true
})
export class BannerSection {
  /**
   * Banner heading text
   */
  @Prop() heading!: string;

  render() {
    return (
      <Fragment>
        <section class="banner-section">
          <div class="banner-container">
            <h1>{this.heading}</h1>
          </div>
        { getBannerMobileWedgeOverlay() }
        </section>
        <section class="banner-section__mobile">
          <div class="banner-container__mobile">
            <h1>{this.heading}</h1>
          </div>
        </section>
      </Fragment>
    );
  }
}
