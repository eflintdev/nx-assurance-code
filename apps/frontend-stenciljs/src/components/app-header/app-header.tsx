import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
  shadow: true,
})
export class AppHeader {
  /**
   * Company name/logo
   */
  @Prop() brandName = 'Plymouth Rock';

  /**
   * Phone number
   */
  @Prop() phone = '844-242-3555';

  handleMenuToggle = () => {
    // Dispatch custom event for side drawer to listen to
    window.dispatchEvent(new CustomEvent('toggleDrawer'));
  };

  render() {
    return (
      <header class="app-header">
        <div class="header-container">
          <div class="header-left">
            <button class="menu-toggle" onClick={this.handleMenuToggle} aria-label="Toggle menu">
              <span class="menu-toggle-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M0 64C0 46.3 14.3 32 32 32H416C433.7 32 448 46.3 448 64C448 81.7 433.7 96 416 96H32C14.3 96 0 81.7 0 64zM0 256C0 238.3 14.3 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.3 288 0 273.7 0 256zM416 480H32C14.3 480 0 465.7 0 448C0 430.3 14.3 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z" />
                </svg>
              </span>
            </button>
            <a href="#" class="brand-logo" aria-label={this.brandName}>
              <brand-logo type="nav-logo"></brand-logo>
            </a>
          </div>

          <div class="header-right">
            <button class="search-btn" aria-label="Search">
              <span class="search-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="white">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </span>
            </button>
            <a href={`tel:${this.phone}`} class="phone-link">
              {this.phone}
            </a>
            <a href="#" class="login-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="currentColor" class="login-icon"><path d="M10.5 5C10.5 3.9375 9.90625 2.96875 9 2.40625C8.0625 1.875 6.90625 1.875 6 2.40625C5.0625 2.96875 4.5 3.9375 4.5 5C4.5 6.09375 5.0625 7.0625 6 7.625C6.90625 8.15625 8.0625 8.15625 9 7.625C9.90625 7.0625 10.5 6.09375 10.5 5ZM3.5 5C3.5 3.59375 4.25 2.28125 5.5 1.5625C6.71875 0.84375 8.25 0.84375 9.5 1.5625C10.7188 2.28125 11.5 3.59375 11.5 5C11.5 6.4375 10.7188 7.75 9.5 8.46875C8.25 9.1875 6.71875 9.1875 5.5 8.46875C4.25 7.75 3.5 6.4375 3.5 5ZM1.5 16H13.5C13.4375 13.5312 11.4062 11.5 8.90625 11.5H6.0625C3.5625 11.5 1.53125 13.5312 1.5 16ZM0.5 16.0938C0.5 13 2.96875 10.5 6.0625 10.5H8.90625C12 10.5 14.5 13 14.5 16.0938C14.5 16.5938 14.0625 17 13.5625 17H1.40625C0.90625 17 0.5 16.5938 0.5 16.0938Z"></path></svg>
              Log in
            </a>
          </div>
        </div>
      </header>
    );
  }
}
