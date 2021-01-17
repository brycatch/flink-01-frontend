import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, withHours: boolean = false): string {
    return withHours
      ? format(new Date(value), 'dd/MM/yy HH:mm:ss')
      : format(new Date(value), 'dd/MM/yy');
  }

}
