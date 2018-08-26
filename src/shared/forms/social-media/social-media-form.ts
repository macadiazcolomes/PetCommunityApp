import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SocialMedia } from '../../../models/social-media';

@Component({
  selector: 'social-media-form',
  templateUrl: 'social-media-form.html',
})
export class SocialMediaForm {
  @Input()
  parent: FormGroup;
  @Input()
  socialMedia: SocialMedia[];
}
