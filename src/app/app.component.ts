import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private globalization: Globalization
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();
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
