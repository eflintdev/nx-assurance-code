import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.scss',
  shadow: true,
})
export class SearchBar {
  /**
   * Search input value
   */
  @State() searchValue = '';

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    // Handle search submission
    console.log('Search submitted:', this.searchValue);
  };

  render() {
    return (
      <form class="search-form" onSubmit={this.handleSubmit}>
        <div class="search-group">
          <input
            type="text"
            class="search-input"
            placeholder="What can we help you find"
            value={this.searchValue}
            onInput={this.handleInput}
          />
          <button type="submit" class="search-submit-btn" aria-label="Submit search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </form>
    );
  }
}
