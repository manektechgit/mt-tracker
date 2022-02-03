import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppsettingsMaster } from 'src/app/_models/appsettings-master';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AppsettingsService } from 'src/app/_services/appsettings.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-edit-appsettings',
  templateUrl: './add-edit-appsettings.component.html',
  styleUrls: ['./add-edit-appsettings.component.css'],
})
export class AddEditAppsettingsComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() selectedAppsettings: AppsettingsMaster;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();
  currentLoginUser: LoginResponseModel;
  AppSettingsForm: FormGroup;
  isSubmit: boolean;

  constructor(
    private appsettingsService: AppsettingsService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.InitilizeForm();
    // tslint:disable-next-line: no-debugger

    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private InitilizeForm() {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.AppSettingsForm = new FormGroup({
      SettingId: new FormControl(null),
      Value: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 \b]+$')]),
    });
  }

  private setEditModeData() {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.AppSettingsForm.patchValue({
      SettingId: this.selectedAppsettings.SettingId,
      Value: this.selectedAppsettings.Value,
    });
  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.AppSettingsForm.controls;
  }

  onSubmit() {
    // tslint:disable-next-line: no-debugger
    this.isSubmit = true;
    if (this.AppSettingsForm.invalid) {
      return false;
    } else {
      if (this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()) {
        this.UpdateAppSettings();
      }
    }
  }

  private UpdateAppSettings() {
    // tslint:disable-next-line: no-debugger
    this.appsettingsService
      .UpdateAppSettings(this.AppSettingsForm.value)
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            // this.alertService.success(AppMessages.SAVE_SUCCESS);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: AppMessages.APP_UPDATE,
              life: 3000,
            });
            this.onSaveOrCancel('save');
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.SOME_THING_WENT_WRONG,
            life: 3000,
          });
        }
        //  else {
        //   this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
        //
      );
  }
}
