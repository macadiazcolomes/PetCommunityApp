import { NgModule } from '@angular/core';
import { SocialMediaForm } from './social-media-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SocialMediaForm],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [SocialMediaForm],
})
export class SocialMediaFormModule {}
