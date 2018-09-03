import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPetsAlertListPage } from './my-pets-alert-list';

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [MyPetsAlertListPage],
  imports: [
    IonicPageModule.forChild(MyPetsAlertListPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class MyPetsAlertListPageModule {}
