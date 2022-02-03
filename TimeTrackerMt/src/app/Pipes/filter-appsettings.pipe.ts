import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterappsettings'
})
export class FilterappsettingsPipe implements PipeTransform {

  transform(items: any, term: string): any {
    if (!items) { return []; }
    if (term === '') { return items; }
    return items.filter(it => {
      // return it.CompanyName.toLowerCase().includes(term.toLowerCase());
      return it.Key.toLowerCase().includes(term.toLowerCase()) ||
      it.Value.toLowerCase().includes(term.toLowerCase()) ||
      it.Type.toLowerCase().includes(term.toLowerCase()) ||
      it.Description.toLowerCase().includes(term.toLowerCase()) ;
    });
  }

}
