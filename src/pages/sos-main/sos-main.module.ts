import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosMainPage } from './sos-main';

@NgModule({
  declarations: [
    SosMainPage,
  ],
  imports: [
    IonicPageModule.forChild(SosMainPage),
  ],
})
export class SosMainPageModule {}
