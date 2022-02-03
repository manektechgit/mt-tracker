import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';

declare var $: any;
@Component({
    selector: 'app-accept-invitation',
    templateUrl: './accept-invitation.component.html',
})
export class AcceptInvitationComponent implements OnInit {
    isValidUrl = true;
    currentLoginUser: LoginResponseModel;
    UserForm: FormGroup;
    isSubmit: boolean;
    dropDownDepartment: DropDownItemModel;
    dropDownStatus: DropDownItemModel;
    dropDownRole: DropDownItemModel;
    dropDownReporting: DropDownItemModel;
    Genders: any;
    dropDownCompany: DropDownItemModel;
    dropDownProject: DropDownItemModel;
    role: number;
    //CompanyId;
    apiData: any;
    text;
    Message: any;
    IsError: boolean;
    userId: number;
    userMaster: UserMasterModel;
    constructor(
        private dropDownServeice: DropdownListItemService,
        private authenticateService: AuthenticationService,
        private alertService: AlertService,
        private primengConfig: PrimeNGConfig,
        private confirmationDialogService: ConfirmationDialogService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserMasterService,
    ) {
        this.currentLoginUser = authenticateService.GetLoginUserDetail();
    }

    ngOnInit(): void {
        $.getScript(AppJsPath.customJs);
        this.route.queryParams.subscribe(params => {
            const userId = params.userid;
            this.userId = +(atob(params.userid));
        });
        this.GetRoleList();
        //this.GetReporting();
        this.GetCompanyList();
        this.InitializeForm();
       
        //this.GetDepartmentList();
        this.Genders = Gender;
        //this.GetProjectList();
        this.GetUserById();
    }

    // GetDepartmentList(event?: any) {
    //     if (event === undefined) {
    //         if (this.UserForm.value.CompanyId > 0) {
    //             this.dropDownServeice
    //                 .GetDepartmentList(this.UserForm.value.CompanyId)
    //                 .subscribe((data) => {
    //                     if (data.StatusCode === 200) {
    //                         this.dropDownDepartment = data.Result;
    //                     }
    //                 });
    //         } else {
    //             this.dropDownServeice
    //                 .GetDepartmentList(this.currentLoginUser.CompanyId)
    //                 .subscribe((data) => {
    //                     if (data.StatusCode === 200) {
    //                         this.dropDownDepartment = data.Result;
    //                     }
    //                 });
    //         }
    //     } else {
    //         this.text = event.target.options[
    //             event.target.options.selectedIndex
    //         ].value.split(':');
    //         this.CompanyId = +this.text[1];
    //         this.dropDownServeice
    //             .GetDepartmentList(this.CompanyId)
    //             .subscribe((data) => {
    //                 if (data.StatusCode === 200) {
    //                     this.dropDownDepartment = data.Result;
    //                 }
    //             });
    //     }
    // }

    private GetRoleList() {
        this.dropDownServeice.GetRoleList().subscribe((res) => {
            if (res.StatusCode === 200) {
              this.dropDownRole = res.Result;
            }
        });
    }

    // private GetReporting() {
    //     this.dropDownServeice
    //         .GetReportingList(this.currentLoginUser.CompanyId)
    //         .subscribe((res) => {
    //             if (res.StatusCode === 200) {
    //                 this.dropDownReporting = res.Result;
    //             }
    //         });
    // }

    private GetCompanyList() {
        this.dropDownServeice.GetCompanyList().subscribe((res) => {
            if (res.StatusCode === 200) {
                this.dropDownCompany = res.Result;
            }
        });
    }

    private InitializeForm() {
        this.UserForm = new FormGroup({
            UserId: new FormControl(0, [Validators.required]),
            FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
            LastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
            Email: new FormControl('', [Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            Password: new FormControl('', {
                validators: [Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
                Validators.maxLength(15)], updateOn: 'change'
              }),
            ConfirmPassword: new FormControl(''),
            //DepartmentId: new FormControl(),
            Gender: new FormControl(null, [Validators.required]),
            // StatusId: new FormControl('', [Validators.required]),
            //ReportingTo: new FormControl(0, [Validators.required]),
            //ProjectList: new FormArray([], Validators.required),
            // CompanyId: new FormControl(this.currentLoginUser.CompanyId, [
            //     Validators.required,
            // ]),
            // CreatedBy: new FormControl(this.currentLoginUser.UserId, [
            //     Validators.required,
            // ]),
        },{
            validators: this.password.bind(this),
            updateOn: 'blur'
          });
    }

    onSaveOrCancel(operation: 'save' | 'cancel') {
        //this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
    }

    // get the value of form control to validate on html file
    get f() {
        return this.UserForm.controls;
    }

    onSubmit() {
        debugger
        this.isSubmit = true;
        if (this.UserForm.invalid) {
            return false;
        } else {
            this.UserUpdate();
        }
    }

    UserUpdate() {
        if (this.UserForm.value.Email !== this.Message) {
            this.authenticateService
                .InviteUserUpdate(this.UserForm.value)
                .subscribe((data) => {
                    if (data.StatusCode === 200) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: AppMessages.USER_UPDATED,
                            life: 5000,
                        });
                        this.onSaveOrCancel('save');
                        this.router.navigate(['/login']);
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

    // GetProjectList() {
    //     this.dropDownServeice
    //         .GetProjectListByUser(this.userId)
    //         .subscribe((data) => {
    //             if (data.StatusCode === 200) {
    //                 this.dropDownProject = data.Result;
    //             }
    //         });
    // }

    onProjectChange(event: any) {
        const formArray: FormArray = this.UserForm.get('ProjectList') as FormArray;
    
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
    }

    private GetUserById() {
        this.userService.GetUserById(this.userId)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              this.userMaster = data.Result;
              this.UserForm.patchValue({
                Email: this.userMaster.Email,
                UserId: this.userMaster.UserId
              });
            }
          });
      }

      password(formGroup: FormGroup) {
        const { value: password } = formGroup.get('Password');
        const { value: confirmPassword } = formGroup.get('ConfirmPassword');
        return password === confirmPassword ? null : { passwordNotMatch: true };
      }

      showConfirm() {
        const a: any = document.getElementById('confirmPassword');
        const b: any = document.getElementById('EYEC');
        if (a.type === 'password') {
          a.type = 'text';
          b.src = 'https://i.stack.imgur.com/waw4z.png';
        } else {
          a.type = 'password';
          b.src = 'https://i.stack.imgur.com/Oyk1g.png';
        }
      }
}
