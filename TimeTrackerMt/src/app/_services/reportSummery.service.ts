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
export class ReportSummeryService {
  constructor(private httpClient: HttpClient, private router: Router) {}


  // tslint:disable-next-line: no-shadowed-variable
  GetDateList(ReportsParameters: ReportSummeryParameters): any {
    return this.httpClient
      .post<ApiResponseModel>('ReportSummery/getSummeryDatelist', ReportsParameters)
      .pipe(map((res) => res));
  }

  GetReportSummeryList(SummeryParameters: ReportSummeryParameters) {
    return this.httpClient
      .post<ApiResponseModel>('ReportSummery/GetReportSummeryList', SummeryParameters).pipe(map((Response) => {
          return Response;
        })
      );
  }
}
