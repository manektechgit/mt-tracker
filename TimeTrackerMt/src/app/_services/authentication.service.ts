import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../_models/login-response.model';
import { RegisterResponseModel } from '../_models/register-response.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { UserMasterModel } from '../_models/user-master.model';
import { UserRememberData } from '../_models/user.remember.data';
import { PaginationModel } from '../_models/pagination.model';

@Injectable()
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  AuthenticateUser(loginDetails: any) {
    return this.httpClient.post<ApiResponseModel>('User/authenticateuser', loginDetails).pipe(map(loginResponse => {
      return loginResponse;
    }
    )
    );
  }

  UserAdd(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/useradd', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  IsEmailExist(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/IsEmailExist', data)
      .pipe(map(
        data => data
      ));
  }

  IsMultipleEmailExist(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/IsMultipleEmailExist?Emails=' + data, data)
      .pipe(map(
        data => data
      ));
  }

  IsCompanyExist(data: string) {
    return this.httpClient.post<ApiResponseModel>('Company/IsCompanyExist?CompanyName=' + data, data)
      .pipe(map(
        data => data
      ));
  }

  UserUpdate(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/UserUpdate', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  InviteUserUpdate(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/InviteUserUpdate', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  InviteUser(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/userinvite', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  InviteTeam(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/inviteteam', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  UpdateUserDetail(data: any) {
    return this.httpClient.post<ApiResponseModel>('User/UpdateUserDetail', data).pipe(map(Response => {
      return Response;
    }
    )
    );
  }

  GetUserDatalist(paginationModel: PaginationModel) {
    return this.httpClient.post<ApiResponseModel>('User/UserDataTableList', paginationModel)
      .pipe(map(
        data => data
      ));
  }

  InsertProjectWiseUsers(UserDetail: any) {
    return this.httpClient.post<ApiResponseModel>('UserProjects/InsertProjectWiseUsers', UserDetail)
      .pipe(map(
        data => data
      ));
  }

  InsertTaskWiseUsers(UserDetail: any) {
    return this.httpClient.post<ApiResponseModel>('UserTasks/InsertTaskWiseUsers', UserDetail)
      .pipe(map(
        data => data
      ));
  }

  InsertUserProject(UserDetail: any) {
    return this.httpClient.post<ApiResponseModel>('UserProjects/InsertUserProject', UserDetail)
      .pipe(map(
        data => data
      ));
  }

  //#region AllGetMethods
  GetLoginUserDetail(): LoginResponseModel {
    const savedCredentials = sessionStorage.getItem(AppSecurity.currentLoginUser)
      || localStorage.getItem(AppSecurity.currentLoginUser);
    return JSON.parse(savedCredentials);
  }

  GetRememberMedata(): UserRememberData {
    const savedCredentials = localStorage.getItem(AppSecurity.rememberMe);
    if (savedCredentials != null) {
      return JSON.parse(atob(savedCredentials));
    }
    else {
      return null;
    }
  }
  //#endregion

  //#region add or remove data from local/session storage for login and logout
  SetUserLoginDataInSesion(remember: boolean, loginResponse: LoginResponseModel) {
    localStorage.removeItem(AppSecurity.currentLoginUser);
    localStorage.removeItem(AppSecurity.rememberMe);
    sessionStorage.removeItem(AppSecurity.currentLoginUser);
    if (remember) {
      loginResponse.IsLocalStorage = true;
      loginResponse.Password = btoa(loginResponse.Password);
      localStorage.setItem(AppSecurity.currentLoginUser, JSON.stringify(loginResponse));
      this.RememberMe(loginResponse);
    }
    else {
      loginResponse.IsLocalStorage = false;
      sessionStorage.setItem(AppSecurity.currentLoginUser, JSON.stringify(loginResponse));
    }
  }

  private RememberMe(loginResponse: LoginResponseModel) {
    const rememberMeData = {
      Email: loginResponse.Email,
      Password: loginResponse.Password
    } as UserRememberData;
    localStorage.setItem(AppSecurity.rememberMe, btoa(JSON.stringify(rememberMeData)));
  }

  UpdateLocalStorage(userProfile: UserMasterModel) {
    // tslint:disable-next-line: prefer-const
    let savedData = this.GetLoginUserDetail();
    savedData.Email = userProfile.Email;
    savedData.FirstName = userProfile.FirstName;
    savedData.LastName = userProfile.LastName;
    this.SetUserLoginDataInSesion(savedData.IsLocalStorage, savedData);
  }
  LogoutUser() {
    localStorage.removeItem(AppSecurity.currentLoginUser);
    sessionStorage.removeItem(AppSecurity.currentLoginUser);
    this.router.navigate(['/login']);
    // localStorage.removeItem(AppSecurity.menuguard);
  }

  // service for remove remember me data in electron

  LogoutUserRemember() {
    localStorage.removeItem(AppSecurity.currentLoginUser);
    sessionStorage.removeItem(AppSecurity.currentLoginUser);
    localStorage.removeItem(AppSecurity.rememberMe);
    this.router.navigate(['/login']);
    // localStorage.removeItem(AppSecurity.menuguard);
  }


  // tslint:disable-next-line: no-shadowed-variable
  ActiveDeactiveUserMaster(UserMasterModel: UserMasterModel) {
    return this.httpClient.post<ApiResponseModel>('User/activedeactiveusermaster', UserMasterModel)
      .pipe(map(
        data => data
      ));
  }

  //#endregion

  SetUserRegisterDataInSesion(registerResponse: RegisterResponseModel) {
    sessionStorage.removeItem(AppSecurity.currentUserRegisterInfo);
    sessionStorage.setItem(AppSecurity.currentUserRegisterInfo, JSON.stringify(registerResponse));
  }
}
