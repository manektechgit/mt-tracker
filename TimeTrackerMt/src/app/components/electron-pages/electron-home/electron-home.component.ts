import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AppJsPath,
  AppMessages,
  AppSecurity,
} from 'src/app/_app-constants/app-constants.config';
import { ElectronservService } from '../../../_services/electronserv.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { ProjectService } from 'src/app/_services/project.service';
import { AttandanceLogService } from 'src/app/_services/attandance-log.service';
import { AttandanceLogModel } from 'src/app/_models/attandancelog.model';
import { AppsettingsService } from 'src/app/_services/appsettings.service';
import { formatDate } from '@angular/common';
import { ConnectionService } from 'ng-connection-service';
import { LocalDBServiceService } from 'src/app/_services/local-dbservice.service';
import { MessageService } from 'primeng/api';
import { UserMasterService } from 'src/app/_services/user-master.service';

@Component({
  selector: 'app-electron-home',
  templateUrl: './electron-home.component.html',
  styleUrls: ['./electron-home.component.css'],
})
export class ElectronHomeComponent implements OnInit, OnDestroy {
  //#region All Constant
  searchFilter: string;
  isStartTimer: boolean;
  displaynumber: number;
  randomTime: number;
  interval;
  intervalIdeal;
  showTimer;
  timerLimit = 0; // default

  // countdown Timer Property
  hour = 0;
  minute = 0;
  seconds = 0;
  totalSeconds = 0;
  countdownIntervalId;
  selectedProject: any;
  currentLoginUser: LoginResponseModel;
  projectList: any;
  GetLogDetails: any;
  GetInsertId: any;
  Getendresult: any;
  GetAddStart: any;
  TodayDate: any;
  TotalWorkingHours: any = 0;
  isConnected = true;
  projectTasks: any;
  selectedTask: any;
  filterProjectList: any;
  filterProjectTasks: any
  //#endregion

