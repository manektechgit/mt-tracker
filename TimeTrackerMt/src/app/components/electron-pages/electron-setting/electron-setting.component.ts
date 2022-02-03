import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AppsettingsService } from '../../../_services/appsettings.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AppsettingsMaster } from 'src/app/_models/appsettings-master';


declare var $: any;

@Component({
  selector: 'app-electron-setting',
  templateUrl: './electron-setting.component.html',
  styleUrls: ['./electron-setting.component.css']
})
export class ElectronSettingComponent implements OnInit {
  AppSettingsForm: FormGroup;
  isSubmit: boolean;
  appsettingslist: any;
  selectedAppsettings: AppsettingsMaster;
  searchText = '';
  mode = AddEditModes.default;
  currentLoginUser: LoginResponseModel;

  constructor(
    private appsettingsservice: AppsettingsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetInformation();
  }
  private GetInformation() {
    // tslint:disable-next-line: no-shadowed-variable
    const AppsettingsMaster = this.setPagination();
    this.GetAppSettingsType(AppsettingsMaster);
  }

  // tslint:disable-next-line: no-shadowed-variable
  private GetAppSettingsType(AppsettingsMaster: AppsettingsMaster) {
    this.appsettingsservice.AppSettingsType(AppsettingsMaster).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.appsettingslist = res.Result;
      }
    });
  }

  private setPagination() {
    return {
      CompanyId: this.currentLoginUser.CompanyId,
    } as AppsettingsMaster;
  }

}
