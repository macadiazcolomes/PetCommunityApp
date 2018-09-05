import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginProvider } from '../providers/login/login';
import { PetsProvider } from '../providers/pets/pets';
import { SocialMediaTypesProvider } from '../providers/social-media-types/social-media-types';
import { SpeciesTypesProvider } from '../providers/species-types/species-types';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { SocialMediaFormModule } from '../shared/forms/social-media/social-media-form.module';
import { SavedServicesProvider } from '../providers/services/saved';
import { SearchServicesProvider } from '../providers/services/search';
import { AlertTypesProvider } from '../providers/alert-types/alert-types';
import { PetAlertsProvider } from '../providers/pet-alerts/pet-alerts';
import { SosProvider } from '../providers/sos/sos';
import { UsersProvider } from '../providers/users/users';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    DirectivesModule,
    PipesModule,
    SocialMediaFormModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    PetsProvider,
    SocialMediaTypesProvider,
    SpeciesTypesProvider,
    SavedServicesProvider,
    SearchServicesProvider,
    AlertTypesProvider,
    PetAlertsProvider,
    SosProvider,
    UsersProvider,
  ],
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
