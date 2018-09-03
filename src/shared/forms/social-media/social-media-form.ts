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

  invalid(name: string) {
    return (
      this.parent.get(`social_media.${name}`).status == 'INVALID' &&
      this.parent.get(`social_media.${name}`).dirty &&
      this.parent.get(`social_media.${name}`).touched
    );
  }

  /*
  public errorMessages: object;

  ngOnInit() {
    this.initErrorMessages();
  }

  initErrorMessages() {
    const erBase: string = 'SOCIAL_MEDIA.ERROR_MESSAGES.URL';
    this.socialMedia.forEach(sm => {
      this.errorMessages[sm.type] = [{ type: 'invalid', message: erBase }];
    });
  }*/
}
