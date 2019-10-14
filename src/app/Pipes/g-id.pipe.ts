import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gId'
})
export class GIdPipe implements PipeTransform {

  transform(value: any): any {
    var re = / /gi;
    var newstr = value.replace(re, "");
    return newstr;

  }

}
