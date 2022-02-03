import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { PaginationModel } from '../_models/pagination.model';
import { TaskModel } from '../_models/task.model';

@Injectable()
export class TaskService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }


    GetTaskDatalist(paginationModel: PaginationModel) {
      return this.httpClient.post<ApiResponseModel>('Task/TaskDataTableList', paginationModel)
        .pipe(map(
          data => data
        ));
    }


  InsertTask(data: any) {
       return this.httpClient.post<ApiResponseModel>('Task/InsertTask', data).pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  UpdateTask(taskModel: TaskModel) {
    return this.httpClient.post<ApiResponseModel>('Task/updateTaskDetail', taskModel)
      .pipe(map(
        data => data
      ));
  }

  GetTaskDropDownList(CompanyId, DepartmentId) {
    return this.httpClient.get<ApiResponseModel>('Task/GetTaskDropDownList?CompanyId=' + CompanyId + '&DepartmentId=' + DepartmentId);

  }
  GetUserTasks(UserId) {
    return this.httpClient.get<ApiResponseModel>('UserTasks/GetUserTasks/' + UserId );

  }
  GetUserTaskswithStatus(UserId) {
    return this.httpClient.get<ApiResponseModel>('UserTasks/GetUserTaskswithStatus/' + UserId );

  }

  GetTaskUsers(TaskId) {
    return this.httpClient.get<ApiResponseModel>('UserTasks/GetTaskUsers/' + TaskId );

  }


   // tslint:disable-next-line: no-shadowed-variable
   SoftDeleteTask(taskModel: TaskModel) {
    return this.httpClient.post<ApiResponseModel>('Task/softdeletetask', taskModel)
      .pipe(map(
        data => data
      ));
  }

  DeleteTaskUsers(Id) {
    return this.httpClient.get<ApiResponseModel>('UserTasks/DeleteTaskUsers/' + Id );

  }
 

}
