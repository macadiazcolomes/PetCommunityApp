import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';

import { TranslateModule } from '@ngx-translate/core';

import { SocialMediaForm } from '../../shared/forms/social-media/social-media-form';

@NgModule({
  declarations: [UserPage, SocialMediaForm],
  imports: [IonicPageModule.forChild(UserPage), TranslateModule.forChild()],
  exports: [SocialMediaForm],
})
export class UserPageModule {}
