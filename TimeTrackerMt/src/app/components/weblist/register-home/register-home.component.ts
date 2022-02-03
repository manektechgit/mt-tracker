import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
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
    selector: 'app-register-home',
    templateUrl: './register-home.component.html',
})
export class RegisterHomeComponent implements OnInit {
    isValidUrl = true;
    currentLoginUser: LoginResponseModel;
    UserForm: FormGroup;
    TryItOutForm: FormGroup;
    isSubmit: boolean;
    apiData: any;
    text;
    Message: any;
    IsError: boolean;
    userId: number;
    userMaster: UserMasterModel;
    IsShowTryItOut: boolean = true;
    IsShowUserForm: boolean = false;
    constructor(
        private authenticateService: AuthenticationService,
        private alertService: AlertService,
        private primengConfig: PrimeNGConfig,
        private confirmationDialogService: ConfirmationDialogService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserMasterService,
    ) {
        
    }

    ngOnInit(): void {
        $.getScript(AppJsPath.customJs);
        this.InitializeForm();
    }

    private InitializeForm() {
        this.TryItOutForm = new FormGroup({
            radioTryItOut: new FormControl(0, [Validators.required])
        });

        this.UserForm = new FormGroup({
            FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
            Email: new FormControl('', [Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            Password: new FormControl('', {
                validators: [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
                Validators.maxLength(15)], updateOn: 'change'
              })
        });
    }

    // get the value of form control to validate on html file
    get f() {
        return this.UserForm.controls;
    }

    onBlurMethod() {
        if (this.UserForm.value.Email == '') {
          return;
        }
        this.checkEmailExists();
    }

    checkEmailExists() {
        if (this.UserForm.value.Email == '') {
          return;
        }
        this.authenticateService
          .IsEmailExist(this.UserForm.value).subscribe((res) => {
            if(res.Result != null)
            {
              this.IsError = true;
              this.Message = res.Result.Email;
            }
            else
            {
                this.IsError = false;
            }
        });
    }

    onSubmitTryItOut() {
        this.IsShowTryItOut = false;
        this.IsShowUserForm = true;
    }

    onSubmit() {
        debugger
        this.isSubmit = true;
        if (this.UserForm.invalid) {
            return false;
        } 
        else {
            this.authenticateService
            .IsEmailExist(this.UserForm.value).subscribe((res) => {
                if(res.Result != null)
                {
                    this.IsError = true;
                    this.Message = res.Result.Email;
                }
                else
                {
                    this.IsError = false;
                    this.authenticateService.SetUserRegisterDataInSesion(
                        this.UserForm.value
                      );
                      this.router.navigate(['/register-user']);
                }
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
