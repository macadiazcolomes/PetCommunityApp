import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPetsMainPage } from './my-pets-main';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyPetsMainPage],
  imports: [
    IonicPageModule.forChild(MyPetsMainPage),
    TranslateModule.forChild(),
  ],
})
export class MyPetsMainPageModule {}
