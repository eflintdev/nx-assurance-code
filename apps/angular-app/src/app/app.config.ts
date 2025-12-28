import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { DIRECTIVES } from './components/custom/dist/angular-directives';
// import {
//   provideClientHydration,
//   withEventReplay,
// } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    ...DIRECTIVES
  ],
};
