import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { ReportsMaster } from '../_models/reports-master';
import { ReportsParameters } from 'src/app/_models/reports-parameters';
import { UserReportsParameters } from '../_models/UserReports-parameters';
@Injectable()
export class UserReportsService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  
  GetUserReportsList(UserReportsParameters: UserReportsParameters) {     
    return this.httpClient
      .post<ApiResponseModel>('UserReport/getUserReportsList', UserReportsParameters).pipe(map((Response) => {
          return Response;
        })
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  GetUserDetailslist(UserReportsParameters: UserReportsParameters): any {
    return this.httpClient
      .post<ApiResponseModel>('UserReport/getUserlist', UserReportsParameters)
      .pipe(map((res) => res));
  }
 
  GetUserReportDetail(UserReportsParameters: UserReportsParameters) {  
     
    return this.httpClient
      .post<ApiResponseModel>('UserReport/getUserReportDetail', UserReportsParameters).pipe(map((Response) => {
          return Response;
        })
      );
  }

}
