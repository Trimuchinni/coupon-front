import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoginComponent } from './app/login/login.component';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppRoutingModule } from './app/app-routing.module';
import { RouterModule } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
