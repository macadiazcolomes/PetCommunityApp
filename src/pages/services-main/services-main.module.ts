import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesMainPage } from './services-main';

@NgModule({
  declarations: [
    ServicesMainPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesMainPage),
  ],
})
export class ServicesMainPageModule {}
