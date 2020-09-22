import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArDigit'
})
export class ConvertArDigitToEnPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    //  let str = (value).toLocaleString('ar-EG',{minimumFractionDigits: 0, maximumFractionDigits: 0 ,}).toString(); ;
    let str = (Number(value)).toLocaleString('ar-EG', { useGrouping: false })
    return str
  }

}
