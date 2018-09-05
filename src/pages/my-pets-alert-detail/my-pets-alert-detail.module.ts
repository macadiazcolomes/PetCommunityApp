import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPetsAlertDetailPage } from './my-pets-alert-detail';

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [MyPetsAlertDetailPage],
  imports: [
    IonicPageModule.forChild(MyPetsAlertDetailPage),
    TranslateModule.forChild(),
    PipesModule,
    DirectivesModule,
  ],
})
export class MyPetsAlertDetailPageModule {}
