import { NgModule } from '@angular/core';
import { SocialMediaForm } from './social-media-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [SocialMediaForm],
  imports: [FormsModule, ReactiveFormsModule, IonicModule],
  exports: [SocialMediaForm],
})
export class SocialMediaFormModule {}
