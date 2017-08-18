import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Config } from "./app/app.config";
import { LocaleService } from "./app/services/locale.service";
if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic().bootstrapModule(AppModule);

Config.loadInstance('assets/config/config.json').then( () => LocaleService.loadInstance() ).then( () => { platformBrowserDynamic().bootstrapModule(AppModule); });
