import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import {
  AppJsPath,
  AppSecurity,
  AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { UserRememberData } from 'src/app/_models/user.remember.data';
import { ElectronservService } from 'src/app/_services/electronserv.service';
import { MessageService } from 'primeng/api';

declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isSubmit: boolean;
  imagePath;
  rememberMeDetail: UserRememberData;
  ismyTextFieldType: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private electronService: ElectronservService,
    private alertService: AlertService,
    private messageService: MessageService
  ) {
    this.rememberMeDetail = this.authService.GetRememberMedata();
    // this.checkRememberedUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeLoginForm();
    this.checkRememberedUserDetail();
  }

  private checkRememberedUserDetail() {
    if (this.rememberMeDetail !== null) {
      this.loginForm.patchValue({
        Email: this.rememberMeDetail.Email,
        Password: atob(this.rememberMeDetail.Password),
      });
      if (this.electronService.IsElectronApp()) {
        // this.router.navigate(['/electronPages']);
        this.onSubmit();
      }
    }
  }

  // Initilize login for on first load
  private InitilizeLoginForm() {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      Password: new FormControl('', [Validators.required]),
      Remember: new FormControl(true),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return false;
    } else {
      this.authService.AuthenticateUser(this.loginForm.value).subscribe(
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
                this.authService.SetUserLoginDataInSesion(
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
            // this.alertService.error(AppMessages.LOGIN_FAILED);
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.LOGIN_FAILED,
            life: 3000,
          });
          // this.alertService.error(AppMessages.LOGIN_FAILED);
        }
      );
    }
  }
  // resetcredentials() {
  //   //clear all localstorages
  //   localStorage.removeItem('rememberCurrentUser');
  // }
  // myFunction() {
  //   let x: any = document.getElementById('inputPassword');
  //   if (x.type === 'password') {
  //     x.type = 'text';
  //   } else {
  //     x.type = 'password';
  //   }
  // }

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
