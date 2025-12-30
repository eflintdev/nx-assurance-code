import { Component, Prop, State, h, Fragment } from '@stencil/core';
import { SIDE_DRAWER_SECTIONS } from '@apps-shared/lib/constants';
import { SideDrawerSection } from '@apps-shared/lib/types';

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
   * Track which accordions are expanded (by section key)
   */
  @State() expandedSections: Record<string, boolean> = {};

  /**
   * Accordion sections with list blocks
   */
  @Prop() sections: SideDrawerSection[] = SIDE_DRAWER_SECTIONS;

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

  handleCloseClick = () => {
    this.isOpen = false;
  };

  toggleAccordion = (sectionKey: string) => {
    // Close all sections, then open only the clicked one
    const newExpandedSections: Record<string, boolean> = {};
    this.sections.forEach((section) => {
      newExpandedSections[section.key] = section.key === sectionKey && !this.expandedSections[sectionKey];
    });
    this.expandedSections = newExpandedSections;
  };

  render() {
    return (
      <Fragment>
        <div 
          class={`drawer-backdrop ${this.isOpen ? 'open' : ''}`}
          onClick={this.handleBackdropClick}
        ></div>
        <aside class={`side-drawer ${this.isOpen ? 'open' : ''}`}>
          <button 
            class="close-btn" 
            onClick={this.handleCloseClick}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <nav class="drawer-nav" aria-label="Side drawer">
            <ul class="drawer-menu">
              {this.sections?.length > 0 ? this.sections.map((section) => (
                <li key={section.key} class="accordion-item">
                  <div class={`accordion-trigger ${this.expandedSections[section.key] ? 'expanded' : ''}`}>
                    {section.icon && <span class="accordion-icon-prefix">{section.icon}</span>}
                    <a href={section.href || `#${section.key}`} class="accordion-label">{section.label}</a>
                    { section.listBlocks.length > 0 ? 
                    <button
                      class="accordion-toggle-btn"
                      onClick={() => this.toggleAccordion(section.key)}
                      aria-expanded={this.expandedSections[section.key]}
                      aria-controls={`${section.key}-submenu`}
                      aria-label={`Toggle ${section.label}`}
                    >
                      <span class="accordion-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                          <line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                      </span>
                    </button>
                     : '' }
                  </div>

                  {/* Accordion Content - delegates to custom-list */}
                  <div 
                    id={`${section.key}-submenu`}
                    class={`accordion-menu ${this.expandedSections[section.key] ? 'open' : ''}`}
                  >
                    <custom-list 
                      listBlocks={section.listBlocks}
                    ></custom-list>
                  </div>
                </li>
              )) : ''}
            </ul>
          </nav>
        </aside>
      </Fragment>
    );
  }
}

