/**
 * Type definitions for Playwright locators used in Page Object Models.
 *
 * Extend these types as you add more locators for different pages and shared UI elements.
 */
import { Locator } from '@playwright/test';

/**
 * Locators common to all feature pages.
 */
export type FeaturePageBaseLocatorsType = {
    /** Locator for the breadcrumbs navigation element. */
    breadcrumbs: Locator;
}

/**
 * Locators specific to the Home Page, extending the base feature page locators.
 */
export type HomePageLocatorsType = FeaturePageBaseLocatorsType & {}

