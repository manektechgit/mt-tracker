import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
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
import { DataServiceService } from './data-service/data-service.service';
import { Subscription } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  activeIndex: number = 1;
  loginForm: FormGroup;
  isSubmit: boolean;
  imagePath;
  rememberMeDetail: UserRememberData;
  ismyTextFieldType: boolean;
  stepActiveSubscription: Subscription;
  stepActiveIndex: number = 0;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private electronService: ElectronservService,
    private alertService: AlertService,
    private messageService: MessageService,
    private dataServiceService: DataServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.rememberMeDetail = this.authService.GetRememberMedata();
    // this.checkRememberedUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    //this.InitilizeLoginForm();
    //this.checkRememberedUserDetail();
    
    this.dataServiceService.stepIndex$.subscribe(result => this.stepActiveIndex = result);

    this.items = [
      {label: 'Company Details'},
      {label: 'Invite Team'}
    ];
  }

  ngOnDestroy() {
    if(this.stepActiveSubscription != undefined){
      this.stepActiveSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }

}
