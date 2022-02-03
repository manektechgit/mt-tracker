import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { AppJsPath, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMasterModel } from 'src/app/_models/user-master.model';

declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isSubmit: boolean;
  userId: number;
  userMaster: UserMasterModel;
  isValidUrl = true;
  constructor(
    private alertService: AlertService,
    private userMasterService: UserMasterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    // this.route.queryParams.subscribe(Params =>
    //   this.userId = +atob(Params._value.userid)
      // tslint:disable-next-line: align
      this.route.queryParams.subscribe(params => {
        const userId = params.userid;
        this.userId = +(atob(params.userid));
      });
    this.InitilizeResetPasswordForm();
    this.GetUserDetail();
  }

  private GetUserDetail() {
    if (this.userId !== undefined) {
      return this.userMasterService.GetUserDetailForResetPassword(this.userId)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            if (data.Result !== null) {
              this.userMaster = data.Result;
              this.isValidUrl = true;
            } else {
              this.isValidUrl = false;
            }
          }
        });
    } else {
      this.isValidUrl = false;
    }
  }

  // Initilize login for on first load
  private InitilizeResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      Password: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/), Validators.maxLength(15)]),
      ConfirmPassword: new FormControl(''),
    }, {
      validators: this.password.bind(this)});
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('Password');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  // get the value of form control to validate on html file
  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.isSubmit = true;
    if (this.resetPasswordForm.invalid) {
      return false;
    } else {
      this.userMaster.Password = this.resetPasswordForm.value.Password;
      this.userMasterService.ResetPassword(this.userMaster)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            this.isSubmit = false;
            this.alertService.success(AppMessages.PASSWORD_RESET_SUCCESS);
            this.router.navigate(['/login']);
          }
        });
    }
  }

  show(id: any) {
    const a: any = document.getElementById(id);
    const b: any = document.getElementById(id + 'EYE');
    if (a.type === 'password') {
      a.type = 'text';
      b.src = 'https://i.stack.imgur.com/waw4z.png';
    } else {
      a.type = 'password';
      b.src = 'https://i.stack.imgur.com/Oyk1g.png';
    }
  }
}
