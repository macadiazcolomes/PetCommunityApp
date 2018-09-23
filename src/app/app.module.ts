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
import { SosStatusProvider } from '../providers/sos-status/sos-status';
import { SosMessagesProvider } from '../providers/sos-messages/sos-messages';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicStorageModule, Storage } from '@ionic/storage';
import {
  MONGODB_URL_BASE,
  LOGIN_TOKEN_STORAGE_VAR,
  SOCKET_URL,
} from '../providers/config';
import { GeneralUtilitiesProvider } from '../providers/general-utilities/general-utilities';

import { Globalization } from '@ionic-native/globalization';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from '@ionic-native/camera';
import { LocationProvider } from '../providers/location/location';
import { CameraProvider } from '../providers/camera/camera';
import { DateFormatProvider } from '../providers/date-format/date-format';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { OneSignal } from '@ionic-native/onesignal';

const config: SocketIoConfig = {
  url: SOCKET_URL,
  options: {},
};

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
    SocketIoModule.forRoot(config),
    DirectivesModule,
    PipesModule,
    SocialMediaFormModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      },
    }),
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
    SosStatusProvider,
    SosMessagesProvider,
    GeneralUtilitiesProvider,
    Globalization,
    NativeGeocoder,
    Geolocation,
    AndroidPermissions,
    Camera,
    LocationProvider,
    CameraProvider,
    DateFormatProvider,
    OneSignal,
  ],
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    location.origin + '/assets/i18n/',
    '.json'
  );
}

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get(LOGIN_TOKEN_STORAGE_VAR);
    },
    whitelistedDomains: [MONGODB_URL_BASE],
    blacklistedRoutes: [
      MONGODB_URL_BASE + '/pca/sessions/',
      MONGODB_URL_BASE + '/pca/users/',
      MONGODB_URL_BASE + '/pca/forgot/',
    ],
  };
}
