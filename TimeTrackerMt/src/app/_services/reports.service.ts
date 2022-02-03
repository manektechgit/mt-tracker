import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { ReportsMaster } from '../_models/reports-master';
import { ReportsParameters } from 'src/app/_models/reports-parameters';
import { ReportSummeryParameters } from '../_models/reportSummery-parameters';
@Injectable()
export class ReportsService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  
  // tslint:disable-next-line: no-shadowed-variable
  GetReportsList(ReportsParameters: ReportsParameters) { 
    return this.httpClient
      .post<ApiResponseModel>('Reports/getReportsList', ReportsParameters).pipe(map((Response) => {
          return Response;
        })
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  GetProjectlist(ReportsParameters: ReportsParameters) {
    return this.httpClient
      .post<ApiResponseModel>('Reports/getProjectlist', ReportsParameters)
      .pipe(
        map((Response) => {
          return Response;
        })
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  GetDateList(ReportsParameters: ReportsParameters): any {
    return this.httpClient
      .post<ApiResponseModel>('Reports/getDatelist', ReportsParameters)
      .pipe(map((res) => res));
  }
 
}
