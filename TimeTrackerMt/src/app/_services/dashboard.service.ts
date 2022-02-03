import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponseModel } from '../_models/api-response.model';

@Injectable()
export class DashboardService {

  constructor(
    private httpClient: HttpClient) { }
    GetUserDashboardData(dashboardPagination: any) {
      return this.httpClient
        .post<ApiResponseModel>(
          'user/GetUserDashboardControl',
          dashboardPagination
        )
        .pipe(
          map((Response) => {
            return Response;
          })
        );
    }

GetUserWorkingHours(UserWorkingHoursRequest: any) {
    return this.httpClient
      .post<ApiResponseModel>('user/getUserWorkingHours', UserWorkingHoursRequest).pipe(map((Response) => {
          return Response;
        })
      );
  }

}
