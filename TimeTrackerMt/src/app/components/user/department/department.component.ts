import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { DepartmentService } from 'src/app/_services/Department.service';
import { Departmentmaster } from 'src/app/_models/departmentmaster';
import {
  AppMessages,
  AppJsPath,
} from 'src/app/_app-constants/app-constants.config';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DepartmentPagination } from 'src/app/_models/department-pagination';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

declare var $: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  showAddDepartment = false;
  searchText = '';
  dropDownStatus: DropDownItemModel;
  dropDownCompany: DropDownItemModel;
  departmentList = [];
  departmentDataList: any;
  selectedDepartment: any;
  CId: number;
  RoleId: number;
  currentLoginUser: LoginResponseModel;
  DepartmentPagination: DepartmentPagination;
  DepartmentForm: FormGroup;
  isSubmit: boolean;
  totalRecordsInDb = 0;
  loading: boolean;
  // paging
  startIndex = 0;
  endIndex = 10;
  showTotalRecords = 10;
  msgs: Message[] = [];

  constructor(
    private dropDownServeice: DropdownListItemService,
    private authService: DepartmentService,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
    // tslint:disable-next-line: no-debugger
    this.RoleId = this.currentLoginUser.RoleId;
    if (this.RoleId === 1) {
      this.CId = 0;
    } else {
      this.CId = this.currentLoginUser.CompanyId;
    }
  }
  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeLoginForm();

    this.DepartmentPagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      CompanyId: this.CId,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
    } as DepartmentPagination;

    this.GetDepartmentList();
  }

  private GetDepartmentList() {
    this.dropDownServeice
      .GetDepartmentpaginationDatalist(this.DepartmentPagination)
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            this.departmentDataList = data.Result;
            this.totalRecordsInDb = this.departmentDataList[0].recordsTotal;
            this.loading = false;
          } else {
            this.departmentDataList = null;
            this.loading = false;
          }
        },
        (err) => {
          this.loading = false;
        }
      );
  }

  SetInsertMode() {
    this.showAddDepartment = true;
  }

  ShowDepartmentListing() {
    this.showAddDepartment = false;
    this.selectedDepartment = null;
  }

  private InitilizeLoginForm() {
    this.DepartmentForm = new FormGroup({
      DepartmentName: new FormControl('', [Validators.required]),
      CompanyId: new FormControl(this.CId),
      StatusId: new FormControl('', [Validators.required]),
      CreatedBy: new FormControl(Number(localStorage.getItem('UserId')), [
        Validators.required,
      ]),
    });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.DepartmentForm.controls;
  }

  // SetDeleteMode(department: Departmentmaster) {
  //   department.IsDelete = true;
  //   this.UpdateDepartment(department);
  // }

  SetDeleteMode(department: Departmentmaster) {
    this.confirmationDialogService
      .confirm(
        'Are you sure you want to delete the department ' +
          department.DepartmentName +
          '? ',
        'if yes then associated users and projects will also be obsolete and will not visible after deleting !',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          department.IsDelete = true;
          this.UpdateDepartment(department);
        }
      });
  }

  private UpdateDepartment(department: Departmentmaster) {
    this.dropDownServeice.SoftDeleteDepartment(department).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: AppMessages.Department_Deleted,
          life: 3000,
        });
      }
      this.GetDepartmentList();
    });
  }

  SetEditMode(department) {
    this.showAddDepartment = true;
    this.selectedDepartment = department;
  }

  private setPagination(event: LazyLoadEvent) {
    this.showTotalRecords = event.rows;
    let sorDir = '';
    if (event.sortOrder === 1) {
      sorDir = 'asc';
    } else {
      sorDir = 'desc';
    }
    this.DepartmentPagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: event.first,
      Search: event.globalFilter,
      SortCol: event.sortField,
      SortDir: sorDir,
      CompanyId: +this.CId,
    } as DepartmentPagination;
  }

  loadUserData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetDepartmentList();
  }
}
