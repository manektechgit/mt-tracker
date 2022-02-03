import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AppsettingsService} from 'src/app/_services/appsettings.service';
import { AppsettingsMaster } from 'src/app/_models/appsettings-master';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AppsettingsPagination } from 'src/app/_models/appsettings-pagination';
import { LazyLoadEvent, MessageService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-appsettings',
  templateUrl: './appsettings.component.html',
  styleUrls: ['./appsettings.component.css']
})
export class AppsettingsComponent implements OnInit {
  AppSettingsForm: FormGroup;
  isSubmit: boolean;
  appsettingslist: any;
  currentLoginUser: LoginResponseModel;
  companyId: number;
  selectedAppsettings: AppsettingsMaster;
  searchText = '';
  mode = AddEditModes.default;
  pagination: AppsettingsPagination;

  // paging
  startIndex = 0;
  showTotalRecords = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  constructor(
    private appsettingsservice: AppsettingsService,
    private router: Router,
    private alertService: AlertService,
    private authservice: AuthenticationService,
    private messageService: MessageService

  ) {
    this.currentLoginUser = this.authservice.GetLoginUserDetail();

   }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
    } as AppsettingsPagination;
    this.GetAppSettingsList();
  }

  private GetAppSettingsList() {
    this.appsettingsservice.GetAppSettingsList(this.pagination).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.appsettingslist = data.Result;
        this.totalRecordsInDb = this.appsettingslist[0].recordsTotal;
        this.loading = false;
      } else {
        this.appsettingslist = null;
        this.loading = false;
      }
    },
    (err) => {
      this.loading = false;
    }
  );
}


  SetEditMode(selectedAppsettings: AppsettingsMaster) {
    this.mode = AddEditModes.edit;
    this.selectedAppsettings = selectedAppsettings;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      // tslint:disable-next-line: no-shadowed-variable
      this.GetAppSettingsList();
    }
  }

  //#region Paging
  private setPagination(event: LazyLoadEvent) {
    this.showTotalRecords = event.rows;
    let sorDir = '';
    if (event.sortOrder === 1) {
      sorDir = 'asc';
    }
    else {
      sorDir = 'desc';
    }
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: event.first,
      CompanyId: this.currentLoginUser.CompanyId,
      Search: event.globalFilter,
      SortCol: event.sortField,
      SortDir: sorDir,
    } as AppsettingsPagination;
  }
  //#endregion

  loadAppSettingsData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetAppSettingsList();
  }


}
