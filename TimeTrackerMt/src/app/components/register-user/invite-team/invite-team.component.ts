import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { InviteTeamModel } from 'src/app/_models/invite-team.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DataServiceService } from '../data-service/data-service.service';
import {
  AppMessages
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { ElectronservService } from 'src/app/_services/electronserv.service';
import { UserMasterService } from 'src/app/_services/user-master.service';

@Component({
  selector: 'app-invite-team',
  templateUrl: './invite-team.component.html',
  styleUrls: ['./invite-team.component.css']
})
export class InviteTeamComponent implements OnInit {
  InviteForm: FormGroup;
  InviteFormDetail: FormGroup;
  loginForm: FormGroup;
  allUserEmails: any = [];

  constructor(
    private dropDownService: DropdownListItemService,
    private dataServiceService: DataServiceService,
    private messageService: MessageService,
    private authenticateService: AuthenticationService,
    private fb:FormBuilder,
    private router: Router,
    private electronService: ElectronservService,
    private userService: UserMasterService
    ) {
      this.InviteForm = this.fb.group({
        employees: this.fb.array([]) ,
      });
    }
  dropDownRole: DropDownItemModel;
  isSubmit: boolean;
  isError: boolean = false;
  employeeArray: Array<any> = [];
  newEmployeeAttribute: any = {};
  emailField = true;
  errorMessage: string;
  isSkipStep: boolean = false;
  
  employees() : FormArray {
    return this.InviteForm.get("employees") as FormArray
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), this.checkEmailExist.bind(this)]],
      name: ['', [Validators.required]],
      role: [5, [Validators.required]]
    })
  }

  addNewEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(i:number) {
    this.employees().removeAt(i);
  }

  private InitilizeForm() {
    // this.InviteForm = new FormGroup({
    //   Email: new FormControl('', [Validators.required,
    //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    //   Name: new FormControl('', [Validators.required]),
    //   RoleId: new FormControl(5)
    // });
  }

  ngOnInit(): void {
    this.dataServiceService.setStepIndex(1);
    this.employees().push(this.newEmployee());
    this.GetRoleList();
    this.InitilizeForm();
    this.GetAllUsers();
  }

  get f() {
    return this.InviteForm.controls;
  }

  checkEmailExist(control: FormControl) {
    var emailregexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    if(emailregexp.test(control.value))
    {
      var sessionUserData = sessionStorage.getItem(AppSecurity.currentUserRegisterInfo);
      const UserData = JSON.parse(sessionUserData)
      if(this.allUserEmails.indexOf(control.value) >= 0 || 
        UserData.Email === control.value || 
        this.InviteForm.value.employees.filter(item => item.email === control.value).length > 0)
      {
        return {
          isEmailExist: true
        }
      }
    }
    return null;
  }

  private GetAllUsers() {
    this.userService.GetUsers()
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          var test = this.allUserEmails;
          data.Result.forEach(element => {
            this.allUserEmails.push(element.Email);
          });
        }
      });
  }

  private GetRoleList() {
    this.dropDownService
      .GetLoginRoleList(2)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.dropDownRole = res.Result;
        }
      });
  }

  skipStep() {
    this.isSkipStep = true;
    this.onSubmit();
  }
  
  onSubmit() {
    this.isSubmit = true;
    this.isError = false;
    if (this.InviteForm.invalid && !this.isSkipStep) {
      return false;
    } 
    if(this.InviteForm.value != null)
    {
      this.inviteTeam();

      // var emailregexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
      // this.errorMessage = '';
      // if(this.InviteForm.value.employees.filter(item => item.email === '' || item.email === null).length > 0)
      // {
      //   this.isError = true;
      //   this.errorMessage += 'Please enter email <br/>';
      // }

      // if(this.InviteForm.value.employees.filter(item => item.name === '' || item.name === null).length > 0)
      // {
      //   this.isError = true;
      //   this.errorMessage += 'Please enter name <br/>';
      // }

      // if(this.InviteForm.value.employees.filter(item => !emailregexp.test(item.email)).length > 0)
      // {
      //   this.isError = true;
      //   this.errorMessage += 'Please enter valid email <br/>';
      // }

      // var emails = Array.prototype.map.call(this.InviteForm.value.employees, function(item) { return item.email; }).join(",");
      // this.authenticateService
      //     .IsMultipleEmailExist(emails).subscribe((res) => {
      //       if(res.Result != null && res.Result.length > 0)
      //       {
      //         this.isError = true;
      //         if(res.Result.length > 0)
      //         {
      //           this.errorMessage += 'following emails are alredy exists <br/>';
      //         }
      //         res.Result.forEach(element => {
      //           this.errorMessage += element.Email + '<br/>';
      //         });
      //       }
      //       else if(this.isError)
      //       {
      //         return;
      //       }
      //       else
      //       {
      //         this.inviteTeam();
      //       }
      //   });
    }
  }

  inviteTeam()
  {
    if(this.isSkipStep)
    {
      this.InviteForm.value.employees = null;
    }

    var sessionUserData = sessionStorage.getItem(AppSecurity.currentUserRegisterInfo);
    const UserData = JSON.parse(sessionUserData)
    this.InviteFormDetail = new FormGroup({
      UserName: new FormControl(UserData.FirstName),
      UserEmail: new FormControl(UserData.Email),
      Password: new FormControl(UserData.Password),
      CompanyName: new FormControl(sessionStorage.getItem('CompanyName')),
      NumberOfEmployees: new FormControl(sessionStorage.getItem('CompanyNumberOfUsers')),
      TimeZoneId: new FormControl(sessionStorage.getItem('TimeZoneId')),
      Employees: new FormControl((this.InviteForm.value.employees))
    });

    this.authenticateService.InviteTeam(this.InviteFormDetail.value).subscribe(
      (response) => {
        if (response.StatusCode === 200) {
          if (response.Result !== '') {
            // this.messageService.add({
            //   severity: 'success',
            //   summary: 'Successful',
            //   detail: AppMessages.USER_ADD,
            //   life: 5000,
            // });

            this.loginForm = new FormGroup({
              Email: new FormControl(response.Result.Email),
              Password: new FormControl(response.Result.Password),
              Remember: new FormControl(false),
            });

            this.loginUser(this.loginForm);
          }
          else
          {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: AppMessages.SOME_THING_WENT_WRONG,
              life: 5000,
            });
          }
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

  loginUser(loginData: any) 
  {
    this.authenticateService.AuthenticateUser(loginData.value).subscribe(
      (loginResponseData) => {
        if (typeof loginResponseData !== 'undefined' && loginResponseData) {
          if (loginResponseData.StatusCode === 200) {
            if (loginResponseData.Result === null) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: AppMessages.LOGIN_FAILED,
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: AppMessages.LOGIN_SUCCESS,
                life: 3000,
              });
              this.authenticateService.SetUserLoginDataInSesion(
                this.loginForm.controls.Remember.value,
                loginResponseData.Result
              );
              localStorage.setItem('UserId', loginResponseData.Result.UserId);
              if (this.electronService.IsElectronApp()) {
                this.router.navigate(['/electronPages']);
              } else {
                this.router.navigate(['/user']);
              }
            }
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.LOGIN_FAILED,
            life: 3000,
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: AppMessages.LOGIN_FAILED,
          life: 3000,
        });
      }
    );
  }

}
