import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { MenuParameters } from 'src/app/_models/Menu-parameters';
import { MenuMaster } from '../_models/menu-master';

@Injectable()
export class MenuService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  GetRolesList(): any {
    return this.httpClient
      .get<ApiResponseModel>('Menu/getRoleslist')
      .pipe(map((res) => res));
  }

   // tslint:disable-next-line: no-shadowed-variable
   GetMenuList(MenuParameters: MenuParameters) {
    return this.httpClient
      .post<ApiResponseModel>('Menu/getMenulist', MenuParameters)
      .pipe(
        map((Response) => {
          return Response;
        })
      );
  }

// tslint:disable-next-line: no-shadowed-variable
ActiveDeactiveMenu(MenuMaster: MenuMaster) {
  return this.httpClient.post<ApiResponseModel>('Menu/activedeactivemenu', MenuMaster)
    .pipe(map(
      data => data
    ));
}


}
