import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { CompanyMaster } from '../_models/company-master';
import { CompanyPagination } from 'src/app/_models/company-pagination';

@Injectable()
export class CompanyPlanService {

    constructor(
        private httpClient: HttpClient,
        private router: Router) { }

    GetPlansForCompany(): any {
        return this.httpClient
            .get<ApiResponseModel>('CompanyPlan/GetPlansForCompany')
            .pipe(map((res) => res));
    }

    GetCompanyPlan(companyId: any): any {
        return this.httpClient
            .get<ApiResponseModel>('CompanyPlan/GetCompanyPlan/' + companyId)
            .pipe(map((res) => res));
    }

    BuyCompanyPlan(data: any) {
        return this.httpClient.post<ApiResponseModel>('CompanyPlan/BuyCompanyPlan', data).pipe(map(Response => {
            return Response;
        }));
    }

    UpdateCompanyPlan(data: any) {
        return this.httpClient.post<ApiResponseModel>('CompanyPlan/UpdateCompanyPlan', data).pipe(map(Response => {
            return Response;
        }));
    }
}
