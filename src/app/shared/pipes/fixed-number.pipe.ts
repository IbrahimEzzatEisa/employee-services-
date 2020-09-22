import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedNumber'
})
export class FixedNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return value.toFixed(args[0]);
  }

}
