import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appToUpperCase]'
  })
export class ToUpperCaseDirective {
    constructor() {}

    @HostListener('input', ['$event']) onKeyUp(event) {
      event.target['value'] = event.target['value'].toUpperCase();
    }
}
