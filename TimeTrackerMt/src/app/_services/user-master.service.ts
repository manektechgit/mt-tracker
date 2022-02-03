import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { UserMasterModel } from '../_models/user-master.model';
import { UserScreenshot } from '../_models/UserScreenshot.model';

@Injectable()
export class UserMasterService {

  constructor(private httpClient: HttpClient) { }
  //#region GetMethods
  GetUserDetailById(userId: number) {
    return this.httpClient.get<ApiResponseModel>('User/getuserdetailbyid/' + userId)
      .pipe(map(
        data => data
      ));
  }
  GetUserById(userId: number) {
    return this.httpClient.get<ApiResponseModel>('User/getuserbyid/' + userId)
      .pipe(map(
        data => data
      ));
  }
  GetUserDetailForResetPassword(userId: number) {
    return this.httpClient.get<ApiResponseModel>('User/getuserdetailforresetpassword/' + userId)
      .pipe(map(
        data => data
      ));
  }
  GetUsers() {
    return this.httpClient.get<ApiResponseModel>('User/getusers')
      .pipe(map(
        data => data
      ));
  }
  ForgetPassword(emailId: string) {
    return this.httpClient.get<ApiResponseModel>('User/forgetpassword/' + emailId)
      .pipe(map(
        data => data
      ));
  }
  GetTotalActiveUsers() {
    return this.httpClient.get<ApiResponseModel>('User/gettotalusers')
      .pipe(map(
        data => data
      ));
  }

  GetUserScreenCastTime(userId: number){
    return this.httpClient.get<ApiResponseModel>('User/getUserScreenCastTime/' + userId)
    .pipe(map(
      data => data
    ));
  }

  //#endregion

  //#region PostMethods
  UpdateUserMaster(userMaster: UserMasterModel) {
    return this.httpClient.post<ApiResponseModel>('User/UpdateUserMaster', userMaster)
      .pipe(map(
        data => data
      ));
  }

  ResetPassword(userMaster: UserMasterModel) {
    return this.httpClient.post<ApiResponseModel>('User/resetPassword', userMaster)
      .pipe(map(
        data => data
      ));
  }
  ActiveDeactiveUser(userMaster: UserMasterModel) {
    return this.httpClient.post<ApiResponseModel>('User/activedeactiveuser', userMaster)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
