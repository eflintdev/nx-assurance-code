import { Component, Prop, h } from '@stencil/core';

/**
 * CustomLink Component
 *
 * A custom link component.
 *
 * @prop {string} label - Required. The display text for the link.
 * @prop {string} href - Required. The URL destination for the link.
 * @prop {('footer-top' | 'footer-bottom')} variant
 *   - Style variant for the link styling context
 *   - 'footer-top' (default): Used in the top footer section with navigation links
 *   - 'footer-bottom': Used in the bottom footer section for legal/policy links
 *   - Controls which CSS class is applied (custom-link--footer-top or custom-link--footer-bottom)
 */
@Component({
  tag: 'custom-link',
  styleUrl: 'custom-link.scss',
  shadow: true
})
export class CustomLink {
  /**
   * Link text
   */
  @Prop() label!: string;

  /**
   * Link URL
   */
  @Prop() href!: string;

  /**
   * Style variant: 'footer-top' (default) or 'footer-bottom'
   */
  @Prop() variant: 'footer-top' | 'footer-bottom' = 'footer-top';

  render() {
    return (
      <a href={this.href} class={`custom-link custom-link--${this.variant}`}>
        {this.label}
      </a>
    );
  }
}
