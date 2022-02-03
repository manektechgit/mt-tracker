import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashPipe'
})
export class DashPipe implements PipeTransform {
   transform(value: string, defaultValue?: string): string {
    return (value) ? value : (defaultValue !== undefined ? defaultValue : '-');
  }
}
