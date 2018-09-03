import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPetsAlertDetailPage } from './my-pets-alert-detail';

@NgModule({
  declarations: [
    MyPetsAlertDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPetsAlertDetailPage),
  ],
})
export class MyPetsAlertDetailPageModule {}
