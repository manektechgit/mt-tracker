import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ReportsService } from 'src/app/_services/reports.service';
import { ReportsMaster } from 'src/app/_models/reports-master';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { SelectItem } from 'primeng/api';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { ReportsParameters } from 'src/app/_models/reports-parameters';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AttandanceLogModel } from 'src/app/_models/attandancelog.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ReportSummeryService } from 'src/app/_services/reportSummery.service';
import { ReportSummeryParameters } from 'src/app/_models/reportSummery-parameters';
import { AttandanceLogService } from 'src/app/_services/attandance-log.service';


declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})



export class ReportsComponent implements OnInit {
  ReportsForm: FormGroup;
  reportsMasterList: any;
  ReportSummeryList: any;
  MyActivitiesList = [];
  userDropdownList: any;
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


  constructor(private dropDownServeice: DropdownListItemService, private reportsService: ReportsService,
    private router: Router, private alertService: AlertService, private calendar: NgbCalendar, private SummeryService: ReportSummeryService,
    public formatter: NgbDateParserFormatter, private authenticationService: AuthenticationService, private attandanceLogService: AttandanceLogService,) {

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
      selectedProject: new FormControl('', [Validators.required]),
      rangeDates: new FormControl('', [Validators.required]),
    });
  }

  private GetInformation() {
    const ReportsParameters = this.setParameter();
    this.GetUserList(ReportsParameters);
    this.GetReportProjectList(ReportsParameters);
  }
  onUserSelect(item: any) {
    let Userdata = Array.prototype.map.call(item, s => s.UserId).toString()
    this.selectedUserId = Userdata;
    const LogParameters = this.setParameter();
    this.GetFilterReports(LogParameters);
    this.GetReportSummeryList(LogParameters);
    this.GetUserActivityLogs(LogParameters);
  }
  public onProjectSelect(item: any) {
    let Projectdata = Array.prototype.map.call(item, s => s.ProjectId).toString()
    this.selectedProjectId = Projectdata;
    const ReportsParameters = this.setParameter();
    this.GetFilterReports(ReportsParameters);
    this.GetUserActivityLogs(ReportsParameters);
    // this.GetReportSummeryList(ReportsParameters);
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
      this.GetFilterReports(ReportsParameters);
      this.GetReportSummeryList(ReportsParameters);
      this.GetUserActivityLogs(ReportsParameters);
    }
  }

  GetFilterReports(ReportsParameters: ReportsParameters) {
    this.reportsService.GetReportsList(ReportsParameters).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.reportsMasterList = JSON.parse(data.Result);
      } else {
        this.reportsMasterList = null;
      }
    });

    this.reportsService.GetDateList(ReportsParameters).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dateList = res.Result;
      }
    });
  }
  private GetUserList(ReportsParameters: ReportsParameters) {
    this.dropDownServeice.UserList(ReportsParameters).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.userDropdownList = res.Result;
        this.ReportsForm.get('selectedUsers').setValue(this.userDropdownList);
        this.selectedUserId = Array.prototype.map.call(this.userDropdownList, s => s.UserId).toString();
        this.selectedUsers = [this.selectedUserId]
        // const LogParameters = this.setParameter();
        // this.GetFilterReports(LogParameters);
      }
    });
  }

  private GetReportProjectList(ReportsParameters: ReportsParameters) {

    this.reportsService.GetProjectlist(ReportsParameters).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.ProjectDropdownList = res.Result;
        this.ReportsForm.get('selectedProject').setValue(this.ProjectDropdownList);
        this.selectedProjectId = Array.prototype.map.call(this.ProjectDropdownList, s => s.ProjectId).toString();
        this.selectedProject = [this.selectedProjectId]
        const LogParameters = this.setParameter();
        this.GetFilterReports(LogParameters);
        this.GetReportSummeryList(LogParameters);
        this.GetUserActivityLogs(LogParameters);
      }
    });
  }

  GetReportSummeryList(ReportSummeryParameters: ReportsParameters) {
    this.SummeryService.GetReportSummeryList(ReportSummeryParameters).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.ReportSummeryList = JSON.parse(data.Result);
      } else {
        this.ReportSummeryList = null;
      }
    });
  }

  private GetUserActivityLogs(LogParameters: ReportsParameters) {
    this.attandanceLogService.GetUserActivityLogs(LogParameters).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.MyActivitiesList = res.Result;
      }
    });
  }

  exportExcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('Datatable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let EXCEL_EXTENSION = '.xlsx';
    let filename = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en_US');
    /* save to file */
    XLSX.writeFile(wb, filename + EXCEL_EXTENSION);

  }

  // exportExcel1() {
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.reportsMasterList);
  //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, "Report");
  //   });
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import("file-saver").then(FileSaver => {
  //     let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     let EXCEL_EXTENSION = '.xlsx';
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //     });
  //     let filename = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en_US');
  //     FileSaver.saveAs(data, filename + EXCEL_EXTENSION, data, filename + EXCEL_EXTENSION);
  //   });
  // }

  private setParameter() {
    const date = new Date();
    const firstday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    return {
      SelectedUserId: this.selectedUserId ? this.selectedUserId : '',
      selectedProjectId: this.selectedProjectId ? this.selectedProjectId : '',
      UId: this.currentLoginUser.UserId,
      RoleId: this.currentLoginUser.RoleId,
      CompanyId: this.currentLoginUser.CompanyId,
      fromDate: this.fromDate ? this.fromDate : formatDate(firstday, 'yyyy-MM-dd', 'en_US'),
      toDate: this.toDate ? this.toDate : formatDate(new Date(), 'yyyy-MM-dd', 'en_US'),
    } as ReportsParameters;
  }
  setCustomDateRange() {
    const date = new Date();
    const firstday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    this.ReportsForm.get('rangeDates').setValue([firstday, new Date()]);
  }

  removeZero(time: any) {
    const timeData = (time.split(':'));
    return timeData[0] + ':' + timeData[1];
  }
}
