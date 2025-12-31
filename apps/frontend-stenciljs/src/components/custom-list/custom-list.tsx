import { Component, Prop, h, Fragment } from '@stencil/core';

@Component({
  tag: 'custom-list',
  styleUrl: 'custom-list.scss',
  shadow: true
})
export class CustomList {
  /**
   * List blocks with title and items
   */
  @Prop() listBlocks: Array<{
    title: string;
    items: Array<{ label: string; href: string; icon?: string }>;
  }>;

  render() {
    return (
      <Fragment>
        {this.listBlocks?.length > 0 ? this.listBlocks.map((block, index) => (
          <div key={block.title || `block-${index}`} class="list-block">
            {block.title && <h3 class="list-block-title">{block.title}</h3>}
            <ul class="list-block-items">
              {block.items?.length > 0 ? block.items.map((item) => (
                <li key={item.label} class="list-item">
                  <a href={item.href} class="list-link">
                    {item.icon && <span class="list-icon">{item.icon}</span>}
                    <span class="list-label">{item.label}</span>
                  </a>
                </li>
              )) : ''}
            </ul>
          </div>
        )) : ''}
      </Fragment>
    );
  }
}
