import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPetsProfilePage } from './my-pets-profile';

import { TranslateModule } from '@ngx-translate/core';
import { SocialMediaFormModule } from '../../shared/forms/social-media/social-media-form.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [MyPetsProfilePage],
  imports: [
    IonicPageModule.forChild(MyPetsProfilePage),
    TranslateModule.forChild(),
    DirectivesModule,
    PipesModule,
    SocialMediaFormModule,
  ],
})
export class MyPetsProfilePageModule {}
