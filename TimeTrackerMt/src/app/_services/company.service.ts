import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../_models/api-response.model';
import { CompanyMaster } from '../_models/company-master';
import { CompanyPagination } from 'src/app/_models/company-pagination';

@Injectable()
export class CompanyService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }


//#region HttpPostMethods
// AddCompany(companyMaster: CompanyMaster) {
//   return this.httpClient.post<ApiResponseModel>('Company/addCompany', companyMaster).pipe(map(
//     data => data
//   ));
// }

// UpdateCompany(companyMaster: CompanyMaster) {
//   return this.httpClient.post<ApiResponseModel>('Company/UpdateCompany', companyMaster).pipe(map(
//     data => data
//   ));
// }
//#endregion
  AddCompany(data: any) {
       return this.httpClient.post<ApiResponseModel>('Company/addCompany', data).pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  UpdateCompany(data: any) {
    return this.httpClient.post<ApiResponseModel>('Company/UpdateCompany', data).pipe(map(Response => {
     return Response;
   }
   )
 );
}

  // tslint:disable-next-line: no-shadowed-variable
  GetCompanypaginationDatalist(CompanyPagination: CompanyPagination) {
       return this.httpClient.post<ApiResponseModel>('Company/getCompanypaginationDatalist', CompanyPagination)
       .pipe(map(Response => {
        return Response;
      }
      )
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  ActiveDeactiveCompany(CompanyMaster: CompanyMaster) {
    return this.httpClient.post<ApiResponseModel>('Company/activedeactiveCompany', CompanyMaster)
      .pipe(map(
        data => data
      ));
  }

}
