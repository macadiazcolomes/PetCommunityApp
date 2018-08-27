import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';

import { TranslateModule } from '@ngx-translate/core';

import { SocialMediaFormModule } from '../../shared/forms/social-media/social-media-form.module';

@NgModule({
  declarations: [UserPage],
  imports: [
    IonicPageModule.forChild(UserPage),
    TranslateModule.forChild(),
    SocialMediaFormModule,
  ],
})
export class UserPageModule {}
