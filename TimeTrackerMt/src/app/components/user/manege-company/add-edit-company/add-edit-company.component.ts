import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyMaster } from 'src/app/_models/company-master';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CompanyService } from 'src/app/_services/company.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.css'],
})
export class AddEditCompanyComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() selectedCompany: CompanyMaster;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  CompanyForm: FormGroup;
  isSubmit: boolean;
  IsError: boolean;
  Message: any;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private authservice: AuthenticationService,
    private messageService: MessageService
  ) {
    this.currentLoginUser = this.authservice.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.InitilizeForm();
    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private InitilizeForm() {
    const urlRegex = '[Hh][Tt][Tt][Pp][Ss]?://(.*)';

    this.CompanyForm = new FormGroup({
      CompanyId: new FormControl(null),
      CompanyName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      NumberOfUser: new FormControl('', [Validators.required]),
      CompanyURL: new FormControl('', [
        Validators.required,
        Validators.pattern(urlRegex),
      ]),
      CreatedBy: new FormControl(this.currentLoginUser.UserId, [
        Validators.required,
      ]),
    });
  }
  private setEditModeData() {
    this.CompanyForm.patchValue({
      CompanyId: this.selectedCompany.CompanyId,
      CompanyName: this.selectedCompany.CompanyName,
      NumberOfUser: this.selectedCompany.NumberOfUser,
      CompanyURL: this.selectedCompany.CompanyURL,
      CreatedBy: this.currentLoginUser.UserId,
    });
  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.CompanyForm.controls;
  }


  onSubmit() {

    this.isSubmit = true;
    if (this.CompanyForm.invalid) {
      return false;
    } else {
      if (
        this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()
      ) {
        this.AddCompany();
      } else if (
        this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()
      ) {
        this.UpdateCompany();
      }
    }
  }

  private UpdateCompany() {
    // tslint:disable-next-line: no-debugger
    this.companyService
      .UpdateCompany(this.CompanyForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          if (data.Result != null) {
            this.IsError = true;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: AppMessages.COMPANY_EXISTS,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: AppMessages.COMPANY_UPDATED,
              life: 3000,
            });
            this.onSaveOrCancel('save');
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.SOME_THING_WENT_WRONG,
            life: 3000,
          });
        }
      });
  }

  private AddCompany() {
    this.companyService.AddCompany(this.CompanyForm.value).subscribe((data) => {
      if (data.StatusCode === 200) {
        if (data.Result != null) {
          this.IsError = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.COMPANY_EXISTS,
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.COMPANY_ADDED,
            life: 3000,
          });
          this.onSaveOrCancel('save');
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: AppMessages.SOME_THING_WENT_WRONG,
          life: 3000,
        });
      }
    });
  }

  checkValue(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }


}
