import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
import { TimeZoneDropDownModel } from 'src/app/_models/TimeZone-down-item';
import * as moment from 'moment';
import 'moment-timezone';

declare var $: any;
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
})
export class InviteComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() UserDetail: UserMasterModel;
  @Output() mode = new EventEmitter<{ mode: string; operation: string }>();
  currentLoginUser: LoginResponseModel;
  UserForm: FormGroup;
  isSubmit: boolean;
  dropDownDepartment: DropDownItemModel;
  dropDownStatus: DropDownItemModel;
  dropDownRole: DropDownItemModel;
  dropDownProjectRole: DropDownItemModel;
  dropDownReporting: DropDownItemModel;
  dropDownProject: DropDownItemModel;
  Genders: any;
  dropDownCompany: DropDownItemModel;
  dropDownScreenCast: DropDownItemModel;
  TimeZoneList: TimeZoneDropDownModel;
  role: number;
  CompanyId;
  apiData: any;
  text;
  Message: any;
  IsError: boolean;
  localTimeZone : any;
  constructor(
    private dropDownService: DropdownListItemService,
    private authenticateService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService,
    private dropDownServeice: DropdownListItemService
  ) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetRoleList();
    this.GetProjectRoleList();
    this.GetCompanyList();
    this.GetScreenCastList();
    this.InitializeForm();

    this.GetDepartmentList();
    this.GetTimeZoneList();
    this.Genders = Gender;

    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private setEditModeData() {
    this.UserForm.patchValue({
      UserId: this.UserDetail.UserId,
      //FirstName: this.UserDetail.FirstName,
      //LastName: this.UserDetail.LastName,
      Email: this.UserDetail.Email,
      //Password: this.UserDetail.Password,
      //DepartmentId: this.UserDetail.DepartmentId,
      //Gender: this.UserDetail.Gender,
      RoleId: this.UserDetail.RoleId,
      ProjectRoleId: this.UserDetail.ProjectRoleId,
      ScreenCastId: this.UserDetail.ScreenCastId,
      DepartmentIds: this.UserDetail.DepartmentIds,
      ProjectIds: this.UserDetail.ProjectIds,
      //LoginRoleId: this.role,
      //LoginDepartmentId: this.currentLoginUser.DepartmentId,
      // StatusId: this.UserDetail.StatusId,
      //ReportingTo: this.UserDetail.ReportingTo,
      //CompanyId: this.UserDetail.CompanyId,
      CreatedBy: this.currentLoginUser.UserId,
      TimeZoneId: this.UserDetail.TimeZoneId
    });
  }

  GetDepartmentList(event?: any) {
    var deptIds = (this.addEditMode.toLowerCase() === 'edit') ? this.UserDetail.DepartmentIds : null;
    if (event === undefined) {
      if (this.UserForm.value.CompanyId > 0) {
        this.dropDownService
          .GetDepartmentList(this.UserForm.value.CompanyId)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              data.Result.forEach(element => {
                if(this.addEditMode.toLowerCase() === 'edit' && deptIds != null)
                {
                  element.IsChecked = (deptIds.indexOf(element.DepartmentId) != -1) ? true : null;
                }
              });
              this.dropDownDepartment = data.Result;
            }
          });
      } else {
        this.dropDownService
          .GetDepartmentList(this.currentLoginUser.CompanyId)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              data.Result.forEach(element => {
                if(this.addEditMode.toLowerCase() === 'edit' && deptIds != null)
                {
                  element.IsChecked = (deptIds.indexOf(element.DepartmentId) != -1) ? true : null;
                }
              });
              this.dropDownDepartment = data.Result;
            }
          });
      }
    } else {
      this.text = event.target.options[
        event.target.options.selectedIndex
      ].value.split(':');
      this.CompanyId = +this.text[1];
      this.dropDownService
        .GetDepartmentList(this.CompanyId)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            data.Result.forEach(element => {
              if(this.addEditMode.toLowerCase() === 'edit' && deptIds != null)
              {
                element.IsChecked = (deptIds.indexOf(element.DepartmentId) != -1) ? true : null;
              }
            });
            this.dropDownDepartment = data.Result;
          }
        });
    }

    //set DepartmentList array from user
    if(this.addEditMode.toLowerCase() === 'edit' && deptIds != null)
    {
      var deptArray = deptIds.split(',');
      const formArray: FormArray = this.UserForm.get('DepartmentList') as FormArray;
      deptArray.forEach(element => {
        formArray.push(new FormControl(element.trim()));
      });
    }

    this.GetProjectList(this.UserForm.value.DepartmentList);
  }

  private GetRoleList() {
    this.dropDownService
      .GetLoginRoleList(this.currentLoginUser.RoleId)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.dropDownRole = res.Result;
        }
      });
  }

  private GetProjectRoleList() {
    this.dropDownServeice.GetRoleList().subscribe((res) => {
        if (res.StatusCode === 200) {
          this.dropDownProjectRole = res.Result;
        }
    });
}

  private GetCompanyList() {
    this.dropDownService.GetCompanyList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropDownCompany = res.Result;
      }
    });
  }

  private InitializeForm() {
    this.UserForm = new FormGroup({
      UserId: new FormControl(0),
      Email: new FormControl('', [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

      DepartmentList: new FormArray([], Validators.required),
      ProjectList: new FormArray([], Validators.required),
      RoleId: new FormControl(5),
      ProjectRoleId: new FormControl(4),
      LoginRoleId: new FormControl(this.role),
      LoginDepartmentId: new FormControl(this.currentLoginUser.DepartmentId),
      ReportingTo: new FormControl(0),
      CompanyId: new FormControl(this.currentLoginUser.CompanyId, [
        Validators.required,
      ]),
      CreatedBy: new FormControl(this.currentLoginUser.UserId, [
        Validators.required,
      ]),
      ScreenCastId: new FormControl(null, [Validators.required]),
      TimeZoneId:new FormControl(null, [Validators.required]),
    });
  }

  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, operation: operation });
  }

  // get the value of form control to validate on html file
  get f() {
    return this.UserForm.controls;
  }

  onBlurMethod() {
    if (this.UserForm.value.Email == '' || this.addEditMode.toLowerCase() === 'edit') {
      return;
    }
    this.authenticateService
      .IsEmailExist(this.UserForm.value).subscribe((res) => {
        if(res.Result != null)
        {
          this.IsError = true;
          this.Message = res.Result.Email;

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
      if(this.addEditMode.toLowerCase() != 'edit')
      {
        this.authenticateService
        .IsEmailExist(this.UserForm.value).subscribe((res) => {
          if(res.Result != null)
          {
            this.IsError = true;
            this.Message = res.Result.Email;

            if (res.Result.Email == this.UserForm.value.Email) {
              this.IsError = false;
            }
            this.IsError = true;
          }
          else
          {
            this.InviteUser();
          }
        });
      }
      else
      {
        this.UpdateUserDetail();
      }
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

  InviteUser() {
    debugger
    this.isSubmit = true;
    if (this.UserForm.invalid) {
      return false;
    } else {
      if (this.UserForm.value.Email !== this.Message) {
        this.authenticateService.InviteUser(this.UserForm.value).subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              if (response.Result !== '') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: AppMessages.USER_ADD,
                  life: 5000,
                });
              }
              else
              {
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
          detail: AppMessages.USER_EXIST,
          life: 5000,
        });
      }
    }
  }

  UpdateUserDetail() {
    debugger
    this.isSubmit = true;
    if (this.UserForm.invalid) {
      return false;
    } else {
      if (this.UserForm.value.Email !== this.Message) {
        this.authenticateService.UpdateUserDetail(this.UserForm.value).subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              if (response.Result !== '') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: AppMessages.USER_ADD,
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
      }
    }
  }

  onDepartmentChange(event: any) {
    const formArray: FormArray = this.UserForm.get('DepartmentList') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }

    this.GetProjectList(this.UserForm.value.DepartmentList);
  }

  private GetScreenCastList() {
    this.dropDownServeice.GetScreenCastList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropDownScreenCast = res.Result;
      }
    });
  }

  GetProjectList(DepartmentList) {
    var prjIds = (this.addEditMode.toLowerCase() === 'edit') ? this.UserDetail.ProjectIds : null;
    this.dropDownServeice
        .GetProjectsByCompanyAndDepartment(this.currentLoginUser.CompanyId, DepartmentList)
        .subscribe((data) => {
            if (data.StatusCode === 200) {
              if(this.addEditMode.toLowerCase() === 'edit' && prjIds != null)
              {
                const prjFormArray: FormArray = this.UserForm.get('ProjectList') as FormArray;
                //clear ProjectList array
                while (prjFormArray.length !== 0) {
                  prjFormArray.removeAt(0)
                }

                data.Result.forEach(element => {
                  element.IsChecked = (prjIds.indexOf(element.ProjectId) != -1) ? true : null;

                  //set ProjectList array
                  if((prjIds.indexOf(element.ProjectId) != -1))
                  {
                    prjFormArray.push(new FormControl(''+element.ProjectId+''));
                  }
                });
              }
              this.dropDownProject = data.Result;
            }
        });
  }

  onProjectChange(event: any) {
    const formArray: FormArray = this.UserForm.get('ProjectList') as FormArray;

    /* Selected */
    if (event.target.checked) {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });

      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  private GetTimeZoneList() {
    this.dropDownServeice.GetTimeZoneList().subscribe((res) => {
      if (res.StatusCode === 200) {
        let timezone = moment.tz.guess();
        let offset = new Date().getTimezoneOffset();
        let timezoneAbbrv = moment.tz.zone(timezone).abbr(offset);
        this.localTimeZone = res.Result.find(element => element.abbr == timezoneAbbrv).TimeZoneId;
        this.TimeZoneList = res.Result;
      }
    });
  }
}
