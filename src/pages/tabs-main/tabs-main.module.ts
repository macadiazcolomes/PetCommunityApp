import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsMainPage } from './tabs-main';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TabsMainPage],
  imports: [IonicPageModule.forChild(TabsMainPage), TranslateModule.forChild()],
})
export class TabsMainPageModule {}
