import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js optimization (optional but recommended)
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),

    // Router configuration with advanced features
    provideRouter(
      routes,
      withComponentInputBinding(), // Enables route parameter binding to component inputs
      withViewTransitions({       // Enables view transitions API animations
        skipInitialTransition: true
      })
    ),

    // HTTP Client configuration
    provideHttpClient(
      withFetch(), // Enables fetch API backend
      withJsonpSupport(), // For JSONP requests if needed
    ),

    // Client-side hydration and SSR optimization
    provideClientHydration(
      withEventReplay(), // Replays events after hydration
      withNoHttpTransferCache() // Disables HTTP transfer cache for SSR
    ),

    // Browser animations
    provideAnimations(),

    // Add other application-wide providers below
    // provideStore(), // If using NgRx
    // provideState(...), // For feature states
  ]
};