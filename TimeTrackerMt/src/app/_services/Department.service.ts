import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';


@Injectable()
export class DepartmentService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  AddDepartment(data: any) {
    data.DepartmentId = 0;
    data.CompanyId = Number(data.CompanyId);
    // data.StatusId = Number(data.StatusId);
    console.log(data)
    return this.httpClient.post<ApiResponseModel>('Department/addDepartment', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  UpdateDepartment(data: any) {
    data.DepartmentId = Number(data.DepartmentId);
    data.CompanyId = Number(data.CompanyId);
    data.StatusId = Number(data.StatusId);
    console.log(data)
    return this.httpClient.post<ApiResponseModel>('Department/updateDepartment', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

}
