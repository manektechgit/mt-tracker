import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { AlertService } from 'src/app/_services/alert.service';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {
  AddEditModes,
  Gender,
  AppMessages,
  AppJsPath,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';

declare var $: any;
@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.css'],
})
export class InsertUpdateComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() UserDetail: UserMasterModel;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();
  currentLoginUser: LoginResponseModel;
  UserForm: FormGroup;
  isSubmit: boolean;
  dropDownDepartment: DropDownItemModel;
  dropDownStatus: DropDownItemModel;
  dropDownRole: DropDownItemModel;
  dropDownReporting: DropDownItemModel;
  Genders: any;
  dropDownCompany: DropDownItemModel;
  role: number;
  CompanyId;
  apiData: any;
  text;
  Message: any;
  IsError: boolean;
  constructor(
    private dropDownServeice: DropdownListItemService,
    private authenticateService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }
  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetRoleList();
    this.GetReporting();
    this.GetCompanyList();
    this.InitilizeForm();
    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
    this.GetDepartmentList();
    this.Genders = Gender;
  }

  GetDepartmentList(event?: any) {
    if (event === undefined) {
      if (this.UserForm.value.CompanyId > 0) {
        this.dropDownServeice
          .GetDepartmentList(this.UserForm.value.CompanyId)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              this.dropDownDepartment = data.Result;
            }
          });
      } else {
        this.dropDownServeice
          .GetDepartmentList(this.currentLoginUser.CompanyId)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              this.dropDownDepartment = data.Result;
            }
          });
      }
    } else {
      this.text = event.target.options[
        event.target.options.selectedIndex
      ].value.split(':');
      this.CompanyId = +this.text[1];
      this.dropDownServeice
        .GetDepartmentList(this.CompanyId)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            this.dropDownDepartment = data.Result;
          }
        });
    }
  }

  private GetRoleList() {
    this.dropDownServeice
      .GetLoginRoleList(this.currentLoginUser.RoleId)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.dropDownRole = res.Result;
        }
      });
  }

  private GetReporting() {
    this.dropDownServeice
      .GetReportingList(this.currentLoginUser.CompanyId)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.dropDownReporting = res.Result;
        }
      });
  }

  private GetCompanyList() {
    this.dropDownServeice.GetCompanyList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropDownCompany = res.Result;
      }
    });
  }

  private InitilizeForm() {
    this.UserForm = new FormGroup({
      UserId: new FormControl(0, [Validators.required]),
      FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      LastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      Email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      Password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
      Validators.maxLength(15)]),
      DepartmentId: new FormControl(),
      Gender: new FormControl('', [Validators.required]),
      RoleId: new FormControl(),
      LoginRoleId: new FormControl(this.role),
      LoginDepartmentId: new FormControl(this.currentLoginUser.DepartmentId),
      // StatusId: new FormControl('', [Validators.required]),
      ReportingTo: new FormControl(0, [Validators.required]),
      CompanyId: new FormControl(this.currentLoginUser.CompanyId, [
        Validators.required,
      ]),
      CreatedBy: new FormControl(this.currentLoginUser.UserId, [
        Validators.required,
      ]),
    });
  }

  private setEditModeData() {
    this.UserForm.patchValue({
      UserId: this.UserDetail.UserId,
      FirstName: this.UserDetail.FirstName,
      LastName: this.UserDetail.LastName,
      Email: this.UserDetail.Email,
      Password: this.UserDetail.Password,
      DepartmentId: this.UserDetail.DepartmentId,
      Gender: this.UserDetail.Gender,
      RoleId: this.UserDetail.RoleId,
      LoginRoleId: this.role,
      LoginDepartmentId: this.currentLoginUser.DepartmentId,
      // StatusId: this.UserDetail.StatusId,
      ReportingTo: this.UserDetail.ReportingTo,
      CompanyId: this.UserDetail.CompanyId,
      CreatedBy: this.currentLoginUser.UserId,
    });
    console.log('log', this.UserForm.value);
  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.UserForm.controls;
  }

  onBlurMethod() {
    this.authenticateService
      .IsEmailExist(this.UserForm.value)      .subscribe((res) => {
        if (this.addEditMode.toLowerCase() === 'add' && res.Result != null) {
          this.IsError = true;
          this.Message = res.Result.Email;
        } else {
          this.IsError = false;
        }

        if (
          this.addEditMode.toLowerCase() === 'edit' &&
          res.Result.Email == this.UserForm.value.Email &&
          res.Result.UserId == this.UserForm.value.UserId
        ) {
          this.IsError = false;
          this.Message = res.Result.Email;
        } else {
          if (res.Result.Email == this.UserForm.value.Email) {
            this.IsError = false;
          }
          this.IsError = true;
        }
      });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.UserForm.invalid) {
      return false;
    } else {
      if (
        this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()
      ) {
        this.UserAdd();
      } else if (
        this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()
      ) {
        this.UserUpdate();
      }
    }
  }

  UserAdd() {
    this.isSubmit = true;
    if (this.UserForm.invalid) {
      return false;
    } else {
      if (this.UserForm.value.Email !== this.Message) {
        this.authenticateService.UserAdd(this.UserForm.value).subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              if (response.Result === '') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: AppMessages.USER_ADD,
                  life: 5000,
                });
              }
              //window.location.reload();

              if (response.Result !== '') {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: AppMessages.NUMBER_USER,
                  life: 5000,
                });
              }
              this.onSaveOrCancel('save');
            }
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: AppMessages.SOME_THING_WENT_WRONG,
              life: 5000,
            });
          }
        );
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: AppMessages.SOME_THING_WENT_WRONG,
          life: 5000,
        });
      }
    }
  }

  UserUpdate() {
    if (this.UserForm.value.Email !== this.Message) {
      this.authenticateService
        .UserUpdate(this.UserForm.value)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: AppMessages.USER_UPDATED,
              life: 5000,
            });
            this.onSaveOrCancel('save');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: AppMessages.SOME_THING_WENT_WRONG,
              life: 5000,
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: AppMessages.SOME_THING_WENT_WRONG,
        life: 5000,
      });
    }
  }

  show() {
    const a: any = document.getElementById('inputPassword');
    const b: any = document.getElementById('EYE');
    if (a.type === 'password') {
      a.type = 'text';
      b.src = 'https://i.stack.imgur.com/waw4z.png';
    } else {
      a.type = 'password';
      b.src = 'https://i.stack.imgur.com/Oyk1g.png';
    }
  }
}
