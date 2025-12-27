import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'side-drawer',
  styleUrl: 'side-drawer.scss',
  shadow: true,
})
export class SideDrawer {
  /**
   * Whether drawer is open
   */
  @State() isOpen = false;

  /**
   * Menu items
   */
  @Prop() menuItems: Array<{ label: string; href: string; icon?: string }> = [
    { label: 'Auto Insurance', href: '#auto' },
    { label: 'Home Insurance', href: '#home' },
    { label: 'Motorcycle Insurance', href: '#motorcycle' },
    { label: 'Motorhome Insurance', href: '#motorhome' },
    { label: 'Boat Insurance', href: '#boat' },
    { label: 'Collector Car Insurance', href: '#collector' },
  ];

  componentDidLoad() {
    // Listen for toggle events from app-header
    window.addEventListener('toggleDrawer', this.handleToggle);
  }

  disconnectedCallback() {
    window.removeEventListener('toggleDrawer', this.handleToggle);
  }

  handleToggle = () => {
    this.isOpen = !this.isOpen;
  };

  handleBackdropClick = () => {
    this.isOpen = false;
  };

  render() {
    return (
      <>
        <div 
          class={`drawer-backdrop ${this.isOpen ? 'open' : ''}`}
          onClick={this.handleBackdropClick}
        ></div>
        <aside class={`side-drawer ${this.isOpen ? 'open' : ''}`}>
          <div class="drawer-header">
            <h2>Insurance Types</h2>
          </div>
          <nav class="drawer-nav">
            <ul class="drawer-menu">
              {this.menuItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} class="drawer-link">
                    {item.icon && <span class="drawer-icon">{item.icon}</span>}
                    <span class="drawer-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </>
    );
  }
}

