import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'custom-link',
  styleUrl: 'custom-link.scss',
  shadow: true,
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
