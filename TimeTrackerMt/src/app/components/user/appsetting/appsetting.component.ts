import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AppsettingService } from 'src/app/_services/appsetting.service';
import { AppsettingMaster } from 'src/app/_models/appsetting-master';
import { AppsettingPagination } from 'src/app/_models/appsetting-pagination';
import { LazyLoadEvent, MessageService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['./appsetting.component.css'],
})
export class AppsettingComponent implements OnInit {
  AppSettingForm: FormGroup;
  isSubmit: boolean;
  appsettinglist: any;
  selectedAppsetting: AppsettingMaster;
  searchText = '';
  mode = AddEditModes.default;
  pagination: AppsettingPagination;

  // paging
  startIndex = 0;
  showTotalRecords = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  //#endregion

  constructor(
    private appsettingservice: AppsettingService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
    } as AppsettingPagination;
    this.GetAppSettingList();
  }

  private GetAppSettingList() {
    // this.loading = true;
    this.appsettingservice.GetAppSettingList(this.pagination).subscribe(
      (data) => {
        if (data.StatusCode === 200) {
          this.appsettinglist = data.Result;
          this.totalRecordsInDb = this.appsettinglist[0].recordsTotal;
          this.loading = false;
        } else {
          this.appsettinglist = null;
          this.loading = false;
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  SetInsertMode() {
    this.selectedAppsetting = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedAppsetting: AppsettingMaster) {
    this.mode = AddEditModes.edit;
    this.selectedAppsetting = selectedAppsetting;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      // tslint:disable-next-line: no-shadowed-variable
      this.GetAppSettingList();
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
      Search: event.globalFilter,
      SortCol: event.sortField,
      SortDir: sorDir,
    } as AppsettingPagination;
  }
  //#endregion

  loadAppSettingData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetAppSettingList();
  }
}
