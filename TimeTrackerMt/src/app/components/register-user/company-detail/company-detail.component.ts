import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DataServiceService } from '../data-service/data-service.service';
import { TimeZoneDropDownModel } from 'src/app/_models/TimeZone-down-item';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  TimeZoneList: TimeZoneDropDownModel;
  localTimeZone : any;

  constructor(
    private router: Router,
    private dropDownService: DropdownListItemService,
    private dataServiceService: DataServiceService,
    private authenticateService: AuthenticationService,
  ) {

  }
  CompanyForm: FormGroup;
  dropdownNumberOfUser: DropDownItemModel;
  isSubmit: boolean;
  Message: any;
  IsError: boolean;

  ngOnInit(): void {
    this.GetCompanySizeList();
    this.GetTimeZoneList();
    this.InitilizeForm();
    this.dataServiceService.setStepIndex(0);
  }

  private InitilizeForm() {
    this.CompanyForm = new FormGroup({
      CompanyName: new FormControl('', [Validators.required]),
      NumberOfUserId: new FormControl(8),
      TimeZoneId: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.CompanyForm.controls;
  }

  onBlurCompany() {
    if (this.CompanyForm.value.CompanyName == '') {
      return;
    }
    this.authenticateService
      .IsCompanyExist(this.CompanyForm.value.CompanyName).subscribe((res) => {
        if (res.Result) {
          this.IsError = true;
          this.Message = res.Result.Email;
        }
        else {
          this.IsError = false;
        }
      });
  }

  onSubmit() {
    this.isSubmit = true;

    if (this.CompanyForm.invalid) {
      return false;
    } else {
      this.authenticateService
        .IsCompanyExist(this.CompanyForm.value.CompanyName).subscribe((res) => {
          if (res.Result) {
            this.IsError = true;
          }
          else {
            this.IsError = false;
            sessionStorage.setItem('CompanyName', this.CompanyForm.value.CompanyName);
            sessionStorage.setItem('CompanyNumberOfUsers', this.CompanyForm.value.NumberOfUserId);
            sessionStorage.setItem('TimeZoneId', this.CompanyForm.value.TimeZoneId);
            this.router.navigate(['/register-user/invite-team']);
          }
        });
    }
  }

  private GetCompanySizeList() {
    this.dropDownService.GetDropdownList('SizeOfCompany').subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropdownNumberOfUser = res.Result;
      }
    });
  }

  radioNumberOfUserChange(value) {
    this.CompanyForm.value.NumberOfUserId = value;
  }

  private GetTimeZoneList() {
    this.dropDownService.GetTimeZoneList().subscribe((res) => {
      if (res.StatusCode === 200) {
        let timezone = moment.tz.guess();
        let offset = new Date().getTimezoneOffset();
        let timezoneAbbrv = moment.tz.zone(timezone).abbr(offset);
        this.localTimeZone = res.Result.find(element => element.abbr == timezoneAbbrv).TimeZoneId;
        this.TimeZoneList = res.Result;
      }
    });
  }
}
