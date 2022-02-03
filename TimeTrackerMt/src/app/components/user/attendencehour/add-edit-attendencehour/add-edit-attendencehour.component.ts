import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttendencehourMaster } from 'src/app/_models/attendencehour-master';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AttendencehourService } from 'src/app/_services/attendencehour.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-attendencehour',
  templateUrl: './add-edit-attendencehour.component.html',
  styleUrls: ['./add-edit-attendencehour.component.css'],
})
export class AddEditAttendencehourComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() selectedAttendencehour: AttendencehourMaster;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();
  currentLoginUser: LoginResponseModel;
  AttendenceHourForm: FormGroup;
  isSubmit: boolean;
  StartDate: any;
  EndDate: any;

  constructor(
    private attendencehourService: AttendencehourService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) {
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.InitilizeForm();
    // tslint:disable-next-line: no-debugger

    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private InitilizeForm() {
    // tslint:disable-next-line: no-debugger
    this.AttendenceHourForm = new FormGroup({
      Id: new FormControl(null),
      StartDate: new FormControl('', [Validators.required]),
      EndDate: new FormControl(),
      // stringStartDate: new FormControl(this.selectedAttendencehour.StartDate.toString()),
      // stringEndDate: new FormControl(this.selectedAttendencehour.EndDate.toString()),
      Fulldayhours: new FormControl('', [Validators.required]),
      Halfdayhours: new FormControl('', [Validators.required]),
      CompanyId: new FormControl(this.currentLoginUser.CompanyId),
    });
  }

  // onSelectStartDate(event) {
  //   const d = new Date(Date.parse(event));
  //   const data = `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`;
  //   if (this.StartDate === '') {
  //     this.StartDate = formatDate(data, 'yyyy-MM-dd', 'en_US');
  //   }
  // }

  // onSelectEndDate(event) {
  //   const d = new Date(Date.parse(event));
  //   const data = `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`;
  //   if (this.EndDate === '') {
  //     this.EndDate = formatDate(data, 'yyyy-MM-dd', 'en_US');
  //   }
  // }

  private setEditModeData() {
    // tslint:disable-next-line: no-debugger

    this.AttendenceHourForm.patchValue({
      Id: this.selectedAttendencehour.Id,
      CompanyId: this.currentLoginUser.CompanyId,
      StartDate: new Date(this.selectedAttendencehour.StartDate),
      EndDate:
        this.selectedAttendencehour.EndDate != null
          ? new Date(this.selectedAttendencehour.EndDate)
          : null,
      // EndDate:  new Date(this.selectedAttendencehour.EndDate),
      // stringStartDate: this.selectedAttendencehour.StartDate.toString(),
      // stringEndDate: this.selectedAttendencehour.EndDate.toString(),
      Fulldayhours: this.selectedAttendencehour.FullDayHours,
      Halfdayhours: this.selectedAttendencehour.HalfDayHours,
    });
  }

  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.AttendenceHourForm.controls;
  }

  onSubmit() {
    // tslint:disable-next-line: no-debugger
    this.isSubmit = true;
    if (this.AttendenceHourForm.invalid) {
      return false;
    } else {
      if (
        this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()
      ) {
        this.AddAttendenceHour();
      } else if (
        this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()
      ) {
        this.UpdateAttendenceHour();
      }
    }
  }

  private AddAttendenceHour() {
    this.attendencehourService
      .AddAttendencehour(this.AttendenceHourForm.value)
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            // this.alertService.success(AppMessages.SAVE_SUCCESS);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: AppMessages.ATTENDENCEHOUR_ADD,
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

  private UpdateAttendenceHour() {
    // tslint:disable-next-line: no-debugger
    this.attendencehourService
      .UpdateAttendencehour(this.AttendenceHourForm.value)
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            // this.alertService.success(AppMessages.SAVE_SUCCESS);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: AppMessages.ATTENDENCEHOUR_UPDATE,
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


  checkValue(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }

}
