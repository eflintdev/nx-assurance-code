import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'search-modal',
  styleUrl: 'search-modal.scss',
  shadow: true,
})
export class SearchModal {
  /**
   * Whether modal is open
   */
  @State() isOpen = false;

  componentDidLoad() {
    // Listen for toggle events from app-header
    window.addEventListener('toggleSearchModal', this.handleToggle);
  }

  disconnectedCallback() {
    window.removeEventListener('toggleSearchModal', this.handleToggle);
  }

  handleToggle = () => {
    this.isOpen = !this.isOpen;
  };

  handleClose = () => {
    this.isOpen = false;
  };

  handleBackdropClick = () => {
    this.isOpen = false;
  };

  handleModalClick = (e: MouseEvent) => {
    // Prevent clicks inside modal from closing it
    e.stopPropagation();
  };

  render() {
    return (
      <div 
        class={`modal-backdrop ${this.isOpen ? 'open' : ''}`}
        onClick={this.handleBackdropClick}
      >
        <button 
            class="close-btn" 
            onClick={this.handleClose}
            aria-label="Close search modal"
          >
            &times;
          </button>
        <div 
          class="modal-content"
          onClick={this.handleModalClick}
        >
          
          <div class="modal-body">
            <search-bar></search-bar>
          </div>
        </div>
      </div>
    );
  }
}
