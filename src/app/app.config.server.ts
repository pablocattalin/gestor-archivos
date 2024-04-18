import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes'
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { effects } from './stores/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

const serverConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideStoreDevtools(),
    provideEffects(effects)]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
