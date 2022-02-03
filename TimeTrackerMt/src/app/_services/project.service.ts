import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { PaginationModel } from '../_models/pagination.model';
import { ProjectModel } from '../_models/project.model';

@Injectable()
export class ProjectService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }


    GetProjectDatalist(paginationModel: PaginationModel) {
      return this.httpClient.post<ApiResponseModel>('Project/ProjectDataTableList', paginationModel)
        .pipe(map(
          data => data
        ));
    }


  InsertProject(data: any) {
       return this.httpClient.post<ApiResponseModel>('Project/InsertProject', data).pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  UpdateProject(projectModel: ProjectModel) {
    return this.httpClient.post<ApiResponseModel>('Project/updateProjectDetail', projectModel)
      .pipe(map(
        data => data
      ));
  }

  GetProjectDropDownList(CompanyId, DepartmentId) {
    return this.httpClient.get<ApiResponseModel>('Project/GetProjectDropDownList?CompanyId=' + CompanyId + '&DepartmentId=' + DepartmentId);

  }
  GetProjectDropDownListByUserId(UserId) {
    return this.httpClient.get<ApiResponseModel>('Project/GetProjectDropDownListByUserId?UserId=' + UserId);

  }
  GetUserProjects(UserId) {
    return this.httpClient.get<ApiResponseModel>('UserProjects/GetUserProjects/' + UserId );

  }
  GetUserProjectswithStatus(UserId) {
    return this.httpClient.get<ApiResponseModel>('UserProjects/GetUserProjectswithStatus/' + UserId );

  }

  GetProjectUsers(ProjectId) {
    return this.httpClient.get<ApiResponseModel>('UserProjects/GetProjectUsers/' + ProjectId );

  }

  GetUserProjectTasks(ProjectId) {
    return this.httpClient.get<ApiResponseModel>('UserProjects/GetUserProjectTasks/' + ProjectId );
  }

   // tslint:disable-next-line: no-shadowed-variable
   SoftDeleteProject(projectModel: ProjectModel) {
    return this.httpClient.post<ApiResponseModel>('Project/softdeleteproject', projectModel)
      .pipe(map(
        data => data
      ));
  }

  DeleteProjectUsers(Id) {
    return this.httpClient.get<ApiResponseModel>('UserProjects/DeleteProjectUsers/' + Id );

  }
 

}
