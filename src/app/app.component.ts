import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LoginProvider } from '../providers/login/login';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any;

  constructor(
    private login: LoginProvider,
    public modalCtrl: ModalController,
    private localNotifications: LocalNotifications,
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

      this.localNotifications.on('click', (notification, state) => {
        let data = JSON.parse(notification.data);
        console.log('notification clicked', data, data.type, state);

        if (data.type === 'alert') {
          console.log('is an alert notification');
          this.rootPage = 'MenuPage';
          setTimeout(() => {
            let dlg = this.modalCtrl.create('MyPetsAlertDetailPage', {
              mode: 'view',
              alert: data.alert,
              pet: data.pet,
            });
            dlg.present();
          }, 0);
        }
      });

      //splashScreen.hide();
    });
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
