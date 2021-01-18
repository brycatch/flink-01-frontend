import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.length > limit
      ? `${value.substring(0, limit).trim()}...`
      : value;
  }

}
