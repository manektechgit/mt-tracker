import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserScreenshot } from '../_models/UserScreenshot.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { ScreenShotRequest } from '../_models/screen-shot-request';
import { AttandanceLogModel } from '../_models/attandancelog.model';
import { ReportsParameters } from '../_models/reports-parameters';

@Injectable({
  providedIn: 'root'
})
export class AttandanceLogService {

  constructor(private httpClient: HttpClient) { }
  GetUserActivityLogs(LogParameters: ReportsParameters) {
    return this.httpClient.post<ApiResponseModel>('AttandanceLog/GetUserActivityLogs', LogParameters)
    .pipe(map(Response => {
     return Response;
   }));
  }
  InsertStarTimeLog(AttandanceLog: any) {
    return this.httpClient.post<ApiResponseModel>('AttandanceLog/InsertStartTimeLog', AttandanceLog)
      .pipe(map(
        data => data
      ));
  }
  GetLogDetails(): any {
    return this.httpClient.get<ApiResponseModel>('AttandanceLog/GetLogDetails')
      .pipe(map(data => data));
  }

  GetWorkingHours(CompanyId, UserId, Date) {
    return this.httpClient.get<ApiResponseModel>('AttandanceLog/GetWorkingHours?CompanyId=' + CompanyId + '&UserId=' + UserId + '&Date=' + Date);

  }
  // InsertEndTimeLog(LogId) {
  //   return this.httpClient.get<ApiResponseModel>('AttandanceLog/InsertEndTimeLog/' + LogId);
  // }
  // GetReportsList(LogParameters: AttandanceLogModel) {
  //   return this.httpClient.post<ApiResponseModel>('AttandanceLog/getAttandanceLogList', LogParameters)
  //   .pipe(map(
  //     data => data
  //   ));
  //  }

  InsertEndTimeLog(AttandanceLog: any) {
    return this.httpClient.post<ApiResponseModel>('AttandanceLog/InsertEndTimeLog', AttandanceLog)
    .pipe(map(
      data => data
    ));
  }

  AddStartTime(AttandanceLog: any) {
    return this.httpClient.post<ApiResponseModel>('AttandanceLog/AddStartTime', AttandanceLog)
    .pipe(map(
      data => data
    ));
  }
  OfflinneSync(AttandanceLog: any) {
    return this.httpClient.post<ApiResponseModel>('AttandanceLog/OfflinneSync', AttandanceLog)
    .pipe(map(
      data => data
    ));
  }

}
