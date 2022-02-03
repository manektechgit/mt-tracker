import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { AttendencehourPagination } from 'src/app/_models/attendencehour-pagination';
import { AttendencehourMaster } from 'src/app/_models/attendencehour-master';

@Injectable({
  providedIn: 'root'
})
export class AttendencehourService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }


  // tslint:disable-next-line: no-shadowed-variable
  GetAttendencehourList(AttendencehourPagination: AttendencehourPagination) {
    console.log(AttendencehourPagination)
    return this.httpClient.post<ApiResponseModel>('AttendenceHour/getAttendenceHourlist', AttendencehourPagination)
    .pipe(map(Response => {
     return Response;
   }
   )
 );
}



  UpdateAttendencehour(data: any) {
    return this.httpClient.post<ApiResponseModel>('AttendenceHour/updateAttendenceHour', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }


  AddAttendencehour(data: any) {
    console.log('A',data)
    return this.httpClient.post<ApiResponseModel>('AttendenceHour/addAttendenceHour', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  ActiveDeactiveAttendence(AttendencehourMaster: AttendencehourMaster) {
    return this.httpClient.post<ApiResponseModel>('AttendenceHour/activedeactiveAttendencehour', AttendencehourMaster)
      .pipe(map(
        data => data
      ));
  }


}
