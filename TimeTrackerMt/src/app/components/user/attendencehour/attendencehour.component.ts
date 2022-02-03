import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AttendencehourService} from 'src/app/_services/attendencehour.service';
import { AttendencehourMaster } from 'src/app/_models/attendencehour-master';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AttendencehourPagination } from 'src/app/_models/attendencehour-pagination';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

declare var $: any;


@Component({
  selector: 'app-attendencehour',
  templateUrl: './attendencehour.component.html',
  styleUrls: ['./attendencehour.component.css']
})
export class AttendencehourComponent implements OnInit {
  AttendenceHourForm: FormGroup;
  isSubmit: boolean;
  attendenceHourlist: any;
  currentLoginUser: LoginResponseModel;
  companyId: number;
  selectedAttendencehour: AttendencehourMaster;
  searchText = '';
  mode = AddEditModes.default;
  pagination: AttendencehourPagination;

  // paging
  startIndex = 0;
  showTotalRecords = 10;
  totalRecordsInDb = 0;
  loading: boolean;

  constructor(
    private attendencehourService: AttendencehourService,
    private router: Router,
    private alertService: AlertService,
    private authservice: AuthenticationService,
    private messageService: MessageService,
    private confirmationDialogService: ConfirmationDialogService
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
      CompanyId: this.currentLoginUser.CompanyId,
    } as AttendencehourPagination;
    this.GetAttendencehourList();
  }

  private GetAttendencehourList() {
    this.attendencehourService.GetAttendencehourList(this.pagination).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.attendenceHourlist = data.Result;
        this.totalRecordsInDb = this.attendenceHourlist[0].recordsTotal;
        this.loading = false;
      } else {
        this.attendenceHourlist = null;
        this.loading = false;
      }
    },
    (err) => {
      this.loading = false;
    }
  );
}

SetInsertMode() {
  this.selectedAttendencehour = null;
  this.mode = AddEditModes.insert;
}

SetEditMode(selectedAttendencehour: AttendencehourMaster) {
  this.mode = AddEditModes.edit;
  this.selectedAttendencehour = selectedAttendencehour ;
}

SetDefaultMode($event: any) {
  this.mode = $event.mode;
  if ($event.opertaion === 'save') {
    // tslint:disable-next-line: no-shadowed-variable
    this.GetAttendencehourList();
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
  } as AttendencehourPagination;
}
//#endregion

loadAttendenceHourData(event: LazyLoadEvent) {
  this.setPagination(event);
  this.GetAttendencehourList();
}

onChange(isChecked: boolean, data: AttendencehourMaster) {
  let active = '';
  if (isChecked) {
    active = 'active';
  } else {
    active = 'Inactive';
  }
  this.confirmationDialogService
    .confirm(
      'Please confirm..',
      'Do you really want to  ' + active + ' ' + data.CompanyName + ' ?',
      'Ok',
      'Cancel',
      'lg'
    )
    .then((confirmed) => {
      if (confirmed) {
        data.IsActive = isChecked;
        this.UpdateAttendenceActiveDeactive(data);
      } else {
        data.IsActive = isChecked ? false : true;
      }
    })
    .catch(() => {
      data.IsActive = isChecked ? false : true;
    });
}

private UpdateAttendenceActiveDeactive(attendence: AttendencehourMaster) {
  this.attendencehourService.ActiveDeactiveAttendence(attendence).subscribe((data) => {
    if (data.StatusCode === 200) {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.ATTENDENCEHOUR_UPDATE, life: 3000 });
    }
  });
}

}