  //#region Constructor & Init Function
  constructor(
    private electronService: ElectronservService,
    private attandanceLogService: AttandanceLogService,
    private authenticationService: AuthenticationService,
    private dropDownServeice: DropdownListItemService,
    private projectService: ProjectService,
    private appSettingsService: AppsettingsService,
    private connectionService: ConnectionService,
    private localDBServiceService: LocalDBServiceService,
    private messageService: MessageService,
    private userService: UserMasterService
  ) {
    this.currentLoginUser = authenticationService.GetLoginUserDetail();
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (!this.isConnected) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.OFFLINE, life: 3000 });
      } else {
        this.SyncOffilneData();
      }
    });
  }

  ngOnInit(): void {
    this.SyncOffilneData();
    // this.CheckIdle();
    this.isStartTimer = false;
    this.userService.GetUserScreenCastTime(this.currentLoginUser.UserId).subscribe((data) => {
      if (data.StatusCode === 200) {
        if (data.Result !== null) {
          if (+data.Result > 0) {
            this.timerLimit = (+data.Result * 60000);
          }
          else {
            this.timerLimit = this.timerLimit * 60000;
          }
        }
      }
    });
    const checkuser = this.authenticationService.GetLoginUserDetail();
    this.showTimer = this.hour + ' : ' + this.minute + ' : ' + this.seconds;
    this.GetProjectList();

    this.TodayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    this.GetWorkingHours();
  }
  //#endregion

  private SyncOffilneData() {
    this.localDBServiceService.GetAttendenceLog().subscribe((xy) => {
      xy.forEach(element => {
        this.attandanceLogService.OfflinneSync(element).subscribe((res) => {
          if (res.StatusCode === 200) {
            if (!element.IsSynced) {
              this.localDBServiceService.DeleteLocalDataByKey(element.LocalAttedenceLogId);
            }
          }
        });
      });
    });
  }

  //#region All Get Method
  GetWorkingHours() {
    this.attandanceLogService.GetWorkingHours(this.currentLoginUser.CompanyId,
      this.currentLoginUser.UserId,
      this.TodayDate)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          if (res.Result.length > 0) {
            this.TotalWorkingHours = res.Result[0].TotalWorkingHours;
          }
        }
      });
  }

  private GetProjectList() {
    this.projectService
      .GetUserProjectswithStatus(this.currentLoginUser.UserId)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.projectList = res.Result;
          this.filterProjectList = res.Result;
          // if(this.projectList){
          //   this.GetUserProjectTasks(this.projectList[0].ProjectId)
          // }
        }
      });
  }

  private GetUserProjectTasks(ProjectId) {
    this.projectService
      .GetUserProjectTasks(ProjectId)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.projectTasks = res.Result;
          this.filterProjectTasks = res.Result;
        }
      });
  }

  //#endregion

  //#region Start & Stop Timer Code
  StartTimer(flg) {
    this.CheckScreenShotEnableInMac();
    if (this.isConnected) {
      this.isStartTimer = flg;
      this.hour = 0;
      this.minute = 0;
      this.seconds = 0;
      this.totalSeconds = 0;
      this.countdownIntervalId = setInterval(() => {
        this.totalSeconds++;
        this.startTimerCalc();
      }, 1000);
      this.GetAndSendScreenShotOnStart()
      this.GetAndSendScreenShotOnTime();
      localStorage.setItem(
        AppSecurity.selectedProjects,
        JSON.stringify(this.selectedProject)
      );
      localStorage.setItem(
        AppSecurity.selectedProjectTasks,
        JSON.stringify(this.selectedTask)
      );
      const attandanceLogModel = this.setParameters();
      this.InsertStartTimeLog(attandanceLogModel);
      this.GetWorkingHours();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.OFFLINE, life: 3000 });
    }
  }

  StopTimer(isStartStop) {
    this.isStartTimer = isStartStop;
    clearInterval(this.interval);
    this.randomTime = 0;
    clearInterval(this.countdownIntervalId);
    localStorage.removeItem(AppSecurity.selectedProjects);
    localStorage.removeItem(AppSecurity.selectedProjectTasks);
    // tslint:disable-next-line: no-shadowed-variable
    if (this.isConnected) {
      this.UpdateEndTime();
      this.GetWorkingHours();
      // delete data from local db on stop when internet is connected
      this.localDBServiceService.GetAttendenceLog().subscribe((xy) => {
        this.localDBServiceService.DeleteLocalDataByKey(xy.filter(x => x.Id == this.GetInsertId.Id)[0].LocalAttedenceLogId);
      });
    } else {
      // store data in local  storage if internet is not connected
      this.localDBServiceService.GetAttendenceLog().subscribe((xy) => {
        this.localDBServiceService.UpdateOutTime(xy.filter(x => x.Id == this.GetInsertId.Id)[0].LocalAttedenceLogId,
          xy.filter(x => x.Id == this.GetInsertId.Id)[0], false);
      });
    }
  }

  startTimerCalc() {
    this.hour = Math.floor(this.totalSeconds / 3600);
    this.minute = Math.floor((this.totalSeconds - this.hour * 3600) / 60);
    this.seconds = this.totalSeconds - (this.hour * 3600 + this.minute * 60);
    this.showTimer = this.hour + ' : ' + this.minute + ' : ' + this.seconds;
  }
  //#endregion

  private CheckScreenShotEnableInMac() {
    this.electronService.CheckScreenRecordingPermission();
    this.electronService.isScreenShotEnable.subscribe(x => {
      if (!x) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.ENABLESCREENRECORDING, life: 30000 });
        return false;
      }
    });
  }

  private GetAndSendScreenShotOnTime() {
    if (this.timerLimit > 0) {
      try {
        this.interval = setInterval(() => {
          this.electronService.getData();
          const pAttandanceLogModel = this.setId();
          this.AddStartTime(pAttandanceLogModel);
        }, this.timerLimit);
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  private GetAndSendScreenShotOnStart(): void {
    try {
      this.electronService.getData();
      const pAttandanceLogModel = this.setId();
      this.AddStartTime(pAttandanceLogModel);
    } catch (ex) {
      console.log(ex);
    }
  }

  // update end time on stop button click
  private UpdateEndTime() {
    const attandanceLogModel = this.setId();
    this.InsertEndTimeLog(attandanceLogModel);
  }

  // tslint:disable-next-line: no-shadowed-variable
  private InsertEndTimeLog(AttandanceLogModel: AttandanceLogModel) {
    this.attandanceLogService
      .InsertEndTimeLog(AttandanceLogModel)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.Getendresult = res.Result;
        }
      });
  }

  private AddStartTime(attandanceLogModel: AttandanceLogModel) {
    if (this.isConnected) {
      this.attandanceLogService
        .AddStartTime(attandanceLogModel)
        .subscribe((res) => {
          if (res.StatusCode === 200) {
            this.GetAddStart = res.Result;
          }
        });
    } else {
    }
    this.localDBServiceService.GetAttendenceLog().subscribe((xy) => {
      this.localDBServiceService.UpdateOutTime(xy.filter(x => x.Id == this.GetInsertId.Id)[0].LocalAttedenceLogId,
        xy.filter(x => x.Id == this.GetInsertId.Id)[0], true);
    });
  }

  SetSelectedProject(project: any) {
    if (!this.isStartTimer) {
      this.selectedProject = project;
    }
    this.GetUserProjectTasks(this.selectedProject.ProjectId)
  }

  // SetSelectedProject(event: any) {
  //   // if (!this.isStartTimer) {
  //   //   this.selectedProject = event.value;
  //   // }
  //   this.GetUserProjectTasks(this.selectedProject.ProjectId)
  // }

  SetSelectedProjectTask(task: any) {
    if(this.selectedTask){
      if(this.selectedTask.TaskId == task.TaskId){
        return;
      }
    }
    
    this.selectedTask = task;
    if (!this.isStartTimer) {
      this.StartTimer(true);
    } else {
      this.StopTimer(false)
      this.StartTimer(true);
    }
  }

  private InsertStartTimeLog(attandanceLogModel: AttandanceLogModel) {
    this.attandanceLogService
      .InsertStarTimeLog(attandanceLogModel)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.GetInsertId = res.Result;
          this.localDBServiceService.AddTimeLog(this.GetInsertId);
        }
      });
  }

  private setParameters() {
    return {
      UserId: this.currentLoginUser.UserId,
      ProjectId: this.selectedProject.ProjectId,
      TaskId: this.selectedTask.TaskId,
    } as AttandanceLogModel;
  }

  private setId() {
    return {
      Id: this.GetInsertId.Id,
      UserId: this.currentLoginUser.UserId,
      ProjectId: this.selectedProject.ProjectId,
      TaskId: this.selectedTask.TaskId,
      Date: this.GetInsertId.Date
    } as AttandanceLogModel;
  }

  //#region "Idle Time"
  private CheckIdle() {
    this.intervalIdeal = setInterval(() => {
      this.electronService.GetIdleTime();
      this.electronService.idealTime.subscribe(x => {
        if (x > 60) {
          this.isStartTimer = false;
          clearInterval(this.intervalIdeal);
          this.randomTime = 0;
          clearInterval(this.countdownIntervalId);
          this.UpdateEndTime();
          this.GetWorkingHours();
        }
      });
    }, 10000);

  }
  //#endregion

  onkeyup(event: any) {
    if (this.projectList) {
      if (event.target.value) {
        this.filterProjectList = this.projectList.filter(p => p.ProjectName.toLowerCase().includes(event.target.value.toLowerCase()));
        this.filterProjectTasks = this.projectTasks.filter(p => p.Name.toLowerCase().includes(event.target.value.toLowerCase()));
      } else {
        this.filterProjectList = this.projectList;
        this.filterProjectTasks = this.projectTasks;
      }
    }
  }

  ngOnDestroy() {
    if (this.isStartTimer) {
      this.UpdateEndTime();
    }
  }
}
