import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cacheInterceptor } from 'ngx-smart-cache';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([cacheInterceptor]))
  ]
});