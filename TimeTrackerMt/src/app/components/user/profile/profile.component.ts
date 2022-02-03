import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddEditModes, AppMessages, Gender } from 'src/app/_app-constants/app-constants.config';
import { AlertService } from 'src/app/_services/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  userMaster: UserMasterModel;
  userMasterForm: FormGroup;
  isSubmit: boolean;
  mode = AddEditModes.default;
  userImageServerPath = '';
  Genders: any;
  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private userService: UserMasterService,
    private messageService: MessageService) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
    this.GetLoginUserDetail();
    this.Genders = Gender;
  }

  ngOnInit(): void {
    this.InitilizeForm();
  }

  private GetLoginUserDetail() {
    this.userService.GetUserDetailById(this.currentLoginUser.UserId)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.userMaster = data.Result;
          this.userMaster.FirstName= this.userMaster.Name;
          this.SetProfileDefault();
          this.authService.UpdateLocalStorage(this.userMaster);
        }
      });
  }

  private InitilizeForm() {
    this.userMasterForm = new FormGroup(
      {
        FirstName: new FormControl('', [Validators.required]),
        Gender: new FormControl('', [Validators.required]),
        UpdatedBy: new FormControl(Number(localStorage.getItem('UserId')), [
          Validators.required
        ]),
        Email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        Password: new FormControl('', {
          validators: [Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
          Validators.maxLength(15)], updateOn: 'change'
        }),
        ConfirmPassword: new FormControl(''),
      }, {
      validators: this.password.bind(this),
      updateOn: 'blur'
    });
  }

  private SetProfileDefault() {
    this.userMasterForm.patchValue({
      FirstName: this.userMaster.FirstName,
      Email: this.userMaster.Email,
      Gender: this.userMaster.Gender,
      Password: this.userMaster.Password,
      ConfirmPassword: this.userMaster.Password
    });

  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('Password');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  // get the value of form control to validate on html file
  get f() { return this.userMasterForm.controls; }
  // SetMode(mode: string) {
  //   this.mode = mode;
  // }

  btnClick() {
    this.router.navigate(['/user/dashboard']);
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.userMasterForm.invalid) {
      return false;
    } else {
      this.setUserMasterValueForUpdate();
      this.userService.UpdateUserMaster(this.userMaster).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.PROFILE_UPDATED, life: 3000 });
          this.GetLoginUserDetail();
          this.processProfileUpdate();
        }
      });
    }
  }

  private processProfileUpdate() {
    // this.SetMode(AddEditModes.default);
    window.location.reload();
  }

  private setUserMasterValueForUpdate() {
    this.userMaster.FirstName = this.userMasterForm.value.FirstName;
    this.userMaster.Name = this.userMasterForm.value.FirstName;
    // this.userMaster.LastName = this.userMasterForm.value.LastName;
    this.userMaster.Email = this.userMasterForm.value.Email;
    this.userMaster.Gender = this.userMasterForm.value.Gender;
    if (this.userMasterForm.value.Password !== '') {
      this.userMaster.Password = this.userMasterForm.value.Password;
    }
    this.userMaster.UpdatedBy = (Number(localStorage.getItem('UserId')));
  }

  show() {
    const a: any = document.getElementById('newPassword');
    const b: any = document.getElementById('EYE');
    if (a.type === 'password') {
      a.type = 'text';
      b.src = 'https://i.stack.imgur.com/waw4z.png';
    } else {
      a.type = 'password';
      b.src = 'https://i.stack.imgur.com/Oyk1g.png';
    }
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
