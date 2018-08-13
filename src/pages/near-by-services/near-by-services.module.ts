import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearByServicesPage } from './near-by-services';

@NgModule({
  declarations: [
    NearByServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(NearByServicesPage),
  ],
})
export class NearByServicesPageModule {}
