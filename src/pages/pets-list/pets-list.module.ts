import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetsListPage } from './pets-list';

@NgModule({
  declarations: [
    PetsListPage,
  ],
  imports: [
    IonicPageModule.forChild(PetsListPage),
  ],
})
export class PetsListPageModule {}
