import { Component, OnInit } from '@angular/core';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import {
  AddEditModes,
  AppJsPath,
  AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/_services/project.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { UserProjectsModel } from 'src/app/_models/user-projects.model';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  UserProjectForm: FormGroup;
  isSubmit: boolean;
  mode = AddEditModes.default;
  UserDetail: UserMasterModel;
  UserProjects: UserProjectsModel;
  currentLoginUser: LoginResponseModel;
  userpagination: PaginationModel;
  searchText = '';
  usersDataList: any;
  startIndex = 0;
  endIndex = 10;
  showTotalRecords = 10;
  selectedUserId = 0;
  totalRecordsInDb = 0;
  loading: boolean;
  role: number;

  constructor(
    private AuthService: AuthenticationService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private projectService: ProjectService,private primengConfig: PrimeNGConfig,
    private confirmationDialogService: ConfirmationDialogService, private messageService: MessageService
  ) {
    this.currentLoginUser = AuthService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.userpagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
      CompanyId: this.currentLoginUser.CompanyId,
      RoleId: this.currentLoginUser.RoleId,
      DepartmentId: this.currentLoginUser.DepartmentId,
      CreatedBy: this.currentLoginUser.UserId,
    } as PaginationModel;
    this. GetUserDatalist();
    this.primengConfig.ripple = true;
  }

  private GetUserDatalist() {
    this.AuthService.GetUserDatalist(this.userpagination).subscribe((data) => {
          if (data.StatusCode === 200) {
            this.usersDataList = data.Result;
            if (this.usersDataList.length > 0) {
              this.totalRecordsInDb = this.usersDataList[0].recordsTotal;
              this.loading = false;
            }
            else {
              this.usersDataList = null;
              this.loading = false;
            }
        }
      },
        (err) => {
          this.loading = false;
        }
      );
  }


  private setPagination(event: LazyLoadEvent) {
    this.showTotalRecords = event.rows;
    let sorDir = '';
    if (event.sortOrder === 1) {
      sorDir = 'asc';
    }
    else {
      sorDir = 'desc';
    }
    this.userpagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: event.first,
      Search: event.globalFilter,
      SortCol: event.sortField,
      SortDir: sorDir,
     CompanyId: this.currentLoginUser.CompanyId,
     RoleId: this.currentLoginUser.RoleId,
     DepartmentId: this.currentLoginUser.DepartmentId,
     CreatedBy: this.currentLoginUser.UserId,
    }as PaginationModel;

  }
  loadUserData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetUserDatalist();
  }
  SetInsertMode() {
    this.UserDetail = null;
    this.mode = AddEditModes.insert;
  }
  SetEditMode(UserDetail: UserMasterModel) {
    this.mode = AddEditModes.edit;
    this.UserDetail = UserDetail;
  }
  SetDefaultMode($event: any) {
    if ($event.opertaion === 'save') {
      this.GetUserDatalist();
    }
    this.mode = $event.mode;
  }

  onChange(isChecked: boolean, data: UserMasterModel) {
    let active = '';
    if (isChecked) {
      active = 'active';
    } else {
      active = 'Inactive';
    }
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to  ' + active + ' this user ?',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          data.IsActive = isChecked;
          this.UpdateUserMaster(data);
        } else {
          data.IsActive = isChecked ? false : true;
        }
      })
      .catch(() => {
        data.IsActive = isChecked ? false : true;
      });
  }

  private UpdateUserMaster(user: UserMasterModel) {
    this.AuthService.ActiveDeactiveUserMaster(user).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.USER_UPDATED, life: 3000 });
      }
    });
  }
}
