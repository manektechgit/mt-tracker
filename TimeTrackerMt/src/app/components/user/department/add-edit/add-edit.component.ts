import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { DepartmentService } from 'src/app/_services/Department.service';
import {
  AppMessages,
  AppJsPath,
} from 'src/app/_app-constants/app-constants.config';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { isNullOrUndefined } from 'util';
import { Departmentmaster } from 'src/app/_models/departmentmaster';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MessageService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
  @Input() selectedDept: Departmentmaster;
  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

  dropDownStatus: DropDownItemModel;
  dropDownCompany: DropDownItemModel;

  DepartmentForm: FormGroup;
  isSubmit: boolean;
  CId: number;
  RoleId: number;
  currentLoginUser: LoginResponseModel;
  constructor(
    private dropDownServeice: DropdownListItemService,
    private authService: DepartmentService,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService ,private messageService: MessageService,
  ) {
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
    // tslint:disable-next-line: no-debugger
    debugger;
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
    if (!isNullOrUndefined(this.selectedDept)) {
      this.setEditModeData();
    }
  }

  private setEditModeData() {
    this.DepartmentForm.patchValue({
      DepartmentId: this.selectedDept.DepartmentId,
      CompanyId: this.CId,
      DepartmentName: this.selectedDept.DepartmentName,
      CreatedBy: this.selectedDept.CreatedBy,
    });
  }



  private InitilizeLoginForm() {
    this.DepartmentForm = new FormGroup({
      DepartmentId: new FormControl(),
      DepartmentName: new FormControl('', [Validators.required]),
      CompanyId: new FormControl(this.CId),
      CreatedBy: new FormControl(Number(localStorage.getItem('UserId')), [
        Validators.required,
      ]),
    });
  }
  get f() {
    return this.DepartmentForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    this.DepartmentForm.patchValue({
      CreatedBy: Number(1),
    });
    if (this.DepartmentForm.invalid) {
      return false;
    } else {
      if (isNullOrUndefined(this.selectedDept)) {
        this.authService.AddDepartment(this.DepartmentForm.value).subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              if (response.Result != null) {

                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: AppMessages.DEPARTMENT_EXISTS,
                  life: 3000,
                });
              }

              else {
             this.messageService.add({severity: 'success', summary: 'Successful', detail: AppMessages.DEPT_ADD,
             life: 3000,
           });
             this.onSubmitForm.emit(true);
          }
            }
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
          }
        );
      } else {
        this.authService.UpdateDepartment(this.DepartmentForm.value).subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              if (response.Result != null) {

                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: AppMessages.DEPARTMENT_EXISTS,
                  life: 3000,
                });
              }

              else {

              this.messageService.add({severity: 'success',summary: 'Successful',detail: AppMessages.DEPT_UPDATE,
              life: 3000,
          });
              this.onSubmitForm.emit(true);
            }
          }
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
          }
        );
      }
    }
  }
  CancelForm() {
    this.onSubmitForm.emit(true);
  }
}
