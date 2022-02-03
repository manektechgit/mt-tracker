import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AttandanceLogService } from 'src/app/_services/attandance-log.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppJsPath, AddEditModes } from 'src/app/_app-constants/app-constants.config';
import { ProjectService } from 'src/app/_services/project.service';
import { AttandanceLogModel } from 'src/app/_models/attandancelog.model';
import { throws } from 'assert';
import { UserScreenshot } from 'src/app/_models/UserScreenshot.model';
import { UserScreenLogComponent } from 'src/app/shared/user-screen-log/user-screen-log.component';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportsParameters } from 'src/app/_models/reports-parameters';
import { ReportsService } from 'src/app/_services/reports.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
declare var $: any;
@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css'],
})
export class MyActivitiesComponent implements OnInit, OnChanges {
  @ViewChild('screenlog') screenlog: UserScreenLogComponent;
  @Input() MyActivitiesDetails: any;
  LogDetail: AttandanceLogModel;
  currentLoginUser: LoginResponseModel;
  ProjectDropdownList;
  ActivityLog = [];
  rowGroupMetadata: any;
  projectList;
  dropdownList = [];
  userDropdownList: any;
  hoveredDate: NgbDate | null = null;
  CurrentDate: Date;
  LoginUserId;


  constructor(
    private AuthService: AuthenticationService,
    private modalService: NgbModal,
    private dropDownServeice: DropdownListItemService,
    public formatter: NgbDateParserFormatter) {
    this.currentLoginUser = AuthService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.LoginUserId = this.currentLoginUser.UserId;
    this.updateRowGroupMetaData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.MyActivitiesDetails = changes.MyActivitiesDetails.currentValue;
  }

  onSort() {
    this.updateRowGroupMetaData();
  }
  
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.MyActivitiesDetails) {
      for (let i = 0; i < this.MyActivitiesDetails.length; i++) {
        const rowData = this.MyActivitiesDetails[i];
        const representativeDate = rowData.Date;

        if (i === 0) {
          this.rowGroupMetadata[representativeDate] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.MyActivitiesDetails[i - 1];
          const previousRowGroup = previousRowData.Date;
          if (representativeDate === previousRowGroup) {
            this.rowGroupMetadata[representativeDate].size++;
          }
          else {
            this.rowGroupMetadata[representativeDate] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  GetLogImages(LogDetail: AttandanceLogModel, content, nodata) {
    this.LogDetail = LogDetail;
    if (this.LogDetail.ImageCount === 0) {
      this.modalService.open(nodata, { size: 'lg' });
    }
    else {
      this.modalService.open(content, { size: 'lg' });
    }
  }
}
