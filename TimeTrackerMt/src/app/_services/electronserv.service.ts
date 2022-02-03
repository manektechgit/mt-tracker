import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiResponseModel } from '../_models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserScreenshot } from 'src/app/_models/UserScreenshot.model';
import { AuthenticationService } from '../_services/authentication.service';
import { UserMasterService } from './user-master.service';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { UserScreenShotsService } from './user-screen-shots.service';


@Injectable({
  providedIn: 'root',
})
export class ElectronservService {
  randomTime: number;
  public idealTime = new Subject<number>();
  public isScreenShotEnable = new Subject<boolean>();

  constructor(
    private electronService: ElectronService,
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient,
    private userScreenShotService: UserScreenShotsService
  ) { }

  getData() {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.send('getData');
      this.electronService.ipcRenderer.once('getData', (event, arg) => {
        console.log('in get data');
        // console.log(arg);
        const base64String = arg;
        const checkuser = this.authenticationService.GetLoginUserDetail();
        const selectedProject = JSON.parse(localStorage.getItem(AppSecurity.selectedProjects));
        const selectedProjectTask = JSON.parse(localStorage.getItem(AppSecurity.selectedProjectTasks));
        const objUserScreenshot = {
          Image: 'Image test',
          ProjectId: selectedProject.ProjectId,
          UserId: checkuser.UserId, // checkuser.UserId
          TaskId: selectedProjectTask.TaskId, 
          fileAsBase64: base64String,
        } as UserScreenshot;

        this.userScreenShotService
          .SendScreenShotToServer(objUserScreenshot)
          .subscribe((data) => {
            console.log(data);
          });
      });
    }
  }

  IsElectronApp(): boolean {
    return this.electronService.isElectronApp;
  }
  CheckScreenRecordingPermission() {
    if (this.electronService.isElectronApp) {
      if (process.platform === 'darwin') {
        this.electronService.ipcRenderer.send('checkPermisssion');
        this.electronService.ipcRenderer.once('checkPermisssion', (event, arg) => {
          this.isScreenShotEnable.next(arg)
        });
      } else {
        return true;
      }
    }
  }
  GetIdleTime() {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.send('checkIdle');
      this.electronService.ipcRenderer.once('checkIdle', (event, arg) => {
        console.log('Idele Time' + arg);
        this.idealTime.next(arg);
      });
      // this.electronService.ipcRenderer.on('resume', (event, path) => {
      //   console.log(path);
      // });
    }
  }

}
