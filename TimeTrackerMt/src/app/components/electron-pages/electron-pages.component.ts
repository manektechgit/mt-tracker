import { Component, OnInit } from '@angular/core';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserRememberData } from 'src/app/_models/user.remember.data';
@Component({
  selector: 'app-electron-pages',
  templateUrl: './electron-pages.component.html',
  styleUrls: ['./electron-pages.component.css'],
})
export class ElectronPagesComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  rememberMeDetail: UserRememberData;
  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
    this.rememberMeDetail = this.authService.GetRememberMedata();
  }

  ngOnInit(): void {}
  Logout() {
    // this.authService.LogoutUser();
    this.authService.LogoutUserRemember();
  }
  goToSetting() {
    this.router.navigate(['setting']);
  }
}
