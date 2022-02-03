import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterappsetting'
})
export class FilterappsettingPipe implements PipeTransform {

  transform(items: any, term: string): any {
    if (!items) { return []; }
    if (term === '') { return items; }
    return items.filter(it => {
      // return it.CompanyName.toLowerCase().includes(term.toLowerCase());
      return it.Parameter.toLowerCase().includes(term.toLowerCase()) ||
      it.ParameterValue.toLowerCase().includes(term.toLowerCase()) ||
      it.Category.toLowerCase().includes(term.toLowerCase()) ||
      it.Description.toLowerCase().includes(term.toLowerCase()) ;
    });
  }

}
