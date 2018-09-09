import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosMessagesPage } from './sos-messages';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SosMessagesPage],
  imports: [
    IonicPageModule.forChild(SosMessagesPage),
    TranslateModule.forChild(),
  ],
})
export class SosMessagesPageModule {}
