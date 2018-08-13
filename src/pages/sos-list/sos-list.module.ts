import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosListPage } from './sos-list';

@NgModule({
  declarations: [
    SosListPage,
  ],
  imports: [
    IonicPageModule.forChild(SosListPage),
  ],
})
export class SosListPageModule {}
