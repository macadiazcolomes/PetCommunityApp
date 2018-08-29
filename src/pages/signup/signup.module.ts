import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

import { TranslateModule } from '@ngx-translate/core';

import { SocialMediaFormModule } from '../../shared/forms/social-media/social-media-form.module';

@NgModule({
  declarations: [SignupPage],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild(),
    SocialMediaFormModule,
  ],
})
export class SignupPageModule {}
