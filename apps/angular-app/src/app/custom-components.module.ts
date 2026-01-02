import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppFooter, AppHeader, SearchBar, SearchModal, SideDrawer, SiteContent, BrandLogo } from './components/custom/dist/angular-components';

@NgModule({
  declarations: [AppFooter, AppHeader, SearchBar, SearchModal, SideDrawer, SiteContent, BrandLogo],
  exports: [AppFooter, AppHeader, SearchBar, SearchModal, SideDrawer, SiteContent, BrandLogo],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentsModule {}
