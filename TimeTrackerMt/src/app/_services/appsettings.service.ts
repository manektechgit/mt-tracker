import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { AppsettingsMaster } from 'src/app/_models/appsettings-master';
import { AppsettingsPagination } from 'src/app/_models/appsettings-pagination';
@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  // GetAppSettingsList(companyId: number): any {
  //   return this.httpClient.get<ApiResponseModel>('AppSettings/getAppSettingslist/' + companyId)
  //     .pipe(map(res => res));
  // }

  // tslint:disable-next-line: no-shadowed-variable
  GetAppSettingsList(AppsettingsPagination: AppsettingsPagination) {
    return this.httpClient.post<ApiResponseModel>('AppSettings/getAppSettingslist', AppsettingsPagination)
    .pipe(map(Response => {
     return Response;
   }
   )
 );
}



  UpdateAppSettings(data: any) {
    return this.httpClient.post<ApiResponseModel>('AppSettings/updateAppSettings', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  AppSettingsType(AppsettingsMaster: AppsettingsMaster) {
    return this.httpClient
      .post<ApiResponseModel>('Appsettings/appSettingsType', AppsettingsMaster)
      .pipe(map((data) => data));
  }

  // tslint:disable-next-line: no-shadowed-variable
  AppSettingsKey(Parameterkey: string, companyId: number) {
    return this.httpClient
      .get<ApiResponseModel>('Appsettings/appSettingsbykey/' + Parameterkey + '/' + companyId)
      .pipe(map((data) => data));
  }
}
