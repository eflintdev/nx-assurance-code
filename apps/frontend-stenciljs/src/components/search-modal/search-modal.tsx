import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'search-modal',
  styleUrl: 'search-modal.scss',
  shadow: true
})
export class SearchModal {
  /**
   * Whether modal is open
   */
  @State() isOpen = false;

  /**
   * Lifecycle method called after component is loaded.
   */
  componentDidLoad() {
    // Listen for toggle events from app-header
    window.addEventListener('toggleSearchModal', this.handleToggle);
  }

  /**
   * Lifecycle method called when component is removed.
   * Removes event listener for search modal toggle.
   */
  disconnectedCallback() {
    window.removeEventListener('toggleSearchModal', this.handleToggle);
  }

  /**
   * Toggles the modal open/closed state.
   */
  handleToggle = () => {
    this.isOpen = !this.isOpen;
  };

  /**
   * Handles click on the close button to close the modal.
   */
  handleClose = () => {
    this.isOpen = false;
  };

  /**
   * Handles click on the backdrop to close the modal.
   */
  handleBackdropClick = () => {
    this.isOpen = false;
  };

  /**
   * Handles click inside the modal content to prevent closing.
   * @param e Mouse event
   */
  handleModalClick = (e: MouseEvent) => {
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
            <div class="modal-search__info">
              <h2 class="modal-search__title">Search</h2>
              <p class="modal-search__description">Find answers quickly for claims, billing, and more.</p>
            </div>
            <search-bar></search-bar>
          </div>
        </div>
      </div>
    );
  }
}
