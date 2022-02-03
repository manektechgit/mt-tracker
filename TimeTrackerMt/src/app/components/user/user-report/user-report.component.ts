import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { SelectItem } from 'primeng/api';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { UserReportsService } from 'src/app/_services/userReports.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { UserReportsParameters } from 'src/app/_models/UserReports-parameters';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

declare var $: any;
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  ReportsForm: FormGroup;
  reportsMasterList: any;
  userDropdownList: any;
  reportDetailList:any;
  GetUserDetailsDatalist:any
  ProjectDropdownList;
  selectedUserId: any;
  selectedProjectId: any;
  currentLoginUser: LoginResponseModel;
  fromDate: any;
  toDate: any;
  dateList: any;
  showTabs;
  exportColumns: any[];
  selectedUsers = [];
  selectedProject = [];

  constructor(private dropDownServeice: DropdownListItemService, private UserReportsService: UserReportsService,
    private router: Router, private alertService: AlertService, private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter, private authenticationService: AuthenticationService) {

    this.fromDate = '';
    this.toDate = '';
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
    this.reportsMasterList = [];
  }

  rangeDates: Date[];
  invalidDates: Array<Date>
  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetInformation();
    this.InitilizeForm();
    this.setCustomDateRange();
    this.selectedProjectId;
    this.showTabs = {
      "one": true,
      "two": false,
      "three": true,
      "four": true
    };
  }

  private InitilizeForm() {
    this.ReportsForm = new FormGroup({
      UserId: new FormControl(0, [Validators.required]),
      FirstName: new FormControl('', [Validators.required]),
      selectedUsers: new FormControl('', [Validators.required]),
      rangeDates: new FormControl('', [Validators.required]),
    });
  }

  private GetInformation() {
    const ReportsParameters = this.setParameter();
    this.GetUserList(ReportsParameters);
  }


  onUserSelect(item: any) {
    let Userdata = Array.prototype.map.call(item, s => s.UserId).toString()
    this.selectedUserId = Userdata;
    const LogParameters = this.setParameter();
    this.GetUserReportsList(LogParameters);
    this.GetUserReportDetail(LogParameters);
  }

  onSelectRange(event) {
     if(this.toDate !=''){
      this.fromDate = '';
      this.toDate = ''
    }
    let d = new Date(Date.parse(event));
    let data = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    if (this.fromDate == '') {
      this.fromDate = formatDate(data, 'yyyy-MM-dd', 'en_US');
    }
    else {
      this.toDate = formatDate(data, 'yyyy-MM-dd', 'en_US');
    }
    if (this.fromDate != '' && this.toDate != '') {
      const ReportsParameters = this.setParameter();
      this.GetUserReportsList(ReportsParameters);
      this.GetUserReportDetail(ReportsParameters);
    }
  }

  GetUserReportsList(UserReportsParameters: UserReportsParameters) {
    this.UserReportsService.GetUserReportsList(UserReportsParameters).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.reportsMasterList = JSON.parse(data.Result);
      } else {
        this.reportsMasterList = null;
      }
    });
  }
  private GetUserList(UserReportsParameters: UserReportsParameters) {
    this.dropDownServeice.UserList(UserReportsParameters).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.userDropdownList = res.Result;
        this.ReportsForm.get('selectedUsers').setValue(this.userDropdownList);
        this.selectedUserId = Array.prototype.map.call(this.userDropdownList, s => s.UserId).toString();
        this.selectedUsers = [this.selectedUserId]
        const LogParameters = this.setParameter();
        this.GetUserReportsList(LogParameters);
        this.GetUserReportDetail(LogParameters);
      }
    });
  }

  GetUserReportDetail(ReportsDetailParameters: UserReportsParameters) {
    this.UserReportsService.GetUserReportDetail(ReportsDetailParameters).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.reportDetailList = JSON.parse(data.Result);
      } else {
        this.reportDetailList = null;
      }
    });
    this.UserReportsService.GetUserDetailslist(ReportsDetailParameters).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.GetUserDetailsDatalist = res.Result;
      }
    });
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportsMasterList);
    const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportDetailList);
    const wb: XLSX.WorkBook = { Sheets: { 'User-Report': ws }, SheetNames: ['User-Report'] };
    XLSX.utils.book_append_sheet(wb, ws1,'Report-Details');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer);
  }

  private saveExcelFile(buffer: any): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    let filename = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en_US');
    FileSaver.saveAs(data, filename + this.fileExtension);
  }

  private setParameter() {
    const date = new Date();
    const firstday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    return {
      SelectedUserId: this.selectedUserId ? this.selectedUserId : '',
      UId: this.currentLoginUser.UserId,
      RoleId: this.currentLoginUser.RoleId,
      CompanyId: this.currentLoginUser.CompanyId,
      fromDate: this.fromDate ? this.fromDate : formatDate(firstday, 'yyyy-MM-dd', 'en_US'),
      toDate: this.toDate ? this.toDate : formatDate(new Date(), 'yyyy-MM-dd', 'en_US'),
    } as UserReportsParameters;
  }
  setCustomDateRange() {
    const date = new Date();
    const firstday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    this.ReportsForm.get('rangeDates').setValue([firstday, new Date()]);
  }

  removeZero(time: any) {
    let timeData = (time.split(":"));
    return timeData[0] + ':' + timeData[1] + ':' + timeData[2]
  }
}
