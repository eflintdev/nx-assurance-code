/**
 * Type definitions for Playwright test fixtures.
 *
 * Extend this interface as you add more page objects to your test suite.
 */
import { HomePage } from '../pom/home.view.pom';
import { SharedPage } from '../pom/shared.pom';

/**
 * Interface for Playwright test fixtures, providing page objects for use in tests.
 */
export interface AppFixtureType {
    /** Shared page object for common UI interactions. */
    sharedPage: SharedPage,
    /** Home page object for home page interactions. */
    homePage: HomePage,
}
