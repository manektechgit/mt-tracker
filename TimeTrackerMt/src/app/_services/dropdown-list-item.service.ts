import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { DepartmentPagination } from 'src/app/_models/department-pagination';
import { Departmentmaster } from 'src/app/_models/departmentmaster';
import { ReportSummeryParameters } from '../_models/reportSummery-parameters';
@Injectable()
export class DropdownListItemService {
  constructor(private httpClient: HttpClient) {}

  //#region Post Method
  GetDepartmentpaginationDatalist(departmentPagination: DepartmentPagination) {
    return this.httpClient
      .post<ApiResponseModel>(
        'Department/getDepartmentpaginationDatalist',
        departmentPagination
      )
      .pipe(
        map((Response) => {
          return Response;
        })
      );
  }
  //#region Get Methods
  GetDepartmentList(CompanyId) {
    return this.httpClient.get<ApiResponseModel>(
      'Department/getDepartmentlist/' + CompanyId
    );
  }

  GetLoginRoleList(LoginRoleId) {
    return this.httpClient.get<ApiResponseModel>(
      'User/getLoginRoleList/' + LoginRoleId
    );
  }

  GetRoleList(): any {
    return this.httpClient
      .get<ApiResponseModel>('User/getRoleList')
      .pipe(map((res) => res));
  }

  GetUserList(CompanyId, DepartmentId) {
    return this.httpClient.get<ApiResponseModel>('User/GetUserList?CompanyId=' + CompanyId + '&DepartmentId=' + DepartmentId);

  }
  // GetUserList(CompanyId) {
  //   return this.httpClient.get<ApiResponseModel>(
  //     'User/GetUserList/' + CompanyId
  //   );
  // }
  GetReportingList(CompanyId) {
    return this.httpClient.get<ApiResponseModel>(
      'User/getReportinglist/' + CompanyId
    );
  }
  GetStatusList(): any {
    return this.httpClient
      .get<ApiResponseModel>('User/getStatusList')
      .pipe(map((res) => res));
  }
  GetScreenCastList(): any {
    return this.httpClient
      .get<ApiResponseModel>('User/getScreenCastlist')
      .pipe(map((res) => res));
  }
  GetDropdownList(category): any {
    return this.httpClient
      .get<ApiResponseModel>('User/getDropdownList?category=' + category)
      .pipe(map((res) => res));
  }
  GetProjectList(): any {
    return this.httpClient
      .get<ApiResponseModel>('Project/getProjectList')
      .pipe(map((res) => res));
  }
  GetCompanyList(): any {
    return this.httpClient
      .get<ApiResponseModel>('Company/GetCompanyList')
      .pipe(map((res) => res));
  }

  // tslint:disable-next-line: no-shadowed-variable
  SoftDeleteDepartment(Departmentmaster: Departmentmaster) {
    return this.httpClient.post<ApiResponseModel>('Department/softdeletedepartment', Departmentmaster)
      .pipe(map(
        data => data
      ));
  }
 // tslint:disable-next-line: no-shadowed-variable
 UserList(ReportsParameters: ReportSummeryParameters) {
    return this.httpClient
      .post<ApiResponseModel>('Reports/getUserlist', ReportsParameters)
      .pipe(
        map((Response) => {
          return Response;
        })
      );
  }

  GetProjectListByUser(UserId): any {
    return this.httpClient
      .get<ApiResponseModel>('Project/getProjectListByUser?UserId=' + UserId)
      .pipe(map((res) => res));
  }

  GetProjectsByCompanyAndDepartment(CompanyId, DepartmentList): any {
    return this.httpClient
      .get<ApiResponseModel>('Project/GetProjectsByCompanyAndDepartment?CompanyId=' + CompanyId + '&DepartmentList=' + DepartmentList)
      .pipe(map((res) => res));
  }

  GetTimeZoneList(): any {
    return this.httpClient
      .get<ApiResponseModel>('User/getTimeZonelist')
      .pipe(map((res) => res));
  }
}
