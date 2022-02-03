import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { MenuItem } from 'primeng/api';

declare var $: any;
@Component({
  selector: 'app-register-invite-user',
  templateUrl: './register-invite-user.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterInviteUserComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 1;
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
    //this.InitilizeLoginForm();
    //this.checkRememberedUserDetail();

    this.items = [
      {label: 'Company Details'},
      {label: 'Invite Team'},
      {label: 'Confirm'}
    ];
  }

}
