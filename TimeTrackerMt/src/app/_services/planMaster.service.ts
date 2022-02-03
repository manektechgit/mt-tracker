import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { PlanMaster,PlanPagination } from '../_models/Plan-master';

@Injectable()
export class PlanService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  AddPlan(data: any) {
       return this.httpClient.post<ApiResponseModel>('Plan/addPlan', data).pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  UpdatePlan(data: any) {
    return this.httpClient.post<ApiResponseModel>('Plan/updatePlan', data).pipe(map(Response => {
     return Response;
   }
   )
 );
}

  GetPlanlist(PlanPagination: PlanPagination) {
       return this.httpClient.post<ApiResponseModel>('Plan/getplanlist', PlanPagination)
       .pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  ActiveDeactivePlan(PlanMaster: PlanMaster) {
    return this.httpClient.post<ApiResponseModel>('Plan/activedeactivePlan', PlanMaster)
      .pipe(map(
        data => data
      ));
  }

  GetPlanByID(planId:number): any {
    return this.httpClient.get<ApiResponseModel>('Plan/getPlanByID/' + planId)
      .pipe(map(res => res));
  }

  CheckAnyPlanDefault(): any {
    return this.httpClient.get<ApiResponseModel>('Plan/checkAnyPlanDefault')
      .pipe(map(res => res));
  }
}
