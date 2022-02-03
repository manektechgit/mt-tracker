import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppsettingMaster } from 'src/app/_models/appsetting-master';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AppsettingService } from 'src/app/_services/appsetting.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-edit-appsetting',
  templateUrl: './add-edit-appsetting.component.html',
  styleUrls: ['./add-edit-appsetting.component.css'],
})
export class AddEditAppsettingComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() selectedAppsetting: AppsettingMaster;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();
  CId: number;
  currentLoginUser: LoginResponseModel;
  AppSettingForm: FormGroup;
  isSubmit: boolean;
  constructor(
    private appsettingService: AppsettingService,
    private router: Router,
    private alertService: AlertService,
    private authservice: AuthenticationService,
    private messageService: MessageService,
  ) {
    this.currentLoginUser = this.authservice.GetLoginUserDetail();
    this.CId = this.currentLoginUser.CompanyId;
  }

  ngOnInit(): void {
    this.InitilizeForm();
    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private InitilizeForm() {
    // tslint:disable-next-line: no-debugger

    this.AppSettingForm = new FormGroup({
      AppSattingId: new FormControl(null),
      CompanyId: new FormControl(this.CId),
      Parameter: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      ParameterValue: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 \b]+$')]),
      Category: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      Description: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      DisplayOrder: new FormControl('', [Validators.required]),
      DisplayName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),

    });
  }
  private setEditModeData() {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.AppSettingForm.patchValue({
      CompanyId: this.CId,
      Parameter: this.selectedAppsetting.Parameter,
      AppSattingId: this.selectedAppsetting.AppSattingId,
      ParameterValue: this.selectedAppsetting.ParameterValue,
      Category: this.selectedAppsetting.Category,
      Description: this.selectedAppsetting.Description,
      DisplayOrder: this.selectedAppsetting.DisplayOrder,
      DisplayName: this.selectedAppsetting.DisplayName,

    });
  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.AppSettingForm.controls;
  }

  onSubmit() {
    // tslint:disable-next-line: no-debugger
    this.isSubmit = true;
    if (this.AppSettingForm.invalid) {
      return false;
    } else {
      if (
        this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()
      ) {
        this.AddAppSetting();
      } else if (
        this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()
      ) {
        this.UpdateAppSetting();
      }
    }
  }

  private UpdateAppSetting() {
    // tslint:disable-next-line: no-debugger
    this.appsettingService
      .UpdateAppSetting(this.AppSettingForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success', summary: 'Successful', detail: AppMessages.APPSETTING_UPDATE,
            life: 3000,
          });
          this.onSaveOrCancel('save');
        }
      },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
        }
        //  else {
        //   this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
        //
      );
  }

  private AddAppSetting() {
    this.appsettingService
      .AddAppSetting(this.AppSettingForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success', summary: 'Successful', detail: AppMessages.APPSETTING_ADD,
            life: 3000,
          });
          this.onSaveOrCancel('save');
        }
      },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
        }
      );
  }


  checkValue(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }

}
