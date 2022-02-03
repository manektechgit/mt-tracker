import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { Dynamicmenu } from '../_models/dynamicmenu';

@Injectable()
export class DynamicuserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // tslint:disable-next-line: no-shadowed-variable
  GetDynamicmenu(Dynamicmenu: Dynamicmenu) {
    return this.httpClient
      .post<ApiResponseModel>('DynamicMenu/getDynamicMenulist', Dynamicmenu)
      .pipe(
        map((Response) => {
          return Response;
        })
      );
  }
}
