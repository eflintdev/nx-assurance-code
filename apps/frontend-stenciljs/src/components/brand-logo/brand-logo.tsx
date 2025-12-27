import { Component, h, Fragment, Prop } from '@stencil/core';
import { getNavLogo, getFullSloganLogo } from '../../utils/header.utils';

@Component({
    tag: 'brand-logo',
    styleUrl: 'brand-logo.scss',
    shadow: true,
})
export class BrandLogo {
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
