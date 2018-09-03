import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesDetailPage } from './services-detail';

import { TranslateModule } from '@ngx-translate/core';
import { SocialMediaFormModule } from '../../shared/forms/social-media/social-media-form.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ServicesDetailPage],
  imports: [
    IonicPageModule.forChild(ServicesDetailPage),
    TranslateModule.forChild(),
    DirectivesModule,
    PipesModule,
    SocialMediaFormModule,
  ],
})
export class ServicesDetailPageModule {}
