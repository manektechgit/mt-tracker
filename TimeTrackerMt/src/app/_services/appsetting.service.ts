import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { AppsettingPagination } from 'src/app/_models/appsetting-pagination';

@Injectable({
  providedIn: 'root'
})
export class AppsettingService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  GetAppSettingList(AppsettingPagination: AppsettingPagination) {
    return this.httpClient.post<ApiResponseModel>('AppSetting/getAppSettinglist', AppsettingPagination)
    .pipe(map(Response => {
     return Response;
   }
   )
 );
}

  AddAppSetting(data: any) {
    return this.httpClient.post<ApiResponseModel>('AppSetting/addAppSetting', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  UpdateAppSetting(data: any) {
    return this.httpClient.post<ApiResponseModel>('AppSetting/updateAppSetting', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }
}
