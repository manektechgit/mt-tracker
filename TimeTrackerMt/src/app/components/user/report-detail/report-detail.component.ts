import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ReportsService } from 'src/app/_services/reports.service';
import { ReportsMaster } from 'src/app/_models/reports-master';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import {SelectItem} from 'primeng/api';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { UserReportsParameters } from 'src/app/_models/UserReports-parameters';
import { LoginResponseModel } from 'src/app/_models/login-response.model';

import {trigger,state,style,transition,animate} from '@angular/animations';
import { formatDate } from '@angular/common';
import { UserReportsService } from 'src/app/_services/userReports.service';
import * as XLSX from 'xlsx'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


declare var $: any;
@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  @Input() ReportsDetailsList:any;
  @Input() GetUserDetailslist:any;  
  
  currentLoginUser: LoginResponseModel;  
  
  constructor(public formatter: NgbDateParserFormatter, private authenticationService: AuthenticationService) {

   
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
    
  }
  
  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }  

  exportExcel() {
    debugger
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ReportsDetailsList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Report");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      let filename = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en_US');
      FileSaver.saveAs(data, filename + EXCEL_EXTENSION);
    });
  }  
  

  removeZero(time: any) {   
        return time;
  }

}
