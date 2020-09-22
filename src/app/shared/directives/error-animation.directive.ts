import { Component, HostBinding } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: '[fadeInAnimation]',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translateY(-100%)' }),
        animate('0.3s ease-in-out', style({ opacity: '1', transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `<ng-content></ng-content>`,
})
export class ErrorAniamtionDirective {
  @HostBinding('@fadeIn') trigger = '';

}