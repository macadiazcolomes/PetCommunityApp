import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
/**
 * Generated class for the DisableControlDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[disableControl]', // Attribute selector
})
export class DisableControlDirective {
  @Input()
  set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor(private ngControl: NgControl) {}
}
