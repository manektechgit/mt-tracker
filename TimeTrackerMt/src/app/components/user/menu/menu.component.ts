import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MenuService } from 'src/app/_services/menu.service';
import { MenuMaster } from 'src/app/_models/menu-master';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MenuParameters } from 'src/app/_models/Menu-parameters';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menulist: any;
  MenuForm: FormGroup;
  MenuMasterList: any;
  selectedMenu: MenuMaster;
  RolesDropdownList: any;
  currentLoginUser: LoginResponseModel;
  selectedRoleId = 0;
  constructor(
    private menuService: MenuService,
    private router: Router,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeForm();
    this.GetSubMenuData();
    this.GetRolesList();
  }

  loadMenuData(event: LazyLoadEvent) {
    this.GetSubMenuData();
  }

  private InitilizeForm() {
    this.MenuForm = new FormGroup({
      RoleId: new FormControl(),
    });
  }

  private GetSubMenuData() {
    // tslint:disable-next-line: no-debugger
    // tslint:disable-next-line: no-shadowed-variable
    const MenuParameters = this.setPagination();
    this.GetFilterMenu(MenuParameters);
  }

  private GetRolesList() {
    this.menuService.GetRolesList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.RolesDropdownList = res.Result;
      }
    });
  }

  public onRoleChange(roleId): void {
    // tslint:disable-next-line: no-//debugger
    // debugger;
    // tslint:disable-next-line: no-//debugger
    this.selectedRoleId = roleId;
    // tslint:disable-next-line: no-shadowed-variable
    const MenuParameters = this.setPagination();
    this.GetFilterMenu(MenuParameters);
  }

  private setPagination() {
    return {
      RoleId: this.selectedRoleId ? +this.selectedRoleId : 0,
    } as MenuParameters;
  }

  // tslint:disable-next-line: no-shadowed-variable
  GetFilterMenu(MenuParameters: MenuParameters) {

    // tslint:disable-next-line: no-debugger
    this.menuService.GetMenuList(MenuParameters).subscribe((data) => {
      // tslint:disable-next-line: no-debugger
      if (data.StatusCode === 200) {
        this.menulist = data.Result;
      } else {
        this.menulist = null;
      }
    });
  }

  onChange(isChecked: boolean, item: MenuMaster) {
    let active = '';
    // isChecked = !isChecked
    if (isChecked) {
      active = 'active';
    } else {
      active = 'Inactive';
    }
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to  ' + active + ' ' + item.Menuname + ' ?',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        // console.log(confirmed)
        if (confirmed) {
          // console.log("if" ,isChecked)
          item.is_active = isChecked;
          this.UpdateMenu(item);
          console.log('User confirmed:', confirmed);
        } else {
          // this.companies[index].IsActive = this.companies[index].IsActive;
          // console.log("else",isChecked)
          item.is_active = isChecked ? false : true;
          // console.log(item.IsActive)
          console.log('User confirmed:', confirmed);
        }
      })
      // .catch();
      .catch(() => {
        item.is_active = isChecked ? false : true;
        // console.log(
        //   'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        // );
      });
  }

  private UpdateMenu(menu: MenuMaster) {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.menuService.ActiveDeactiveMenu(menu).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.Menu_Updated, life: 3000 });
      }
    });
  }
}
