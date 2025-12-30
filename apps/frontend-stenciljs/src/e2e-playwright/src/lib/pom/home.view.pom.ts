/**
 * Page Object Model for the Home Page.
 *
 * This class encapsulates interactions and navigation for the application's home page using Playwright.
 * Extend this class with additional methods to represent user actions and assertions for the home page.
 */
import { Page } from '@playwright/test';

// import { HomePageLocator, HomePageLocators } from '../locators/home.locators';

/**
 * Represents the Home Page and provides methods to interact with it.
 */
export class HomePage {
    readonly page: Page;
    // readonly locators: HomePageLocators;


    /**
     * Creates a new HomePage instance.
     * @param page Playwright Page object for browser interaction.
     */
    constructor(page: Page) {
        this.page = page;
        // this.locators = HomePageLocator(page);
    }

    /**
     * Navigates to the home page ('/').
     */
    async goto(): Promise<void> {
        await this.page.goto('/');
    }
}