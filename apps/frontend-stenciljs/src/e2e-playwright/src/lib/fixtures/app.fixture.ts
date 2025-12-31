/**
 * Playwright test fixture setup for E2E tests.
 *
 * This file defines and extends Playwright's test fixture to provide page objects for use in E2E test suites.
 * Add additional page objects to the fixture as your test coverage grows.
 */
import { test as base } from '@playwright/test';
import { AppFixtureType } from '../types/fixture.types';
import { HomePage } from '../pom/home.view.pom';
import { SharedPage } from '../pom/shared.pom';

/**
 * Extends the base Playwright test with custom fixtures for page objects.
 *
 * @example
 *   test('example', async ({ homePage, sharedPage }) => { ... })
 */
export const test = base.extend<AppFixtureType>({
    /**
     * Provides a SharedPage object for shared/common UI interactions.
     */
    sharedPage: async({ page }, use) => {
        const sharedPage = new SharedPage(page);
        await use(sharedPage);
    },
    /**
     * Provides a HomePage object for home page interactions.
     */
    homePage: async({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
    // Add additional page objects here as needed.
});
