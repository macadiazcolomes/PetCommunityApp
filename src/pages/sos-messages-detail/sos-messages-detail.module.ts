import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosMessagesDetailPage } from './sos-messages-detail';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SosMessagesDetailPage],
  imports: [
    IonicPageModule.forChild(SosMessagesDetailPage),
    TranslateModule.forChild(),
  ],
})
export class SosMessagesDetailPageModule {}
