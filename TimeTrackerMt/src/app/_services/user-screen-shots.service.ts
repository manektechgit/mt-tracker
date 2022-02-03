import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserScreenshot } from '../_models/UserScreenshot.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { ScreenShotRequest } from '../_models/screen-shot-request';

@Injectable({
  providedIn: 'root'
})
export class UserScreenShotsService {

  constructor(private httpClient: HttpClient) { }
  //#region "Get Methods"
  //#endregion

  //#region "Post Methods"
  SendScreenShotToServer(objScreenshot: UserScreenshot) {
    return this.httpClient.post<ApiResponseModel>('UserScreenLog/saveScreenshot', objScreenshot)
      .pipe(map(data => data));
  }
  GetUserScreenShots(screenshotDataRequest: ScreenShotRequest) {
    return this.httpClient.post<ApiResponseModel>('UserScreenLog/getUserScreenShots', screenshotDataRequest)
      .pipe(map(data => data));
  }
  //#endregion
}
