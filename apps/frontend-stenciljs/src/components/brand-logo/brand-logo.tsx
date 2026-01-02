import { Component, h, Fragment, Prop } from '@stencil/core';
import { getNavLogo, getFullSloganLogo } from '../../utils/header.utils';

/**
 * BrandLogo Component
 *
 * Displays brand/company logo in different variants based on the provided type.
 *
 * Supports two logo variants:
 * - nav-logo: Navigation bar logo variant
 * - full-slogan: Full logo with company slogan
 *
 * @component
 * @example
 *   <brand-logo type="nav-logo"></brand-logo>
 *   <brand-logo type="full-slogan"></brand-logo>
 *
 * @prop {string} type - Logo variant type: 'nav-logo' or 'full-slogan'
 */
@Component({
    tag: 'brand-logo',
    styleUrl: 'brand-logo.scss',
    shadow: true
})
export class BrandLogo {
    /**
     * Brand logo identifier or kind (type)
     */
    @Prop() type: string;

    render() {
        return (
            <Fragment>
                {this.type === 'nav-logo' ? getNavLogo() : ''}
                {this.type === 'full-slogan' ? getFullSloganLogo() : ''}
            </Fragment>
        );
    }
}
