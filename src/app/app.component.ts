import { Component } from '@angular/core';
import { Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { LoginProvider } from '../providers/login/login';
import { OneSignal } from '@ionic-native/onesignal';
import { ONE_SIGNAL_APP_ID, FIREBASE_SENDER_ID } from '../providers/config';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any;

  constructor(
    private alertCtrl: AlertController,
    private oneSignal: OneSignal,
    private login: LoginProvider,
    public modalCtrl: ModalController,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private globalization: Globalization
  ) {
    this.login
      .isLoggedIn()
      .then(value => {
        if (value) {
          this.rootPage = 'MenuPage';
        } else {
          this.rootPage = 'LoginPage';
        }
        splashScreen.hide();
      })
      .catch(err => {
        console.log('app component init isLoggedIn error', err);
        this.rootPage = 'LoginPage';
        splashScreen.hide();
      });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      this.initTranslate();

      console.log('PLATFORM', platform);
      if (platform.is('cordova')) {
        this.setupPush();
      }

      //splashScreen.hide();
    });
  }

  setupPush() {
    this.oneSignal.startInit(ONE_SIGNAL_APP_ID, FIREBASE_SENDER_ID);

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      console.log('We received a push: ', data);
    });
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log('We opened a push: ', data);
      //TODO... actions dependind on push data...
      let additionalData = data.notification.payload.additionalData;
      if (additionalData.action === 'open') {
        this.rootPage = 'MenuPage';
        setTimeout(() => {
          let dlg = this.modalCtrl.create(
            additionalData.page,
            additionalData.params
          );
          dlg.present();
        }, 0);
      }
    });
    this.oneSignal.endInit();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    //TODO: get default lang from globalization module
    this.translate.setDefaultLang('en');

    this.globalization
      .getPreferredLanguage()
      .then(result => {
        var language = this.getSuitableLanguage(result.value);
        this.translate.use(language);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        this.translate.use('en');
      });
  }

  getSuitableLanguage(language: string): string {
    var langList: Array<string> = ['en', 'es'];
    language = language.substring(0, 2).toLowerCase();

    if (langList.indexOf('es') > -1) {
      return language;
    } else {
      return 'en';
    }
  }
}
