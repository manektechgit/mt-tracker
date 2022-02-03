import { Component, OnInit, Inject, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { environment } from 'src/environments/environment';
import { AppJsPath, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user-header',
  templateUrl: './login-user-header.component.html'
})
export class LoginUserHeaderComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  userImageServerPath = '';
  @Output() togleHeader = new EventEmitter<boolean>();
  @Output() togleMenu = new EventEmitter<boolean>();
  @Input() isHeaderShow = false;
  @Input() isMenuShow = false;
  searchText = '';
  role: number;
  
  constructor(
    private authenticateService: AuthenticationService,
    private router: Router) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
  }
  Logout() {
    this.authenticateService.LogoutUser();
  }
  ToggleHeader() {
    this.isHeaderShow = !this.isHeaderShow;
    this.togleHeader.emit(this.isHeaderShow);
  }
  ToggleMenu() {
    this.isMenuShow = !this.isMenuShow;
    this.togleMenu.emit(this.isMenuShow);
  }
}
