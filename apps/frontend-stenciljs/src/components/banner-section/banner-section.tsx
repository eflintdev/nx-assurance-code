import { Component, Fragment, Prop, h } from '@stencil/core';
import { getBannerMobileWedgeOverlay } from '../../utils/header.utils';

/**
 * BannerSection Component
 *
 * Hero banner section that displays a prominent heading with responsive design.
 *
 * Features:
 * - Responsive desktop and mobile layouts
 * - Mobile wedge overlay for visual enhancement
 * - Customizable heading text
 *
 * @component
 * @example
 *   <banner-section heading="Welcome to Our Platform"></banner-section>
 *
 * @prop {string} heading - Banner heading text to display
 */
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
