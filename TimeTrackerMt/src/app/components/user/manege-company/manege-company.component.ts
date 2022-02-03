import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { CompanyMaster } from 'src/app/_models/company-master';
import { CompanyPagination } from 'src/app/_models/company-pagination';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-manege-company',
  templateUrl: './manege-company.component.html',
  styleUrls: ['./manege-company.component.css'],
})
export class ManegeCompanyComponent implements OnInit {
  //#region Variables
  companies: any;
  selectedCompany: CompanyMaster;
  mode = AddEditModes.default;
  pagination: CompanyPagination;

  // paging
  startIndex = 0;
  showTotalRecords = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  //#endregion

  //#region Construsctor
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
    } as CompanyPagination;
    this.GetAllCompany();
    // this.InitilizeLoginForm();
  }
  //#endregion

  //#region Fetch And Update Apidata
  private GetAllCompany() {
    // this.loading = true;
    this.companyService.GetCompanypaginationDatalist(this.pagination).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.companies = data.Result;
          this.totalRecordsInDb = this.companies[0].recordsTotal;
          this.loading = false;
        } else {
          this.companies = null;
          this.loading = false;
        }
      }, (err) => {
        this.loading = false;
      });
  }
  ActiveDeactiveCompany(isChecked: boolean, item: CompanyMaster) {
    let active = '';
    if (isChecked) {
      active = 'active';
    } else {
      active = 'inactive';
    }
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to ' + active + ' this company ?',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          item.IsActive = isChecked;
          this.UpdateCompany(item);
        } else {
          item.IsActive = isChecked ? false : true;
        }
      })
      .catch(() => {
        item.IsActive = isChecked ? false : true;
      });
  }
  private UpdateCompany(company: CompanyMaster) {
    this.companyService.ActiveDeactiveCompany(company).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.Company_Updated, life: 3000 });
      }
    });
  }
  loadCompanyData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetAllCompany();
  }
  //#endregion

  //#region "SetModes"
  SetInsertMode() {
    this.selectedCompany = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedCompany: CompanyMaster) {
    this.mode = AddEditModes.edit;
    this.selectedCompany = selectedCompany;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetAllCompany();
    }
  }
  //#endregion

  //#region Paging
  private setPagination(event: LazyLoadEvent) {
    this.showTotalRecords = event.rows;
    let sorDir = '';
    if (event.sortOrder === 1) {
      sorDir = 'asc';
    }
    else {
      sorDir = 'desc';
    }
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: event.first,
      Search: event.globalFilter,
      SortCol: event.sortField,
      SortDir: sorDir,
    } as CompanyPagination;
  }
  //#endregion
}
