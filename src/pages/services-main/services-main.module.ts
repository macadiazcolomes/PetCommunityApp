import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesMainPage } from './services-main';

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ServicesMainPage],
  imports: [
    IonicPageModule.forChild(ServicesMainPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class ServicesMainPageModule {}
