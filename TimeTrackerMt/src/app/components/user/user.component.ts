import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AppJsPath, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { Dynamicmenu } from 'src/app/_models/dynamicmenu';
import { DynamicuserService } from 'src/app/_services/dynamicuser.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  role: number;
  dynamicmenulist: any;
  showSideBar = false;
  showMenuBar = false;
  exePath = environment.exePath;
  constructor(
    private authenticateService: AuthenticationService,
    private dynamicuserService: DynamicuserService
  ) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetDynamicRecords();
  }
  private GetDynamicRecords() {
    // tslint:disable-next-line: no-shadowed-variable
    const Dynamicmenu = this.setRole();
    this.GetDynamicmenu(Dynamicmenu);
  }

  // tslint:disable-next-line: no-shadowed-variable
  private GetDynamicmenu(Dynamicmenu: Dynamicmenu) {
    this.dynamicuserService.GetDynamicmenu(Dynamicmenu).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.dynamicmenulist = data.Result;
        // localStorage.setItem(AppSecurity.menuguard,btoa(JSON.stringify(this.dynamicmenulist)))
      } else {
        this.dynamicmenulist = null;
      }
    });
  }

  ToggleHeader(showHideBar: boolean) {
    this.showSideBar = showHideBar;
    this.showMenuBar = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('overflow_body');
  }

  CloseSideBar() {
    if (this.showSideBar) {
      this.showSideBar = !this.showSideBar;
    }
  }

  private setRole() {
    return {
      RoleId: +this.role,
    } as Dynamicmenu;
  }

  ToggleMenu(showMenu: boolean) {
    this.showMenuBar = showMenu;
  }

  GetIconClass(icon) {
    if (icon != null && icon != "")
      return icon;
    else
      return 'fas fa-cog';
  }
}
